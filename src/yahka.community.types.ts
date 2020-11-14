import { Characteristic, Formats, Units, Perms, Service, uuid } from 'hap-nodejs';
import * as HapCommunity from '../hap-nodejs-community-types';

export class CurrentTemperatureWithNegativeValues extends Characteristic.CurrentTemperature {
    constructor() {
        super();
        this.setProps({
            format: Formats.FLOAT,
            unit: Units.CELSIUS,
            maxValue: 100,
            minValue: -99,
            minStep: 0.1,
            perms: [Perms.READ, Perms.NOTIFY]
        });
    }
}


let hapTypesImported = false;
export function importHAPCommunityTypesAndFixes() {

    if (hapTypesImported)
        return;

    Characteristic.CurrentTemperature = CurrentTemperatureWithNegativeValues;

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
            Characteristic["Community: " + type] = typeFct;
        } else if (typeFct.length == 2) { // service
            Service["Community: " + type] = typeFct;
        }
    }
    hapTypesImported = true;
}
