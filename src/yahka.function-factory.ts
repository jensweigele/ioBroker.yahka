/// <reference path="./typings/index.d.ts" />
import { IConversionFunction, HAPCharacteristic, IInOutChangeNotify} from './yahka.homekit-bridge';
import { inOutFactory } from './yahka.functions/functions.factory';
import { IInternalInOutFunction } from './yahka.functions/iofunc.base';
interface IObjectDictionary<T> {
    [name:string]:T;
}
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

    "scaleInt": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        
        let paramArray = undefined;
        if (typeof parameters === 'object') {
            paramArray = parameters
        } else {
            paramArray = JSON.parse(parameters);
        }
        function getParameter(name: string, defaultValue: number = undefined): number {
            if (paramArray === undefined) 
                return defaultValue;
            let value = paramArray[name];
            if (value === undefined) 
                return defaultValue;
            if (typeof value === 'number')
                return value;
            else 
                return parseInt(value); 
        }

        return {
            toHomeKit: function (value) { 
                let num: number = undefined;
                if (typeof value !== 'number')
                    num = parseInt(value);
                else
                    num = value;
                let homeKitMax = getParameter("homekit.max");
                let ioBrokerMax = getParameter("iobroker.max");
                let homeKitMin = getParameter("homekit.min", 0);
                let ioBrokerMin = getParameter("iobroker.min", 0);
                let newValue = Math.round(homeKitMin + ((homeKitMax - homeKitMin) / (ioBrokerMax - ioBrokerMin)) * (num - ioBrokerMin));
		        adapter.log.debug('scaleInt: converting value to homekit: ' + value + ' to ' + newValue); 
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
                let homeKitMin = getParameter("homekit.min", 0);
                let ioBrokerMin = getParameter("iobroker.min", 0);
                let newValue = Math.round(ioBrokerMin + ((ioBrokerMax - ioBrokerMin) / (homeKitMax - homeKitMin)) * (num - homeKitMin));;
                adapter.log.debug('scaleInt: converting value to ioBroker: ' + value + ' to ' + newValue); 
                return newValue; 
            }
        };
    },    
    "scaleFloat": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        var paramArray = JSON.parse(parameters);
        function getParameter(name: string, defaultValue: number = undefined): number {
            if (paramArray === undefined) 
                return defaultValue;
            let value = paramArray[name];
            if (value === undefined) 
                return defaultValue;
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
                let homeKitMin = getParameter("homekit.min", 0);
                let ioBrokerMin = getParameter("iobroker.min", 0);
                let newValue = ((num - ioBrokerMin) / (ioBrokerMax - ioBrokerMin)) * (homeKitMax - homeKitMin);
                adapter.log.debug('scaleFloat: converting value to homekit: ' + value + ' to ' + newValue); 
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
                let homeKitMin = getParameter("homekit.min", 0);
                let ioBrokerMin = getParameter("iobroker.min", 0);
                let newValue = ((num - homeKitMin) / (homeKitMax - homeKitMin)) * (ioBrokerMax - ioBrokerMin);
                adapter.log.debug('scaleFloat: converting value to ioBroker: ' + value + ' to ' + newValue); 
                return newValue; 
            }
        };
    },    
    "inverse": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {
        function castToNumber(value: any): number {
            if (value === undefined)
                return undefined;
            if (typeof value !== 'number')
                return parseFloat(value);
            else
                return value;
        }

        return {
            toHomeKit: function (value) { 
                let num: number = castToNumber(value)
                let maxValue = castToNumber(parameters);
                let newValue = maxValue - num;
                adapter.log.debug('inverse: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
			},
            toIOBroker: function (value) { 
                let num: number = castToNumber(value)
                let maxValue = castToNumber(parameters);
                let newValue = maxValue - num;
                adapter.log.debug('inverse: converting value to ioBroker: ' + value + ' to ' + newValue); 
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
    },

    "script": function (adapter:ioBroker.IAdapter, parameters:any):IConversionFunction {

        function getParameter(name: string): string {
            if (parameters === undefined) 
                return "";
            let value = parameters[name];
            if (value === undefined) 
                return "";
            return value;
        }

        let toHKFunction = new Function("value", getParameter("toHomeKit"));
        let toIOBrokerFunction = new Function("value", getParameter("toIOBroker"));
        return {
            toHomeKit: function (value) { 
                let newValue = toHKFunction(value);
                adapter.log.debug('script: converting value to homekit: ' + value + ' to ' + newValue); 
                return newValue; 
            },
            toIOBroker: function (value) { 
                let newValue = toIOBrokerFunction(value);
                adapter.log.debug('script: converting value to ioBroker: ' + value + ' to ' + newValue); 
                return newValue; 
            }
        };
    }
};


export var functionFactory = {
    createInOutFunction: function (adapter:ioBroker.IAdapter, inOutFunction:string, inOutParameters?:any):IInternalInOutFunction {
        console.log(inOutFactory);
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

