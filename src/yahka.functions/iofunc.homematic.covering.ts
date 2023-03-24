import { IInOutFunction, TIoBrokerInOutFunction_StateBase, IInOutChangeNotify } from './iofunc.base';

export class TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition extends TIoBrokerInOutFunction_StateBase {
    protected lastWorkingState: boolean = false;
    protected lastAcknowledgedValue: any = undefined;
    protected debounceTimer: NodeJS.Timeout = null;

    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        let p: Array<string>;

        if (typeof parameters === 'string')
            p = [parameters];
        else if (parameters instanceof Array)
            p = parameters;
        else
            p = [];

        if (p.length == 0)
            return undefined;

        let stateName: string = p[0];
        let workingItemName: string;
        if (p.length >= 2)
            workingItemName = p[1];
        else {
            let pathNames = stateName.split('.');
            pathNames[pathNames.length - 1] = 'WORKING';
            workingItemName = pathNames.join('.');
        }

        return new TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition(adapter, stateName, workingItemName);
    }


    constructor(protected adapter: ioBroker.Adapter, protected stateName: string, protected workingItem: string) {
        super(adapter, stateName, 0);
        this.addSubscriptionRequest(workingItem);
        adapter.getForeignState(workingItem, (error, ioState) => {
            if (ioState)
                this.lastWorkingState = Boolean(ioState?.val);
            else
                this.lastWorkingState = undefined;
        });
    }

    subscriptionEvent(stateName: string, ioState: ioBroker.State, callback: IInOutChangeNotify) {
        if (!ioState)
            return;

        if (stateName == this.workingItem) {
            this.adapter.log.debug(`[${this.stateName}] got a working item change event: ${JSON.stringify(ioState)}`);
            this.lastWorkingState = Boolean(ioState?.val);
            this.setupDeferredChangeEvent(callback);
        } else if (stateName == this.stateName) {
            this.adapter.log.debug(`[${this.stateName}] got a target state change event:${JSON.stringify(ioState)}`);
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState?.val;
                this.setupDeferredChangeEvent(callback);
            }
        }
    }

    setupDeferredChangeEvent(callback: IInOutChangeNotify) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback), 150);
    }

    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
    }

    deferredChangeEvent(callback: IInOutChangeNotify) {
        if (!this.lastWorkingState) { // only fire callback if the covering does not move
            this.adapter.log.debug(`[${this.stateName}] firing target state change event:${JSON.stringify(this.lastAcknowledgedValue)}`);
            callback(this.lastAcknowledgedValue);
        } else {
            this.adapter.log.debug(`[${this.stateName}] canceling target state change event - covering is working`);
        }
    }
}

