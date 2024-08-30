import { TYahkaFunctionBase } from './functions.base';
import { IInOutFunction, IInOutChangeNotify } from '../yahka.interfaces';
import { ISubscriptionRequest, ISubscriptionRequester } from '../yahka.ioBroker-adapter';
export { IInOutChangeNotify, IInOutFunction } from '../yahka.interfaces';

export abstract class TIoBrokerInOutFunctionBase extends TYahkaFunctionBase implements IInOutFunction {
    protected valueForHomeKit: any = undefined;
    protected errorForHomeKit: any = null;

    public fromIOBroker(callback: (error: any, plainIOValue: any) => void) {
        this.log.debug(`fromIOBroker event - delivering cached value (${JSON.stringify(this.valueForHomeKit)})`);
        callback(null, this.valueForHomeKit);
    }

    public toIOBroker(plainIoValue: any, callback: () => void) {
        this.log.debug(`writing state to ioBroker: ${JSON.stringify(plainIoValue)}`);
        this.updateIOBrokerValue(plainIoValue, callback);
    }

    protected cacheChanged(stateName: string, callback: IInOutChangeNotify) {
        try {
            this.valueForHomeKit = this.recalculateHomekitValues(stateName);
            this.errorForHomeKit = null;
        } catch (e) {
            this.errorForHomeKit = e;
        }

        if (this.valueForHomeKit != null)
            callback(this.valueForHomeKit);
    }

    protected recalculateHomekitValues(stateName: string) {
        // noop
    }

    protected updateIOBrokerValue(plainIoValue: any, callback: () => void) {
        // to be filled in derived class
    }
}

export abstract class TIoBrokerInOutFunction_StateBase implements ISubscriptionRequester, IInOutFunction {
    protected debounceTimer: NodeJS.Timeout = null;
    public subscriptionRequests: ISubscriptionRequest[] = [];

    constructor(protected adapter: ioBroker.Adapter, protected stateName: string, protected deferredTime: number = 0) {
        this.addSubscriptionRequest(stateName);
    }

    addSubscriptionRequest(stateName: string) {
        let subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    }

    getValueOnRead(ioState: ioBroker.State): any {
        return ioState?.val;
    }

    getValueOnNotify(ioState: ioBroker.State): any {
        return ioState?.val;
    }

    toIOBroker(plainIoValue, callback) {
        this.adapter.log.debug(`writing state to ioBroker [${this.stateName}]: ${JSON.stringify(plainIoValue)}`);
        this.adapter.getForeignState(this.stateName, (error, ioState) => {
            let value = this.getValueOnRead(ioState);
            let valueChanged = value !== plainIoValue;
            this.adapter.log.debug(`checking value change: ${JSON.stringify(value)} != ${JSON.stringify(plainIoValue)} = ${valueChanged}`);
            if (valueChanged) {
                this.adapter.setForeignState(this.stateName, plainIoValue, false, (error) => {
                    if (error)
                        this.adapter.log.error(`setForeignState error [${this.stateName}] to [${JSON.stringify(plainIoValue)}]: ${error}`);
                    callback();
                });
            } else {
                callback();
            }
        });
    }

    fromIOBroker(callback) {
        this.adapter.log.debug(`reading state from ioBroker [${this.stateName}]`);
        this.adapter.getForeignState(this.stateName, (error, ioState) => {
            this.adapter.log.debug(`read state from ioBroker [${this.stateName}]: ${JSON.stringify(ioState)}`);
            if (error)
                this.adapter.log.error(`... with error: ${error}`);

            let value = this.getValueOnRead(ioState);
            callback(error, value);
        });
    }

    subscriptionEvent(stateName: string, ioState: ioBroker.State, callback: IInOutChangeNotify) {
        this.adapter.log.debug(`change event from ioBroker via [${this.stateName}]${JSON.stringify(ioState)}`);
        let newValue = this.getValueOnNotify(ioState);
        if (newValue != null)
            this.executeCallback(callback, newValue);
        else
            this.adapter.log.debug('state was filtered - notification is canceled');
    }

    executeCallback(callback: IInOutChangeNotify, plainIOValue: any) {
        if (this.deferredTime > 0)
            this.setupDeferredChangeEvent(callback, plainIOValue);
        else
            callback(plainIOValue);
    }

    setupDeferredChangeEvent(callback: IInOutChangeNotify, plainIOValue: any) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), 150);
    }

    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
    }

    deferredChangeEvent(callback: IInOutChangeNotify, plainIOValue: any) {
        this.adapter.log.debug(`[${this.stateName}] firing deferred change event:${JSON.stringify(plainIOValue)}`);
        callback(plainIOValue);
    }
}
