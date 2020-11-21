/// <reference path="./typings/index.d.ts" />
import debug = require('debug');
import util = require('util');
import { Configuration } from './shared/yahka.configuration';
import { Accessory, Characteristic, Service } from 'hap-nodejs';
import { IHasIHomeKitBridgeBinding, IHomeKitBridgeBindingFactory, ILogger, IHomeKitBridgeBinding } from './yahka.interfaces';

type IHAPCharacteristic = Characteristic & IHasIHomeKitBridgeBinding;

export class YahkaServiceInitializer {

    constructor(private FBridgeFactory: IHomeKitBridgeBindingFactory, private FLogger: ILogger) {

    }
    public initServices(hapDevice: Accessory, serviceConfigs: Configuration.IServiceConfig[]) {
        if (serviceConfigs == null) {
            return;
        }

        for (const service of serviceConfigs) {
            this.initService(hapDevice, service);
        }
    }

    public initService(hapDevice: Accessory, serviceConfig: Configuration.IServiceConfig) {
        if (serviceConfig.enabled === false) {
            this.FLogger.debug(`[${hapDevice.displayName}] service ${serviceConfig.name} is disabled`);
            return;
        }

        if (!(serviceConfig.type in Service)) {
            throw Error(`[${hapDevice.displayName}] unknown service type: ${serviceConfig.type}`);
        }

        this.FLogger.debug(`[${hapDevice.displayName}] adding Service ${serviceConfig.name}`);

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

    private initCharacteristic(hapService: Service, characteristicConfig: Configuration.ICharacteristicConfig) {
        const logName = `[${hapService.displayName}.${characteristicConfig.name}]`;
        if (!characteristicConfig.enabled) {
            return;
        }

        let hapCharacteristic = hapService.getCharacteristic(Characteristic[characteristicConfig.name]) as IHAPCharacteristic;
        if (!hapCharacteristic) {
            this.FLogger.warn(`${logName} unknown characteristic: ${characteristicConfig.name}`);
            return;
        }

        if (characteristicConfig.properties !== undefined)
            hapCharacteristic.setProps(characteristicConfig.properties);

        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, (plainIOValue: any) => {
            this.FLogger.debug(`${logName} got a change notify event, ioValue: ${JSON.stringify(plainIOValue)}`);
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error(`${logName} no binding!`);
                return;
            }

            let hkValue = binding.conversion.toHomeKit(plainIOValue);
            this.FLogger.debug(`${logName} forwarding value from ioBroker (${JSON.stringify(plainIOValue)}) to homekit as (${JSON.stringify(hkValue)})`);
            hapCharacteristic.setValue(hkValue, undefined, binding);
        });

        hapCharacteristic.on('set', (hkValue: any, callback: () => void, context: any) => {
            this.FLogger.debug(`${logName} got a set event, hkValue: ${JSON.stringify(hkValue)}`);
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error(`${logName} no binding!`);
                callback();
                return;
            }

            if (context === binding) {
                this.FLogger.debug(`${logName} set was initiated from ioBroker - exiting here`);
                callback();
                return;
            }

            let ioValue = binding.conversion.toIOBroker(hkValue);
            binding.inOut.toIOBroker(ioValue, () => {
                this.FLogger.debug(`${logName} set was accepted by ioBroker (value: ${JSON.stringify(ioValue)})`);
                callback();
            });
        });

        hapCharacteristic.on('get', (hkCallback) => {
            this.FLogger.debug(`${logName} got a get event`);
            let binding: IHomeKitBridgeBinding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error(`${logName} no binding!`);
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

                this.FLogger.debug(`${logName} forwarding value from ioBroker (${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
                hkCallback(ioBrokerError, hkValue);
            });
        });
    }
}