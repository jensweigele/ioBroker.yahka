"use strict";
var Characteristic_1 = require("./node_modules/hap-nodejs/lib/Characteristic");
var Service_1 = require("./node_modules/hap-nodejs/lib/Service");
require("./node_modules/hap-nodejs/lib/gen/HomeKitTypes");
var availableServices = Object.keys(Service_1.Service);
var availableCharacteristics = Object.keys(Characteristic_1.Characteristic);
var result = {};
var serviceDictionary = {};
var charDictionary = {};
for (var _i = 0, availableCharacteristics_1 = availableCharacteristics; _i < availableCharacteristics_1.length; _i++) {
    var charName = availableCharacteristics_1[_i];
    if (charName === 'super_')
        continue;
    charDictionary[Characteristic_1.Characteristic[charName].UUID] = charName;
}
for (var _a = 0, availableServices_1 = availableServices; _a < availableServices_1.length; _a++) {
    var serviceName = availableServices_1[_a];
    if (serviceName === 'super_')
        continue;
    var serviceDescriptor = {
        type: serviceName,
        characteristics: {}
    };
    var serviceInstance = new Service_1.Service[serviceName]('', '');
    for (var _b = 0, _c = serviceInstance.characteristics; _b < _c.length; _b++) {
        var char = _c[_b];
        var charName = charDictionary[char.UUID];
        if (charName === undefined)
            continue;
        var charDescriptor = { name: charName, optional: false };
        serviceDescriptor.characteristics[charName] = charDescriptor;
    }
    for (var _d = 0, _e = serviceInstance.optionalCharacteristics; _d < _e.length; _d++) {
        var char = _e[_d];
        var charName = charDictionary[char.UUID];
        if (charName === undefined)
            continue;
        var charDescriptor = { name: charName, optional: true };
        serviceDescriptor.characteristics[charName] = charDescriptor;
    }
    serviceDictionary[serviceName] = serviceDescriptor;
}
console.log(JSON.stringify(serviceDictionary));
//# sourceMappingURL=yahka.meta-generator.js.map