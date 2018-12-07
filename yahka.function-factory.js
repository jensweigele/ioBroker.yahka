"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var yahka_homekit_bridge_1 = require("./yahka.homekit-bridge");
var TIoBrokerInOutFunction_State = (function () {
    function TIoBrokerInOutFunction_State(adapter, stateName, deferredTime) {
        if (deferredTime === void 0) { deferredTime = 0; }
        this.adapter = adapter;
        this.stateName = stateName;
        this.deferredTime = deferredTime;
        this.debounceTimer = -1;
        this.subscriptionRequests = [];
        this.addSubscriptionRequest(stateName);
    }
    TIoBrokerInOutFunction_State.prototype.addSubscriptionRequest = function (stateName) {
        var subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    };
    TIoBrokerInOutFunction_State.prototype.getValueOnRead = function (ioState) {
        if (ioState)
            return ioState.val;
        else
            return null;
    };
    TIoBrokerInOutFunction_State.prototype.getValueOnNotify = function (ioState) {
        if (ioState)
            return ioState.val;
        else
            return null;
    };
    TIoBrokerInOutFunction_State.prototype.toIOBroker = function (plainIoValue, callback) {
        var _this = this;
        this.adapter.log.debug('writing state to ioBroker [' + this.stateName + ']: ' + JSON.stringify(plainIoValue));
        this.adapter.getForeignState(this.stateName, function (error, ioState) {
            var value = _this.getValueOnRead(ioState);
            var valueChanged = value !== plainIoValue;
            _this.adapter.log.debug('checking value change: ' + JSON.stringify(value) + ' != ' + JSON.stringify(plainIoValue) + ' = ' + valueChanged);
            if (valueChanged) {
                _this.adapter.setForeignState(_this.stateName, plainIoValue, false, function (error) {
                    if (error)
                        _this.adapter.log.error('setForeignState error [' + _this.stateName + '] to [' + JSON.stringify(plainIoValue) + ']: ' + error);
                    callback();
                });
            }
            else {
                callback();
            }
        });
    };
    TIoBrokerInOutFunction_State.prototype.fromIOBroker = function (callback) {
        var _this = this;
        this.adapter.log.debug('reading state from ioBroker [' + this.stateName + ']');
        this.adapter.getForeignState(this.stateName, function (error, ioState) {
            _this.adapter.log.debug('read state from ioBroker [' + _this.stateName + ']: ' + JSON.stringify(ioState));
            if (error)
                _this.adapter.log.error('... with error: ' + error);
            var value = _this.getValueOnRead(ioState);
            callback(error, value);
        });
    };
    TIoBrokerInOutFunction_State.prototype.subscriptionEvent = function (stateName, ioState, callback) {
        this.adapter.log.debug('change event from ioBroker via [' + this.stateName + ']' + JSON.stringify(ioState));
        var newValue = this.getValueOnNotify(ioState);
        if (newValue !== undefined)
            this.executeCallback(callback, newValue);
        else
            this.adapter.log.debug('state was filtered - notification is canceled');
    };
    TIoBrokerInOutFunction_State.prototype.executeCallback = function (callback, plainIOValue) {
        if (this.deferredTime > 0)
            this.setupDeferredChangeEvent(callback, plainIOValue);
        else
            callback(plainIOValue);
    };
    TIoBrokerInOutFunction_State.prototype.setupDeferredChangeEvent = function (callback, plainIOValue) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), 150);
    };
    TIoBrokerInOutFunction_State.prototype.cancelDeferredChangeEvent = function () {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = -1;
    };
    TIoBrokerInOutFunction_State.prototype.deferredChangeEvent = function (callback, plainIOValue) {
        this.adapter.log.debug('[' + this.stateName + '] firing deferred change event:' + JSON.stringify(plainIOValue));
        callback(plainIOValue);
    };
    return TIoBrokerInOutFunction_State;
}());
var TIoBrokerInOutFunction_State_OnlyACK = (function (_super) {
    __extends(TIoBrokerInOutFunction_State_OnlyACK, _super);
    function TIoBrokerInOutFunction_State_OnlyACK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TIoBrokerInOutFunction_State_OnlyACK.prototype.getValueOnRead = function (ioState) {
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                return ioState.val;
            }
            else {
                this.adapter.log.debug("faking CurrentState.Read for [" + this.stateName + ']: ' + JSON.stringify(this.lastAcknowledgedValue));
                return this.lastAcknowledgedValue;
            }
        else
            return null;
    };
    TIoBrokerInOutFunction_State_OnlyACK.prototype.getValueOnNotify = function (ioState) {
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                return ioState.val;
            }
            else {
                this.adapter.log.debug("discarding CurrentState.Notify for [" + this.stateName + ']');
                return undefined;
            }
        else
            return null;
    };
    return TIoBrokerInOutFunction_State_OnlyACK;
}(TIoBrokerInOutFunction_State));
var TIoBrokerInOutFunction_State_OnlyNotACK = (function (_super) {
    __extends(TIoBrokerInOutFunction_State_OnlyNotACK, _super);
    function TIoBrokerInOutFunction_State_OnlyNotACK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TIoBrokerInOutFunction_State_OnlyNotACK.prototype.getValueOnRead = function (ioState) {
        if (ioState)
            if (ioState.ack) {
                this.adapter.log.debug("faking CurrentState.Read for [" + this.stateName + ']: ' + JSON.stringify(this.lastNotAcknowledgedValue));
                return this.lastNotAcknowledgedValue;
            }
            else {
                this.lastNotAcknowledgedValue = ioState.val;
                return ioState.val;
            }
        else
            return null;
    };
    TIoBrokerInOutFunction_State_OnlyNotACK.prototype.getValueOnNotify = function (ioState) {
        if (ioState)
            if (!ioState.ack) {
                this.adapter.log.debug("discarding CurrentState.Notify for [" + this.stateName + ']');
                return undefined;
            }
            else {
                this.lastNotAcknowledgedValue = ioState.val;
                return ioState.val;
            }
        else
            return null;
    };
    return TIoBrokerInOutFunction_State_OnlyNotACK;
}(TIoBrokerInOutFunction_State));
var TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition = (function (_super) {
    __extends(TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition, _super);
    function TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition(adapter, stateName, workingItem) {
        var _this = _super.call(this, adapter, stateName, 0) || this;
        _this.adapter = adapter;
        _this.stateName = stateName;
        _this.workingItem = workingItem;
        _this.lastWorkingState = false;
        _this.lastAcknowledgedValue = undefined;
        _this.debounceTimer = -1;
        _this.addSubscriptionRequest(workingItem);
        adapter.getForeignState(workingItem, function (error, ioState) {
            if (ioState)
                _this.lastWorkingState = ioState.val;
            else
                _this.lastWorkingState = undefined;
        });
        return _this;
    }
    TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.prototype.subscriptionEvent = function (stateName, ioState, callback) {
        if (!ioState)
            return;
        if (stateName == this.workingItem) {
            this.adapter.log.debug('[' + this.stateName + '] got a working item change event: ' + JSON.stringify(ioState));
            this.lastWorkingState = ioState.val;
            this.setupDeferredChangeEvent(callback);
        }
        else if (stateName == this.stateName) {
            this.adapter.log.debug('[' + this.stateName + '] got a target state change event:' + JSON.stringify(ioState));
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                this.setupDeferredChangeEvent(callback);
            }
        }
    };
    TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.prototype.setupDeferredChangeEvent = function (callback) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback), 150);
    };
    TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.prototype.cancelDeferredChangeEvent = function () {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = -1;
    };
    TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.prototype.deferredChangeEvent = function (callback) {
        if (!this.lastWorkingState) {
            this.adapter.log.debug('[' + this.stateName + '] firing target state change event:' + JSON.stringify(this.lastAcknowledgedValue));
            callback(this.lastAcknowledgedValue);
        }
        else {
            this.adapter.log.debug('[' + this.stateName + '] canceling target state change event - covering is working');
        }
    };
    return TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition;
}(TIoBrokerInOutFunction_State));
var inOutFactory = {
    "ioBroker.State": function (adapter, parameters) {
        if (typeof parameters !== "string")
            return undefined;
        var stateName = parameters;
        return new TIoBrokerInOutFunction_State(adapter, stateName);
    },
    "ioBroker.State.Defered": function (adapter, parameters) {
        if (typeof parameters !== "string")
            return undefined;
        var stateName = parameters;
        return new TIoBrokerInOutFunction_State(adapter, stateName, 250);
    },
    "ioBroker.State.OnlyACK": function (adapter, parameters) {
        if (typeof parameters !== "string")
            return undefined;
        var stateName = parameters;
        return new TIoBrokerInOutFunction_State_OnlyACK(adapter, stateName);
    },
    "ioBroker.homematic.WindowCovering.TargetPosition": function (adapter, parameters) {
        var p;
        if (typeof parameters === 'string')
            p = [parameters];
        else if (parameters instanceof Array)
            p = parameters;
        else
            p = [];
        if (p.length == 0)
            return undefined;
        var stateName = p[0];
        var workingItemName;
        if (p.length >= 2)
            workingItemName = p[1];
        else {
            var pathNames = stateName.split('.');
            pathNames[pathNames.length - 1] = 'WORKING';
            workingItemName = pathNames.join('.');
        }
        return new TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition(adapter, stateName, workingItemName);
    },
    "const": function (adapter, parameters) {
        return {
            toIOBroker: function (ioValue, callback) {
                console.log('inoutFunc: const.toIOBroker: ', parameters);
                callback();
            },
            fromIOBroker: function (callback) {
                console.log('inoutFunc: const.fromIOBroker: ', parameters);
                callback(null, parameters);
            },
            subscriptionRequests: []
        };
    }
};
var conversionFactory = {
    "passthrough": function (adapter, parameters) {
        return {
            toHomeKit: function (value) { return value; },
            toIOBroker: function (value) { return value; }
        };
    },
    "boolean100": function (adapter, parameters) {
        return {
            toHomeKit: function (value) { return value; },
            toIOBroker: function (value) { return value; }
        };
    },
    "HomematicDirectionToHomekitPositionState": function (adapter, parameters) {
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var result = undefined;
                switch (num) {
                    case 0:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.PositionState.STOPPED;
                        break;
                    case 1:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.PositionState.INCREASING;
                        break;
                    case 2:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.PositionState.DECREASING;
                        break;
                    default:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.PositionState.STOPPED;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitPositionState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var result = undefined;
                switch (num) {
                    case yahka_homekit_bridge_1.HAPCharacteristic.PositionState.STOPPED:
                        result = 0;
                        break;
                    case yahka_homekit_bridge_1.HAPCharacteristic.PositionState.INCREASING:
                        result = 1;
                        break;
                    case yahka_homekit_bridge_1.HAPCharacteristic.PositionState.DECREASING:
                        result = 2;
                        break;
                    default:
                        result = 0;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitPositionState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            }
        };
    },
    "HomematicControlModeToHomekitHeathingCoolingState": function (adapter, parameters) {
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var result = undefined;
                switch (num) {
                    case 0:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.AUTO;
                        break;
                    case 1:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    case 2:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    case 3:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    default:
                        result = yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.OFF;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var result = undefined;
                switch (num) {
                    case yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.OFF:
                        result = 0;
                        break;
                    case yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.HEAT:
                        result = 1;
                        break;
                    case yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.COOL:
                        result = 0;
                        break;
                    case yahka_homekit_bridge_1.HAPCharacteristic.TargetHeatingCoolingState.AUTO:
                        result = 0;
                        break;
                    default:
                        result = 0;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            }
        };
    },
    "level255": function (adapter, parameters) {
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var newValue = Math.round((num / 255.0) * 100.0);
                adapter.log.debug('level255: converting value to homekit: ' + value + ' to ' + newValue);
                return newValue;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var newValue = Math.round((num / 100.0) * 255.0);
                adapter.log.debug('level255: converting value to ioBroker: ' + value + ' to ' + newValue);
                return newValue;
            }
        };
    },
    "scaleInt": function (adapter, parameters) {
        var paramArray = JSON.parse(parameters);
        function getParameter(name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            if (paramArray === undefined)
                return defaultValue;
            var value = paramArray[name];
            if (value === undefined)
                return defaultValue;
            if (typeof value === 'number')
                return value;
            else
                return parseInt(value);
        }
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var homeKitMax = getParameter("homekit.max");
                var ioBrokerMax = getParameter("iobroker.max");
                var homeKitMin = getParameter("homekit.min", 0);
                var ioBrokerMin = getParameter("iobroker.min", 0);
                var newValue = Math.round(((num - ioBrokerMin) / (ioBrokerMax - ioBrokerMin)) * (homeKitMax - homeKitMin));
                adapter.log.debug('scaleInt: converting value to homekit: ' + value + ' to ' + newValue);
                return newValue;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var homeKitMax = getParameter("homekit.max");
                var ioBrokerMax = getParameter("iobroker.max");
                var homeKitMin = getParameter("homekit.min", 0);
                var ioBrokerMin = getParameter("iobroker.min", 0);
                var newValue = Math.round(((num - homeKitMin) / (homeKitMax - homeKitMin)) * (ioBrokerMax - ioBrokerMin));
                adapter.log.debug('scaleInt: converting value to ioBroker: ' + value + ' to ' + newValue);
                return newValue;
            }
        };
    },
    "scaleFloat": function (adapter, parameters) {
        var paramArray = JSON.parse(parameters);
        function getParameter(name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            if (paramArray === undefined)
                return defaultValue;
            var value = paramArray[name];
            if (value === undefined)
                return defaultValue;
            if (typeof value === 'number')
                return value;
            else
                return parseFloat(value);
        }
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseFloat(value);
                else
                    num = value;
                var homeKitMax = getParameter("homekit.max");
                var ioBrokerMax = getParameter("iobroker.max");
                var homeKitMin = getParameter("homekit.min", 0);
                var ioBrokerMin = getParameter("iobroker.min", 0);
                var newValue = ((num - ioBrokerMin) / (ioBrokerMax - ioBrokerMin)) * (homeKitMax - homeKitMin);
                adapter.log.debug('scaleFloat: converting value to homekit: ' + value + ' to ' + newValue);
                return newValue;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseFloat(value);
                else
                    num = value;
                var homeKitMax = getParameter("homekit.max");
                var ioBrokerMax = getParameter("iobroker.max");
                var homeKitMin = getParameter("homekit.min", 0);
                var ioBrokerMin = getParameter("iobroker.min", 0);
                var newValue = ((num - homeKitMin) / (homeKitMax - homeKitMin)) * (ioBrokerMax - ioBrokerMin);
                adapter.log.debug('scaleFloat: converting value to ioBroker: ' + value + ' to ' + newValue);
                return newValue;
            }
        };
    },
    "inverse": function (adapter, parameters) {
        function castToNumber(value) {
            if (value === undefined)
                return undefined;
            if (typeof value !== 'number')
                return parseFloat(value);
            else
                return value;
        }
        return {
            toHomeKit: function (value) {
                var num = castToNumber(value);
                var maxValue = castToNumber(parameters);
                var newValue = maxValue - num;
                adapter.log.debug('inverse: converting value to homekit: ' + value + ' to ' + newValue);
                return newValue;
            },
            toIOBroker: function (value) {
                var num = castToNumber(value);
                var maxValue = castToNumber(parameters);
                var newValue = maxValue - num;
                adapter.log.debug('inverse: converting value to ioBroker: ' + value + ' to ' + newValue);
                return newValue;
            }
        };
    },
    "hue": function (adapter, parameters) {
        return {
            toHomeKit: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var newValue = Math.round((num / 65535.0) * 360.0);
                adapter.log.debug('hue: converting value to homekit: ' + value + ' to ' + newValue);
                return newValue;
            },
            toIOBroker: function (value) {
                var num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                var newValue = Math.round((num / 360.0) * 65535.0);
                adapter.log.debug('hue: converting value to ioBroker: ' + value + ' to ' + newValue);
                return newValue;
            }
        };
    }
};
exports.functionFactory = {
    createInOutFunction: function (adapter, inOutFunction, inOutParameters) {
        if (!(inOutFunction in inOutFactory))
            return inOutFactory["const"](adapter, inOutParameters);
        return inOutFactory[inOutFunction](adapter, inOutParameters);
    },
    createConversionFunction: function (adapter, conversionFunction, conversionParameters) {
        if (!(conversionFunction in conversionFactory))
            return conversionFactory["passthrough"](adapter, conversionParameters);
        return conversionFactory[conversionFunction](adapter, conversionParameters);
    }
};
//# sourceMappingURL=yahka.function-factory.js.map
