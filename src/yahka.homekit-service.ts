/// <reference path="./typings/index.d.ts" />
import {Configuration} from './shared/yahka.configuration';
import {Accessory, Characteristic, CharacteristicSetCallback, HAPStatus, Service} from 'hap-nodejs';
import {
    IHasIHomeKitBridgeBinding,
    IHomeKitBridgeBinding,
    IHomeKitBridgeBindingFactory,
    ILogger
} from './yahka.interfaces';

type IHAPCharacteristic = Characteristic & IHasIHomeKitBridgeBinding;

export class YahkaServiceInitializer {

    constructor(private FBridgeFactory: IHomeKitBridgeBindingFactory, private FLogger: ILogger) {

    }
    public initServices(hapDevice: Accessory, serviceConfigs: Configuration.IServiceConfig[], availabilityIobState?: string) {
        if (serviceConfigs == null) {
            return;
        }

        let iobStateGiven = availabilityIobState !== undefined && availabilityIobState.trim() !== '';

        let availableStateBinding = iobStateGiven ? this.FBridgeFactory.CreateBinding(
                {
                    name: 'Dummy',
                    enabled: true,
                    customCharacteristic: true,
                    properties: [],
                    inOutFunction: 'ioBroker.State',
                    inOutParameters: availabilityIobState
                },
                (dummy: any) => {}
            )
            : null;

        for (const service of serviceConfigs) {
            this.initService(hapDevice, service, availableStateBinding);
        }

        for (const service of serviceConfigs) {
            this.establishServiceLinks(hapDevice, service);
        }
    }

    private initService(hapDevice: Accessory, serviceConfig: Configuration.IServiceConfig, availabilityBinding: IHomeKitBridgeBinding) {
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
            const existingSubType = hapService.subtype ? hapService.subtype : '';
            if (existingSubType != serviceConfig.subType)
                hapService = undefined;
        }

        if (hapService === undefined) {
            hapService = new Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
            isNew = true;
        }

        if (serviceConfig.isHidden != null) {
            hapService.setHiddenService(serviceConfig.isHidden);
        }

        if (serviceConfig.isPrimary != null) {
            hapService.setPrimaryService(serviceConfig.isPrimary);
        }

        for (let charactConfig of serviceConfig.characteristics) {
            this.initCharacteristic(hapService, charactConfig, availabilityBinding);
        }

        if (isNew) {
            hapDevice.addService(hapService);
        }
    }

    private establishServiceLinks(hapDevice: Accessory, serviceConfig: Configuration.IServiceConfig) {
        if (serviceConfig.enabled == false) {
            return
        }
        if (serviceConfig.linkTo == null) {
            return;
        }
        if (serviceConfig.linkTo == '') {
            return;
        }

        const existingService = hapDevice.getService(serviceConfig.name);
        const linkToService = hapDevice.getService(serviceConfig.linkTo);
        if (existingService == null || linkToService == null) {
            this.FLogger.error(`[${serviceConfig.name}] unable to establish link between ${serviceConfig.linkTo} and ${serviceConfig.name} - one of the services was not found or is disabled`);
            return;
        }
        linkToService.addLinkedService(existingService);
        this.FLogger.debug(`[${serviceConfig.name}] established link from ${existingService.displayName} to ${linkToService.displayName}`);
    }


    private initCharacteristic(hapService: Service, characteristicConfig: Configuration.ICharacteristicConfig, availabilityBinding: IHomeKitBridgeBinding) {
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
            try {
                hapCharacteristic.setValue(hkValue, binding);
            } catch (e) {
                this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
            }
        });

        this.getValueFromIOBroker(hapCharacteristic.binding, (error, ioValue, hkValue) => {
            this.FLogger.debug(`${logName} initializing homekit with value from ioBroker(${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
            try {
                hapCharacteristic.setValue(hkValue, hapCharacteristic.binding);
            } catch (e) {
                this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
            }
        });

        hapCharacteristic.on('set', (hkValue: any, callback: CharacteristicSetCallback, context: any) => {
            let availableCallback = () => {
                this.FLogger.debug(`${logName} got a set event, hkValue: ${JSON.stringify(hkValue)} `);
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
                    this.FLogger.debug(`${logName} set was accepted by ioBroker(value: ${JSON.stringify(ioValue)})`);
                    callback();
                });
            }

            if (availabilityBinding === null || availabilityBinding === undefined) {
                availableCallback();

                return;
            }

            availabilityBinding.inOut.fromIOBroker((error: any, plainIOValue: any) => {
                if (!plainIOValue) {
                    callback(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
                    return;
                }

                availableCallback();
            });
        });

        hapCharacteristic.on('get', (hkCallback) => {
            this.FLogger.debug(`${logName} got a get event`);
            const availableCallback = () => {
                this.getValueFromIOBroker(hapCharacteristic.binding, (error, ioValue, hkValue) => {
                    this.FLogger.debug(`${logName} forwarding value from ioBroker(${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
                    try {
                        hkCallback(error, hkValue);
                    } catch (e) {
                        this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
                    }
                });
            };

            if (availabilityBinding === null || availabilityBinding === undefined) {
                availableCallback();

                return;
            }

            availabilityBinding.inOut.fromIOBroker((error: any, plainIOValue: any) => {
                if (!plainIOValue) {
                    hkCallback(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
                    return;
                }
                availableCallback();
            });
        });
    }

    private getValueFromIOBroker(binding: IHomeKitBridgeBinding, callback: (error: any, ioValue: any, hkValue: string | number | undefined) => void) {
        if (!binding) {
            callback('no binding', null, null);
            return;
        }

        binding.inOut.fromIOBroker((ioBrokerError, ioValue) => {
            let hkValue = binding.conversion.toHomeKit(ioValue);
            // check if the value can be converted to a number
            if ((hkValue !== undefined) && (hkValue !== "")) {
                let numValue = Number(hkValue);
                if (!isNaN(numValue)) {
                    hkValue = numValue;
                }
            }
            callback(ioBrokerError, ioValue, hkValue);
        });
    }
}