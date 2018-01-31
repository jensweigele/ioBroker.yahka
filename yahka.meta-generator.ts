import {CompleterResult} from 'readline';
import {Characteristic}  from './node_modules/hap-nodejs/lib/Characteristic';
import {Service} from './node_modules/hap-nodejs/lib/Service';
import './node_modules/hap-nodejs/lib/gen/HomeKitTypes';

let availableServices = Object.keys(Service);
let availableCharacteristics = Object.keys(Characteristic);
let result = {};
let serviceDictionary = {};
let charDictionary = {};

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
        serviceDescriptor.characteristics[charName] = {name: charName, optional: false}; //charDescriptor
}
    for (let char of serviceInstance.optionalCharacteristics) {
        let charName = charDictionary[char.UUID];
        if (charName === undefined) {
            continue;
        }
        serviceDescriptor.characteristics[charName] = {name: charName, optional: true}; //charDescriptor
    }

    serviceDictionary[serviceName] = serviceDescriptor;
}

console.log(JSON.stringify(serviceDictionary));