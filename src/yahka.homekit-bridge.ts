/// <reference path="./typings/index.d.ts" />
import debug = require('debug');
import util = require('node:util');
import { Configuration } from './shared/yahka.configuration';
import { importHAPCommunityTypesAndFixes } from './yahka.community.types';
import {
    Accessory, Bridge, uuid, Characteristic,
    Service, MDNSAdvertiser, HAPStorage,
} from 'hap-nodejs';
import { YahkaServiceInitializer } from './yahka.homekit-service';
import { IHomeKitBridgeBindingFactory, ILogger } from './yahka.interfaces';
import { readFileSync } from 'node:fs';
const pjson = JSON.parse(readFileSync(`${__dirname}/package.json`).toString());

importHAPCommunityTypesAndFixes();

type IPublishingMethod = () => void;

export class THomeKitBridge {
    private bridgeObject: Bridge;
    private serviceInitializer: YahkaServiceInitializer;
    constructor(private config: Configuration.IBridgeConfig, FBridgeFactory: IHomeKitBridgeBindingFactory, private FLogger: ILogger) {
        this.serviceInitializer = new YahkaServiceInitializer(FBridgeFactory, FLogger);
        this.init();
    }

    public init() {
        this.bridgeObject = this.setupBridge();
        const devicesToPublish: IPublishingMethod[] = [
            () => {
                let advertiser = this.config.useLegacyAdvertiser ? MDNSAdvertiser.BONJOUR : MDNSAdvertiser.AVAHI;
                advertiser = this.config.useCiaoAdvertiser ? MDNSAdvertiser.CIAO : advertiser;
                this.FLogger.info(`publishing bridge ${this.config.name} on ${this.config.interface ?? '0.0.0.0'} using ${advertiser}`);
                this.bridgeObject.publish({
                    username: this.config.username,
                    port: this.config.port,
                    pincode: this.config.pincode,
                    category: 2,
                    bind: this.config.interface != '' ? this.config.interface : undefined,
                    advertiser,
                });
            },
        ];

        if (this.config.devices) {
            for (let device of this.config.devices) {
                if (device.enabled === false) {
                    continue;
                }
                const hapDevice = this.createDevice(device);

                if (device.publishAsOwnDevice) {
                    devicesToPublish.push(() => {
                        let advertiser = device.useLegacyAdvertiser ? MDNSAdvertiser.BONJOUR : MDNSAdvertiser.AVAHI;
                        advertiser = device.useCiaoAdvertiser ? MDNSAdvertiser.CIAO : advertiser;
                        this.FLogger.info(`publishing device ${device.name} on ${device.interface ?? '0.0.0.0'} using ${advertiser}`);
                        hapDevice.publish({
                            username: device.username,
                            port: device.port,
                            pincode: device.pincode,
                            category: device.category,
                            advertiser,
                            bind: device.interface,
                        });
                    });
                } else {
                    try {
                        this.bridgeObject.addBridgedAccessory(hapDevice);
                    } catch (e) {
                        this.FLogger.warn(e);
                        this.FLogger.warn(`Error by adding: ${JSON.stringify(device)}`);
                    }
                }
            }
        }

        devicesToPublish.forEach((m) => m());
    }

    private setupBridge() {
        let hapBridge = new Bridge(this.config.name, uuid.generate(this.config.ident));

        let infoService = hapBridge.getService(Service.AccessoryInformation);
        infoService.setCharacteristic(Characteristic.Manufacturer, this.config.manufacturer || 'not configured');
        infoService.setCharacteristic(Characteristic.Model, this.config.model || 'not configured');
        infoService.setCharacteristic(Characteristic.SerialNumber, this.config.serial || 'not configured');
        if (this.config.firmware !== undefined && this.config.firmware !== '') {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, this.config.firmware);
        } else {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, pjson.version);
        }

        // Listen for bridge identification event
        hapBridge.on('identify', (paired, callback) => {
            this.FLogger.debug(`Node Bridge identify:${paired}`);
            callback(); // success
        });
        return hapBridge;
    }

    private createDevice(device: Configuration.IDeviceConfig) {
        let devName = device.name;
        let deviceID = uuid.generate(`${this.config.ident}:${devName}`);
        let i = 0;
        while (this.bridgeObject.bridgedAccessories.some((a) => a.UUID == deviceID)) {
            devName = `${device.name}_${++i}`;
            deviceID = uuid.generate(`${this.config.ident}:${devName}`);
        }

        this.FLogger.info(`adding ${devName} with UUID: ${deviceID}`);
        let hapDevice = new Accessory(devName, deviceID);

        let infoService = hapDevice.getService(Service.AccessoryInformation);
        infoService.setCharacteristic(Characteristic.Manufacturer, device.manufacturer || 'not configured');
        infoService.setCharacteristic(Characteristic.Model, device.model || 'not configured');
        infoService.setCharacteristic(Characteristic.SerialNumber, device.serial || 'not configured');
        if (device.firmware !== undefined && device.firmware !== '') {
            infoService.setCharacteristic(Characteristic.FirmwareRevision, device.firmware);
        }

        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug(`[${device.name}] device identify`);
            callback(); // success
        });

        this.serviceInitializer.initServices(hapDevice, device.services, device.availableState);
        return hapDevice;
    }
}

let hapInited: boolean = false;
let originalLogMethod = debug.log;

export function initHAP(storagePath: string, HAPdebugLogMethod: Function) {
    if (hapInited) {
        return;
    }

    HAPStorage.setCustomStoragePath(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };
}

export function deinitHAP() {
    if (!hapInited) {
        return;
    }
    debug.disable();
    debug.log = originalLogMethod;
    hapInited = false;
}
