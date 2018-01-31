/// <reference path="./typings/index.d.ts" />
import { spawn } from 'child_process';
import { ILogger } from './yahka.homekit-bridge';
// import util = require('util');
import HAP = require('hap-nodejs');
import { StreamController } from 'hap-nodejs/lib/StreamController';
import ip = require('ip');
//import { uuid } from 'hap-nodejs';
import { Configuration } from './yahka.configuration';

const uuid = HAP.uuid;
let HAPService = HAP.Service;
let HAPCharacteristic = HAP.Characteristic;


export class THomeKitIPCamera {
    private _camera: HAPNodeJS.Accessory; // BF: where will be HAPNodeJS imported?
    private streamControllers: Array<StreamController> = [];
    private pendingSessions = {};
    private ongoingSessions = {};


    constructor(private camConfig: Configuration.ICameraConfig, private FLogger: ILogger) {
        this.init();
    }

    init() {
        if (!this.camConfig.enabled) {
            return
        }
        this.createCameraDevice();
        this.createCameraControlService();
        this.createStreamControllers();
        this.publishCamera();
    }

    private createOptionsDictionary() {
        let videoResolutions = [];

        let maxFPS = (this.camConfig.maxFPS > 30) ? 30 : this.camConfig.maxFPS;

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

        // options
        return {
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
                        type: 'OPUS', // Audio Codec
                        samplerate: 24 // 8, 16, 24 KHz
                    },
                    {
                        type: 'AAC-eld',
                        samplerate: 16
                    }
                ]
            }
        };
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
        hapDevice.cameraSource = this;

        this._camera = hapDevice;

    }

    private createCameraControlService() {
        let controlService = new HAP.Service.CameraControl();
        this._camera.services.push(controlService);
    }

    private createStreamControllers() {
        let options = this.createOptionsDictionary();
        let maxStreams = this.camConfig.numberOfStreams || 2;

        for (let i = 0; i < maxStreams; i++) {
            let streamController = new StreamController(i, options, this);
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
        let params = {
            source: this.camConfig.source,
            width: request.width,
            height: request.height,
        };
        let ffmpegCommand = this.camConfig.ffmpegCommandLine.snapshot.map((s) => s.replace(/\${(.*?)}/g, (_, word) => {
            return params[word];
        }));

        this.FLogger.debug('Snapshot run: ffmpeg ' + ffmpegCommand.join(' '));
        let ffmpeg = spawn('ffmpeg', ffmpegCommand, { env: process.env });

        let imageBuffer = Buffer.alloc(0);

        ffmpeg.stdout.on('data', function (data) {
            imageBuffer = Buffer.concat([imageBuffer, (<Buffer>data)]);
        });
        ffmpeg.on('close', function (code) {
            callback(undefined, imageBuffer);
        });
    }

    prepareStream(request, callback) {
        let sessionInfo = {};

        let sessionID = request['sessionID'];

        sessionInfo['address'] = request['targetAddress'];

        let response = {};

        let videoInfo = request['video'];
        if (videoInfo) {
            let targetPort = videoInfo['port'];
            let srtp_key = videoInfo['srtp_key'];
            let srtp_salt = videoInfo['srtp_salt'];

            response['video'] = {
                port: targetPort,
                ssrc: 1,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            sessionInfo['video_port'] = targetPort;
            sessionInfo['video_srtp'] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo['video_ssrc'] = 1;
        }

        let audioInfo = request['audio'];
        if (audioInfo) {
            let targetPort = audioInfo['port'];
            let srtp_key = audioInfo['srtp_key'];
            let srtp_salt = audioInfo['srtp_salt'];

            response['audio'] = {
                port: targetPort,
                ssrc: 1,
                srtp_key: srtp_key,
                srtp_salt: srtp_salt
            };

            sessionInfo['audio_port'] = targetPort;
            sessionInfo['audio_srtp'] = Buffer.concat([srtp_key, srtp_salt]);
            sessionInfo['audio_ssrc'] = 1;
        }

        
        let currentAddress = ip.address();
        let addressResp = {
            address: currentAddress
        };

        if (ip.isV4Format(currentAddress)) {
            addressResp['type'] = 'v4';
        } else {
            addressResp['type'] = 'v6';
        }

        response['address'] = addressResp;
        this.pendingSessions[uuid.unparse(sessionID, 0)] = sessionInfo;

        callback(response);
    }

    handleStreamRequest(request) {
        let sessionID = request['sessionID'];
        let requestType = request['type'];
        if (sessionID) {
            let sessionIdentifier = uuid.unparse(sessionID, 0);

            if (requestType == 'start') {
                let sessionInfo = this.pendingSessions[sessionIdentifier];
                if (sessionInfo) {
                    let width = 1280;
                    let height = 720;
                    let fps = 30;
                    let bitrate = 300;
                    let codec = this.camConfig.codec || 'libx264';

                    let videoInfo = request['video'];
                    if (videoInfo) {
                        width = videoInfo['width'];
                        height = videoInfo['height'];

                        let expectedFPS = videoInfo['fps'];
                        if (expectedFPS < fps) {
                            fps = expectedFPS;
                        }

                        bitrate = videoInfo['max_bit_rate'];
                    }

                    let targetAddress = sessionInfo['address'];
                    let targetVideoPort = sessionInfo['video_port'];
                    let videoKey = sessionInfo['video_srtp'];


                    let params = {
                        source: this.camConfig.source,
                        codec: codec,
                        fps: fps,
                        width: width,
                        height: height,
                        bitrate: bitrate,
                        videokey: videoKey.toString('base64'),
                        targetAddress: targetAddress,
                        targetVideoPort: targetVideoPort
                    };
                    let ffmpegCommand = this.camConfig.ffmpegCommandLine.stream.map((s) => s.replace(/\${(.*?)}/g, (_, word) => {
                        return params[word];
                    }));

                    this.FLogger.debug('Stream run: ffmpeg ' + ffmpegCommand.join(' '));
                    let ffmpeg = spawn('ffmpeg', ffmpegCommand, { env: process.env });
                    let devnull = require('dev-null');
                    ffmpeg.stdout.pipe(devnull());
                    ffmpeg.stderr.pipe(devnull());
                    this.ongoingSessions[sessionIdentifier] = ffmpeg;
                }

                delete this.pendingSessions[sessionIdentifier];
            } else if (requestType == 'stop') {
                let ffmpegProcess = this.ongoingSessions[sessionIdentifier];
                if (ffmpegProcess) {
                    ffmpegProcess.kill('SIGKILL');
                }

                delete this.ongoingSessions[sessionIdentifier];
            }
        }
    }
}