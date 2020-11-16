/// <reference path="./typings/index.d.ts" />
import { spawn, ChildProcess } from 'child_process';
import { ILogger } from './yahka.homekit-bridge';
import util = require('util');
import ip = require('ip');
import { uuid, Accessory, Service, Characteristic, SnapshotRequest, PrepareStreamRequest, SessionIdentifier, CameraStreamingDelegate, CameraController, SRTPCryptoSuites, H264Profile, H264Level, SnapshotRequestCallback, PrepareStreamCallback, PrepareStreamResponse, StreamingRequest, StreamRequestCallback, CameraStreamingOptions, StreamRequestTypes, AudioStreamingCodecType, AudioStreamingSamplerate } from 'hap-nodejs';
import { Configuration } from './shared/yahka.configuration';
import * as crypto from 'crypto';



type SessionInfo = {
    address: string, // address of the HAP controller

    videoPort: number, // port of the controller
    localVideoPort: number,
    videoCryptoSuite: SRTPCryptoSuites, // should be saved if multiple suites are supported
    videoSRTP: Buffer, // key and salt concatenated
    videoSSRC: number, // rtp synchronisation source

    audioPort: number,
    audioCryptoSuite: SRTPCryptoSuites,
    audioSRTP: Buffer,
    audioSSRC: number,

}

type OngoingSession = {
    localVideoPort: number,
    process: ChildProcess,
}

export class THomeKitIPCamera implements CameraStreamingDelegate {
    private cameraController: CameraController;
    private camera: Accessory;
    private pendingSessions: Record<string, Partial<SessionInfo>> = {};
    private ongoingSessions: Record<string, OngoingSession> = {};
    constructor(private camConfig: Configuration.ICameraConfig, private FLogger: ILogger) {
        this.init();
    }

    init() {
        if (!this.camConfig.enabled) {
            return
        }
        this.createCameraDevice()
        this.createCameraController();
        this.publishCamera();
    }

    private createOptionsDictionary(): CameraStreamingOptions {
        var videoResolutions = [];
        var maxFPS = (this.camConfig.maxFPS > 30) ? 30 : this.camConfig.maxFPS;

        if (this.camConfig.maxWidth >= 320) {
            if (this.camConfig.maxHeight >= 240) {
                videoResolutions.push([320, 240, maxFPS]);
                if (maxFPS > 15) {
                    videoResolutions.push([320, 240, 15]);
                }
            }

            if (this.camConfig.maxHeight >= 180) {
                videoResolutions.push([320, 180, maxFPS]);
                if (maxFPS > 15) {
                    videoResolutions.push([320, 180, 15]);
                }
            }
        }

        if (this.camConfig.maxWidth >= 480) {
            if (this.camConfig.maxHeight >= 360) {
                videoResolutions.push([480, 360, maxFPS]);
            }

            if (this.camConfig.maxHeight >= 270) {
                videoResolutions.push([480, 270, maxFPS]);
            }
        }

        if (this.camConfig.maxWidth >= 640) {
            if (this.camConfig.maxHeight >= 480) {
                videoResolutions.push([640, 480, maxFPS]);
            }

            if (this.camConfig.maxHeight >= 360) {
                videoResolutions.push([640, 360, maxFPS]);
            }
        }

        if (this.camConfig.maxWidth >= 1280) {
            if (this.camConfig.maxHeight >= 960) {
                videoResolutions.push([1280, 960, maxFPS]);
            }

            if (this.camConfig.maxHeight >= 720) {
                videoResolutions.push([1280, 720, maxFPS]);
            }
        }

        if (this.camConfig.maxWidth >= 1920) {
            if (this.camConfig.maxHeight >= 1080) {
                videoResolutions.push([1920, 1080, maxFPS]);
            }
        }

        let options: CameraStreamingOptions = {
            proxy: false, // Requires RTP/RTCP MUX Proxy
            disable_audio_proxy: false, // If proxy = true, you can opt out audio proxy via this
            srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
            video: {
                resolutions: videoResolutions,
                codec: {
                    profiles: [H264Profile.BASELINE, H264Profile.MAIN, H264Profile.HIGH],
                    levels: [H264Level.LEVEL3_1, H264Level.LEVEL3_2, H264Level.LEVEL4_0],
                },
            },
            audio: {
                comfort_noise: false,
                codecs: [
                    {
                        type: AudioStreamingCodecType.OPUS,
                        samplerate: [AudioStreamingSamplerate.KHZ_16, AudioStreamingSamplerate.KHZ_24]
                    },
                    {
                        type: AudioStreamingCodecType.AAC_ELD,
                        samplerate: [AudioStreamingSamplerate.KHZ_16, AudioStreamingSamplerate.KHZ_24]
                    }
                ]
            }
        }
        return options
    }

