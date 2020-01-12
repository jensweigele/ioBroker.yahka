import { IInOutFunction } from "./iofunc.base";
export class TIoBrokerInOutFunction_Const implements IInOutFunction {

    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        return new TIoBrokerInOutFunction_Const(adapter, parameters);
    }

    constructor(private adapter: ioBroker.Adapter, private parameters: any) {

    }

    toIOBroker(ioValue: any, callback: () => void) {
        callback();
    }
    fromIOBroker(callback: (error: any, plainIOValue: any) => void) {
        callback(null, this.parameters);
    }
}
