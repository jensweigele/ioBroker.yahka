
/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import { generateMetaDataDictionary } from '../yahka.meta-generator';
import { IDictionary } from '../../shared/yahka.configuration';
import { IHAPServiceDefinition, IHAPCharacteristicDefintion, ISelectListEntry } from '../admin.config';
import { ConfigPageBuilder_Base, IConfigPageBuilder, IConfigPageBuilderDelegate, TValidatorFunction } from './pageBuilder.base';
import { IParameterEditorDelegate, IParameterEditor } from '../parameterEditor/parameterEditor.base';
import { ParameterEditorFactory, inoutFunctions, convFunctions } from '../parameterEditor/parameterEditor.factory';
import { ParameterEditor_Null } from '../parameterEditor/parameterEditor.null';
import { translateFragment } from '../admin.translation';
import { createTemplateElement } from '../admin.pageLoader';
import { Utils } from '../admin.utils';


declare function getObject(id: string, callback: (error: any, object: any) => void);


let accessoryCategories: IDictionary<ISelectListEntry> = {};
getObject('yahka.meta._accessoryCategories', (_, object) => {
    accessoryCategories = object.native;
});
let HAPServiceDictionary: IDictionary<IHAPServiceDefinition> = generateMetaDataDictionary();

export class ConfigPageBuilder_CustomDevice extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = true;
    public removeDeviceAvailable: boolean = true;
    public dupliacteDeviceAvailable: boolean = true;
    deviceInfoPanelTemplate: HTMLTemplateElement;
    deviceServicePanelTemplate: HTMLTemplateElement;
    characteristicRow: HTMLTemplateElement;
    characteristicPropRow: HTMLTemplateElement;

    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.deviceInfoPanelTemplate = createTemplateElement(require('./pageBuilder.customDevice.infoPanel.inc.html'));
        this.deviceServicePanelTemplate = createTemplateElement(require('./pageBuilder.customDevice.servicePanel.inc.html'));
        this.characteristicRow = createTemplateElement(require('./pageBuilder.customDevice.characteristicRow.inc.html'));
        this.characteristicPropRow = createTemplateElement(require('./pageBuilder.customDevice.characteristic.propRow.inc.html'));
    }

    public refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!hkBridge.Configuration.isDeviceConfig(config)) {
            return
        }

        let lastPane: HTMLElement = this.buildDeviceInformationPanel(config, devicePanel);
        for (let serviceConfig of config.services) {
            let servicePanel = this.createServicePanel(config, serviceConfig);
            devicePanel.appendChild(servicePanel);
            lastPane = servicePanel;
        }

        if (AFocusLastPanel && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                let heading = (<HTMLElement>lastPane.querySelector('.heading'));
                if (heading)
                    heading.click();
            }
        }
    }


    public styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        if (!hkBridge.Configuration.isDeviceConfig(deviceConfig)) {
            return false
        }
        let iconClass = "mif-question";
        let cat: ISelectListEntry;
        if (accessoryCategories !== undefined) {
            if (cat = accessoryCategories[deviceConfig.category])
                iconClass = cat['icon'];
        }
        let listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);

        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;

    }

    buildDeviceInformationPanel(deviceConfig: hkBridge.Configuration.IDeviceConfig, devicePane: HTMLElement): HTMLElement {
        let devInfoFragment = <DocumentFragment>document.importNode(this.deviceInfoPanelTemplate.content, true);
        let devInfoPanel = <HTMLElement>devInfoFragment.querySelector('#yahka_device_info_panel');
        translateFragment(devInfoFragment);

        let inputHelper = (selector: string, propertyName: string, selectList?: IDictionary<ISelectListEntry>, validator: TValidatorFunction = undefined) => {
            let input = <HTMLInputElement>devInfoPanel.querySelector(selector);
            let errorElement = <HTMLElement>devInfoPanel.querySelector(selector + '_error');

            this.fillSelectByListEntries(input, selectList);

            let value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator))
            } else {
                Utils.setInputValue(input, value);
                input.addEventListener('input', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator));
            }
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        inputHelper('#name', 'name', undefined, () => !this.delegate.deviceIsUnique(deviceConfig));
        inputHelper('#enabled', 'enabled');
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#firmware', 'firmware');
        inputHelper('#category', 'category', accessoryCategories);

        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    }

    createServicePanel(deviceConfig: hkBridge.Configuration.IDeviceConfig, serviceConfig: hkBridge.Configuration.IServiceConfig): HTMLElement {
        let servicePanel = <DocumentFragment>document.importNode(this.deviceServicePanelTemplate.content, true);
        let frameNode = <HTMLElement>servicePanel.querySelector('#yahka_service_panel');
        translateFragment(servicePanel);
        let inputHelper = (selector: string, configName: string, popuplateServices?: boolean, eventHandler?) => {
            let input = <HTMLSelectElement>frameNode.querySelector(selector);
            if (popuplateServices === true) {
                let selectList: string[] = Object.keys(HAPServiceDictionary);
                this.fillSelectByArray(input, selectList);
            }

            if (serviceConfig)
                Utils.setInputValue(input, serviceConfig[configName]);

            if (eventHandler !== undefined)
                input.addEventListener('input', eventHandler);
            else
                input.addEventListener('input', this.handleServiceMetaDataChange.bind(this, serviceConfig, frameNode, configName));
        };

        this.refreshServicePanelCaption(serviceConfig, frameNode);
        inputHelper('#service_name', 'name');
        inputHelper('#service_type', 'type', true, this.handleServiceTypeChange.bind(this, serviceConfig, frameNode));
        inputHelper('#service_subtype', 'subType');

        this.buildCharacteristicTable(serviceConfig, frameNode);

        // bind delete buttton
        frameNode.querySelector('#yakha_delete_service').addEventListener('click', () => {
            let idx = deviceConfig.services.indexOf(serviceConfig);
            if (idx > -1) {
                deviceConfig.services.splice(idx, 1);
                this.delegate.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
            this.delegate.setSelectedDeviceConfig(undefined, false);
        });

        return frameNode;
    }

    refreshServicePanelCaption(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        servicePanel.querySelector('#yahka_service_caption').textContent = serviceConfig.name + '[' + serviceConfig.type + ']';
    }

    findHAPCharacteristic(serviceDef: IHAPServiceDefinition, characteristicName: string): IHAPCharacteristicDefintion {
        if (!serviceDef)
            return undefined;
        let x;
        if (x = serviceDef.characteristics[characteristicName])
            return x;
        return undefined;
    }

    findConfigCharacteristic(service: hkBridge.Configuration.IServiceConfig, characteristicName: string): hkBridge.Configuration.ICharacteristicConfig {
        if (!service) {
            return undefined;
        }

        for (let cfg of service.characteristics) {
            if (cfg.name == characteristicName) {
                return cfg;
            }
        }

        return undefined;
    }

    isEmptyCharacteristic(charConfig: hkBridge.Configuration.ICharacteristicConfig): boolean {
        if (charConfig === undefined)
            return true;
        if (charConfig.name === '')
            return true;


        if ((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined))
            return true;

        return false;
    }

    removeCharacteristic(serviceConfig: hkBridge.Configuration.IServiceConfig, charConfig: hkBridge.Configuration.ICharacteristicConfig) {
        if (serviceConfig === undefined) {
            return;
        }

        let idx = serviceConfig.characteristics.indexOf(charConfig);
        if (idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.delegate.changeCallback();
        }
    }

    buildCharacteristicTable(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        let serviceDef = HAPServiceDictionary[serviceConfig.type];
        let createdCharacteristics: IDictionary<[string, boolean, DocumentFragment]> = {};
        for (let charConfig of serviceConfig.characteristics) {
            let charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
            if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                this.removeCharacteristic(serviceConfig, charConfig);
                continue;
            }
            let charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig);
            createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
        }

        // add undefined characteristics
        if (serviceDef) {
            for (let charName in serviceDef.characteristics) {
                if (createdCharacteristics[charName] === undefined) {
                    let charDef = serviceDef.characteristics[charName];
                    let charRow = this.createCharacteristicRow(charDef, serviceConfig, undefined);
                    createdCharacteristics[charName] = [charName, charDef.optional, charRow];
                }
            }
        }

        let charRows: Array<[string, boolean, DocumentFragment]> = [];

        for (let charRow in createdCharacteristics)
            charRows.push(createdCharacteristics[charRow]);

        charRows.sort((a, b) => {
            if (a[1] != b[1])
                return a[1] ? -1 : 1;
            return a[0].localeCompare(b[0]);
        });

        let table = servicePanel.querySelector('#yahka_characteristic_table');
        while (table.childElementCount > 1) {// first row is the header row
            table.removeChild(table.lastElementChild);
        }
        for (let row of charRows) {
            table.appendChild(row[2]);
        }
    }

    getParameterEditor(functionName: string, valueChangeCallback: IParameterEditorDelegate, functionMap: Map<string, ParameterEditorFactory>): IParameterEditor {
        if (!functionMap.has(functionName)) {
            return new ParameterEditor_Null(valueChangeCallback);
        }
        let factory = functionMap.get(functionName);
        return factory(valueChangeCallback);
    }

    updateParameterEditor(functionName: string, parameterContainer: HTMLElement, parameterValue: any, parameterChangeCallback: IParameterEditorDelegate, functionMap: Map<string, ParameterEditorFactory>) {
        let editor = this.getParameterEditor(functionName, parameterChangeCallback, functionMap);
        if (editor == undefined)
            return;
        editor.refreshAndShow(parameterContainer, parameterValue);
    }

    createCharacteristicRow(charDef: IHAPCharacteristicDefintion, serviceConfig: hkBridge.Configuration.IServiceConfig, charConfig: hkBridge.Configuration.ICharacteristicConfig): DocumentFragment {
        let name = charConfig ? charConfig.name : charDef.name;
        let enabled = charConfig ? charConfig.enabled : false;

        let rowElement = <DocumentFragment>document.importNode(this.characteristicRow.content, true);

        translateFragment(rowElement);

        let bracketElement = <HTMLElement>rowElement.querySelector('#characteristic');

        let checkBox = <HTMLInputElement>rowElement.querySelector('#characteristic_enabled');
        checkBox.checked = enabled;
        checkBox.addEventListener('click', this.handleCharacteristicEnabledChange.bind(this, serviceConfig, name, bracketElement))

        this.refreshEnabledClass(bracketElement, enabled);
        this.refershOptionalClass(bracketElement, charDef ? charDef.optional : true);

        rowElement.querySelector('#characteristic_name').textContent = name;

        let functionSelector = (selector: string, containerSelector: string, configName: string, parameterName: string, functionMap: Map<string, ParameterEditorFactory>) => {
            let input = <HTMLSelectElement>rowElement.querySelector(selector);
            let container = <HTMLElement>rowElement.querySelector(containerSelector);
            if (functionMap !== undefined) {
                let mapKeys = [...functionMap.keys()];
                this.fillSelectByArray(input, mapKeys);
            }
            let parameterValue = undefined;
            if (charConfig) {
                Utils.setInputValue(input, charConfig[configName]);
                parameterValue = charConfig[parameterName];
            }

            let paramUpdateMethod = (newValue) => {
                let charConfig = this.findConfigCharacteristic(serviceConfig, name);
                if (charConfig === undefined) {
                    charConfig = { name: name, enabled: false }
                    serviceConfig.characteristics.push(charConfig);
                }
                charConfig[parameterName] = newValue;

                this.delegate.changeCallback();
            }

            this.updateParameterEditor(Utils.getSelectInputValue(input)?.toString(), container, parameterValue, paramUpdateMethod, functionMap);
            input.addEventListener('input', (e) => {
                this.handleCharacteristicInputChange(serviceConfig, name, configName, e);
                let charConfig = this.findConfigCharacteristic(serviceConfig, name);
                this.updateParameterEditor(Utils.getSelectInputValue(input)?.toString(), container, charConfig[parameterName], paramUpdateMethod, functionMap);
                return false;
            });
        };

        functionSelector('#characteristic_inoutfunction', '#characteristic_inoutparams_container', 'inOutFunction', 'inOutParameters', inoutFunctions);
        functionSelector('#characteristic_conversionfunction', '#characteristic_conversionparams_container', 'conversionFunction', 'conversionParameters', convFunctions);

        this.updateCharacteristicProperties(rowElement, serviceConfig, charDef, charConfig);

        return rowElement;
    }

    updateCharacteristicProperties(rowElement: DocumentFragment, serviceConfig: hkBridge.Configuration.IServiceConfig, charDef: IHAPCharacteristicDefintion, charConfig: hkBridge.Configuration.ICharacteristicConfig) {
        let charName = charConfig ? charConfig.name : charDef.name;
        let toggleLink = rowElement.querySelector('#toggleProperties');
        let propContainer = rowElement.querySelector('#characteristic_propertyTable_container');
        let hasCustomProperties = charConfig ? (charConfig.properties !== undefined) && (Object.keys(charConfig.properties).length > 0) : false;

        if (toggleLink) {
            toggleLink.addEventListener('click', () => {
                propContainer.classList.toggle('no-display');
            })
            propContainer.classList.toggle('no-display', !hasCustomProperties);
            toggleLink.classList.toggle('properties-defined', hasCustomProperties);
        }
        let propTable = rowElement.querySelector('#characteristic_propertyTable');

        function transformValue(value: any) {
            let result = value;
            let isObject = false;
            if (typeof result === 'object') {
                result = JSON.stringify(result);
                isObject = true;
            }
            return { asString: result, isObject: isObject };
        }

        for (let propertyName in charDef.properties) {
            let propertyDefaultValue = transformValue(charDef.properties[propertyName]);
            let propElement = <DocumentFragment>document.importNode(this.characteristicPropRow.content, true);
            let nameSpan = propElement.querySelector('#propName');
            nameSpan.id = "";
            nameSpan.textContent = propertyName;

            let propInput = <HTMLInputElement>propElement.querySelector('#propValue')
            propInput.id = propertyName;
            propInput.placeholder = propertyDefaultValue.asString;
            if (charConfig !== undefined) {
                if (charConfig.properties !== undefined) {
                    if (charConfig.properties[propertyName] !== undefined) {
                        let charValue = transformValue(charConfig.properties[propertyName]);
                        Utils.setInputValue(propInput, charValue.asString);
                    }
                }
            }
            nameSpan.classList.toggle('properties-defined', propInput.value != "");
            propInput.addEventListener('input', this.handleCharacteristicPropertyChange.bind(this, serviceConfig, charName, propertyName, propertyDefaultValue.isObject))
            propTable.appendChild(propElement);
        }
    }




    refreshEnabledClass(row: HTMLElement, enabled: boolean) {
        row.classList.toggle('disabled', !enabled);
    }

    refershOptionalClass(row: HTMLElement, optional: boolean) {
        row.classList.toggle('optional-characteristic', optional);
    }

    handleCharacteristicEnabledChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, charRow: HTMLElement, ev: Event) {
        let charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false }
            serviceConfig.characteristics.push(charConfig);
        }
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        charConfig.enabled = inputTarget.checked;

        this.refreshEnabledClass(charRow, charConfig.enabled);

        this.delegate.changeCallback();
    }

    handleCharacteristicInputChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, attribute: string, ev: Event) {
        let charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false }
            serviceConfig.characteristics.push(charConfig);
        }

        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        charConfig[attribute] = inputValue;

        this.delegate.changeCallback();
    }


    handleCharacteristicPropertyChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, property: string, isObjectProperty: boolean, ev: Event) {
        let charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false }
            serviceConfig.characteristics.push(charConfig);
        }

        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        if (charConfig.properties === undefined)
            charConfig.properties = {};

        if (inputValue !== undefined) {
            if (isObjectProperty) {
                try {
                    charConfig.properties[property] = JSON.parse(inputValue?.toString());
                } catch (e) {
                    console.log("parsing of", inputValue, " failed with: ", e);
                }
            } else {
                charConfig.properties[property] = inputValue;
            }
        } else {
            delete charConfig.properties[property];
        }

        this.delegate.changeCallback();
    }


    handleDeviceMetaDataChange(deviceConfig: hkBridge.Configuration.IDeviceConfig, propertyName: string, errorElement: HTMLElement, validator: TValidatorFunction, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = (inputTarget.type === 'checkbox') ? inputTarget.checked : inputTarget.value;
        deviceConfig[propertyName] = inputValue;
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(deviceConfig);
        this.delegate.changeCallback();
    }

    handleServiceMetaDataChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, attribute: string, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        serviceConfig[attribute] = inputValue;

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }


    handleServiceTypeChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        serviceConfig.type = inputValue?.toString();

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.buildCharacteristicTable(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }
}
