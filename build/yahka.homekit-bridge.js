"use strict";
var HAP = require('./node_modules/hap-nodejs');
exports.HAPAccessory = HAP.Accessory;
exports.HAPService = HAP.Service;
exports.HAPCharacteristic = HAP.Characteristic;
var THomeKitBridge = (function () {
    function THomeKitBridge(config, FBridgeFactory) {
        this.config = config;
        this.FBridgeFactory = FBridgeFactory;
        this.init();
    }
    THomeKitBridge.prototype.init = function () {
        this.bridgeObject = this.setupBridge();
        if (this.config.devices)
            for (var _i = 0, _a = this.config.devices; _i < _a.length; _i++) {
                var device = _a[_i];
                var hapDevice = this.createDevice(device);
                this.bridgeObject.addBridgedAccessory(hapDevice);
            }
        this.bridgeObject.publish({
            username: this.config.username,
            port: this.config.port,
            pincode: this.config.pincode,
            category: 2
        });
    };
    THomeKitBridge.prototype.setupBridge = function () {
        var hapBridge = new HAP.Bridge(this.config.name, HAP.uuid.generate(this.config.ident));
        hapBridge.getService(exports.HAPService.AccessoryInformation)
            .setCharacteristic(exports.HAPCharacteristic.Manufacturer, this.config.manufacturer || "not configured")
            .setCharacteristic(exports.HAPCharacteristic.Model, this.config.model || "not configured")
            .setCharacteristic(exports.HAPCharacteristic.SerialNumber, this.config.serial || "not configured");
        hapBridge.on('identify', function (paired, callback) {
            console.log("Node Bridge identify:" + paired);
            callback();
        });
        return hapBridge;
    };
    THomeKitBridge.prototype.createDevice = function (device) {
        var deviceID = HAP.uuid.generate(this.config.ident + ':' + device.name);
        var hapDevice = new HAP.Accessory(device.name, deviceID);
        hapDevice.getService(exports.HAPService.AccessoryInformation)
            .setCharacteristic(exports.HAPCharacteristic.Manufacturer, device.manufacturer)
            .setCharacteristic(exports.HAPCharacteristic.Model, device.model)
            .setCharacteristic(exports.HAPCharacteristic.SerialNumber, device.serial);
        hapDevice.on('identify', function (paired, callback) {
            console.log('device identify');
            callback();
        });
        for (var _i = 0, _a = device.services; _i < _a.length; _i++) {
            var serviceConfig = _a[_i];
            this.initService(hapDevice, serviceConfig);
        }
        return hapDevice;
    };
    THomeKitBridge.prototype.initService = function (hapDevice, serviceConfig) {
        if (!(serviceConfig.type in HAP.Service))
            throw Error("unknown service type:" + serviceConfig.type);
        var isNew = false;
        var hapService = hapDevice.getService(HAP.Service[serviceConfig.type]);
        if (hapService !== undefined) {
            if (hapService.subType !== serviceConfig.subType)
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
        if (isNew)
            hapDevice.addService(hapService);
    };
    THomeKitBridge.prototype.initCharacteristic = function (hapService, characteristicConfig) {
        var hapCharacteristic = hapService.getCharacteristic(exports.HAPCharacteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            console.log("unknown characteristic: " + characteristicConfig.name);
            return;
        }
        if (!characteristicConfig.enabled)
            return;
        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, function (plainIOValue) {
            console.log('[' + characteristicConfig.name + '] got a change notify event, ioValue: ' + JSON.stringify(plainIOValue));
            var binding = hapCharacteristic.binding;
            if (!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                return;
            }
            var hkValue = binding.conversion.toHomeKit(plainIOValue);
            console.log('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(plainIOValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });
        hapCharacteristic.on('set', function (hkValue, callback, context) {
            console.log('[' + characteristicConfig.name + '] got a set event, hkValue: ' + JSON.stringify(hkValue));
            var binding = hapCharacteristic.binding;
            if (!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                callback();
                return;
            }
            if (context === binding) {
                console.log('[' + characteristicConfig.name + '] set was initiated from ioBroker - exiting here');
                callback();
                return;
            }
            var ioValue = binding.conversion.toIOBroker(hkValue);
            binding.inOut.toIOBroker(ioValue, function () {
                console.log('[' + characteristicConfig.name + '] set was accepted by ioBroker (value: ' + JSON.stringify(ioValue) + ')');
                callback();
            });
        });
        hapCharacteristic.on('get', function (hkCallback) {
            console.log('[' + characteristicConfig.name + '] got a get event');
            var binding = hapCharacteristic.binding;
            if (!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                hkCallback('no binding', null);
                return;
            }
            binding.inOut.fromIOBroker(function (ioBrokerError, ioValue) {
                var hkValue = binding.conversion.toHomeKit(ioValue);
                console.log('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(ioValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
                hkCallback(ioBrokerError, hkValue);
            });
        });
    };
    return THomeKitBridge;
}());
exports.THomeKitBridge = THomeKitBridge;
var hapInited = false;
function initHAP(storagePath) {
    if (hapInited)
        return;
    HAP.init(storagePath);
    hapInited = true;
}
exports.initHAP = initHAP;
//# sourceMappingURL=yahka.homekit-bridge.js.map