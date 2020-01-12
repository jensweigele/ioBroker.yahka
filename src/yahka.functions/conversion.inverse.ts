import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";


export class TIoBrokerConversion_Inverse extends TIOBrokerConversionBase implements IConversionFunction {


    static create(adapter: ioBroker.Adapter, parameters: any): IConversionFunction {
        let maxValue = TIOBrokerConversionBase.castToNumber(parameters);
        return new TIoBrokerConversion_Inverse(adapter, maxValue);
    }
    constructor(adapter: ioBroker.Adapter, protected maxValue: number) {
        super(adapter);
    }

    toHomeKit(value: any) {
        let num: number = TIOBrokerConversionBase.castToNumber(value)
        let newValue = this.maxValue - num;
        this.adapter.log.debug('inverse: converting value to homekit: ' + value + ' to ' + newValue);
        return newValue;
    }
    toIOBroker(value: any) {
        let num: number = TIOBrokerConversionBase.castToNumber(value)
        let newValue = this.maxValue - num;
        this.adapter.log.debug('inverse: converting value to ioBroker: ' + value + ' to ' + newValue);
        return newValue;
    }
}