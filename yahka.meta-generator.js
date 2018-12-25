"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
var Characteristic_1 = require("hap-nodejs/lib/Characteristic");
var Service_1 = require("hap-nodejs/lib/Service");
require("hap-nodejs/lib/gen/HomeKitTypes");
var availableServices = Object.keys(Service_1.Service);
var availableCharacteristics = Object.keys(Characteristic_1.Characteristic);
var result = {};
var serviceDictionary = {};
var charDictionary = {};
try {
    for (var availableCharacteristics_1 = __values(availableCharacteristics), availableCharacteristics_1_1 = availableCharacteristics_1.next(); !availableCharacteristics_1_1.done; availableCharacteristics_1_1 = availableCharacteristics_1.next()) {
        var charName = availableCharacteristics_1_1.value;
        if (charName === 'super_') {
            continue;
        }
        charDictionary[Characteristic_1.Characteristic[charName].UUID] = charName;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (availableCharacteristics_1_1 && !availableCharacteristics_1_1.done && (_a = availableCharacteristics_1.return)) _a.call(availableCharacteristics_1);
    }
    finally { if (e_1) throw e_1.error; }
}
try {
    for (var availableServices_1 = __values(availableServices), availableServices_1_1 = availableServices_1.next(); !availableServices_1_1.done; availableServices_1_1 = availableServices_1.next()) {
        var serviceName = availableServices_1_1.value;
        if (serviceName === 'super_') {
            continue;
        }
        var serviceDescriptor = {
            type: serviceName,
            characteristics: {}
        };
        var serviceInstance = new Service_1.Service[serviceName]('', '');
        try {
            for (var _e = __values(serviceInstance.characteristics), _f = _e.next(); !_f.done; _f = _e.next()) {
                var char = _f.value;
                var charName = charDictionary[char.UUID];
                if (charName === undefined) {
                    continue;
                }
                var charDescriptor = { name: charName, optional: false };
                serviceDescriptor.characteristics[charName] = charDescriptor;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _g = __values(serviceInstance.optionalCharacteristics), _h = _g.next(); !_h.done; _h = _g.next()) {
                var char = _h.value;
                var charName = charDictionary[char.UUID];
                if (charName === undefined) {
                    continue;
                }
                var charDescriptor_ = { name: charName, optional: true };
                serviceDescriptor.characteristics[charName] = charDescriptor_;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
            }
            finally { if (e_4) throw e_4.error; }
        }
        serviceDictionary[serviceName] = serviceDescriptor;
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (availableServices_1_1 && !availableServices_1_1.done && (_b = availableServices_1.return)) _b.call(availableServices_1);
    }
    finally { if (e_2) throw e_2.error; }
}
console.log(JSON.stringify(serviceDictionary));
//# sourceMappingURL=yahka.meta-generator.js.map