"use strict";
var hkBridge = require('./yahka.homekit-bridge');
var yahka_function_factory_1 = require('./yahka.function-factory');
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
        this.bridge = undefined;
        adapter.on('ready', this.adapterReady.bind(this));
        adapter.on('objectChange', this.handleObjectChange.bind(this));
        adapter.on('stateChange', this.handleState.bind(this));
        adapter.on('message', this.handleMessage.bind(this));
        adapter.on('unload', this.handleUnload.bind(this));
    }
    TIOBrokerAdapter.prototype.adapterReady = function () {
        hkBridge.initHAP(this.controllerPath + '/' + this.adapter.systemConfig.dataDir + this.adapter.name + '.' + this.adapter.instance + '.hapdata');
        this.adapter.log.info('adapter ready, checking config');
        var saveAdapterConfig = false;
        var config = this.adapter.config;
        var bridgeConfig = config.bridge;
        if (!config.firstTimeInitialized) {
            this.adapter.log.info('first time initialization');
            bridgeConfig.ident = this.adapter.systemConfig.system.hostname + ':' + this.adapter.name + '.' + this.adapter.instance;
            bridgeConfig.name = bridgeConfig.ident;
            bridgeConfig.serial = bridgeConfig.ident;
            var usr = [];
            for (var i = 0; i < 6; i++)
                usr[i] = ("00" + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
            bridgeConfig.username = usr.join(':');
            bridgeConfig.pincode = '123-45-678';
            bridgeConfig.port = 0;
            config.firstTimeInitialized = true;
            this.adapter.extendForeignObject('system.adapter.' + this.adapter.name + '.' + this.adapter.instance, { native: config }, undefined);
        }
        this.adapter.log.info('creating bridge');
        this.bridge = new hkBridge.THomeKitBridge(config.bridge, this);
    };
    TIOBrokerAdapter.prototype.handleObjectChange = function (id, obj) {
        this.adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
    };
    TIOBrokerAdapter.prototype.handleState = function (id, state) {
        this.adapter.log.debug('got a stateChange for [' + id + ']');
        var notifyArray = this.stateToEventMap.get(id);
        if (!notifyArray) {
            this.adapter.log.debug('nobody subscribed for this state');
            return;
        }
        for (var _i = 0, notifyArray_1 = notifyArray; _i < notifyArray_1.length; _i++) {
            var method = notifyArray_1[_i];
            method(state);
        }
    };
    TIOBrokerAdapter.prototype.handleMessage = function (obj) {
        if (typeof obj == 'object' && obj.message) {
            if (obj.command == 'send') {
                console.log('send command');
                if (obj.callback)
                    this.adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
            }
        }
    };
    TIOBrokerAdapter.prototype.handleUnload = function (callback) {
        try {
            this.adapter.log.info('cleaned everything up...');
            callback();
        }
        catch (e) {
            callback();
        }
    };
    TIOBrokerAdapter.prototype.handleInOutSubscriptionRequest = function (inOutFunction, changeNotify) {
        if (inOutFunction.subscriptionRequests.length == 0)
            return;
        var _loop_1 = function(subscriptionRequest) {
            var changeInterceptor = function (ioValue) { return subscriptionRequest.subscriptionEvent(ioValue, changeNotify); };
            if (subscriptionRequest.subscriptionType == 'state') {
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
        for (var _i = 0, _a = inOutFunction.subscriptionRequests; _i < _a.length; _i++) {
            var subscriptionRequest = _a[_i];
            _loop_1(subscriptionRequest);
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