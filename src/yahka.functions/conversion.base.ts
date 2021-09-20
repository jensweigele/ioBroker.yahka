import { TYahkaFunctionBase } from './functions.base';
export { IConversionFunction } from '../yahka.interfaces';
export abstract class TIOBrokerConversionBase extends TYahkaFunctionBase {
    constructor(adapter: ioBroker.Adapter, logIdentifier: string = "") {
        super(adapter, logIdentifier);
    }

    protected static castToNumber(value: any): number {
        if (value === undefined)
            return undefined;
        else if (typeof value !== 'number')
            return Number(value);
        else
            return value;
    }

    protected static castToBool(value: any): boolean {
        return !!value;
    }

    protected static parameterValueByName(parameters: any, name: string): any {
        let paramArray = undefined;
        if (typeof parameters === 'object') {
            paramArray = parameters
        } else {
            paramArray = JSON.parse(parameters);
        }
        if (paramArray === undefined)
            return undefined;
        return paramArray[name];
    }
}

