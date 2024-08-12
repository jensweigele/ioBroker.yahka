/// <reference path="../typings/index.d.ts" />
import { ioBroker_YahkaPageBuilder } from './pageBuilder/pageBuilder.main';

type TIOBrokerAdminChangeCallback = (changeMarker?: boolean) => void;
type TIOBrokerAdminSaveCallback = (settingsObject: any) => void;


let resolveMethodForSettingsLoader: (value?: void | Thenable<void>) => void;
const ioBrokerSettingsLoaded = new Promise<void>((resolve, reject) => {
    resolveMethodForSettingsLoader = resolve;
});
declare interface IIPInformation {
    address: string
    family: string
    name: string
}
declare function getIPs(callback: (ips: IIPInformation[]) => void);

export const ioBrokerInterfaceList = new Promise<IIPInformation[]>(async (resolve, reject) => {
    await ioBrokerSettingsLoaded;
    getIPs((ipList) => {
        resolve(ipList)
    });
});

export class ioBroker_YahkaAdmin {
    settings: any;
    pageBuilder: ioBroker_YahkaPageBuilder;

    loadSettings(settingsObject: any, onChangeCallback: TIOBrokerAdminChangeCallback) {
        this.settings = settingsObject;
        if (settingsObject.cameras === undefined) {
            settingsObject.cameras = []
        }

        if (resolveMethodForSettingsLoader !== undefined) {
            resolveMethodForSettingsLoader();
        }
        resolveMethodForSettingsLoader = undefined;

        this.pageBuilder = new ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);

        onChangeCallback(false);
    }

    saveSettings(callback: TIOBrokerAdminSaveCallback) {
        this.pageBuilder.rebuildDeviceList()
        callback(this.settings);
    }
}








