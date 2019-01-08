/// <reference path="../typings/index.d.ts" />
import { ioBroker_YahkaPageBuilder } from './pageBuilder/pageBuilder.main';

type TIOBrokerAdminChangeCallback = (changeMarker?: boolean) => void;
type TIOBrokerAdminSaveCallback = (settingsObject: any) => void;


var resolveMethodForSettingsLoader: (value?: void | Thenable<void>) => void;
const ioBrokerSettingsLoaded = new Promise<void>((resolve, reject) => {
    resolveMethodForSettingsLoader = resolve;
});
declare function getIPs(callback: (ips: ioBroker.IIPInformation[]) => void);

export const ioBrokerInterfaceList = new Promise<ioBroker.IIPInformation[]>(async (resolve, reject) => {
    await ioBrokerSettingsLoaded;
    getIPs((ipList) => {
        resolve(ipList)
    }
    );
});


export class ioBroker_YahkaAdmin {
    settings: any;

    loadSettings(settingsObject: any, onChangeCallback: TIOBrokerAdminChangeCallback) {
        this.settings = settingsObject;
        if (settingsObject.cameras === undefined) {
            settingsObject.cameras = []
        }

        if (resolveMethodForSettingsLoader !== undefined)
            resolveMethodForSettingsLoader();
        resolveMethodForSettingsLoader = undefined;

        new ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);

        onChangeCallback(false);
    }


    saveSettings(callback: TIOBrokerAdminSaveCallback) {
        callback(this.settings);
    }
}








