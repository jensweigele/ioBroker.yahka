import { TIoBrokerInOutFunction_StateBase, IInOutFunction } from './iofunc.base';

export class TIoBrokerInOutFunction_State extends TIoBrokerInOutFunction_StateBase {
    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName: string = parameters;

        return new TIoBrokerInOutFunction_State(adapter, stateName);
    }
}

export class TIoBrokerInOutFunction_StateDeferred extends TIoBrokerInOutFunction_StateBase {
    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName: string = parameters;

        return new TIoBrokerInOutFunction_StateDeferred(adapter, stateName, 250);
    }
}

export class TIoBrokerInOutFunction_State_OnlyACK extends TIoBrokerInOutFunction_StateBase {
    protected lastAcknowledgedValue: any;

    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName: string = parameters;

        return new TIoBrokerInOutFunction_State_OnlyACK(adapter, stateName);
    }

    getValueOnRead(ioState: ioBroker.State): any {
        if (ioState) {
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState?.val;
                return ioState?.val;
            } else {
                this.adapter.log.debug(`faking CurrentState.Read for [${this.stateName}]: ${JSON.stringify(this.lastAcknowledgedValue)}`);
                return this.lastAcknowledgedValue;
            }
        } else {
            return null;
        }
    }

    getValueOnNotify(ioState: ioBroker.State): any {
        if (ioState) {
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState?.val;
                return ioState?.val;
            } else {
                this.adapter.log.debug(`discarding CurrentState.Notify for [${this.stateName}]`);
                return undefined;
            }
        } else {
            return null;
        }
    }
}




