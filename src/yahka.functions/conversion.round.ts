import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";

export class TIoBrokerConversion_Round extends TIOBrokerConversionBase implements IConversionFunction {
    public toHomeKit(value: any): number {
        let num: number = TIOBrokerConversionBase.castToNumber(value);
        return Math.round(num);
    }

    public toIOBroker(value: any): number {
        let num: number = TIOBrokerConversionBase.castToNumber(value);
        return Math.round(num);
    }
}

