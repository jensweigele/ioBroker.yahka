import { IInOutFunction } from "./iofunc.base";
export class TIoBrokerInOutFunction_Const implements IInOutFunction {

    static create(adapter: ioBroker.IAdapter, parameters: any): IInOutFunction {
        return new TIoBrokerInOutFunction_Const(adapter, parameters);
    }

    constructor(private adapter: ioBroker.IAdapter, private parameters: any) {

    }

    toIOBroker(ioValue: any, callback: () => void) {
        console.log('inoutFunc: const.toIOBroker: ', this.parameters);
        callback();
    }
    fromIOBroker(callback: (error: any, plainIOValue: any) => void) {
        console.log('inoutFunc: const.fromIOBroker: ', this.parameters);
        callback(null, this.parameters);
    }
}
