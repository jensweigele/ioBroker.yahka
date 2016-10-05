/// <reference path="./typings/index.d.ts" />
import HAP = require('./node_modules/hap-nodejs');

export let HAPAccessory: any = HAP.Accessory;
export let HAPService: any = HAP.Service;
export let HAPCharacteristic: any = HAP.Characteristic;

type IHAPService = any;
type IHAPCharacteristic = any;
export module Configuration {

    export interface ICharacteristicConfig {
        name: string;
        enabled: boolean;
        [key: string]: any;
    }

    export interface IServiceConfig {
        name: string;
        type: string;
        subType: string;
        characteristics: (ICharacteristicConfig)[];
        [key: string]: any;
    }

    export interface IDeviceConfig {
        name: string;
        manufacturer: string;
        model: string;
        serial: string;
        category: number;
        services: (IServiceConfig)[];
        [key: string]: any;
    }

    export interface IBridgeConfig {
        ident: string;
        name: string;
        manufacturer: string;
        model: string;
        serial: string;        
        username: string;
        pincode: string;
        port: number;
        devices: (IDeviceConfig)[];
        [key: string]: any;
    }
}

export interface IConversionFunction {
    toHomeKit(value: any): any;
    toIOBroker(value: any): any;
}

export interface IInOutFunction {
    toIOBroker(ioValue: any, callback: () => void);
    fromIOBroker(callback: (error: any, plainIOValue: any) => void);
}

export type IInOutChangeNotify = (plainIOValue: any) => void; 

export interface IHomeKitBridgeBinding {
    conversion: IConversionFunction;
    inOut: IInOutFunction;
}


export interface IHomeKitBridgeBindingFactory {
    CreateBinding(characteristicConfig: Configuration.ICharacteristicConfig, changeNotify: IInOutChangeNotify): IHomeKitBridgeBinding;
}

export class THomeKitBridge {
    private bridgeObject;
    constructor(private config: Configuration.IBridgeConfig, private FBridgeFactory: IHomeKitBridgeBindingFactory) {
        this.init();
    }

    init() {
        this.bridgeObject = this.setupBridge();
        if(this.config.devices)
            for (let device of this.config.devices) {
                let hapDevice = this.createDevice(device);
                this.bridgeObject.addBridgedAccessory(hapDevice);
            }

        this.bridgeObject.publish({
            username: this.config.username,
            port: this.config.port,
            pincode: this.config.pincode,
            category: 2
        });
    }

    private setupBridge() {
        let hapBridge: any = new HAP.Bridge(this.config.name, HAP.uuid.generate(this.config.ident));
        
        hapBridge.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, this.config.manufacturer || "not configured")
            .setCharacteristic(HAPCharacteristic.Model, this.config.model || "not configured")
            .setCharacteristic(HAPCharacteristic.SerialNumber, this.config.serial || "not configured");

        // Listen for bridge identification event
        hapBridge.on('identify', (paired, callback) => {
            console.log("Node Bridge identify:" + paired);
            callback(); // success
        });
        return hapBridge;
    }

    private createDevice(device: Configuration.IDeviceConfig) {
        let deviceID = HAP.uuid.generate(this.config.ident + ':' + device.name)
        let hapDevice: any = new HAP.Accessory(device.name, deviceID);


        hapDevice.getService(HAPService.AccessoryInformation)
            .setCharacteristic(HAPCharacteristic.Manufacturer, device.manufacturer)
            .setCharacteristic(HAPCharacteristic.Model, device.model)
            .setCharacteristic(HAPCharacteristic.SerialNumber, device.serial);

        hapDevice.on('identify', function (paired, callback) {
            console.log('device identify');
            callback(); // success
        });

        for (let serviceConfig of device.services)
            this.initService(hapDevice, serviceConfig);
        return hapDevice;
    }

    private initService(hapDevice: any, serviceConfig: Configuration.IServiceConfig) {
        if (!(serviceConfig.type in HAP.Service))
            throw Error("unknown service type:" + serviceConfig.type);

        let isNew = false;
        let hapService = hapDevice.getService(HAP.Service[serviceConfig.type]);
        if(hapService !== undefined) {
            if (hapService.subType !== serviceConfig.subType)
                hapService = undefined;
        }
        
        if(hapService === undefined) {
            hapService = new HAP.Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
            isNew = true;
        }

        for (let charactConfig of serviceConfig.characteristics)
            this.initCharacteristic(hapService, charactConfig);

        if(isNew)
            hapDevice.addService(hapService);
    }

    private initCharacteristic(hapService: IHAPService, characteristicConfig: Configuration.ICharacteristicConfig) {
        let hapCharacteristic = hapService.getCharacteristic(HAPCharacteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            console.log("unknown characteristic: " + characteristicConfig.name);
            return;
        }

        if(!characteristicConfig.enabled)
            return;
            
        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, (plainIOValue: any) => {
            console.log('[' + characteristicConfig.name + '] got a change notify event, ioValue: ' + JSON.stringify(plainIOValue));
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if(!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                return;
            }
            
            let hkValue = binding.conversion.toHomeKit(plainIOValue);
            console.log('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(plainIOValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });

        hapCharacteristic.on('set', (hkValue: any, callback: () => void, context: any) => {
            console.log('[' + characteristicConfig.name + '] got a set event, hkValue: ' + JSON.stringify(hkValue));
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if(!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                callback();
                return;
            }

            if(context === binding) {
                console.log('[' + characteristicConfig.name + '] set was initiated from ioBroker - exiting here');
                callback();
                return;
            }

            let ioValue = binding.conversion.toIOBroker(hkValue);
            binding.inOut.toIOBroker(ioValue, () => {
                console.log('[' + characteristicConfig.name + '] set was accepted by ioBroker (value: ' + JSON.stringify(ioValue) + ')');
                callback();
            });
        });

        hapCharacteristic.on('get', (hkCallback) => {
            console.log('[' + characteristicConfig.name + '] got a get event');
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if(!binding) {
                console.log('[' + characteristicConfig.name + '] no binding!');
                hkCallback('no binding', null);
                return;
            }
            
            binding.inOut.fromIOBroker((ioBrokerError, ioValue) => {
                let hkValue = binding.conversion.toHomeKit(ioValue);
                console.log('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(ioValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
                hkCallback(ioBrokerError, hkValue);
            });
        });
    }
}

let hapInited: boolean = false;

export function initHAP(storagePath: string) {
    if (hapInited)
        return;
    HAP.init(storagePath);
    hapInited = true;
}
