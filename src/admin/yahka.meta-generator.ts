import { CompleterResult } from 'readline';
import { Characteristic } from 'hap-nodejs/lib/Characteristic';
import { Service } from 'hap-nodejs/lib/Service';
import 'hap-nodejs/lib/gen/HomeKitTypes';
import {importHAPCommunityTypes} from '../yahka.community.types';

importHAPCommunityTypes();
export function generateMetaDataDictionary() {

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


    for (let serviceName of availableServices) {
        if (serviceName === 'super_') {
            continue;
        }

        let serviceDescriptor = {
            type: serviceName,
            characteristics: {}
        };

        let serviceInstance = new Service[serviceName]('', '');
        for (let char of serviceInstance.characteristics) {
            let charName = charDictionary[char.UUID];
            if (charName === undefined) {
                continue;
            }
            let charDescriptor = { name: charName, optional: false, properties: getProperties(char) };
            serviceDescriptor.characteristics[charName] = charDescriptor;
        }
        for (let char of serviceInstance.optionalCharacteristics) {
            let charName = charDictionary[char.UUID];
            if (charName === undefined) {
                continue;
            }
            let charDescriptor_ = { name: charName, optional: true, properties: getProperties(char) };
            serviceDescriptor.characteristics[charName] = charDescriptor_;
        }

        serviceDictionary[serviceName] = serviceDescriptor;
    }

    return serviceDictionary;
}