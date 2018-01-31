"use strict";
exports.__esModule = true;
var debug = require("debug");
debug.enable('*');
var util = require("util");
var HAP = require("hap-nodejs");
exports.HAPService = HAP.Service;
exports.HAPCharacteristic = HAP.Characteristic;
var THomeKitBridge = (function () {
    function THomeKitBridge(config, FBridgeFactory, FLogger) {
        this.config = config;
        this.FBridgeFactory = FBridgeFactory;
        this.FLogger = FLogger;
        this.init();
    }
    THomeKitBridge.prototype.init = function () {
        this.bridgeObject = this.setupBridge();
        if (this.config.devices)
            for (var _i = 0, _a = this.config.devices; _i < _a.length; _i++) {
                var device = _a[_i];
                if (device.enabled === false) {
                    continue;
                }
                var hapDevice = this.createDevice(device);
                try {
                    this.bridgeObject.addBridgedAccessory(hapDevice);
                }
                catch (e) {
                    this.FLogger.warn(e);
                    this.FLogger.warn('Error by adding: ' + JSON.stringify(device));
                }
            }
        this.bridgeObject.publish({
            username: this.config.username,
            port: this.config.port,
            pincode: this.config.pincode,
            category: 2
        });
    };
    THomeKitBridge.prototype.setupBridge = function () {
        var _this = this;
        var hapBridge = new HAP.Bridge(this.config.name, HAP.uuid.generate(this.config.ident));
        hapBridge.getService(exports.HAPService.AccessoryInformation)
            .setCharacteristic(exports.HAPCharacteristic.Manufacturer, this.config.manufacturer || "not configured")
            .setCharacteristic(exports.HAPCharacteristic.Model, this.config.model || "not configured")
            .setCharacteristic(exports.HAPCharacteristic.SerialNumber, this.config.serial || "not configured");
        hapBridge.on('identify', function (paired, callback) {
            _this.FLogger.debug('Node Bridge identify:' + paired);
            callback();
        });
        return hapBridge;
    };
    THomeKitBridge.prototype.createDevice = function (device) {
        var _this = this;
        var devName = device.name;
        var deviceID = HAP.uuid.generate(this.config.ident + ':' + devName);
        var i = 0;
        while (this.bridgeObject.bridgedAccessories.some(function (a) { return a.UUID == deviceID; })) {
            devName = device.name + '_' + ++i;
            deviceID = HAP.uuid.generate(this.config.ident + ':' + devName);
        }
        this.FLogger.info('adding ' + devName + ' with UUID: ' + deviceID);
        var hapDevice = new HAP.Accessory(devName, deviceID);
        hapDevice.getService(exports.HAPService.AccessoryInformation)
            .setCharacteristic(exports.HAPCharacteristic.Manufacturer, device.manufacturer || 'not configured')
            .setCharacteristic(exports.HAPCharacteristic.Model, device.model || 'not configured')
            .setCharacteristic(exports.HAPCharacteristic.SerialNumber, device.serial || 'not configured');
        hapDevice.on('identify', function (paired, callback) {
            _this.FLogger.debug('device identify');
            callback();
        });
        for (var _i = 0, _a = device.services; _i < _a.length; _i++) {
            var serviceConfig = _a[_i];
            this.initService(hapDevice, serviceConfig);
        }
        return hapDevice;
    };
    THomeKitBridge.prototype.initService = function (hapDevice, serviceConfig) {
        if (!(serviceConfig.type in HAP.Service)) {
            throw Error('unknown service type: ' + serviceConfig.type);
        }
        var isNew = false;
        var hapService = hapDevice.getService(HAP.Service[serviceConfig.type]);
        if (hapService !== undefined && hapService.subtype !== serviceConfig.subType) {
            hapService = undefined;
        }
        if (hapService === undefined) {
            hapService = new HAP.Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
            isNew = true;
        }
        for (var _i = 0, _a = serviceConfig.characteristics; _i < _a.length; _i++) {
            var charactConfig = _a[_i];
            this.initCharacteristic(hapService, charactConfig);
        }
        var curTempCharacetristic = hapService.getCharacteristic('Current Temperature');
        if (curTempCharacetristic !== undefined) {
            curTempCharacetristic.props.minValue = -99;
        }
        if (isNew) {
            hapDevice.addService(hapService);
        }
    };
    THomeKitBridge.prototype.initCharacteristic = function (hapService, characteristicConfig) {
        var _this = this;
        var hapCharacteristic = hapService.getCharacteristic(exports.HAPCharacteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            this.FLogger.warn("unknown characteristic: " + characteristicConfig.name);
            return;
        }
        if (!characteristicConfig.enabled)
            return;
        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, function (plainIOValue) {
            _this.FLogger.debug('[' + characteristicConfig.name + '] got a change notify event, ioValue: ' + JSON.stringify(plainIOValue));
            var binding = hapCharacteristic.binding;
            if (!binding) {
                _this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                return;
            }
            var hkValue = binding.conversion.toHomeKit(plainIOValue);
            _this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(plainIOValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });
        hapCharacteristic.on('set', function (hkValue, callback, context) {
            _this.FLogger.debug('[' + characteristicConfig.name + '] got a set event, hkValue: ' + JSON.stringify(hkValue));
            var binding = hapCharacteristic.binding;
            if (!binding) {
                _this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                callback();
                return;
            }
            if (context === binding) {
                _this.FLogger.debug('[' + characteristicConfig.name + '] set was initiated from ioBroker - exiting here');
                callback();
                return;
            }
            var ioValue = binding.conversion.toIOBroker(hkValue);
            binding.inOut.toIOBroker(ioValue, function () {
                _this.FLogger.debug('[' + characteristicConfig.name + '] set was accepted by ioBroker (value: ' + JSON.stringify(ioValue) + ')');
                callback();
            });
        });
        hapCharacteristic.on('get', function (hkCallback) {
            _this.FLogger.debug('[' + characteristicConfig.name + '] got a get event');
            var binding = hapCharacteristic.binding;
            if (!binding) {
                _this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                hkCallback('no binding', null);
                return;
            }
            binding.inOut.fromIOBroker(function (ioBrokerError, ioValue) {
                var hkValue = binding.conversion.toHomeKit(ioValue);
                _this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(ioValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
                hkCallback(ioBrokerError, hkValue);
            });
        });
    };
    return THomeKitBridge;
}());
exports.THomeKitBridge = THomeKitBridge;
var hapInited = false;
function initHAP(storagePath, HAPdebugLogMethod) {
    if (hapInited) {
        return;
    }
    HAP.init(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };
}
exports.initHAP = initHAP;
//# sourceMappingURL=yahka.homekit-bridge.js.map