
/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import { generateMetaDataDictionary } from '../yahka.meta-generator';
import { IDictionary } from '../../shared/yahka.configuration';
import { IHAPServiceDefinition, IHAPCharacteristicDefintion, ISelectListEntry } from '../admin.config';
import { ConfigPageBuilder_Base, IConfigPageBuilderDelegate } from './pageBuilder.base';
import { IParameterEditorDelegate, IParameterEditor } from '../parameterEditor/parameterEditor.base';
import { ParameterEditorFactory, inoutFunctions, convFunctions } from '../parameterEditor/parameterEditor.factory';
import { ParameterEditor_Null } from '../parameterEditor/parameterEditor.null';
import { translateFragment } from '../admin.translation';
import { createTemplateElement } from '../admin.pageLoader';
import { Utils } from '../admin.utils';


let HAPServiceDictionary = generateMetaDataDictionary();

export class ConfigPageBuilder_ServicePanel extends ConfigPageBuilder_Base {
    protected deviceServicePanelTemplate: HTMLTemplateElement;
    protected characteristicRow: HTMLTemplateElement;
    protected characteristicPropRow: HTMLTemplateElement;

    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.deviceServicePanelTemplate = createTemplateElement(require('./pageBuilder.servicePanel.servicePanel.inc.html'));
        this.characteristicRow = createTemplateElement(require('./pageBuilder.servicePanel.characteristicRow.inc.html'));
        this.characteristicPropRow = createTemplateElement(require('./pageBuilder.servicePanel.characteristic.propRow.inc.html'));
    }

    public createServicePanel(services: hkBridge.Configuration.IServiceConfig[], serviceConfig: hkBridge.Configuration.IServiceConfig): HTMLElement {
        let servicePanel = <DocumentFragment>document.importNode(this.deviceServicePanelTemplate.content, true);
        let frameNode = <HTMLElement>servicePanel.querySelector('#yahka_service_panel');
        translateFragment(servicePanel);
        let inputHelper = (selector: string, configName: keyof hkBridge.Configuration.IServiceConfig, selectList?: IDictionary<ISelectListEntry> | ISelectListEntry[], eventHandler?: (this: HTMLSelectElement, ev: Event) => any, defaultForCheckbox = true) => {
            let input = <HTMLInputElement>frameNode.querySelector(selector);
            if (selectList != null) {
                this.fillSelectByListEntries(input, selectList);
            }

            if (serviceConfig) {
                Utils.setInputValue(input, serviceConfig[configName]);
            }

            if (input.type === 'checkbox') {
                (input as unknown as HTMLInputElement).checked = serviceConfig[configName] ?? defaultForCheckbox;
                input.addEventListener('change', this.handleServiceMetaDataChange.bind(this, serviceConfig, frameNode, configName));
            } else if (eventHandler !== undefined) {
                input.addEventListener('input', eventHandler);
            } else {
                input.addEventListener('input', this.handleServiceMetaDataChange.bind(this, serviceConfig, frameNode, configName));
            }
        };

        this.refreshServicePanelCaption(serviceConfig, frameNode);
        inputHelper('#service_enabled', 'enabled');
        inputHelper('#service_isPrimary', 'isPrimary', undefined, undefined, false);
        inputHelper('#service_isHidden', 'isHidden', undefined, undefined, false);
        inputHelper('#service_name', 'name');
        inputHelper(
            '#service_type',
            'type',
            Object.keys(HAPServiceDictionary.services).map(s => ({
                text: s,
                value: s
            })),
            this.handleServiceTypeChange.bind(this, serviceConfig, frameNode)
        );
        inputHelper('#service_subtype', 'subType');
        inputHelper(
            '#service_link_to',
            'linkTo',
            [{
                text: '',
                value: '',
            }].concat(services.map((s) => ({
                text: s.name,
                value: s.name
            })))
        );

        inputHelper(
            '#new_custom_characteristic',
            '',
            Object.entries(HAPServiceDictionary.characteristics)
                .map(([key, c]) => ({
                    text: c.name,
                    value: key
                }))
                .sort((a, b) => (a.text ?? a.value).localeCompare(b.text ?? b.value)),
            () => { }
        );

        this.buildCharacteristicTable(serviceConfig, frameNode);

        // bind delete buttton
        frameNode.querySelector('#yakha_delete_service').addEventListener('click', () => {
            let idx = services.indexOf(serviceConfig);
            if (idx > -1) {
                services.splice(idx, 1);
                this.delegate.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
            this.delegate.refreshSelectedDeviceConfig();
        });

        frameNode.querySelector('#yahka_add_characteristic').addEventListener('click',
            this.addCustomCharacteristic.bind(this, serviceConfig, frameNode));
        return frameNode;
    }

    private refreshServicePanelCaption(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        servicePanel.querySelector('#yahka_service_caption').textContent = `${serviceConfig.enabled === false ? '[## disabled ##]' : ''} ${serviceConfig.name}[${serviceConfig.type}]`;
    }

    private findHAPCharacteristic(serviceDef: IHAPServiceDefinition, characteristicName: string): IHAPCharacteristicDefintion {
        if (!serviceDef)
            return undefined;
        const serviceChar = serviceDef.characteristics[characteristicName];
        if (serviceChar != null)
            return serviceChar;
        return undefined;
    }

    private findConfigCharacteristic(service: hkBridge.Configuration.IServiceConfig, characteristicName: string): hkBridge.Configuration.ICharacteristicConfig {
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

    private isEmptyCharacteristic(charConfig: hkBridge.Configuration.ICharacteristicConfig): boolean {
        if (charConfig.customCharacteristic) {
            return false;
        }
        if (charConfig === undefined) {
            return true;
        }
        if (charConfig.name === '') {
            return true;
        }

        if ((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined)) {
            return true;
        }

        return false;
    }

    private removeCharacteristic(serviceConfig: hkBridge.Configuration.IServiceConfig, charConfig: hkBridge.Configuration.ICharacteristicConfig) {
        if (serviceConfig === undefined) {
            return;
        }

        let idx = serviceConfig.characteristics.indexOf(charConfig);
        if (idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.delegate.changeCallback();
        }
    }

    private buildCharacteristicTable(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        let serviceDef = HAPServiceDictionary.services[serviceConfig.type];
        let createdCharacteristics: IDictionary<[string, boolean, DocumentFragment]> = {};
        for (let charConfig of serviceConfig.characteristics) {
            let charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
            if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                this.removeCharacteristic(serviceConfig, charConfig);
                continue;
            }
            if (charDef == null) {
                charDef = HAPServiceDictionary.characteristics[charConfig.name]
            }
            let charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig, servicePanel);
            createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
        }

        // add undefined characteristics
        if (serviceDef) {
            for (let charName in serviceDef.characteristics) {
                if (createdCharacteristics[charName] === undefined) {
                    let charDef = serviceDef.characteristics[charName];
                    let charRow = this.createCharacteristicRow(charDef, serviceConfig, undefined, servicePanel);
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

    private getParameterEditor(functionName: string, valueChangeCallback: IParameterEditorDelegate, functionMap: Map<string, ParameterEditorFactory>): IParameterEditor {
        if (!functionMap.has(functionName)) {
            return new ParameterEditor_Null(valueChangeCallback);
        }
        let factory = functionMap.get(functionName);
        return factory(valueChangeCallback);
    }

    private updateParameterEditor(functionName: string, parameterContainer: HTMLElement, parameterValue: any, parameterChangeCallback: IParameterEditorDelegate, functionMap: Map<string, ParameterEditorFactory>) {
        let editor = this.getParameterEditor(functionName, parameterChangeCallback, functionMap);
        if (editor == undefined)
            return;
        editor.refreshAndShow(parameterContainer, parameterValue);
    }

    private createCharacteristicRow(charDef: IHAPCharacteristicDefintion, serviceConfig: hkBridge.Configuration.IServiceConfig, charConfig: hkBridge.Configuration.ICharacteristicConfig, servicePanel: HTMLElement): DocumentFragment {
        let name = charConfig ? charConfig.name : charDef.name;
        let enabled = charConfig ? charConfig.enabled : false;

        let rowElement = <DocumentFragment>document.importNode(this.characteristicRow.content, true);

        translateFragment(rowElement);
        let anchor = rowElement.querySelector('#anchor') as HTMLElement;
        if (anchor != null) {
            const anchorAttribute = document.createAttribute('x-yahka-anchor');
            anchorAttribute.value = name;
            anchor.attributes.setNamedItem(anchorAttribute);
        }

        let bracketElement = <HTMLElement>rowElement.querySelector('#characteristic');

        let checkBox = <HTMLInputElement>rowElement.querySelector('#characteristic_enabled');
        checkBox.checked = enabled;
        checkBox.addEventListener('click', this.handleCharacteristicEnabledChange.bind(this, serviceConfig, name, bracketElement))

        let delButton = rowElement.querySelector('#yakha_delete_characteristic');
        delButton.addEventListener('click', () => {
            const charConfig = this.findConfigCharacteristic(serviceConfig, name);
            if (charConfig != null) {
                charConfig.customCharacteristic = false;
                this.removeCharacteristic(serviceConfig, charConfig);
                this.buildCharacteristicTable(serviceConfig, servicePanel);
            }
        });

        this.refreshEnabledClass(bracketElement, enabled);
        this.refreshOptionalClass(bracketElement, charDef?.optional ?? true);
        this.refershCustomClass(bracketElement, charConfig?.customCharacteristic ?? false);

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

    private updateCharacteristicProperties(rowElement: DocumentFragment, serviceConfig: hkBridge.Configuration.IServiceConfig, charDef: IHAPCharacteristicDefintion, charConfig: hkBridge.Configuration.ICharacteristicConfig) {
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
            nameSpan.id = '';
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
            nameSpan.classList.toggle('properties-defined', propInput.value != '');
            propInput.addEventListener('input', this.handleCharacteristicPropertyChange.bind(this, serviceConfig, charName, propertyName, propertyDefaultValue.isObject))
            propTable.appendChild(propElement);
        }
    }

    private refreshEnabledClass(row: HTMLElement, enabled: boolean) {
        row.classList.toggle('disabled', !enabled);
    }

    private refreshOptionalClass(row: HTMLElement, optional: boolean) {
        row.classList.toggle('optional-characteristic', optional);
    }

    private refershCustomClass(row: HTMLElement, custom: boolean) {
        row.classList.toggle('custom-characteristic', custom);
    }

    private handleCharacteristicEnabledChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, charRow: HTMLElement, ev: Event) {
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

    private handleCharacteristicInputChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, attribute: string, ev: Event) {
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


    private handleCharacteristicPropertyChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, property: string, isObjectProperty: boolean, ev: Event) {
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
                    charConfig.properties[property] = JSON.parse(inputValue as any);
                } catch (e) {
                    console.log('parsing of', inputValue, ' failed with: ', e);
                }
            } else {
                charConfig.properties[property] = inputValue;
            }
        } else {
            delete charConfig.properties[property];
        }

        this.delegate.changeCallback();
    }

    private handleServiceMetaDataChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, attribute: string, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        serviceConfig[attribute] = inputValue;

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }

    private handleServiceTypeChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = Utils.getInputValue(inputTarget);
        serviceConfig.type = inputValue as any; //?.toString();

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.buildCharacteristicTable(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }

    private addCustomCharacteristic(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        const select = servicePanel.querySelector('#new_custom_characteristic') as HTMLSelectElement;
        const charName = Utils.getSelectInputValue(select)?.toString();
        const existingChar = serviceConfig.characteristics.find((c) => c.name === charName);
        if (existingChar != null) {
            this.setFocusToCharacteristic(servicePanel, charName);
            return;
        }
        serviceConfig.characteristics.push({
            name: charName,
            enabled: true,
            customCharacteristic: true
        });
        Utils.setInputValue(select, '');

        this.buildCharacteristicTable(serviceConfig, servicePanel);
        this.delegate.changeCallback();

        this.setFocusToCharacteristic(servicePanel, charName);
    }

    private setFocusToCharacteristic(servicePanel: HTMLElement, name: string) {
        const element = servicePanel.querySelector(`[x-yahka-anchor='${name}']`);
        if (element == null) {
            return;
        }
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
