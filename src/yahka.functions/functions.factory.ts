import { IInOutFunction } from './iofunc.base';
import { IConversionFunction } from './conversion.base';
interface IObjectDictionary<T> {
    [name: string]: T;
}

type FactoryFunction<T> = (adapter: ioBroker.Adapter, parameters: any) => T;

export const inOutFactory: IObjectDictionary<FactoryFunction<IInOutFunction>> = {};
export const conversionFactory: IObjectDictionary<FactoryFunction<IConversionFunction>> = {};

export const functionFactory = {
    createInOutFunction: function (adapter: ioBroker.Adapter, inOutFunction: string, inOutParameters?: any): IInOutFunction {
        if (!(inOutFunction in inOutFactory))
            return inOutFactory['const'](adapter, inOutParameters);
        return inOutFactory[inOutFunction](adapter, inOutParameters);
    },
    createConversionFunction: function (adapter: ioBroker.Adapter, conversionFunction: string, conversionParameters?: any): IConversionFunction {
        if (!(conversionFunction in conversionFactory))
            return conversionFactory['passthrough'](adapter, conversionParameters);
        return conversionFactory[conversionFunction](adapter, conversionParameters);
    }
};

