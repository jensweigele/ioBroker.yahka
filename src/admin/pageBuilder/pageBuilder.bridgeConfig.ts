
/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import { ConfigPageBuilder_Base, IConfigPageBuilder, IConfigPageBuilderDelegate, TValidatorFunction } from './pageBuilder.base';
import { translateFragment } from '../admin.translation';
import { createTemplateElement } from '../admin.pageLoader';

export class ConfigPageBuilder_BridgeConfig extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = false;
    public removeDeviceAvailable: boolean = false;
    public dupliacteDeviceAvailable: boolean = false;
    bridgeConfigPanelTemplate: HTMLTemplateElement;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.bridgeConfigPanelTemplate = createTemplateElement(require('./pageBuilder.bridgeConfig.main.inc.html'));
    }

    public refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!hkBridge.Configuration.isBridgeConfig(config)) {
            return
        }
        let bridgeConfigFragment = <DocumentFragment>document.importNode(this.bridgeConfigPanelTemplate.content, true);
        translateFragment(bridgeConfigFragment);

        let inputHelper = (selector: string, propertyName: string, validator: TValidatorFunction = undefined) => {
            let input = <HTMLInputElement>bridgeConfigFragment.querySelector(selector);
            let errorElement = <HTMLElement>bridgeConfigFragment.querySelector(selector + '_error');
            let value = config[propertyName];
            if (value !== undefined) {
                input.value = value;
            } else {
                input.value = '';
            }
            input.addEventListener("input", this.handleBridgeMetaDataChange.bind(this, config, propertyName, errorElement, validator));
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        let checkboxHelper = (selector: string, propertyName: string, validator: TValidatorFunction = undefined) => {
            let input = <HTMLInputElement>bridgeConfigFragment.querySelector(selector);
            let errorElement = <HTMLElement>bridgeConfigFragment.querySelector(selector + '_error');

            let value = config[propertyName];
            input.checked = value;
            input.addEventListener("click", this.handleBridgeMetaDataChange.bind(this, config, propertyName, errorElement, validator));
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        inputHelper('#name', 'name', () => !this.delegate.deviceIsUnique(config));
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#username', 'username');
        inputHelper('#pincode', 'pincode');
        inputHelper('#port', 'port');
        checkboxHelper('#verboseLogging', 'verboseLogging');

        devicePanel.appendChild(bridgeConfigFragment);
    }

    public styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        let listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-tree';
        listItem.classList.add('fg-grayDark');
        return true;
    }

    handleBridgeMetaDataChange(bridgeConfig: hkBridge.Configuration.IBridgeConfig, propertyName: string, errorElement: HTMLElement, validator: TValidatorFunction, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            bridgeConfig[propertyName] = inputTarget.checked;
        } else {
            bridgeConfig[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(bridgeConfig);
        this.delegate.changeCallback();
    }

}
