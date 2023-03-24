import { TIOBrokerConversionBase, IConversionFunction } from './conversion.base';


export interface IIoBrokerConversionScriptParameters {
    toHomeKit: string;
    toIOBroker: string;
}

export class TIoBrokerConversion_Script extends TIOBrokerConversionBase implements IConversionFunction {
    static isScriptParameter(parameters: any): parameters is IIoBrokerConversionScriptParameters {
        const castedParam = <IIoBrokerConversionScriptParameters>parameters;
        return castedParam['toHomeKit'] !== undefined &&
            castedParam['toIOBroker'] !== undefined;
    }

    static create(adapter: ioBroker.Adapter, parameters: any): IConversionFunction {
        let params: IIoBrokerConversionScriptParameters;
        if (TIoBrokerConversion_Script.isScriptParameter(parameters)) {
            params = parameters;
        } else {
            params = {
                toHomeKit: 'return value',
                toIOBroker: 'return value'
            }
        }
        return new TIoBrokerConversion_Script(adapter, params);
    }

    private toHKFunction: Function;
    private toIOFunction: Function;

    constructor(adapter: ioBroker.Adapter, protected parameters: IIoBrokerConversionScriptParameters) {
        super(adapter);
        this.toHKFunction = new Function('value', this.parameters.toHomeKit);
        this.toIOFunction = new Function('value', this.parameters.toIOBroker);
    }

    toHomeKit(value: any) {
        let newValue = this.toHKFunction(value);
        this.adapter.log.debug(`script: converting value to homekit: ${value} to ${newValue}`);
        return newValue;
    }
    toIOBroker(value: any) {
        let newValue = this.toIOFunction(value);
        this.adapter.log.debug(`script: converting value to ioBroker: ${value} to ${newValue}`);
        return newValue;
    }
}