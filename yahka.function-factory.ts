/// <reference path="./typings/index.d.ts" />
import {IInOutFunction, IConversionFunction, HAPCharacteristic, IInOutChangeNotify} from './yahka.homekit-bridge';

interface IObjectDictionary<T> {
    [name:string]:T;
}

type TSubscriptionType = 'state'|'object';

export interface ISubscriptionRequest {
    subscriptionType:TSubscriptionType;
    subscriptionIdentifier:string;
    subscriptionEvent:(ioValue:any, callback:IInOutChangeNotify) => void;
}

export interface IInternalInOutFunction extends IInOutFunction {
    subscriptionRequests:ISubscriptionRequest[];
}


class TIoBrokerInOutFunction_State implements IInternalInOutFunction {
    protected debounceTimer = -1;
    public subscriptionRequests:ISubscriptionRequest[] = [];

    constructor(protected adapter:ioBroker.IAdapter, protected stateName:string, protected deferredTime:number = 0) {
        this.addSubscriptionRequest(stateName);
    }

    addSubscriptionRequest(stateName:string) {
        let subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    }

    getValueOnRead(ioState:ioBroker.IState):any {
        if (ioState)
            return ioState.val;
        else
            return null;
    }

    getValueOnNotify(ioState:ioBroker.IState):any {
        if (ioState)
            return ioState.val;
        else
            return null;
    }

    toIOBroker(plainIoValue, callback) {
        this.adapter.log.debug('writing state to ioBroker [' + this.stateName + ']: ' + JSON.stringify(plainIoValue));
        this.adapter.getForeignState(this.stateName, (error, ioState) =>  {
            let value = this.getValueOnRead(ioState);
            let valueChanged = value !== plainIoValue;
            this.adapter.log.debug('checking value change: ' + JSON.stringify(value) + ' != ' + JSON.stringify(plainIoValue) + ' = ' + valueChanged);
            if (valueChanged) {
                this.adapter.setForeignState(this.stateName, plainIoValue, false, (error) => {
                    if (error)
                        this.adapter.log.error('setForeignState error [' + this.stateName + '] to [' + JSON.stringify(plainIoValue) + ']: ' + error);
                    callback();
                });
            }
        });
    }

    fromIOBroker(callback) {
        this.adapter.log.debug('reading state from ioBroker [' + this.stateName + ']');
        this.adapter.getForeignState(this.stateName, (error, ioState) => {
            this.adapter.log.debug('read state from ioBroker [' + this.stateName + ']: ' + JSON.stringify(ioState));
            if (error)
                this.adapter.log.error('... with error: ' + error);

            let value = this.getValueOnRead(ioState);
            callback(error, value);
        });
    }

    subscriptionEvent(stateName:string, ioState:ioBroker.IState, callback:IInOutChangeNotify) {
        this.adapter.log.debug('change event from ioBroker via [' + this.stateName + ']' + JSON.stringify(ioState));
        let newValue = this.getValueOnNotify(ioState);
        if (newValue !== undefined)
            this.executeCallback(callback, newValue);
        else
            this.adapter.log.debug('state was filtered - notification is canceled');
    }

    executeCallback(callback:IInOutChangeNotify, plainIOValue:any) {
        if (this.deferredTime > 0)
            this.setupDeferredChangeEvent(callback, plainIOValue);
        else
            callback(plainIOValue);
    }

    setupDeferredChangeEvent(callback:IInOutChangeNotify, plainIOValue:any) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), 150);
    }

    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = -1;
    }

    deferredChangeEvent(callback:IInOutChangeNotify, plainIOValue:any) {
        this.adapter.log.debug('[' + this.stateName + '] firing deferred change event:' + JSON.stringify(plainIOValue));
        callback(plainIOValue);
    }

}

class TIoBrokerInOutFunction_State_OnlyACK extends TIoBrokerInOutFunction_State {
    protected lastAcknowledgedValue:any;

    getValueOnRead(ioState:ioBroker.IState):any {
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                return ioState.val;
            } else {
                this.adapter.log.debug("faking CurrentState.Read for [" + this.stateName + ']: ' + JSON.stringify(this.lastAcknowledgedValue));
                return this.lastAcknowledgedValue;
            }
        else
            return null;
    }

    getValueOnNotify(ioState:ioBroker.IState):any {
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                return ioState.val;
            } else {
                this.adapter.log.debug("discarding CurrentState.Notify for [" + this.stateName + ']');
                return undefined;
            }
        else
            return null;
    }
}

class TIoBrokerInOutFunction_State_OnlyNotACK extends TIoBrokerInOutFunction_State {
    protected lastNotAcknowledgedValue:any;

    getValueOnRead(ioState:ioBroker.IState):any {
        if (ioState)
            if (ioState.ack) {
                this.adapter.log.debug("faking CurrentState.Read for [" + this.stateName + ']: ' + JSON.stringify(this.lastNotAcknowledgedValue));
                return this.lastNotAcknowledgedValue;
            } else {
                this.lastNotAcknowledgedValue = ioState.val;
                return ioState.val;
            }
        else
            return null;
    }

