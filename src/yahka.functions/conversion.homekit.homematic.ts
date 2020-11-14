import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";
import { Characteristic } from "hap-nodejs";


export class TIoBrokerConversion_HomematicDirection_To_PositionState extends TIOBrokerConversionBase implements IConversionFunction {
    toHomeKit(value: any) {
        let num = TIOBrokerConversionBase.castToNumber(value)
        let result = undefined;
        switch (num) {
            case 0:
                result = Characteristic.PositionState.STOPPED;
                break;
            case 1:
                result = Characteristic.PositionState.INCREASING;
                break;
            case 2:
                result = Characteristic.PositionState.DECREASING;
                break;
            default:
                result = Characteristic.PositionState.STOPPED;
                break;
        }
        this.adapter.log.debug('HomematicDirectionToHomekitPositionState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
    toIOBroker(value: any) {
        let num = TIOBrokerConversionBase.castToNumber(value)
        let result = undefined;
        switch (num) {
            case Characteristic.PositionState.STOPPED:
                result = 0;
                break;
            case Characteristic.PositionState.INCREASING:
                result = 1;
                break;
            case Characteristic.PositionState.DECREASING:
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
                result = Characteristic.TargetHeatingCoolingState.AUTO;
                break;
            case 1:
                result = Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            case 2:
                result = Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            case 3:
                result = Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            default:
                result = Characteristic.TargetHeatingCoolingState.OFF;
                break;
        }
        this.adapter.log.debug('HomematicDirectionToHomekitHeatingCoolingState.toHomeKit, from ' + JSON.stringify(value) + '[' + (typeof value) + '] to ' + JSON.stringify(result));
        return result;
    }
    toIOBroker(value) {
        let num = TIOBrokerConversionBase.castToNumber(value)

        let result = undefined;
        switch (num) {
            case Characteristic.TargetHeatingCoolingState.OFF:
                result = 0;
                break;
            case Characteristic.TargetHeatingCoolingState.HEAT:
                result = 1;
                break;
            case Characteristic.TargetHeatingCoolingState.COOL:
                result = 0;
                break;
            case Characteristic.TargetHeatingCoolingState.AUTO:
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
