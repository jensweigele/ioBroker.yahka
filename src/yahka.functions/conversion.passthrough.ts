import { IConversionFunction } from "../yahka.homekit-bridge";
import { TYahkaFunctionBase } from "./conversion.base";

export class TIoBrokerConversion_Passthrough extends TYahkaFunctionBase implements IConversionFunction {
    toHomeKit(value: any) {
        return value
    }
    toIOBroker(value: any) {
        return value
    }
}