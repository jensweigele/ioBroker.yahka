/// <reference path="./typings/index.d.ts" />
import { spawn } from 'child_process';
import { ILogger, Configuration } from './yahka.homekit-bridge';
import util = require('util');
import HAP = require('hap-nodejs');
import { StreamController } from 'hap-nodejs/lib/StreamController';
import ip = require('ip');
import { uuid } from 'hap-nodejs';

let HAPService = HAP.Service;
let HAPCharacteristic = HAP.Characteristic;

export interface ICameraConfig extends Configuration.IBridgeConfig {
    source: String;
    codec: String;
    numberOfStreams: number | undefined;
    maxWidth: number;
    maxHeight: number;
    maxFPS: number;

}

export class THomeKitIPCamera {
    private _camera: HAPNodeJS.Accessory;
    private streamControllers: Array<StreamController> = [];
    private pendingSessions = {};
    private ongoingSessions = {};


    constructor(private camConfig: ICameraConfig, private FLogger: ILogger) {
        this.init();
    }

    init() {
        this.createCameraDevice()
        this.createCameraControlService();
        this.createStreamControllers();
        this.publishCamera();
    }

    private createOptionsDictionary() {
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

        let options = {
            proxy: false, // Requires RTP/RTCP MUX Proxy
            srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
            video: {
                resolutions: videoResolutions,
                codec: {
                    profiles: [0, 1, 2], // Enum, please refer StreamController.VideoCodecParamProfileIDTypes
                    levels: [0, 1, 2] // Enum, please refer StreamController.VideoCodecParamLevelTypes
                }
            },
            audio: {
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
        let deviceID = HAP.uuid.generate(this.camConfig.ident + ':' + this.camConfig.name);
        let hapDevice = new HAP.Accessory(this.camConfig.name, deviceID);

        hapDevice.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, this.camConfig.manufacturer || 'not configured')
            .setCharacteristic(HAPCharacteristic.Model, this.camConfig.model || 'not configured')
            .setCharacteristic(HAPCharacteristic.SerialNumber, this.camConfig.serial || 'not configured');

        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug('camera identify');
            callback(); // success
        });

        this._camera = hapDevice;

    }

    private createCameraControlService() {
        var controlService = new HAP.Service.CameraControl();
        this._camera.services.push(controlService);
    }

    private createStreamControllers() {
        let options = this.createOptionsDictionary()        
        let maxStreams = this.camConfig.numberOfStreams || 2;

        for (var i = 0; i < maxStreams; i++) {
            var streamController = new StreamController(i, options, this);
            this._camera.services.push((<any>streamController).service);
            this.streamControllers.push(streamController);
        }
    }

    private publishCamera() {
        this._camera.publish({
            username: this.camConfig.username,
            port: this.camConfig.port,
            pincode: this.camConfig.pincode,
            category: HAP.Accessory.Categories.CAMERA
        }, false);
    }

    handleCloseConnection(connectionID) {
        for (let controller of this.streamControllers) {
            controller.handleCloseConnection(connectionID);
        }
    }


    handleSnapshotRequest(request, callback) {
        this.FLogger.info("get snapshot");
        let resolution = request.width + 'x' + request.height;
        let ffmpegCommand = '-re -i ' + this.camConfig.source + ' -t 1 -s ' + resolution + ' -f image2 -';
        this.FLogger.info("Snapshot run: ffmpeg " + ffmpegCommand);
        let ffmpeg = spawn('ffmpeg', (ffmpegCommand).split(' '), { env: process.env });
        var imageBuffer = Buffer.alloc(0);

        ffmpeg.stdout.on('data', function (data) {
            imageBuffer = Buffer.concat([imageBuffer, (<Buffer>data)]);
        });
        ffmpeg.on('close', function (code) {
            callback(undefined, imageBuffer);
        });
    }

    prepareStream(request, callback) {
        var sessionInfo = {};

        let sessionID = request["sessionID"];
        let targetAddress = request["targetAddress"];

        sessionInfo["address"] = targetAddress;

        var response = {};

        let videoInfo = request["video"];
        if (videoInfo) {
            let targetPort = videoInfo["port"];
            let srtp_key = videoInfo["srtp_key"];
            let srtp_salt = videoInfo["srtp_salt"];

            let videoResp = {
                port: targetPort,
                ssrc: 1,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            response["video"] = videoResp;

            sessionInfo["video_port"] = targetPort;
            sessionInfo["video_srtp"] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo["video_ssrc"] = 1;
        }

        let audioInfo = request["audio"];
        if (audioInfo) {
            let targetPort = audioInfo["port"];
            let srtp_key = audioInfo["srtp_key"];
            let srtp_salt = audioInfo["srtp_salt"];

            let audioResp = {
                port: targetPort,
                ssrc: 1,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            response["audio"] = audioResp;

            sessionInfo["audio_port"] = targetPort;
            sessionInfo["audio_srtp"] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo["audio_ssrc"] = 1;
        }

        
        let currentAddress = ip.address();
        var addressResp = {
            address: currentAddress
        };

        if (ip.isV4Format(currentAddress)) {
            addressResp["type"] = "v4";
        } else {
            addressResp["type"] = "v6";
        }

        response["address"] = addressResp;
        this.pendingSessions[uuid.unparse(sessionID, 0)] = sessionInfo;

        callback(response);
    }

    handleStreamRequest(request) {
        this.FLogger.info("StreamRequest");
        var sessionID = request["sessionID"];
        var requestType = request["type"];
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

                    let videoInfo = request["video"];
                    if (videoInfo) {
                        width = videoInfo["width"];
                        height = videoInfo["height"];

                        let expectedFPS = videoInfo["fps"];
                        if (expectedFPS < fps) {
                            fps = expectedFPS;
                        }

                        bitrate = videoInfo["max_bit_rate"];
                    }

                    let targetAddress = sessionInfo["address"];
                    let targetVideoPort = sessionInfo["video_port"];
                    let videoKey = sessionInfo["video_srtp"];

                    
                    let ffmpegCommand = [
                        '-re',
                        '-f', 'dshow', 
                        '-i', 'video=Integrated Webcam', 
                        '-threads', '0', 
                        '-vcodec', codec, 
                        '-an', '-pix_fmt', 
                        'yuv420p', 
                        '-r', fps, 
                        '-f', 'rawvideo', 
                        '-tune', 'zerolatency', 
                        '-vf', 'scale=' + width + ':' + height, 
                        '-b:v', bitrate + 'k',
                        '-bufsize', bitrate + 'k',
                        '-payload_type', '99', 
                        '-ssrc', '1', 
                        '-f', 'rtp', 
                        '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80', 
                        '-srtp_out_params', videoKey.toString('base64'), 
                        'srtp://' + targetAddress + ':' + targetVideoPort + '?rtcpport=' + targetVideoPort + '&localrtcpport=' + targetVideoPort + '&pkt_size=1378']; 
                    this.FLogger.info("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    console.log("Stream run: ffmpeg " + ffmpegCommand.join(' '));
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