    private createCameraDevice() {
        let deviceID = uuid.generate(this.camConfig.ident + ':' + this.camConfig.name);
        let hapDevice = new Accessory(this.camConfig.name, deviceID);

        let infoService = hapDevice.getService(Service.AccessoryInformation);
        infoService.setCharacteristic(Characteristic.Manufacturer, this.camConfig.manufacturer || 'not configured');
        infoService.setCharacteristic(Characteristic.Model, this.camConfig.model || 'not configured');
        infoService.setCharacteristic(Characteristic.SerialNumber, this.camConfig.serial || 'not configured');
        if ((this.camConfig.firmware !== undefined) && (this.camConfig.firmware !== "")) {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, this.camConfig.firmware);
        }

        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug('camera identify');
            callback(); // success
        });

        this.camera = hapDevice;
    }

    public createCameraController() {

        this.cameraController = new CameraController({
            cameraStreamCount: 2, // HomeKit requires at least 2 streams, but 1 is also just fine
            delegate: this,
            streamingOptions: this.createOptionsDictionary()
        });

        this.camera.configureController(this.cameraController);
    }

    private publishCamera() {
        this.camera.publish({
            username: this.camConfig.username,
            port: this.camConfig.port,
            pincode: this.camConfig.pincode,
            category: Accessory.Categories.CAMERA,
            mdns: {
                interface: this.camConfig.interface,
                reuseAddr: true
            } as any

        }, false);
    }

    public handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): void {
        let params = {
            source: this.camConfig.source,
            width: request.width,
            height: request.height,
        }
        let ffmpegCommand = this.camConfig.ffmpegCommandLine.snapshot.map((s) => s.replace(/\$\{(.*?)\}/g, (_, word) => {
            return params[word];
        }));

        this.FLogger.debug("Snapshot run: ffmpeg " + ffmpegCommand.join(' '));
        let ffmpeg = spawn('ffmpeg', ffmpegCommand, { env: process.env });

        var imageBuffer = Buffer.alloc(0);

        ffmpeg.stdout.on('data', function (data) {
            imageBuffer = Buffer.concat([imageBuffer, (<Buffer>data)]);
        });
        ffmpeg.on('close', function (code) {
            callback(undefined, imageBuffer);
        });
    }

    public prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): void {
        let sessionInfo: Partial<SessionInfo> = {};

        const sessionID: SessionIdentifier = request.sessionID;
        const targetAddress = request.targetAddress;

        sessionInfo.address = targetAddress;
        let response: Partial<PrepareStreamResponse> = {};

        let videoInfo = request.video;
        if (videoInfo) {
            const targetPort = videoInfo.port;
            const videoCryptoSuite = videoInfo.srtpCryptoSuite; // could be used to support multiple crypto suite (or support no suite for debugging)
            const videoSrtpKey = videoInfo.srtp_key;
            const videoSrtpSalt = videoInfo.srtp_salt;

            const videoSSRC = CameraController.generateSynchronisationSource();

            response.video = {
                port: targetPort,
                ssrc: videoSSRC,
                srtp_key: videoSrtpKey,
                srtp_salt: videoSrtpSalt
            };

            sessionInfo.videoPort = targetPort;
            sessionInfo.videoSRTP = Buffer.concat([videoSrtpKey, videoSrtpSalt]);
            sessionInfo.videoSSRC = videoSSRC;
            sessionInfo.videoCryptoSuite = videoCryptoSuite;
        }

        const audioInfo = request.audio;
        // this.FLogger.debug(`∂∂∂∂∂∂∂∂∂∂∂∂∂∂∂∂∂∂∂ audioInfo ${JSON.stringify(audioInfo)}`);
        if (audioInfo) {
            const targetPort = audioInfo.port;
            const audioCryptoSuite = audioInfo.srtpCryptoSuite; // could be used to support multiple crypto suite (or support no suite for debugging)
            const audioSrtpKey = audioInfo.srtp_key;
            const audioSrtpSalt = audioInfo.srtp_salt;
            const audioSSRC = CameraController.generateSynchronisationSource();

            response.audio = {
                port: targetPort,
                ssrc: audioSSRC,
                srtp_key: audioSrtpKey,
                srtp_salt: audioSrtpSalt
            };

            sessionInfo.audioPort = targetPort;
            sessionInfo.audioSRTP = Buffer.concat([audioSrtpKey, audioSrtpSalt]);
            sessionInfo.audioSSRC = audioSSRC;
            sessionInfo.audioCryptoSuite = audioCryptoSuite;
        }

        // let currentAddress = ip.address();
        // var addressResp: Partial<Address> = {
        //     address: currentAddress
        // };

        // if (ip.isV4Format(currentAddress)) {
        //     addressResp.type = "v4";
        // } else {
        //     addressResp.type = "v6";
        // }

        // response.address = addressResp as Address;
        this.pendingSessions[sessionID] = sessionInfo;

        callback(undefined, response as PrepareStreamResponse);
    }

    public handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): void {
        var sessionId = request.sessionID;
        switch (request.type) {
            case StreamRequestTypes.START: {
                var sessionInfo = this.pendingSessions[sessionId];
                if (sessionInfo) {
                    var width = 1280;
                    var height = 720;
                    var fps = 30;
                    var bitrate = 300;
                    var codec = this.camConfig.codec || 'libx264';

                    let videoInfo = request.video;
                    if (videoInfo) {
                        width = videoInfo.width;
                        height = videoInfo.height;

                        let expectedFPS = videoInfo.fps;
                        if (expectedFPS < fps) {
                            fps = expectedFPS;
                        }

                        bitrate = videoInfo.max_bit_rate;
                    }


                    const videoSuite = this.getCryptoSuite(sessionInfo.videoCryptoSuite);
                    const audioSuite = this.getCryptoSuite(sessionInfo.audioCryptoSuite);

                    let params = {
                        source: this.camConfig.source,
                        codec: codec,
                        fps: fps,
                        width: width,
                        height: height,
                        bitrate: bitrate,
                        doubledBitrate: 2 * bitrate,
                        videokey: sessionInfo.videoSRTP?.toString('base64'),
                        targetAddress: sessionInfo.address,
                        targetVideoPort: sessionInfo.videoPort,
                        targetVideoSsrc: sessionInfo.videoSSRC,
                        targetVideoCryptoSuite: videoSuite,
                        targetAudioPort: sessionInfo.audioPort,
                        targetAudioSsrc: sessionInfo.audioSSRC,
                        targetAudioCryptoSuite: audioSuite,
                        audiokey: sessionInfo.audioSRTP?.toString('base64')
                    }

                    let ffmpegCommand = this.camConfig.ffmpegCommandLine.stream.map((s) => s.replace(/\$\{(.*?)\}/g, (_, word) => {
                        return params[word];
                    }));

                    this.FLogger.debug("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    let ffmpeg = spawn('ffmpeg', ffmpegCommand, { env: process.env });

                    let started = false;
                    ffmpeg.stderr.on('data', (data: Buffer) => {
                        console.log(data.toString("utf8"));
                        if (!started) {
                            started = true;
                            this.FLogger.debug("FFMPEG: received first frame");

                            callback(); // do not forget to execute callback once set up
                        }
                    });
                    ffmpeg.on('error', error => {
                        this.FLogger.error("[Video] Failed to start video stream: " + error.message);
                        callback(new Error("ffmpeg process creation failed!"));
                    });
                    ffmpeg.on('exit', (code, signal) => {
                        const message = "[Video] ffmpeg exited with code: " + code + " and signal: " + signal;

                        if (code == null || code === 255) {
                            this.FLogger.debug(message + " (Video stream stopped!)");
                        } else {
                            this.FLogger.error(message + " (error)");

                            if (!started) {
                                callback(new Error(message));
                            } else {
                                this.cameraController.forceStopStreamingSession(sessionId);
                            }
                        }
                    });

                    this.ongoingSessions[sessionId] = {
                        localVideoPort: 0,
                        process: ffmpeg,
                    };
                    delete this.pendingSessions[sessionId];

                    break;
                }
            }

            case StreamRequestTypes.RECONFIGURE:
                // not supported by this example
                this.FLogger.error("Received (unsupported) request to reconfigure to: " + JSON.stringify(request.video));
                callback();
                break;
            case StreamRequestTypes.STOP:
                const ongoingSession = this.ongoingSessions[sessionId];

                // ports.delete(ongoingSession.localVideoPort);

                try {
                    ongoingSession.process.kill('SIGKILL');
                } catch (e) {
                    this.FLogger.error("Error occurred terminating the video process!");
                    this.FLogger.error(e);
                }

                delete this.ongoingSessions[sessionId];

                this.FLogger.debug("Stopped streaming session!");
                callback();
                break;
        }
    }

    private getCryptoSuite(suite: SRTPCryptoSuites): string {
        switch (suite) {
            case SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80: // actually ffmpeg just supports AES_CM_128_HMAC_SHA1_80
                return "AES_CM_128_HMAC_SHA1_80";
                break;
            case SRTPCryptoSuites.AES_CM_256_HMAC_SHA1_80:
                return "AES_CM_256_HMAC_SHA1_80";
                break;
            default:
                return undefined;
        }
    }
}


