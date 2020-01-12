import { ILogger } from "../yahka.homekit-bridge";

export class YahkaLogger implements ILogger {
    constructor(protected adapter: ioBroker.Adapter, private logIdentifier: string) {

    }

    public debug(message: string) {
        return this.adapter.log.debug("[" + this.logIdentifier + "] " + message);
    }
    public info(message: string) {
        return this.adapter.log.info("[" + this.logIdentifier + "] " + message);
    }
    public warn(message: string) {
        return this.adapter.log.warn("[" + this.logIdentifier + "] " + message);
    }
    public error(message: string) {
        return this.adapter.log.error("[" + this.logIdentifier + "] " + message);
    }
}
