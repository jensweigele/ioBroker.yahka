/// <reference path="./typings/index.d.ts" />
import debug = require('debug');
debug.enable('EventedHTTPServer,HAPServer,Accessory,AccessoryLoader');
import util = require('util');
import HAP = require('hap-nodejs');
import { Configuration } from './shared/yahka.configuration';
import { importHAPCommunityTypesAndFixes } from './yahka.community.types';


// export let HAPAccessory:any = HAP.Accessory;
export let HAPService = HAP.Service;
export let HAPCharacteristic = HAP.Characteristic;

importHAPCommunityTypesAndFixes();

type IHAPService = any;

// type IHAPCharacteristic = any;

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

export interface ILogger {
    /** log message with debug level */
    debug(message: string);
    /** log message with info level */
    info(message: string);
    /** log message with info warn */
    warn(message: string);
    /** log message with info error */
    error(message: string);
}

export interface IHomeKitBridgeBindingFactory {
    CreateBinding(characteristicConfig: Configuration.ICharacteristicConfig, changeNotify: IInOutChangeNotify): IHomeKitBridgeBinding;
}

export class THomeKitBridge {
    private bridgeObject;

    constructor(private config: Configuration.IBridgeConfig, private FBridgeFactory: IHomeKitBridgeBindingFactory, private FLogger: ILogger) {
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
            category: 2,
            mdns: {
                interface: this.config.interface,
                reuseAddr: true
            }
        });
    }

    private setupBridge() {
        let hapBridge: HAPNodeJS.Accessory = new (<any>HAP).Bridge(this.config.name, HAP.uuid.generate(this.config.ident));

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

    private createDevice(device: Configuration.IDeviceConfig) {
        let devName = device.name;
        let deviceID = HAP.uuid.generate(this.config.ident + ':' + devName);
        let i = 0;
        while (this.bridgeObject.bridgedAccessories.some((a) => a.UUID == deviceID)) {
            devName = device.name + '_' + ++i;
            deviceID = HAP.uuid.generate(this.config.ident + ':' + devName);
        }

        this.FLogger.info('adding ' + devName + ' with UUID: ' + deviceID);
        let hapDevice = new HAP.Accessory(devName, deviceID);


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

    private initService(hapDevice: any, serviceConfig: Configuration.IServiceConfig) {
        if (!(serviceConfig.type in HAP.Service)) {
            throw Error('unknown service type: ' + serviceConfig.type);
        }

        let isNew = false;
        let hapService = hapDevice.getService(HAP.Service[serviceConfig.type]);
        if (hapService !== undefined && hapService.subtype !== serviceConfig.subType) {
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

    private initCharacteristic(hapService: IHAPService, characteristicConfig: Configuration.ICharacteristicConfig) {
        let hapCharacteristic = hapService.getCharacteristic(HAPCharacteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            this.FLogger.warn("unknown characteristic: " + characteristicConfig.name);
            return;
        }

        if (!characteristicConfig.enabled)
            return;

        if (characteristicConfig.properties !== undefined)
            hapCharacteristic.setProps(characteristicConfig.properties);

        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, (plainIOValue: any) => {
            this.FLogger.debug('[' + characteristicConfig.name + '] got a change notify event, ioValue: ' + JSON.stringify(plainIOValue));
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                return;
            }

            let hkValue = binding.conversion.toHomeKit(plainIOValue);
            this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(plainIOValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });

        hapCharacteristic.on('set', (hkValue: any, callback: () => void, context: any) => {
            this.FLogger.debug('[' + characteristicConfig.name + '] got a set event, hkValue: ' + JSON.stringify(hkValue));
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
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
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error('[' + characteristicConfig.name + '] no binding!');
                hkCallback('no binding', null);
                return;
            }

            binding.inOut.fromIOBroker((ioBrokerError, ioValue) => {
                let hkValue = binding.conversion.toHomeKit(ioValue);
                // check if the value can be converetd to a number
                if ((hkValue !== undefined) && (hkValue !== "")) {
                    let numValue = Number(hkValue);
                    if (!isNaN(numValue)) {
                        hkValue = numValue;
                    }
                }

                this.FLogger.debug('[' + characteristicConfig.name + '] forwarding value from ioBroker (' + JSON.stringify(ioValue) + ') to homekit as (' + JSON.stringify(hkValue) + ')');
                hkCallback(ioBrokerError, hkValue);
            });
        });
    }
}

let hapInited: boolean = false;

export function initHAP(storagePath: string, HAPdebugLogMethod: Function) {
    if (hapInited) {
        return;
    }

    HAP.init(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };

}

export function deinitHAP() {
    if (!hapInited) {
        return;
    }
    debug.disable()
    debug.log = function () {
    };
    hapInited = false;
}