    getValueOnNotify(ioState:ioBroker.IState):any {
        if (ioState)
            if (!ioState.ack) {
                this.adapter.log.debug("discarding CurrentState.Notify for [" + this.stateName + ']');
                return undefined;
            } else {
                this.lastNotAcknowledgedValue = ioState.val;
                return ioState.val
            }
        else
            return null;
    }
}


class TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition extends TIoBrokerInOutFunction_State {
    protected lastWorkingState:boolean = false;
    protected lastAcknowledgedValue:any = undefined;
    protected debounceTimer = -1;

    constructor(protected adapter:ioBroker.IAdapter, protected stateName:string, protected workingItem:string) {
        super(adapter, stateName, 0);
        this.addSubscriptionRequest(workingItem);
        adapter.getForeignState(workingItem, (error, ioState) => {
            if (ioState)
                this.lastWorkingState = ioState.val;
            else
                this.lastWorkingState = undefined;
        });
    }

    subscriptionEvent(stateName:string, ioState:ioBroker.IState, callback:IInOutChangeNotify) {
        if (!ioState)
            return;

        if (stateName == this.workingItem) {
            this.adapter.log.debug('[' + this.stateName + '] got a working item change event: ' + JSON.stringify(ioState));
            this.lastWorkingState = ioState.val;
            this.setupDeferredChangeEvent(callback);
        } else if (stateName == this.stateName) {
            this.adapter.log.debug('[' + this.stateName + '] got a target state change event:' + JSON.stringify(ioState));
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState.val;
                this.setupDeferredChangeEvent(callback);
            }
        }
    }

    setupDeferredChangeEvent(callback:IInOutChangeNotify) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback), 150);
    }

    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = -1;
    }

    deferredChangeEvent(callback:IInOutChangeNotify) {
        if (!this.lastWorkingState) { // only fire callback if the covering does not move
            this.adapter.log.debug('[' + this.stateName + '] firing target state change event:' + JSON.stringify(this.lastAcknowledgedValue));
            callback(this.lastAcknowledgedValue);
        } else {
            this.adapter.log.debug('[' + this.stateName + '] canceling target state change event - covering is working');
        }
    }
}

type TInOutFunctionCreateFunction = (adapter:ioBroker.IAdapter, parameters:any) => IInternalInOutFunction;
var inOutFactory:IObjectDictionary<TInOutFunctionCreateFunction> = {
    "ioBroker.State": function (adapter:ioBroker.IAdapter, parameters:any):IInternalInOutFunction {
        if (typeof parameters !== "string")
            return undefined;
        let stateName:string = parameters;

        return new TIoBrokerInOutFunction_State(adapter, stateName);
    },

    // should be named Defered=>Deferred
    "ioBroker.State.Defered": function (adapter:ioBroker.IAdapter, parameters:any):IInternalInOutFunction {
        if (typeof parameters !== "string")
            return undefined;
        let stateName:string = parameters;

        return new TIoBrokerInOutFunction_State(adapter, stateName, 250);
    },

    "ioBroker.State.OnlyACK": function (adapter:ioBroker.IAdapter, parameters:any):IInternalInOutFunction {
        if (typeof parameters !== "string")
            return undefined;
        let stateName:string = parameters;

        return new TIoBrokerInOutFunction_State_OnlyACK(adapter, stateName);
    },

    "ioBroker.homematic.WindowCovering.TargetPosition": function (adapter:ioBroker.IAdapter, parameters:any):IInternalInOutFunction {
        let p:Array<string>;

        if (typeof parameters === 'string')
            p = [parameters];
        else if (parameters instanceof Array)
            p = parameters;
        else
            p = [];

        if (p.length == 0)
            return undefined;

        let stateName:string = p[0];
        let workingItemName:string;
        if (p.length >= 2)
            workingItemName = p[1];
        else {
            let pathNames = stateName.split('.');
            pathNames[pathNames.length - 1] = 'WORKING';
            workingItemName = pathNames.join('.');
        }

        return new TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition(adapter, stateName, workingItemName);
    },

    "const": function (adapter:ioBroker.IAdapter, parameters:any):IInternalInOutFunction {
        return {
            toIOBroker(ioValue:any, callback:() => void) {
                console.log('inoutFunc: const.toIOBroker: ', parameters);
                callback();
            },

            fromIOBroker(callback:(error:any, ioValue:any) => void) {
                console.log('inoutFunc: const.fromIOBroker: ', parameters);
                callback(null, parameters);
            },

            subscriptionRequests: []
        }
    }
};

