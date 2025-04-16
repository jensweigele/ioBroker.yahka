/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import {IDictionary} from '../../shared/yahka.configuration';
import {ISelectListEntry} from '../admin.config';
import {
    ConfigPageBuilder_Base,
    IConfigPageBuilder,
    IConfigPageBuilderDelegate,
    TValidatorFunction
} from './pageBuilder.base';
import {translateFragment} from '../admin.translation';
import {createTemplateElement} from '../admin.pageLoader';
import {Utils} from '../admin.utils';
import {ConfigPageBuilder_ServicePanel} from './pageBuilder.servicePanel';
import {ioBrokerInterfaceList} from '../yahka.admin';
import PageBuilderAccessoryCategories from "./pageBuilder.accessoryCategories";

let accessoryCategories: IDictionary<ISelectListEntry> = PageBuilderAccessoryCategories;

export class ConfigPageBuilder_CustomDevice extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = true;
    public removeDeviceAvailable: boolean = true;
    public duplicateDeviceAvailable: boolean = true;
    private deviceInfoPanelTemplate: HTMLTemplateElement;
    private servicePanelBuilder: ConfigPageBuilder_ServicePanel;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.servicePanelBuilder = new ConfigPageBuilder_ServicePanel(delegate);
        this.deviceInfoPanelTemplate = createTemplateElement(require('./pageBuilder.customDevice.infoPanel.inc.html'));
    }

    public async refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!hkBridge.Configuration.isDeviceConfig(config)) {
            return;
        }

        let lastPane: HTMLElement = await this.buildDeviceInformationPanel(config, devicePanel);
        const servicePanelContainer = devicePanel.querySelector('.yahka_service_container');
        for (let serviceConfig of config.services) {
            let servicePanel = this.servicePanelBuilder.createServicePanel(config.services, serviceConfig);
            servicePanelContainer.appendChild(servicePanel);
            lastPane = servicePanel;
        }

        if (AFocusLastPanel && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                let heading = <HTMLElement>lastPane.querySelector('.heading');
                if (heading) heading.click();
            }
        }

        const addServiceButton = devicePanel.querySelector<HTMLButtonElement>('.yahka_add_service');
        addServiceButton.addEventListener('click', () => {
            if (!hkBridge.Configuration.isDeviceConfig(config) && !hkBridge.Configuration.isIPCameraConfig(config)) {
                return;
            }

            config.services.push({
                name: '',
                subType: '',
                type: '',
                characteristics: []
            });

            this.delegate.refreshDevicePanel(config, true);
            this.delegate.changeCallback();
        });
    }

    public styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        if (!hkBridge.Configuration.isDeviceConfig(deviceConfig)) {
            return false;
        }
        let iconName = 'mif-question';
        let cat: ISelectListEntry;
        if (accessoryCategories !== undefined) {
            if ((cat = accessoryCategories[deviceConfig.category])) {
                iconName = cat['icon'];
            }
        }
        let listIcon = listItem.querySelector('.device-icon');
        listIcon.innerHTML = iconName;

        listItem.classList.remove('yellow');
        listItem.classList.remove('lighten-5');

        if (false === deviceConfig.enabled) {
            listItem.classList.add('yellow');
            listItem.classList.add('lighten-5');
        }

        return true;
    }

    private async buildDeviceInformationPanel(deviceConfig: hkBridge.Configuration.IDeviceConfig, devicePane: HTMLElement): Promise<HTMLElement> {
        let devInfoFragment = <DocumentFragment>document.importNode(this.deviceInfoPanelTemplate.content, true);
        let devInfoPanel = <HTMLElement>devInfoFragment.querySelector('.yahka_device_info_panel');
        translateFragment(devInfoFragment);

        let inputHelper = (
            selector: string,
            propertyName: keyof hkBridge.Configuration.IDeviceConfig,
            selectList?: IDictionary<ISelectListEntry> | ISelectListEntry[],
            validator: TValidatorFunction = undefined,
            checkDefault = true
        ) => {
            let input = <HTMLInputElement>devInfoPanel.querySelector(selector);
            let errorElement = <HTMLElement>devInfoPanel.querySelector(`${selector}_error`);

            this.fillSelectByListEntries(input, selectList);

            let value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? checkDefault : value;
                input.addEventListener('change', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator));
            } else {
                Utils.setInputValue(input, value);
                input.addEventListener('input', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator));
                input.addEventListener('change', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator));
            }
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        inputHelper('.name', 'name', undefined, () => !this.delegate.deviceIsUnique(deviceConfig));
        inputHelper('.group', 'groupString');
        inputHelper('.enabledCharacteristic', 'enabled');
        inputHelper('.manufacturer', 'manufacturer');
        inputHelper('.model', 'model');
        inputHelper('.serial', 'serial');
        inputHelper('.firmware', 'firmware');
        inputHelper('.category', 'category', accessoryCategories);
        inputHelper('.publish_as_own_device', 'publishAsOwnDevice', undefined, undefined, false);
        inputHelper('.useLegacyAdvertiser', 'useLegacyAdvertiser', undefined, undefined, false);
        inputHelper('.useCiaoAdvertiser', 'useCiaoAdvertiser', undefined, undefined, false);
        inputHelper('.username', 'username');
        inputHelper('.pincode', 'pincode');
        inputHelper('.port', 'port');
        inputHelper('.availableStateIobState', 'availableState');
        let ipList = await ioBrokerInterfaceList;
        const ipListForSelectBox = ipList
            .filter((a) => a.family === 'ipv4')
            .map((a) => {
                return { value: a.address, text: a.name };
            });
        inputHelper('.interface', 'interface', ipListForSelectBox);

        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    }

    private handleDeviceMetaDataChange(
        deviceConfig: hkBridge.Configuration.IDeviceConfig,
        propertyName: string,
        errorElement: HTMLElement,
        validator: TValidatorFunction,
        ev: Event
    ) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        const inputValue = inputTarget.type === 'checkbox' ? inputTarget.checked : inputTarget.value;
        deviceConfig[propertyName] = inputValue;
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(deviceConfig);
        this.delegate.changeCallback();
    }
}
