import { IConversionFunction } from "../yahka.interfaces";
import { TIOBrokerConversionBase } from "./conversion.base";

export class TIoBrokerConversion_Passthrough extends TIOBrokerConversionBase implements IConversionFunction {
    toHomeKit(value: any) {
        return value
    }
    toIOBroker(value: any) {
        return value
    }
}