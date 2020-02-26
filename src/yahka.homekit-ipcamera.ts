/// <reference path="./typings/index.d.ts" />
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { ILogger } from './yahka.homekit-bridge';
import util = require('util');
import ip = require('ip');
import { uuid, StreamController, Accessory, Service, Characteristic, Camera, StreamControllerOptions, SnapshotRequest, NodeCallback, PrepareStreamRequest, PreparedStreamRequestCallback, SessionInfo, SessionIdentifier, PreparedStreamResponse, Address, StreamRequest } from 'hap-nodejs';
import { Configuration } from './shared/yahka.configuration';
import * as crypto from 'crypto';

export class THomeKitIPCamera {
    private _camera: Accessory;
    public services: Service[] = [];
    public streamControllers: Array<StreamController> = [];
    public pendingSessions: Record<string, SessionInfo> = {};
    public ongoingSessions: Record<string, ChildProcessWithoutNullStreams> = {};


    constructor(private camConfig: Configuration.ICameraConfig, private FLogger: ILogger) {
        this.init();
    }

    init() {
        if (!this.camConfig.enabled) {
            return
        }
        this.createCameraDevice()
        this.createCameraControlService();
        this.createSecureVideoService();
        this._createStreamControllers();
        this.publishCamera();
    }

    private createOptionsDictionary(): StreamControllerOptions {
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

        let options: StreamControllerOptions = {
            proxy: false, // Requires RTP/RTCP MUX Proxy
            disable_audio_proxy: false, // If proxy = true, you can opt out audio proxy via this
            srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
            video: {
                resolutions: videoResolutions,
                codec: {
                    profiles: [0, 1, 2], // Enum, please refer StreamController.VideoCodecParamProfileIDTypes
                    levels: [0, 1, 2] // Enum, please refer StreamController.VideoCodecParamLevelTypes
                }
            },
            audio: {
                comfort_noise: false,
                codecs: [
                    {
                        type: "OPUS", // Audio Codec
                        samplerate: 24 // 8, 16, 24 KHz
                    },
                    {
                        type: "AAC-eld",
                        samplerate: 16
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
        hapDevice.configureCameraSource(this);

        this._camera = hapDevice;
    }

    public createCameraControlService() {
        var controlService = new Service.CameraControl('', '');
        this.services.push(controlService);
    }

    public _createStreamControllers() {
        let options = this.createOptionsDictionary()
        let maxStreams = this.camConfig.numberOfStreams || 2;

        for (var i = 0; i < maxStreams; i++) {
            var streamController = new StreamController(i, options, this);
            this.services.push((<any>streamController).service);
            this.streamControllers.push(streamController);
        }
    }

    public createSecureVideoService() {
        // var myCameraOperatingMode = new Service.CameraOperatingMode('', '');
        // this.services.push(myCameraOperatingMode);

        // var myCameraEventRecordingManagement = new Service.CameraEventRecordingManagement('', '');
        // this.services.push(myCameraEventRecordingManagement);
    }


    private publishCamera() {
        (<any>this._camera).publish({
            username: this.camConfig.username,
            port: this.camConfig.port,
            pincode: this.camConfig.pincode,
            category: Accessory.Categories.CAMERA,
            mdns: {
                interface: this.camConfig.interface,
                reuseAddr: true
            }

        }, false);
    }

    handleCloseConnection(connectionID: string) {
        this.streamControllers.forEach(function (controller) {
            controller.handleCloseConnection(connectionID);
        });
    }


    handleSnapshotRequest(request: SnapshotRequest, callback: NodeCallback<Buffer>) {
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

    prepareStream(request: PrepareStreamRequest, callback: PreparedStreamRequestCallback) {
        let sessionInfo: Partial<SessionInfo> = {};

        const sessionID: SessionIdentifier = request["sessionID"];
        const targetAddress = request["targetAddress"];

        sessionInfo["address"] = targetAddress;

        var response: Partial<PreparedStreamResponse> = {};

        let videoInfo = request["video"];
        if (videoInfo) {
            let targetPort = videoInfo["port"];
            let srtp_key = videoInfo["srtp_key"];
            let srtp_salt = videoInfo["srtp_salt"];

            // SSRC is a 32 bit integer that is unique per stream
            let ssrcSource = crypto.randomBytes(4);
            ssrcSource[0] = 0;
            let ssrc = ssrcSource.readInt32BE(0);

            let videoResp = {
                port: targetPort,
                ssrc: ssrc,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            response["video"] = videoResp;

            sessionInfo["video_port"] = targetPort;
            sessionInfo["video_srtp"] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo["video_ssrc"] = ssrc;
        }

        let audioInfo = request["audio"];
        if (audioInfo) {
            let targetPort = audioInfo["port"];
            let srtp_key = audioInfo["srtp_key"];
            let srtp_salt = audioInfo["srtp_salt"];

            // SSRC is a 32 bit integer that is unique per stream
            let ssrcSource = crypto.randomBytes(4);
            ssrcSource[0] = 0;
            let ssrc = ssrcSource.readInt32BE(0);

            let audioResp = {
                port: targetPort,
                ssrc: ssrc,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            response["audio"] = audioResp;

            sessionInfo["audio_port"] = targetPort;
            sessionInfo["audio_srtp"] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo["audio_ssrc"] = ssrc;
        }

        let currentAddress = ip.address();
        var addressResp: Partial<Address> = {
            address: currentAddress
        };

        if (ip.isV4Format(currentAddress)) {
            addressResp["type"] = "v4";
        } else {
            addressResp["type"] = "v6";
        }

        response["address"] = addressResp as Address;
        this.pendingSessions[uuid.unparse(sessionID)] = sessionInfo as SessionInfo;

        callback(response as PreparedStreamResponse);
    }

    handleStreamRequest(request: StreamRequest) {
        var sessionID = request.sessionID;
        var requestType = request.type;
        if (sessionID) {
            let sessionIdentifier = uuid.unparse(sessionID, 0);

            if (requestType == "start") {
                var sessionInfo = this.pendingSessions[sessionIdentifier];
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

                    let params = {
                        source: this.camConfig.source,
                        codec: codec,
                        fps: fps,
                        width: width,
                        height: height,
                        bitrate: bitrate,
                        videokey: sessionInfo.video_srtp?.toString('base64'),
                        targetAddress: sessionInfo.address,
                        targetVideoPort: sessionInfo.video_port,
                        targetVideoSsrc: sessionInfo.video_ssrc,
                        targetAudioPort: sessionInfo.audio_port,
                        targetAudioSsrc: sessionInfo.audio_ssrc,
                        audiokey: sessionInfo.audio_srtp?.toString('base64')

                    }
                    let ffmpegCommand = this.camConfig.ffmpegCommandLine.stream.map((s) => s.replace(/\$\{(.*?)\}/g, (_, word) => {
                        return params[word];
                    }));

                    this.FLogger.debug("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    let ffmpeg = spawn('ffmpeg', ffmpegCommand, { env: process.env });
                    var devnull = require('dev-null');
                    ffmpeg.stdout.pipe(devnull());
                    ffmpeg.stderr.pipe(devnull());
                    this.ongoingSessions[sessionIdentifier] = ffmpeg;
                }

                delete this.pendingSessions[sessionIdentifier];
            } else if (requestType == "stop") {
                var ffmpegProcess = this.ongoingSessions[sessionIdentifier];
                if (ffmpegProcess) {
                    ffmpegProcess.kill('SIGKILL');
                }

                delete this.ongoingSessions[sessionIdentifier];
            }
        }
    }
}


