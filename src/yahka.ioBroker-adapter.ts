import { THomeKitIPCamera } from './yahka.homekit-ipcamera';
import { Configuration } from './shared/yahka.configuration';
import {IInOutFunction} from './yahka.homekit-bridge';
/// <reference path="./typings/index.d.ts" />
import * as hkBridge from './yahka.homekit-bridge';
// import * as mac from './node_modules/macaddress';
import {functionFactory} from './yahka.functions/functions.factory';


export type TSubscriptionType = 'state' | 'object';

export interface ISubscriptionRequest {
    subscriptionType: TSubscriptionType;
    subscriptionIdentifier: string;
    subscriptionEvent: (ioValue: any, callback: hkBridge.IInOutChangeNotify) => void;
}
export interface ISubscriptionRequestor {
    subscriptionRequests: ISubscriptionRequest[];
}

function isSubscriptionRequestor(param: Object): param is ISubscriptionRequestor {
    return param["subscriptionRequests"] !== undefined &&
        param["subscriptionRequests"] instanceof Array;
}
interface ICustomCharacteristicConfig extends Configuration.ICharacteristicConfig {
    conversionFunction?:string;
    conversionParameters?:any;
    inOutFunction?:string;
    inOutParameters?:any;
}

function isCustomCharacteristicConfig(config:Configuration.ICharacteristicConfig):config is ICustomCharacteristicConfig {
    if (!config)
        return false;
    let myConfig = <ICustomCharacteristicConfig>config;
    return (myConfig.inOutFunction !== undefined) || (myConfig.conversionFunction !== undefined) || (myConfig.inOutParameters !== undefined);
}

export class TIOBrokerAdapter implements hkBridge.IHomeKitBridgeBindingFactory {
    stateToEventMap:Map<string, hkBridge.IInOutChangeNotify[]> = new Map<string, hkBridge.IInOutChangeNotify[]>();
    objectToEventMap:Map<string, hkBridge.IInOutChangeNotify[]> = new Map<string, hkBridge.IInOutChangeNotify[]>();
    devices: Array<Object> = [];
    verboseHAPLogging:boolean = false;

    constructor(private adapter:ioBroker.IAdapter, private controllerPath) {
        adapter.on('ready', this.adapterReady.bind(this));
        adapter.on('stateChange', this.handleState.bind(this));
        adapter.on('message', this.handleMessage.bind(this));
        adapter.on('unload', this.handleUnload.bind(this));
    }

    private adapterReady() {
        hkBridge.initHAP(this.controllerPath + '/' + this.adapter.systemConfig.dataDir + this.adapter.name + '.' + this.adapter.instance + '.hapdata', this.handleHAPLogEvent.bind(this));

        this.adapter.log.info('adapter ready, checking config');
        let config = this.adapter.config;
        this.createHomeKitBridges(config);
        this.createCameraDevices(config);
    }

