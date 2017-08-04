/// <reference path="./typings/index.d.ts" />
import debug = require('debug');
//debug.enable(<any>'*');
import util = require('util');
import HAP = require('hap-nodejs');


// export let HAPAccessory:any = HAP.Accessory;
export let HAPService:any = HAP.Service;
export let HAPCharacteristic:any = HAP.Characteristic;

type IHAPService = any;

// type IHAPCharacteristic = any;

export module Configuration {

    export interface ICharacteristicConfig {
        name:string;
        enabled:boolean;
        [key:string]:any;
    }

    export interface IServiceConfig {
        name:string;
        type:string;
        subType:string;
        characteristics:(ICharacteristicConfig)[];
        [key:string]:any;
    }

    export interface IDeviceConfig {
        name:string;
        manufacturer:string;
        model:string;
        enabled:boolean;
        serial:string;
        category:number;
        services:(IServiceConfig)[];
        [key:string]:any;
    }

    export interface IBridgeConfig {
        ident:string;
        name:string;
        manufacturer:string;
        model:string;
        serial:string;
        username:string;
        pincode:string;
        port:number;
        verboseLogging:boolean;
        devices:(IDeviceConfig)[];
        [key:string]:any;
    }
}

export interface IConversionFunction {
    toHomeKit(value:any):any;
    toIOBroker(value:any):any;
}

export interface IInOutFunction {
    toIOBroker(ioValue:any, callback:() => void);
    fromIOBroker(callback:(error:any, plainIOValue:any) => void);
}

export type IInOutChangeNotify = (plainIOValue:any) => void;

export interface IHomeKitBridgeBinding {
    conversion:IConversionFunction;
    inOut:IInOutFunction;
}

export interface ILogger {
    /** log message with debug level */
    debug(message:string);
    /** log message with info level */
    info(message:string);
    /** log message with info warn */
    warn(message:string);
    /** log message with info error */
    error(message:string);
}

export interface IHomeKitBridgeBindingFactory {
    CreateBinding(characteristicConfig:Configuration.ICharacteristicConfig, changeNotify:IInOutChangeNotify):IHomeKitBridgeBinding;
}

export class THomeKitBridge {
    private bridgeObject;

    constructor(private config:Configuration.IBridgeConfig, private FBridgeFactory:IHomeKitBridgeBindingFactory, private FLogger:ILogger) {
        this.init();
    }

    init() {
        this.bridgeObject = this.setupBridge();
        if (this.config.devices)
            for (let device of this.config.devices) {
                if (device.enabled === false) {
                    continue;
                }
                let hapDevice = this.createDevice(device);
                try {
                    this.bridgeObject.addBridgedAccessory(hapDevice);
                } catch (e) {
                    this.FLogger.warn(e);
                    this.FLogger.warn('Error by adding: ' + JSON.stringify(device));
                }
            }

        this.bridgeObject.publish({
            username: this.config.username,
            port: this.config.port,
            pincode: this.config.pincode,
            category: 2
        });
    }

    private setupBridge() {
        let hapBridge:any = new HAP.Bridge(this.config.name, HAP.uuid.generate(this.config.ident));

        hapBridge.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, this.config.manufacturer || "not configured")
            .setCharacteristic(HAPCharacteristic.Model, this.config.model || "not configured")
            .setCharacteristic(HAPCharacteristic.SerialNumber, this.config.serial || "not configured");

        // Listen for bridge identification event
        hapBridge.on('identify', (paired, callback) => {
            this.FLogger.debug('Node Bridge identify:' + paired);
            callback(); // success
        });
        return hapBridge;
    }

    private createDevice(device:Configuration.IDeviceConfig) {
        let deviceID = HAP.uuid.generate(this.config.ident + ':' + device.name);
        let hapDevice:any = new HAP.Accessory(device.name, deviceID);


        hapDevice.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, device.manufacturer || 'not configured')
            .setCharacteristic(HAPCharacteristic.Model, device.model || 'not configured')
            .setCharacteristic(HAPCharacteristic.SerialNumber, device.serial || 'not configured');

        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug('device identify');
            callback(); // success
        });

        for (let serviceConfig of device.services)
            this.initService(hapDevice, serviceConfig);
        return hapDevice;
    }

    private initService(hapDevice:any, serviceConfig:Configuration.IServiceConfig) {
        if (!(serviceConfig.type in HAP.Service)) {
            throw Error('unknown service type: ' + serviceConfig.type);
        }

        let isNew = false;
        let hapService = hapDevice.getService(HAP.Service[serviceConfig.type]);
        if (hapService !== undefined && hapService.subType !== serviceConfig.subType) {
            hapService = undefined;
        }

        if (hapService === undefined) {
            hapService = new HAP.Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
            isNew = true;
        }

        for (let charactConfig of serviceConfig.characteristics) {
            this.initCharacteristic(hapService, charactConfig);
        }

        if (isNew) {
            hapDevice.addService(hapService);
        }
    }

    private initCharacteristic(hapService:IHAPService, characteristicConfig:Configuration.ICharacteristicConfig) {
        let hapCharacteristic = hapService.getCharacteristic(HAPCharacteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            this.FLogger.warn("unknown characteristic: " + characteristicConfig.name);
            return;
        }

        if (!characteristicConfig.enabled)
            return;

        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, (plainIOValue:any) => {
            this.FLogger.debug('[' + characteristicConfig.name + '] got a change notify event, ioValue: ' + JSON.stringify(plainIOValue));
            let binding:IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                return;
            }

            let hkValue = binding.conversion.toHomeKit(plainIOValue);
            this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(plainIOValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });

        hapCharacteristic.on('set', (hkValue:any, callback:() => void, context:any) => {
            this.FLogger.debug('[' + characteristicConfig.name + '] got a set event, hkValue: ' + JSON.stringify(hkValue));
            let binding:IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                callback();
                return;
            }

            if (context === binding) {
                this.FLogger.debug('[' + characteristicConfig.name + '] set was initiated from ioBroker - exiting here');
                callback();
                return;
            }

            let ioValue = binding.conversion.toIOBroker(hkValue);
            binding.inOut.toIOBroker(ioValue, () => {
                this.FLogger.debug('[' + characteristicConfig.name + '] set was accepted by ioBroker (value: ' + JSON.stringify(ioValue) + ')');
                callback();
            });
        });

        hapCharacteristic.on('get', (hkCallback) => {
            this.FLogger.debug('[' + characteristicConfig.name + '] got a get event');
            let binding:IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                hkCallback('no binding', null);
                return;
            }

            binding.inOut.fromIOBroker((ioBrokerError, ioValue) => {
                let hkValue = binding.conversion.toHomeKit(ioValue);
                this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(ioValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
                hkCallback(ioBrokerError, hkValue);
            });
        });
    }
}

let hapInited:boolean = false;

export function initHAP(storagePath:string, HAPdebugLogMethod:Function) {
    if (hapInited) {
        return;
    }
    
    HAP.init(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };

}
