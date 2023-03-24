/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import { ConfigPageBuilder_Base, IConfigPageBuilder, IConfigPageBuilderDelegate, TValidatorFunction } from './pageBuilder.base';
import { translateFragment } from '../admin.translation';
import { createTemplateElement } from '../admin.pageLoader';
import { IDictionary } from '../../shared/yahka.configuration';
import { ISelectListEntry } from '../admin.config';
import { ioBrokerInterfaceList } from '../yahka.admin';

export class ConfigPageBuilder_BridgeConfig extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = false;
    public removeDeviceAvailable: boolean = false;
    public duplicateDeviceAvailable: boolean = false;
    bridgeConfigPanelTemplate: HTMLTemplateElement;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.bridgeConfigPanelTemplate = createTemplateElement(require('./pageBuilder.bridgeConfig.main.inc.html'));
    }

    public async refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!hkBridge.Configuration.isBridgeConfig(config)) {
            return;
        }
        let bridgeConfigFragment = <DocumentFragment>document.importNode(this.bridgeConfigPanelTemplate.content, true);
        translateFragment(bridgeConfigFragment);

        let inputHelper = (selector: string, propertyName: string, selectList?: IDictionary<ISelectListEntry> | ISelectListEntry[], validator: TValidatorFunction = undefined) => {
            let input = <HTMLSelectElement>bridgeConfigFragment.querySelector(selector);
            let errorElement = <HTMLElement>bridgeConfigFragment.querySelector(selector + '_error');
            this.fillSelectByListEntries(input, selectList);
            let value = config[propertyName];
            if (value !== undefined) {
                input.value = value;
            } else {
                input.value = '';
            }
            input.addEventListener('input', this.handleBridgeMetaDataChange.bind(this, config, propertyName, errorElement, validator));
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        let checkboxHelper = (selector: string, propertyName: string, validator: TValidatorFunction = undefined) => {
            let input = <HTMLInputElement>bridgeConfigFragment.querySelector(selector);
            let errorElement = <HTMLElement>bridgeConfigFragment.querySelector(`${selector}_error`);

            const value = config[propertyName];
            input.checked = value;
            input.addEventListener('click', this.handleBridgeMetaDataChange.bind(this, config, propertyName, errorElement, validator));
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        inputHelper('#name', 'name', undefined, () => !this.delegate.deviceIsUnique(config));
        inputHelper('#group', 'groupString');
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#firmware', 'firmware');
        inputHelper('#username', 'username');
        inputHelper('#pincode', 'pincode');
        inputHelper('#port', 'port');
        let ipList = await ioBrokerInterfaceList;
        let ipListForSelectBox = ipList
            .filter((a) => a.family === 'ipv4')
            .map((a) => {
                return { value: a.address, text: a.name };
            });
        inputHelper('#interface', 'interface', ipListForSelectBox);
        checkboxHelper('#useLegacyAdvertiser', 'useLegacyAdvertiser');
        checkboxHelper('#useCiaoAdvertiser', 'useCiaoAdvertiser');
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
        if (inputTarget.type == 'checkbox') {
            bridgeConfig[propertyName] = inputTarget.checked;
        } else {
            bridgeConfig[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(bridgeConfig);
        this.delegate.changeCallback();
    }
}
