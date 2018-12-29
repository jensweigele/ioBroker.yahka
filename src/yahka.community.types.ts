import { Characteristic } from 'hap-nodejs/lib/Characteristic';
import { Service } from 'hap-nodejs/lib/Service';
import 'hap-nodejs/lib/gen/HomeKitTypes';
import * as HapCommunity from 'hap-nodejs-community-types';

export function importHAPCommunityTypes() {
    let fakeBridge = {
        hap: {
            Service: Service,
            Characteristic: Characteristic
        }
    }
    let fakeOptions = {};
    let communityTypes = HapCommunity(fakeBridge, fakeOptions);

    for (let type in communityTypes) {
        let typeFct: Function = communityTypes[type];
        if (typeFct.length == 0) {  // characteristic
            Characteristic[type] = typeFct;
        } else if (typeFct.length == 2) { // service
            Service[type] = typeFct;
        }
    }
}
