"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var HAP = require("hap-nodejs");
var StreamController_1 = require("hap-nodejs/lib/StreamController");
var ip = require("ip");
var hap_nodejs_1 = require("hap-nodejs");
var HAPService = HAP.Service;
var HAPCharacteristic = HAP.Characteristic;
var THomeKitIPCamera = (function () {
    function THomeKitIPCamera(camConfig, FLogger) {
        this.camConfig = camConfig;
        this.FLogger = FLogger;
        this.streamControllers = [];
        this.pendingSessions = {};
        this.ongoingSessions = {};
        this.init();
    }
    THomeKitIPCamera.prototype.init = function () {
        if (!this.camConfig.enabled) {
            return;
        }
        this.createCameraDevice();
        this.createCameraControlService();
        this.createStreamControllers();
        this.publishCamera();
    };
    THomeKitIPCamera.prototype.createOptionsDictionary = function () {
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
        var options = {
            proxy: false,
            srtp: true,
            video: {
                resolutions: videoResolutions,
                codec: {
                    profiles: [0, 1, 2],
                    levels: [0, 1, 2]
                }
            },
            audio: {
                codecs: [
                    {
                        type: "OPUS",
                        samplerate: 24
                    },
                    {
                        type: "AAC-eld",
                        samplerate: 16
                    }
                ]
            }
        };
        return options;
    };
    THomeKitIPCamera.prototype.createCameraDevice = function () {
        var _this = this;
        var deviceID = HAP.uuid.generate(this.camConfig.ident + ':' + this.camConfig.name);
        var hapDevice = new HAP.Accessory(this.camConfig.name, deviceID);
        hapDevice.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, this.camConfig.manufacturer || 'not configured')
            .setCharacteristic(HAPCharacteristic.Model, this.camConfig.model || 'not configured')
            .setCharacteristic(HAPCharacteristic.SerialNumber, this.camConfig.serial || 'not configured');
        hapDevice.on('identify', function (paired, callback) {
            _this.FLogger.debug('camera identify');
            callback();
        });
        hapDevice.cameraSource = this;
        this._camera = hapDevice;
    };
    THomeKitIPCamera.prototype.createCameraControlService = function () {
        var controlService = new HAP.Service.CameraControl();
        this._camera.services.push(controlService);
    };
    THomeKitIPCamera.prototype.createStreamControllers = function () {
        var options = this.createOptionsDictionary();
        var maxStreams = this.camConfig.numberOfStreams || 2;
        for (var i = 0; i < maxStreams; i++) {
            var streamController = new StreamController_1.StreamController(i, options, this);
            this._camera.services.push(streamController.service);
            this.streamControllers.push(streamController);
        }
    };
    THomeKitIPCamera.prototype.publishCamera = function () {
        this._camera.publish({
            username: this.camConfig.username,
            port: this.camConfig.port,
            pincode: this.camConfig.pincode,
            category: HAP.Accessory.Categories.CAMERA
        }, false);
    };
    THomeKitIPCamera.prototype.handleCloseConnection = function (connectionID) {
        var e_1, _a;
        try {
            for (var _b = __values(this.streamControllers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var controller = _c.value;
                controller.handleCloseConnection(connectionID);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    THomeKitIPCamera.prototype.handleSnapshotRequest = function (request, callback) {
        var params = {
            source: this.camConfig.source,
            width: request.width,
            height: request.height,
        };
        var ffmpegCommand = this.camConfig.ffmpegCommandLine.snapshot.map(function (s) { return s.replace(/\$\{(.*?)\}/g, function (_, word) {
            return params[word];
        }); });
        this.FLogger.debug("Snapshot run: ffmpeg " + ffmpegCommand.join(' '));
        var ffmpeg = child_process_1.spawn('ffmpeg', ffmpegCommand, { env: process.env });
        var imageBuffer = Buffer.alloc(0);
        ffmpeg.stdout.on('data', function (data) {
            imageBuffer = Buffer.concat([imageBuffer, data]);
        });
        ffmpeg.on('close', function (code) {
            callback(undefined, imageBuffer);
        });
    };
    THomeKitIPCamera.prototype.prepareStream = function (request, callback) {
        var sessionInfo = {};
        var sessionID = request["sessionID"];
        var targetAddress = request["targetAddress"];
        sessionInfo["address"] = targetAddress;
        var response = {};
        var videoInfo = request["video"];
        if (videoInfo) {
            var targetPort = videoInfo["port"];
            var srtp_key = videoInfo["srtp_key"];
            var srtp_salt = videoInfo["srtp_salt"];
            var videoResp = {
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
        var audioInfo = request["audio"];
        if (audioInfo) {
            var targetPort = audioInfo["port"];
            var srtp_key = audioInfo["srtp_key"];
            var srtp_salt = audioInfo["srtp_salt"];
            var audioResp = {
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
        var currentAddress = ip.address();
        var addressResp = {
            address: currentAddress
        };
        if (ip.isV4Format(currentAddress)) {
            addressResp["type"] = "v4";
        }
        else {
            addressResp["type"] = "v6";
        }
        response["address"] = addressResp;
        this.pendingSessions[hap_nodejs_1.uuid.unparse(sessionID, 0)] = sessionInfo;
        callback(response);
    };
    THomeKitIPCamera.prototype.handleStreamRequest = function (request) {
        var sessionID = request["sessionID"];
        var requestType = request["type"];
        if (sessionID) {
            var sessionIdentifier = hap_nodejs_1.uuid.unparse(sessionID, 0);
            if (requestType == "start") {
                var sessionInfo = this.pendingSessions[sessionIdentifier];
                if (sessionInfo) {
                    var width = 1280;
                    var height = 720;
                    var fps = 30;
                    var bitrate = 300;
                    var codec = this.camConfig.codec || 'libx264';
                    var videoInfo = request["video"];
                    if (videoInfo) {
                        width = videoInfo["width"];
                        height = videoInfo["height"];
                        var expectedFPS = videoInfo["fps"];
                        if (expectedFPS < fps) {
                            fps = expectedFPS;
                        }
                        bitrate = videoInfo["max_bit_rate"];
                    }
                    var targetAddress = sessionInfo["address"];
                    var targetVideoPort = sessionInfo["video_port"];
                    var videoKey = sessionInfo["video_srtp"];
                    var params_1 = {
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
                    var ffmpegCommand = this.camConfig.ffmpegCommandLine.stream.map(function (s) { return s.replace(/\$\{(.*?)\}/g, function (_, word) {
                        return params_1[word];
                    }); });
                    this.FLogger.debug("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    var ffmpeg = child_process_1.spawn('ffmpeg', ffmpegCommand, { env: process.env });
                    var devnull = require('dev-null');
                    ffmpeg.stdout.pipe(devnull());
                    ffmpeg.stderr.pipe(devnull());
                    this.ongoingSessions[sessionIdentifier] = ffmpeg;
                }
                delete this.pendingSessions[sessionIdentifier];
            }
            else if (requestType == "stop") {
                var ffmpegProcess = this.ongoingSessions[sessionIdentifier];
                if (ffmpegProcess) {
                    ffmpegProcess.kill('SIGKILL');
                }
                delete this.ongoingSessions[sessionIdentifier];
            }
        }
    };
    return THomeKitIPCamera;
}());
exports.THomeKitIPCamera = THomeKitIPCamera;
//# sourceMappingURL=yahka.homekit-ipcamera.js.map