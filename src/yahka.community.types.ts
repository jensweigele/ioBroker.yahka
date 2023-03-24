import { Characteristic, Formats, Units, Perms, Service, uuid } from 'hap-nodejs';
import * as HapCommunity from '../hap-nodejs-community-types';

let hapTypesImported = false;
export function importHAPCommunityTypesAndFixes() {

    if (hapTypesImported)
        return;

    let fakeBridge = {
        hap: {
            Service: Service,
            Characteristic: Characteristic,
            uuid: uuid
        }
    }
    let fakeOptions = {};
    let communityTypes = HapCommunity(fakeBridge, fakeOptions);

    for (let type in communityTypes) {
        let typeFct: Function = communityTypes[type];
        if (typeFct.length == 0) {  // characteristic
            Characteristic[`Community: ${type}`] = typeFct;
        } else if (typeFct.length == 2) { // service
            Service[`Community: ${type}`] = typeFct;
        }
    }
    hapTypesImported = true;
}
