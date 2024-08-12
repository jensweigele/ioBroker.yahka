import { IInOutChangeNotify, ILogger } from '../yahka.interfaces';
import { ISubscriptionRequester, ISubscriptionRequest } from '../yahka.ioBroker-adapter';
import { YahkaLogger } from '../shared/yahka.logger';

export abstract class TYahkaFunctionBase implements ISubscriptionRequester {
    public subscriptionRequests: ISubscriptionRequest[] = [];
    protected stateCache = new Map<string, ioBroker.State>();
    protected log: ILogger;

    constructor(protected adapter: ioBroker.Adapter, private logIdentifier: string = '') {
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

    protected shouldStateBeFiltered(stateName: string, ioState: ioBroker.State): boolean {
        return false;
    }

    protected readValueFromCache(stateName: string): ioBroker.State {
        if (this.stateCache.has(stateName)) {
            return this.stateCache.get(stateName);
        } else {
            return undefined;
        }
    }

    private updateCache(stateName: string, ioState: ioBroker.State): boolean {
        let needUpdate = false;
        if (this.stateCache.has(stateName)) {
            let curVal = this.stateCache.get(stateName);
            needUpdate = curVal?.val !== ioState?.val;
        } else {
            needUpdate = true;
        }

        if (needUpdate)
            this.stateCache.set(stateName, ioState);
        return needUpdate;
    }
    subscriptionEvent(stateName: string, ioState: ioBroker.State, callback: IInOutChangeNotify) {
        this.log.debug(`change event from ioBroker via [${stateName}]${JSON.stringify(ioState)}`);
        if (this.shouldStateBeFiltered(stateName, ioState)) {
            this.log.debug('state was filtered - notification is canceled');
            return;
        }

        let cacheChange = this.updateCache(stateName, ioState);
        if (!cacheChange) {
            this.log.debug('state value already in cache - notification is canceled');
            return;
        }

        this.cacheChanged(stateName, callback);

    }

    protected cacheChanged(stateName: string, callback: IInOutChangeNotify) {

    }



}

