import * as hkBridge from '../../shared/yahka.configuration';
import { IDictionary } from '../../shared/yahka.configuration';
import { ISelectListEntry } from '../admin.config';

export type TValidatorFunction = () => boolean;
export interface IConfigPageBuilder {
    refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement);
    styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean;
    readonly addServiceAvailable: boolean;
    readonly removeDeviceAvailable: boolean;
    readonly dupliacteDeviceAvailable: boolean;

}

export interface IConfigPageBuilderDelegate {
    readonly selectedDeviceConfig: hkBridge.Configuration.IBaseConfigNode;
    readonly bridgeSettings: hkBridge.Configuration.IBridgeConfig;
    cameraConfigs: [hkBridge.Configuration.ICameraConfig];
    setSelectedDeviceConfig(deviceConfig: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean): void;
    refreshDeviceListEntry(deviceConfig: hkBridge.Configuration.IBaseConfigNode);
    refreshDevicePanel(deviceConfig: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean): void;
    changeCallback();
    deviceIsUnique(deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean;

    getPageBuilderByConfig(deviceConfig: hkBridge.Configuration.IBaseConfigNode): IConfigPageBuilder;
}

export class ConfigPageBuilder_Base {
    constructor(protected delegate: IConfigPageBuilderDelegate) {
    }

    protected refreshSimpleErrorElement(errorElement: HTMLElement, validator: TValidatorFunction) {
        let errorVisible = false;
        if (validator)
            errorVisible = validator();
        if (errorElement)
            errorElement.classList.toggle('validationError', errorVisible);
    }
    private fillSelectByEntryList(selectElement: HTMLSelectElement, selectListArray: ISelectListEntry[]) {
        for (let item of selectListArray) {
            let optElem = document.createElement('option');
            optElem.value = item.value;
            optElem.text = item.text;
            selectElement.add(optElem);
        }
    }
    private fillSelectByDict(selectElement: HTMLSelectElement, dictionary: IDictionary<ISelectListEntry>) {
        for (let key in dictionary) {
            let optElem = document.createElement('option');
            optElem.value = key;
            optElem.text = dictionary[key].text;
            selectElement.add(optElem);
        }
    }

    protected fillSelectByListEntries(selectElement: HTMLElement, entries: IDictionary<ISelectListEntry> | ISelectListEntry[]) {
        if (!(selectElement instanceof HTMLSelectElement)) {
            return;
        }

        if (entries === undefined)
            return;

        if (Array.isArray(entries))
            this.fillSelectByEntryList(selectElement, entries);
        else
            this.fillSelectByDict(selectElement, entries);
    }

    protected fillSelectByArray(selectElement: HTMLSelectElement, stringlist: string[]) {
        for (let itemName of stringlist) {
            let optElem = document.createElement('option');
            optElem.value = itemName;
            optElem.text = itemName;
            selectElement.add(optElem);
        }
    }


}
