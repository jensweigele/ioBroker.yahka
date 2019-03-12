import { Characteristic } from 'hap-nodejs/lib/Characteristic';
import { Service } from 'hap-nodejs/lib/Service';
import 'hap-nodejs/lib/gen/HomeKitTypes';
import * as HapCommunity from '../hap-nodejs-community-types';
import { inherits } from 'util';
import * as uuid from 'hap-nodejs/lib/util/uuid';

let hapTypesImported = false;
export function importHAPCommunityTypesAndFixes() {

    if (hapTypesImported)
        return;

    let curTempCharacteristicFunction = <Function>Characteristic.CurrentTemperature;
    let curTempCharacteristicType = Characteristic.CurrentTemperature;

    if (curTempCharacteristicFunction !== undefined) {
        Characteristic.CurrentTemperature = function () {
            curTempCharacteristicFunction.call(this);
            this.setProps({ minValue: -99 });
        }
        inherits(Characteristic.CurrentTemperature, curTempCharacteristicFunction);
        Characteristic.CurrentTemperature.UUID = curTempCharacteristicType.UUID;
    }

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
