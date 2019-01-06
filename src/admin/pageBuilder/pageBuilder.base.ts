import * as hkBridge from '../../shared/yahka.configuration';

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
}