    private createHomeKitBridges(config: any) {
        let bridgeConfig:Configuration.IBridgeConfig = config.bridge;
        if (!config.firstTimeInitialized) {
            this.adapter.log.info('first time initialization');
            this.adapter.log.debug('system config:' + JSON.stringify(this.adapter.systemConfig));

            bridgeConfig.ident = "Yahka-" + this.adapter.instance;
            bridgeConfig.name = bridgeConfig.ident;
            bridgeConfig.serial = bridgeConfig.ident;
            let usr = [];
            for (let i = 0; i < 6; i++)
                usr[i] = ('00' + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
            bridgeConfig.username = usr.join(':');
            bridgeConfig.pincode = '123-45-678';
            bridgeConfig.port = 0;
            bridgeConfig.verboseLogging = false;
            config.firstTimeInitialized = true;
            this.adapter.extendForeignObject('system.adapter.' + this.adapter.name + '.' + this.adapter.instance, {native: config}, undefined);
        }
        this.verboseHAPLogging = bridgeConfig.verboseLogging == true;

        this.adapter.log.debug('creating bridge');
        this.devices.push(new hkBridge.THomeKitBridge(config.bridge, this, this.adapter.log));        
    }

    private createCameraDevices(config: any) {
        let cameraArray:Array<Configuration.ICameraConfig> = config.cameras;
        if (cameraArray === undefined)
            return;
        
        for (let cameraConfig of cameraArray) {
            this.adapter.log.debug('creating camera');
            this.devices.push(new THomeKitIPCamera(cameraConfig, this.adapter.log));
        }
    }

    private handleHAPLogEvent(message) {
        if (this.verboseHAPLogging)
            this.adapter.log.debug(message);
    }

    private handleState(id:string, state:ioBroker.IState) {
        // Warning, state can be null if it was deleted
        let notifyArray = this.stateToEventMap.get(id);
        if (!notifyArray) {
            //this.adapter.log.debug('nobody subscribed for this state');
            return;
        }
        this.adapter.log.debug('got a stateChange for [' + id + ']');

        for (let method of notifyArray)
            method(state);
    }

    private handleMessage(obj:any) {
        if (typeof obj === 'object' && obj.message) {
            if (obj.command === 'send') {
                // Send response in callback if required
                if (obj.callback)
                    this.adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
            }
        }
    }

    private handleUnload(callback) {
        try {
            this.adapter.log.info('cleaning up ...');
            hkBridge.deinitHAP();
            this.adapter.log.info('cleaned up ...');
            callback();
        } catch (e) {
            callback();
        }
    }

    private handleInOutSubscriptionRequest(requestor:ISubscriptionRequestor, changeNotify:hkBridge.IInOutChangeNotify) {
        if (requestor.subscriptionRequests.length == 0)
            return;

        for (let subscriptionRequest of requestor.subscriptionRequests) {
            let changeInterceptor = (ioValue:any) => subscriptionRequest.subscriptionEvent(ioValue, changeNotify);


            if (subscriptionRequest.subscriptionType === 'state') {
                let existingArray = this.stateToEventMap.get(subscriptionRequest.subscriptionIdentifier);
                if (!existingArray) {
                    existingArray = [changeInterceptor];
                    this.stateToEventMap.set(subscriptionRequest.subscriptionIdentifier, existingArray);
                } else
                    existingArray.push(changeInterceptor);

                this.adapter.subscribeForeignStates(subscriptionRequest.subscriptionIdentifier);
                this.adapter.log.debug('added subscription for: [' + subscriptionRequest.subscriptionType + ']' + subscriptionRequest.subscriptionIdentifier);
                this.adapter.getForeignState(subscriptionRequest.subscriptionIdentifier, (_, value) => changeInterceptor(value));
            } else {
                this.adapter.log.warn('unknown subscription type: ' + subscriptionRequest.subscriptionType);
            }
        }

    }

    public CreateBinding(characteristicConfig:Configuration.ICharacteristicConfig, changeNotify:hkBridge.IInOutChangeNotify):hkBridge.IHomeKitBridgeBinding {
        if (isCustomCharacteristicConfig(characteristicConfig)) {
            let inoutFunc = functionFactory.createInOutFunction(this.adapter, characteristicConfig.inOutFunction, characteristicConfig.inOutParameters);
            if (inoutFunc === undefined) {
                this.adapter.log.error('[' + characteristicConfig.name + '] could not create inout-function: ' + characteristicConfig.inOutFunction + ' with params: ' + JSON.stringify(characteristicConfig.inOutParameters));
                return undefined;
            }

            let convFunc = functionFactory.createConversionFunction(this.adapter, characteristicConfig.conversionFunction, characteristicConfig.conversionParameters);
            if (convFunc === undefined) {
                this.adapter.log.error('[' + characteristicConfig.name + '] could not create conversion-function: ' + characteristicConfig.conversionFunction + ' with params: ' + JSON.stringify(characteristicConfig.conversionParameters));
                return undefined;
            }
            
            if(isSubscriptionRequestor(inoutFunc)) {
                this.handleInOutSubscriptionRequest(inoutFunc, changeNotify);
            }
            
            return {
                conversion: convFunc,
                inOut: inoutFunc
            }
        }
        return null;
    }
}
