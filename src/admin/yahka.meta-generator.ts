import { Characteristic, Service } from 'hap-nodejs';
import { importHAPCommunityTypesAndFixes } from '../yahka.community.types';
import { IDictionary } from '../shared/yahka.configuration';
import { IHAPServiceDefinition, IHAPCharacteristicDefintion } from './admin.config';

importHAPCommunityTypesAndFixes();
export function generateMetaDataDictionary(): IDictionary<IHAPServiceDefinition> {

    let availableServices = Object.keys(Service);
    let availableCharacteristics = Object.keys(Characteristic);
    let result = {};
    let serviceDictionary = {};
    let charDictionary = {};

    function getProperties(char: Characteristic) {
        return char.props;
    }

    for (let charName of availableCharacteristics) {
        if (charName === 'super_') {
            continue;
        }
        charDictionary[Characteristic[charName].UUID] = charName;
    }

    const serviceExclusionList = ['super_', 'serialize', 'deserialize'];

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
            let charDescriptor: IHAPCharacteristicDefintion = { name: charName, optional: false, properties: getProperties(char) };
            serviceDescriptor.characteristics[charName] = charDescriptor;
        }
        for (let char of serviceInstance.optionalCharacteristics) {
            let charName = charDictionary[char.UUID];
            if (charName === undefined) {
                continue;
            }
            let charDescriptor: IHAPCharacteristicDefintion = { name: charName, optional: true, properties: getProperties(char) };
            serviceDescriptor.characteristics[charName] = charDescriptor;
        }

        serviceDictionary[serviceName] = serviceDescriptor;
    }

    return serviceDictionary;
}