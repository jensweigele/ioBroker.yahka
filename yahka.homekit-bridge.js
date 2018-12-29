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
var debug = require("debug");
debug.enable('EventedHTTPServer,HAPServer,Accessory,AccessoryLoader');
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
        var e_1, _a;
        this.bridgeObject = this.setupBridge();
        if (this.config.devices)
            try {
                for (var _b = __values(this.config.devices), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var device = _c.value;
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
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
        var e_2, _a;
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
        try {
            for (var _b = __values(device.services), _c = _b.next(); !_c.done; _c = _b.next()) {
                var serviceConfig = _c.value;
                this.initService(hapDevice, serviceConfig);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return hapDevice;
    };
    THomeKitBridge.prototype.initService = function (hapDevice, serviceConfig) {
        var e_3, _a;
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
        try {
            for (var _b = __values(serviceConfig.characteristics), _c = _b.next(); !_c.done; _c = _b.next()) {
                var charactConfig = _c.value;
                this.initCharacteristic(hapService, charactConfig);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
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
function deinitHAP() {
    if (!hapInited) {
        return;
    }
    debug.disable();
    debug.log = function () {
    };
    hapInited = false;
}
exports.deinitHAP = deinitHAP;
//# sourceMappingURL=yahka.homekit-bridge.js.map