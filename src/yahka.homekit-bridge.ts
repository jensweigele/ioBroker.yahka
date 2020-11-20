/// <reference path="./typings/index.d.ts" />
import debug = require('debug');
import util = require('util');
import { Configuration } from './shared/yahka.configuration';
import { importHAPCommunityTypesAndFixes } from './yahka.community.types';
import { Accessory, Bridge, uuid, Characteristic, Service, init as hapInit } from 'hap-nodejs';
var pjson = require('../package.json');

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

        this.FLogger.info(`pubishing bridge ${this.config.name} on ${this.config.interface ?? '0.0.0.0'}`);
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
        let hapBridge: Accessory = new Bridge(this.config.name, uuid.generate(this.config.ident));

        let infoService = hapBridge.getService(Service.AccessoryInformation);
        infoService.setCharacteristic(Characteristic.Manufacturer, this.config.manufacturer || 'not configured');
        infoService.setCharacteristic(Characteristic.Model, this.config.model || 'not configured');
        infoService.setCharacteristic(Characteristic.SerialNumber, this.config.serial || 'not configured');
        if ((this.config.firmware !== undefined) && (this.config.firmware !== "")) {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, this.config.firmware);
        } else {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, pjson.version);
        }

        // Listen for bridge identification event
        hapBridge.on('identify', (paired, callback) => {
            this.FLogger.debug('Node Bridge identify:' + paired);
            callback(); // success
        });
        return hapBridge;
    }

    private createDevice(device: Configuration.IDeviceConfig) {
        let devName = device.name;
        let deviceID = uuid.generate(this.config.ident + ':' + devName);
        let i = 0;
        while (this.bridgeObject.bridgedAccessories.some((a) => a.UUID == deviceID)) {
            devName = device.name + '_' + ++i;
            deviceID = uuid.generate(this.config.ident + ':' + devName);
        }

        this.FLogger.info('adding ' + devName + ' with UUID: ' + deviceID);
        let hapDevice = new Accessory(devName, deviceID);

        let infoService = hapDevice.getService(Service.AccessoryInformation);
        infoService.setCharacteristic(Characteristic.Manufacturer, device.manufacturer || 'not configured');
        infoService.setCharacteristic(Characteristic.Model, device.model || 'not configured');
        infoService.setCharacteristic(Characteristic.SerialNumber, device.serial || 'not configured');
        if ((device.firmware !== undefined) && (device.firmware !== "")) {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, device.firmware);
        }

        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug('device identify');
            callback(); // success
        });

        for (let serviceConfig of device.services)
            this.initService(hapDevice, serviceConfig);
        return hapDevice;
    }

    private initService(hapDevice: any, serviceConfig: Configuration.IServiceConfig) {
        if (!(serviceConfig.type in Service)) {
            throw Error('unknown service type: ' + serviceConfig.type);
        }

        let isNew = false;
        let hapService = hapDevice.getService(Service[serviceConfig.type]);
        if (hapService !== undefined) {
            const existingSubType = hapService.subtype ? hapService.subtype : ""
            if (existingSubType != serviceConfig.subType)
                hapService = undefined;
        }

        if (hapService === undefined) {
            hapService = new Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
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
        let hapCharacteristic = hapService.getCharacteristic(Characteristic[characteristicConfig.name]);
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
let originalLogMethod = debug.log;

export function initHAP(storagePath: string, HAPdebugLogMethod: Function) {
    if (hapInited) {
        return;
    }

    hapInit(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };
}

export function deinitHAP() {
    if (!hapInited) {
        return;
    }
    debug.disable()
    debug.log = originalLogMethod;
    hapInited = false;
}
