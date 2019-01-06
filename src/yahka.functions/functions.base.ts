import { IInOutFunction, IInOutChangeNotify } from "../yahka.homekit-bridge";
import { ISubscriptionRequestor, ISubscriptionRequest } from "../yahka.ioBroker-adapter";

export abstract class TYahkaFunctionBase implements ISubscriptionRequestor {
    protected debounceTimer = -1;
    public subscriptionRequests: ISubscriptionRequest[] = [];
    protected stateCache = new Map<string, ioBroker.IState>();

    constructor(protected adapter: ioBroker.IAdapter) {
    }

    protected addSubscriptionRequest(stateName: string) {
        let subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    }

    protected shouldStateBeFiltered(stateName: string, ioState: ioBroker.IState): boolean {
        return false;
    }
    
    protected readValueFromIOState(ioState: ioBroker.IState): any {
        return ioState.val;
    }
    protected readValueFromCache(stateName: string): ioBroker.IState {
        if (this.stateCache.has(stateName)) {
            return this.stateCache.get(stateName);
        } else {
            return undefined;
        }
    }

    private updateCache(stateName: string, ioState: ioBroker.IState): boolean {
        let needUpdate = false;
        if (this.stateCache.has(stateName)) {
            let curVal = this.stateCache.get(stateName);
            needUpdate = curVal.val !== ioState.val;
        } else {
            needUpdate = true;
        }

        if (needUpdate) 
            this.stateCache.set(stateName, ioState);
        return needUpdate;
    }
    subscriptionEvent(stateName: string, ioState: ioBroker.IState, callback: IInOutChangeNotify) {
        this.adapter.log.debug('change event from ioBroker via [' + stateName + ']' + JSON.stringify(ioState));
        if (this.shouldStateBeFiltered(stateName, ioState)) {
            this.adapter.log.debug('state was filtered - notification is canceled');
            return;
        }

        let cacheChange = this.updateCache(stateName, ioState);
        if(!cacheChange) {
            this.adapter.log.debug('state value already in cache - notification is canceled');
            return;
        }

        this.recalculateHomekitValues(stateName, callback);
    }

    protected recalculateHomekitValues(stateName: string, callback: IInOutChangeNotify) {
        // noop
    }
}