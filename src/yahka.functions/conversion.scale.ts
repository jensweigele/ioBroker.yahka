import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";

export interface IIoBrokerConversionScaleParameters {
    "homekit.min": number;
    "homekit.max": number;
    "iobroker.min": number;
    "iobroker.max": number;
}

export class TIoBrokerConversion_Scale extends TIOBrokerConversionBase implements IConversionFunction {
    static isScaleParameter(parameters: any): parameters is IIoBrokerConversionScaleParameters {
        const castedParam = <IIoBrokerConversionScaleParameters>parameters;
        return castedParam["homekit.min"] !== undefined &&
            castedParam["homekit.max"] !== undefined &&
            castedParam["iobroker.min"] !== undefined &&
            castedParam["iobroker.max"] !== undefined;
    }

    constructor(adapter: ioBroker.Adapter, protected parameters: IIoBrokerConversionScaleParameters, protected logName: string) {
        super(adapter);
        if (!TIoBrokerConversion_Scale.isScaleParameter(parameters)) {
            this.parameters = {
                "homekit.min": 0,
                "homekit.max": 1,
                "iobroker.min": 0,
                "iobroker.max": 1
            }
        }
    }

    toHomeKit(value) {
        let num: number = TIOBrokerConversionBase.castToNumber(value);
        let homeKitMax = this.parameters["homekit.max"];
        let ioBrokerMax = this.parameters["iobroker.max"];
        let homeKitMin = this.parameters["homekit.min"];
        let ioBrokerMin = this.parameters["iobroker.min"];
        let newValue = ((num - ioBrokerMin) / (ioBrokerMax - ioBrokerMin)) * (homeKitMax - homeKitMin) + homeKitMin;
        this.adapter.log.debug(`${this.logName}: converting value to homekit: ${value} to ${newValue}`);
        return this.logName === "scaleInt" ? Math.round(newValue) : newValue;
    }
    toIOBroker(value) {
        let num: number = TIOBrokerConversionBase.castToNumber(value);
        let homeKitMax = this.parameters["homekit.max"];
        let ioBrokerMax = this.parameters["iobroker.max"];
        let homeKitMin = this.parameters["homekit.min"];
        let ioBrokerMin = this.parameters["iobroker.min"];
        let newValue = ((num - homeKitMin) / (homeKitMax - homeKitMin)) * (ioBrokerMax - ioBrokerMin) + ioBrokerMin;
        this.adapter.log.debug(`${this.logName}: converting value to ioBroker: ${value} to ${newValue}`);
        return this.logName === "scaleInt" ? Math.round(newValue) : newValue;
    }
}
