import { TIOBrokerConversionBase, IConversionFunction } from './conversion.base';

export class TIoBrokerConversion_Invert extends TIOBrokerConversionBase implements IConversionFunction {
    public toHomeKit(value: any): boolean {
        return !TIOBrokerConversionBase.castToBool(value);
    }

    public toIOBroker(value: any): boolean {
        return !TIOBrokerConversionBase.castToBool(value);
    }
}

