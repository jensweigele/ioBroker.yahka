"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Characteristic_1 = require("hap-nodejs/lib/Characteristic");
var Service_1 = require("hap-nodejs/lib/Service");
require("hap-nodejs/lib/gen/HomeKitTypes");
var HapCommunity = require("hap-nodejs-community-types");
function importHAPCommunityTypes() {
    var fakeBridge = {
        hap: {
            Service: Service_1.Service,
            Characteristic: Characteristic_1.Characteristic
        }
    };
    var fakeOptions = {};
    var communityTypes = HapCommunity(fakeBridge, fakeOptions);
    for (var type in communityTypes) {
        var typeFct = communityTypes[type];
        if (typeFct.length == 0) {
            Characteristic_1.Characteristic[type] = typeFct;
        }
        else if (typeFct.length == 2) {
            Service_1.Service[type] = typeFct;
        }
    }
}
exports.importHAPCommunityTypes = importHAPCommunityTypes;
//# sourceMappingURL=yahka.community.types.js.map