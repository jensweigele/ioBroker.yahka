import { Characteristic, Service } from 'hap-nodejs';
import { importHAPCommunityTypesAndFixes } from '../yahka.community.types';
import { IDictionary } from '../shared/yahka.configuration';
import { IHAPServiceDefinition, IHAPCharacteristicDefintion } from './admin.config';

interface IServiceDictionary {
    services: IDictionary<IHAPServiceDefinition>
    characteristics: IDictionary<IHAPCharacteristicDefintion>
}

importHAPCommunityTypesAndFixes();

export function generateMetaDataDictionary(): IServiceDictionary {

    let availableServices = Object.keys(Service);
    let availableCharacteristics = Object.keys(Characteristic);

    const services = buildServiceDictionary(availableServices, availableCharacteristics);
    const characteristics = buildCharacteristicDictionary(availableCharacteristics);
    return {
        services,
        characteristics
    };
}

function createCharacteristicDescriber(name: string, optional: boolean, char: Characteristic): IHAPCharacteristicDefintion {
    return {
        uuid: char?.UUID,
        name: name,
        displayName: char?.displayName,
        optional: optional,
        properties: char?.props
    }
}

function buildServiceDictionary(availableServices: string[], availableCharacteristics: string[]): IDictionary<IHAPServiceDefinition> {
    const serviceDictionary: IDictionary<IHAPServiceDefinition> = {};
    const serviceExclusionList = ['super_', 'serialize', 'deserialize'];
    let charDictionary = {};

    for (let charName of availableCharacteristics) {
        if (charName === 'super_') {
            continue;
        }
        charDictionary[Characteristic[charName].UUID] = charName;
    }

    for (let serviceName of availableServices) {
        if (serviceExclusionList.includes(serviceName)) {
            continue;
        }

        let serviceDescriptor: IHAPServiceDefinition = {
            type: serviceName,
            characteristics: {}
        };

        let serviceInstance = new Service[serviceName]('', '');
        for (let char of serviceInstance.characteristics) {
            let charName = charDictionary[char.UUID];
            if (charName === undefined) {
                continue;
            }

            serviceDescriptor.characteristics[charName] = createCharacteristicDescriber(charName, false, char);
        }

        for (let char of serviceInstance.optionalCharacteristics) {
            let charName = charDictionary[char.UUID];
            if (charName === undefined) {
                continue;
            }

            serviceDescriptor.characteristics[charName] = createCharacteristicDescriber(charName, true, char);
        }

        serviceDictionary[serviceName] = serviceDescriptor;
    }

    return serviceDictionary;
}

function buildCharacteristicDictionary(availableCharacteristics: string[]): IDictionary<IHAPCharacteristicDefintion> {
    const characteristicExclusionList = [
        'super_',
        'Formats',
        'Units',
        'Perms',
        'serialize',
        'deserialize'
    ];
    const characteristicDictionary: IDictionary<IHAPCharacteristicDefintion> = {};
    for (let charName of availableCharacteristics) {
        if (characteristicExclusionList.includes(charName)) {
            continue;
        }

        let charInstance = new Characteristic[charName]();
        characteristicDictionary[charName] = createCharacteristicDescriber(charName, true, charInstance);
    }
    return characteristicDictionary;
}