type TConversionFunctionCreateFunction = (adapter:ioBroker.IAdapter, parameters:any) => IConversionFunction;
var conversionFactory:IObjectDictionary<TConversionFunctionCreateFunction> = {
    "passthrough": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        return {
            toHomeKit: (value:any) => value,
            toIOBroker: (value:any) => value
        }
    },

    "HomematicDirectionToHomekitPositionState": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        return {
            toHomeKit: (value) => {
                let num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;

                let result = undefined;
                switch (num) {
                    case 0:
                        result = HAPCharacteristic.PositionState.STOPPED;
                        break;
                    case 1:
                        result = HAPCharacteristic.PositionState.INCREASING;
                        break;
                    case 2:
                        result = HAPCharacteristic.PositionState.DECREASING;
                        break;
                    default:
                        result = HAPCharacteristic.PositionState.STOPPED;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitPositionState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            },
            toIOBroker: (value) => {
                let num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;

                let result = undefined;
                switch (num) {
                    case HAPCharacteristic.PositionState.STOPPED:
                        result = 0;
                        break;
                    case HAPCharacteristic.PositionState.INCREASING:
                        result = 1;
                        break;
                    case HAPCharacteristic.PositionState.DECREASING:
                        result = 2;
                        break;
                    default:
                        result = 0;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitPositionState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            }
        }
    },

    "HomematicControlModeToHomekitHeathingCoolingState": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        return {
            toHomeKit: (value) => {
                let num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;

                let result = undefined;
                switch (num) {
                    case 0:
                        result = HAPCharacteristic.TargetHeatingCoolingState.AUTO;
                        break;
                    case 1:
                        result = HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    case 2:
                        result = HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    case 3:
                        result = HAPCharacteristic.TargetHeatingCoolingState.HEAT;
                        break;
                    default:
                        result = HAPCharacteristic.TargetHeatingCoolingState.OFF;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            },
            toIOBroker: (value) => {
                let num = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;

                let result = undefined;
                switch (num) {
                    case HAPCharacteristic.TargetHeatingCoolingState.OFF:
                        result = 0;
                        break;
                    case HAPCharacteristic.TargetHeatingCoolingState.HEAT:
                        result = 1;
                        break;
                    case HAPCharacteristic.TargetHeatingCoolingState.COOL:
                        result = 0;
                        break;
                    case HAPCharacteristic.TargetHeatingCoolingState.AUTO:
                        result = 0;
                        break;
                    default:
                        result = 0;
                        break;
                }
                adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
                return result;
            }
        }
    },

    "level255": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        return {
            toHomeKit: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;        
                let newValue = Math.round((num / 255.0) * 100.0);
                adapter.log.debug('level255: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
			},
            toIOBroker: function (value) { 
                let num: number = undefined;
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

    "inverseInt": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        var paramArray = JSON.parse(parameters);
        function getParameter(name: string): number {
            if (paramArray === undefined) 
                return undefined;
            let value = paramArray[name];
            if (value === undefined) 
                return undefined;
            if (typeof value === 'number')
                return value;
            else 
                return parseInt(value); 
        }

        return {
            toHomeKit: function (value) { 
                adapter.log.debug("inverseInt to HomeKit: " + JSON.stringify(parameters));
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                let homeKitMax = getParameter("homekit.max");
                let ioBrokerMax = getParameter("iobroker.max");
                let newValue = Math.round((num / ioBrokerMax) * homeKitMax);
                adapter.log.debug('inverseInt: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
			},
            toIOBroker: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                let homeKitMax = getParameter("homekit.max");
                let ioBrokerMax = getParameter("iobroker.max");
                let newValue = Math.round((num / homeKitMax) * ioBrokerMax);
                adapter.log.debug('inverseInt: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
            }
        };
    },    
    "inverseFloat": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        var paramArray = JSON.parse(parameters);
        function getParameter(name: string): number {
            if (paramArray === undefined) 
                return undefined;
            let value = paramArray[name];
            if (value === undefined) 
                return undefined;
            if (typeof value === 'number')
                return value;
            else 
                return parseFloat(value); 
        }

        return {
            toHomeKit: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseFloat(value);
                else
                    num = value;
                let homeKitMax = getParameter("homekit.max");
                let ioBrokerMax = getParameter("iobroker.max");
                let newValue = (num / ioBrokerMax) * homeKitMax;
                adapter.log.debug('inverseFloat: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
			},
            toIOBroker: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseFloat(value);
                else
                    num = value;
                let homeKitMax = getParameter("homekit.max");
                let ioBrokerMax = getParameter("iobroker.max");
                let newValue = (num / homeKitMax) * ioBrokerMax;
                adapter.log.debug('inverseFloat: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
            }
        };
    },    

    "hue": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        return {
            toHomeKit: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;                     
                var newValue = Math.round((num / 65535.0) * 360.0);
                adapter.log.debug('hue: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
            },
            toIOBroker: function (value) { 
                let num: number = undefined;
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


export var functionFactory = {
    createInOutFunction: function (adapter:ioBroker.IAdapter, inOutFunction:string, inOutParameters?:any):IInternalInOutFunction {
        if (!(inOutFunction in inOutFactory))
            return inOutFactory["const"](adapter, inOutParameters);
        return inOutFactory[inOutFunction](adapter, inOutParameters);
    },
    createConversionFunction: function (adapter:ioBroker.IAdapter, conversionFunction:string, conversionParameters?:any):IConversionFunction {
        if (!(conversionFunction in conversionFactory))
            return conversionFactory["passthrough"](adapter, conversionParameters);
        return conversionFactory[conversionFunction](adapter, conversionParameters);
    }

};

