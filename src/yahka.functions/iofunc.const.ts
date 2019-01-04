import { IInternalInOutFunction, ISubscriptionRequest } from "./yahka.functions.base";
export class TIoBrokerInOutFunction_Const implements IInternalInOutFunction {

    public subscriptionRequests:ISubscriptionRequest[] = [];
    static create(adapter:ioBroker.IAdapter, parameters:any): IInternalInOutFunction {
        return new TIoBrokerInOutFunction_Const(adapter, parameters);
    }

    constructor (private adapter:ioBroker.IAdapter, private parameters:any) {
        
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
