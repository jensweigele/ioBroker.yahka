/// <reference path="../typings/index.d.ts" />
import { ioBroker_YahkaPageBuilder } from './pageBuilder/pageBuilder.main';

type TIOBrokerAdminChangeCallback = (changeMarker?: boolean) => void;
type TIOBrokerAdminSaveCallback = (settingsObject: any) => void;


export class ioBroker_YahkaAdmin {
    settings: any;

    loadSettings(settingsObject: any, onChangeCallback: TIOBrokerAdminChangeCallback) {
        this.settings = settingsObject;
        if (settingsObject.cameras === undefined) {
            settingsObject.cameras = []
        }

        new ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);

        onChangeCallback(false);
    }


    saveSettings(callback: TIOBrokerAdminSaveCallback) {
        callback(this.settings);
    }
}








