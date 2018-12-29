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
var yahka_homekit_ipcamera_1 = require("./yahka.homekit-ipcamera");
var hkBridge = require("./yahka.homekit-bridge");
var yahka_function_factory_1 = require("./yahka.function-factory");
function isCustomCharacteristicConfig(config) {
    if (!config)
        return false;
    var myConfig = config;
    return (myConfig.inOutFunction !== undefined) || (myConfig.conversionFunction !== undefined) || (myConfig.inOutParameters !== undefined);
}
var TIOBrokerAdapter = (function () {
    function TIOBrokerAdapter(adapter, controllerPath) {
        this.adapter = adapter;
        this.controllerPath = controllerPath;
        this.stateToEventMap = new Map();
        this.objectToEventMap = new Map();
        this.devices = [];
        this.verboseHAPLogging = false;
        adapter.on('ready', this.adapterReady.bind(this));
        adapter.on('stateChange', this.handleState.bind(this));
        adapter.on('message', this.handleMessage.bind(this));
        adapter.on('unload', this.handleUnload.bind(this));
    }
    TIOBrokerAdapter.prototype.adapterReady = function () {
        hkBridge.initHAP(this.controllerPath + '/' + this.adapter.systemConfig.dataDir + this.adapter.name + '.' + this.adapter.instance + '.hapdata', this.handleHAPLogEvent.bind(this));
        this.adapter.log.info('adapter ready, checking config');
        var config = this.adapter.config;
        this.createHomeKitBridges(config);
        this.createCameraDevices(config);
    };
    TIOBrokerAdapter.prototype.createHomeKitBridges = function (config) {
        var bridgeConfig = config.bridge;
        if (!config.firstTimeInitialized) {
            this.adapter.log.info('first time initialization');
            this.adapter.log.debug('system config:' + JSON.stringify(this.adapter.systemConfig));
            bridgeConfig.ident = "Yahka-" + this.adapter.instance;
            bridgeConfig.name = bridgeConfig.ident;
            bridgeConfig.serial = bridgeConfig.ident;
            var usr = [];
            for (var i = 0; i < 6; i++)
                usr[i] = ('00' + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
            bridgeConfig.username = usr.join(':');
            bridgeConfig.pincode = '123-45-678';
            bridgeConfig.port = 0;
            bridgeConfig.verboseLogging = false;
            config.firstTimeInitialized = true;
            this.adapter.extendForeignObject('system.adapter.' + this.adapter.name + '.' + this.adapter.instance, { native: config }, undefined);
        }
        this.verboseHAPLogging = bridgeConfig.verboseLogging == true;
        this.adapter.log.debug('creating bridge');
        this.devices.push(new hkBridge.THomeKitBridge(config.bridge, this, this.adapter.log));
    };
    TIOBrokerAdapter.prototype.createCameraDevices = function (config) {
        var e_1, _a;
        var cameraArray = config.cameras;
        if (cameraArray === undefined)
            return;
        try {
            for (var cameraArray_1 = __values(cameraArray), cameraArray_1_1 = cameraArray_1.next(); !cameraArray_1_1.done; cameraArray_1_1 = cameraArray_1.next()) {
                var cameraConfig = cameraArray_1_1.value;
                this.adapter.log.debug('creating camera');
                this.devices.push(new yahka_homekit_ipcamera_1.THomeKitIPCamera(cameraConfig, this.adapter.log));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cameraArray_1_1 && !cameraArray_1_1.done && (_a = cameraArray_1.return)) _a.call(cameraArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TIOBrokerAdapter.prototype.handleHAPLogEvent = function (message) {
        if (this.verboseHAPLogging)
            this.adapter.log.debug(message);
    };
    TIOBrokerAdapter.prototype.handleState = function (id, state) {
        var e_2, _a;
        var notifyArray = this.stateToEventMap.get(id);
        if (!notifyArray) {
            return;
        }
        this.adapter.log.debug('got a stateChange for [' + id + ']');
        try {
            for (var notifyArray_1 = __values(notifyArray), notifyArray_1_1 = notifyArray_1.next(); !notifyArray_1_1.done; notifyArray_1_1 = notifyArray_1.next()) {
                var method = notifyArray_1_1.value;
                method(state);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (notifyArray_1_1 && !notifyArray_1_1.done && (_a = notifyArray_1.return)) _a.call(notifyArray_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    TIOBrokerAdapter.prototype.handleMessage = function (obj) {
        if (typeof obj === 'object' && obj.message) {
            if (obj.command === 'send') {
                if (obj.callback)
                    this.adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
            }
        }
    };
    TIOBrokerAdapter.prototype.handleUnload = function (callback) {
        try {
            this.adapter.log.info('cleaning up ...');
            hkBridge.deinitHAP();
            this.adapter.log.info('cleaned up ...');
            callback();
        }
        catch (e) {
            callback();
        }
    };
    TIOBrokerAdapter.prototype.handleInOutSubscriptionRequest = function (inOutFunction, changeNotify) {
        var e_3, _a;
        if (inOutFunction.subscriptionRequests.length == 0)
            return;
        var _loop_1 = function (subscriptionRequest) {
            var changeInterceptor = function (ioValue) { return subscriptionRequest.subscriptionEvent(ioValue, changeNotify); };
            if (subscriptionRequest.subscriptionType === 'state') {
                var existingArray = this_1.stateToEventMap.get(subscriptionRequest.subscriptionIdentifier);
                if (!existingArray) {
                    existingArray = [changeInterceptor];
                    this_1.stateToEventMap.set(subscriptionRequest.subscriptionIdentifier, existingArray);
                }
                else
                    existingArray.push(changeInterceptor);
                this_1.adapter.subscribeForeignStates(subscriptionRequest.subscriptionIdentifier);
                this_1.adapter.log.debug('added subscription for: [' + subscriptionRequest.subscriptionType + ']' + subscriptionRequest.subscriptionIdentifier);
            }
            else {
                this_1.adapter.log.warn('unknown subscription type: ' + subscriptionRequest.subscriptionType);
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(inOutFunction.subscriptionRequests), _c = _b.next(); !_c.done; _c = _b.next()) {
                var subscriptionRequest = _c.value;
                _loop_1(subscriptionRequest);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    TIOBrokerAdapter.prototype.CreateBinding = function (characteristicConfig, changeNotify) {
        if (isCustomCharacteristicConfig(characteristicConfig)) {
            var inoutFunc = yahka_function_factory_1.functionFactory.createInOutFunction(this.adapter, characteristicConfig.inOutFunction, characteristicConfig.inOutParameters);
            if (inoutFunc === undefined) {
                this.adapter.log.error('[' + characteristicConfig.name + '] could not create inout-function: ' + characteristicConfig.inOutFunction + ' with params: ' + JSON.stringify(characteristicConfig.inOutParameters));
                return undefined;
            }
            var convFunc = yahka_function_factory_1.functionFactory.createConversionFunction(this.adapter, characteristicConfig.conversionFunction, characteristicConfig.conversionParameters);
            if (convFunc === undefined) {
                this.adapter.log.error('[' + characteristicConfig.name + '] could not create conversion-function: ' + characteristicConfig.conversionFunction + ' with params: ' + JSON.stringify(characteristicConfig.conversionParameters));
                return undefined;
            }
            this.handleInOutSubscriptionRequest(inoutFunc, changeNotify);
            return {
                conversion: convFunc,
                inOut: inoutFunc
            };
        }
        return null;
    };
    return TIOBrokerAdapter;
}());
exports.TIOBrokerAdapter = TIOBrokerAdapter;
//# sourceMappingURL=yahka.ioBroker-adapter.js.map