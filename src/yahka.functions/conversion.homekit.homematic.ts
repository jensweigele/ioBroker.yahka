import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";
import { HAPCharacteristic } from "../yahka.homekit-bridge";


export class TIoBrokerConversion_HomematicDirection_To_PositionState extends TIOBrokerConversionBase implements IConversionFunction {
    toHomeKit(value: any) {
        let num = TIOBrokerConversionBase.castToNumber(value)
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
        this.adapter.log.debug('HomematicDirectionToHomekitPositionState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
    toIOBroker(value: any) {
        let num = TIOBrokerConversionBase.castToNumber(value)
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
        this.adapter.log.debug('HomematicDirectionToHomekitPositionState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
}


export class TIoBrokerConversion_HomematicControlMode_To_CoolingState extends TIOBrokerConversionBase implements IConversionFunction {
    toHomeKit(value: any) {
        let num = TIOBrokerConversionBase.castToNumber(value)

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
        this.adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
    toIOBroker(value) {
        let num = TIOBrokerConversionBase.castToNumber(value)

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
        this.adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toIOBroker, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
}
