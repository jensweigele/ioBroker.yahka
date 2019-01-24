import { IInOutFunction, IInOutChangeNotify, ILogger } from "../yahka.homekit-bridge";
import { ISubscriptionRequestor, ISubscriptionRequest } from "../yahka.ioBroker-adapter";
import { YahkaLogger } from "../shared/yahka.logger";

export abstract class TYahkaFunctionBase implements ISubscriptionRequestor {
    public subscriptionRequests: ISubscriptionRequest[] = [];
    protected stateCache = new Map<string, ioBroker.IState>();
    protected log: ILogger;

    constructor(protected adapter: ioBroker.IAdapter, private logIdentifier: string = "") {
        this.log = new YahkaLogger(this.adapter, this.logIdentifier);
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
        this.log.debug('change event from ioBroker via [' + stateName + ']' + JSON.stringify(ioState));
        if (this.shouldStateBeFiltered(stateName, ioState)) {
            this.log.debug('state was filtered - notification is canceled');
            return;
        }

        let cacheChange = this.updateCache(stateName, ioState);
        if(!cacheChange) {
            this.log.debug('state value already in cache - notification is canceled');
            return;
        }

        this.cacheChanged(stateName, callback);

    }

    protected cacheChanged(stateName: string, callback: IInOutChangeNotify) {

    }



}

