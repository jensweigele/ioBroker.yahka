/// <reference path="../typings/index.d.ts" />
import * as hkBridge from '../yahka.homekit-bridge';

type TIOBrokerAdminChangeCallback = (changeMarker?: boolean) => void;
type TIOBrokerAdminSaveCallback = (settingsObject: any) => void;

interface IDictionary<T> {
    [key: string]: T;
}

interface IHAPCharacteristicDefintion {
    name: string;
    optional: boolean;
}

interface IHAPServiceDefinition {
    type: string;
    characteristics: IDictionary<IHAPCharacteristicDefintion>;
}

interface ISelectListEntry {
    text: string,
    [otherProps:string]: any;    
}

declare function getObject(id: string, callback: (error: any, object: any) => void);

declare function translateFragment(fragment: DocumentFragment);

var inoutFunctions: Array<string> = [];
getObject('yahka.meta._inoutFunctions', (error, object) => {
    inoutFunctions = object.native;
});

let convFunctions: Array<string> = [];
getObject('yahka.meta._conversionFunctions', (error, object) => {
    convFunctions = object.native;
});

let HAPServiceDictionary: IDictionary<IHAPServiceDefinition> = {};
getObject('yahka.meta._serviceDictionary', (error, object) => {
    HAPServiceDictionary = object.native;
});

let accessoryCategories: IDictionary<ISelectListEntry> = {};
getObject('yahka.meta._accessoryCategories', (error, object) => {
    accessoryCategories = object.native;
});


class ioBroker_YahkaAdmin {
    settings: any;
    loadSettings(settingsObject: any, onChangeCallback: TIOBrokerAdminChangeCallback) { 
        this.settings = settingsObject;
        
        new ioBroker_YahkaPageBuilder(this.settings.bridge, onChangeCallback);

        onChangeCallback(false);
    }


    saveSettings(callback: TIOBrokerAdminSaveCallback) {
        callback(this.settings);
    }
}

class ioBroker_YahkaPageBuilder {
    deviceListEntryTemplate: HTMLTemplateElement;
    deviceInfoPanelTemplate: HTMLTemplateElement;
    deviceServicePanelTemplate: HTMLTemplateElement;
    characteristicRow: HTMLTemplateElement;

    selectedDeviceConfig: hkBridge.Configuration.IDeviceConfig = undefined;

    constructor(private bridgeSettings: hkBridge.Configuration.IBridgeConfig, private changeCallback) {
        this.deviceListEntryTemplate = <HTMLTemplateElement>document.querySelector('#yahka_devicelist_entry');
        this.deviceInfoPanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_device_info_panel_template');
        this.deviceServicePanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_device_service_panel');
        this.characteristicRow = <HTMLTemplateElement>document.querySelector('#yahka_characteristic_row');
        this.refreshBridgeFrame();
    }

    refreshBridgeFrame() {
        let bridgeFrame = <HTMLElement> document.querySelector('#yahka_bridge_frame');
        
        this.refreshBridgeFields(this.bridgeSettings);
        this.buildDeviceList(this.bridgeSettings, bridgeFrame);
        this.bindBridgeButtons(this.bridgeSettings, bridgeFrame);
        this.refreshBridgeButtons(bridgeFrame);        

        return bridgeFrame;
    }    

    setSelectedDeviceConfig(deviceConfig: hkBridge.Configuration.IDeviceConfig, AFocusLastPanel: boolean) {
        this.selectedDeviceConfig = deviceConfig;
        this.refreshDevicePane(deviceConfig, AFocusLastPanel);
        this.refreshBridgeButtons(document.body);        
    }

    refreshBridgeFields(bridge: hkBridge.Configuration.IBridgeConfig) {

        let inputHelper = (selector: string, propertyName: string) => {
            let input = <HTMLInputElement>document.querySelector(selector);

            let value = bridge[propertyName];
            if(value !== undefined) 
                input.value = value;
            else
                input.value = "";    
            input.addEventListener("input", this.handleBridgeMetaDataChange.bind(this, bridge, propertyName));                
        };      

        let checkboxHelper = (selector: string, propertyName: string) => {
            let input = <HTMLInputElement>document.querySelector(selector);

            let value = bridge[propertyName];
            input.checked = value; 
            input.addEventListener("click", this.handleBridgeMetaDataChange.bind(this, bridge, propertyName));                
        };                
        
        inputHelper('#bridge_name', 'name');
        inputHelper('#bridge_manufacturer', 'manufacturer');
        inputHelper('#bridge_model', 'model');
        inputHelper('#bridge_serial', 'serial');
        inputHelper('#bridge_username', 'username');        
        inputHelper('#bridge_pincode', 'pincode');        
        inputHelper('#bridge_port', 'port');        
        checkboxHelper('#bridge_verboseLogging', 'verboseLogging');
    }


    bindBridgeButtons(bridge: hkBridge.Configuration.IBridgeConfig, bridgePane: HTMLElement) {
        let elem: HTMLElement;
        if(elem = <HTMLElement>bridgePane.querySelector('#yahka_add_device')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let newDevice = {
                    manufacturer: "",
                    model: "",
                    name: "",
                    serial: "",
                    category: 1,
                    services: []
                };
                bridge.devices.push( newDevice );
                this.setSelectedDeviceConfig(newDevice, true);
                this.buildDeviceList(bridge, bridgePane);
                this.changeCallback();
            })
        }

        if(elem = <HTMLElement>bridgePane.querySelector('#yahka_add_service')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('click');
                let dev = this.selectedDeviceConfig;
                if(dev === undefined)
                    return;

                
                dev.services.push(
                    {
                        name: '',
                        subType: '',
                        type: '',
                        characteristics: []
                    }
                );
                this.refreshDevicePane(dev, true);
                this.changeCallback();
            });
        }


        if(elem = <HTMLElement>bridgePane.querySelector('#yahka_remove_device')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let dev = this.selectedDeviceConfig;
                if(dev === undefined)
                    return;

                let idx = bridge.devices.indexOf(dev);
                if(idx > -1) {
                    bridge.devices.splice(idx, 1);
                    this.changeCallback();
                    this.setSelectedDeviceConfig(undefined, false);
                    this.buildDeviceList(bridge, bridgePane);
                    this.changeCallback();
                }
            });
        }
    }    


    refreshBridgeButtons(parent: HTMLElement) {
        // let addDeviceButton    = <HTMLElement>document.querySelector('#yahka_add_device');
        let addServiceButton   = <HTMLElement>parent.querySelector('#yahka_add_service');
        let removeDeviceButton = <HTMLElement>parent.querySelector('#yahka_remove_device');
        console.log('refresh', parent, this.selectedDeviceConfig);
        if(this.selectedDeviceConfig === undefined) {
            addServiceButton.setAttribute('disabled','');
            removeDeviceButton.setAttribute('disabled','');
        } else {
            addServiceButton.removeAttribute('disabled');
            removeDeviceButton.removeAttribute('disabled');
        }
    }        
        

    buildDeviceList(bridge: hkBridge.Configuration.IBridgeConfig, bridgeFrame: DocumentFragment) {
        let deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        for(let deviceConfig of bridge.devices) {
            let deviceEntry = <DocumentFragment>document.importNode(this.deviceListEntryTemplate.content, true);

            let listItem = (<HTMLElement>deviceEntry.querySelector('.list'));
            this.refreshDeviceListEntry(deviceConfig, listItem);
            translateFragment(deviceEntry);
            deviceList.appendChild(deviceEntry);           
        }

        let deviceListClickHandler = this.handleDeviceListClick.bind(this, bridge);
        (<any>$(deviceList)).listview({ onListClick: deviceListClickHandler });
    }

    refreshDeviceListEntry(deviceConfig: hkBridge.Configuration.IDeviceConfig, listItem: HTMLElement) {
        if(!listItem)
            return;
        let cat: ISelectListEntry;
        let iconClass = "mif-question";
        if(accessoryCategories !== undefined)
            if(cat = accessoryCategories[deviceConfig.category]) 
                iconClass = cat['icon']; 
        let listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);

        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.dataset["deviceIdent"] = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.selectedDeviceConfig));
    }

    findDeviceConfig(bridgeConfig: hkBridge.Configuration.IBridgeConfig, deviceIdent: string): hkBridge.Configuration.IDeviceConfig {
        if(!bridgeConfig)
            return undefined;
        for(let devConfig of bridgeConfig.devices)
            if (devConfig.name == deviceIdent)
                return devConfig;
        return undefined;
    }

    handleDeviceListClick(bridgeConfig: hkBridge.Configuration.IBridgeConfig, deviceNode: JQuery) {
        if(!deviceNode)
            return;
        
        let deviceIdent = deviceNode[0].dataset["deviceIdent"];
        let deviceConfig = this.findDeviceConfig(bridgeConfig, deviceIdent);
        this.setSelectedDeviceConfig(deviceConfig, false);
    }

    refreshDevicePane(deviceConfig: hkBridge.Configuration.IDeviceConfig, focusLast?: boolean) {
        let devicePane = <HTMLElement>document.querySelector('#yahka_device_details');
        devicePane.innerHTML = '';

        if(deviceConfig === undefined)
            return;

        let lastPane: HTMLElement = this.buildDeviceInformationPanel(deviceConfig, devicePane);
        for(let serviceConfig of deviceConfig.services) {
            let servicePanel = this.createServicePanel(deviceConfig, serviceConfig);
            devicePane.appendChild(servicePanel);
            lastPane = servicePanel;
        }

        if(focusLast && lastPane) {
            lastPane.scrollIntoView();
            if(!lastPane.classList.contains('active')) {
                let heading = (<HTMLElement>lastPane.querySelector('.heading'));
                if(heading)
                    heading.click();
            }
        }
    }

    buildDeviceInformationPanel(deviceConfig: hkBridge.Configuration.IDeviceConfig, devicePane: HTMLElement): HTMLElement {
        let devInfoFragment = <DocumentFragment> document.importNode(this.deviceInfoPanelTemplate.content, true);
        let devInfoPanel = <HTMLElement>devInfoFragment.querySelector('#yahka_device_info_panel');
        translateFragment(devInfoFragment);
        let inputHelper = (selector: string, propertyName: string, selectList?: IDictionary<ISelectListEntry>) => {
            let input = <HTMLSelectElement>devInfoPanel.querySelector(selector);

            if(selectList)
                this.fillSelectByDict( input, selectList);

            let value = deviceConfig[propertyName];
            if(value !== undefined) 
                input.value = value;
            else
                input.value = "";    
            input.addEventListener('input', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName));                
        };
        
        inputHelper('#device_name', 'name');
        inputHelper('#device_manufacturer', 'manufacturer');
        inputHelper('#device_model', 'model');
        inputHelper('#device_serial', 'serial');
        inputHelper('#device_category', 'category', accessoryCategories);
        
        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    }

    createServicePanel(deviceConfig: hkBridge.Configuration.IDeviceConfig, serviceConfig: hkBridge.Configuration.IServiceConfig): HTMLElement {
        let servicePanel = <DocumentFragment> document.importNode(this.deviceServicePanelTemplate.content, true);
        let frameNode = <HTMLElement> servicePanel.querySelector('#yahka_service_panel');
        translateFragment(servicePanel);
        let inputHelper = (selector: string, configName: string, popuplateServices?: boolean, eventHandler?) => {
            let input = <HTMLSelectElement>frameNode.querySelector(selector);
            if(popuplateServices === true) {
                let selectList: string[] = Object.keys(HAPServiceDictionary);
                this.fillSelectByArray(input, selectList);
            }
            if(serviceConfig) {
                let value = serviceConfig[configName];
                if(value !== undefined) 
                    input.value = value;
                else
                    input.value = "";    
            }
        
            if(eventHandler !== undefined)
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
            if(idx > -1) {
                deviceConfig.services.splice(idx, 1);
                this.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
        });

        return frameNode;
    }

    refreshServicePanelCaption(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        servicePanel.querySelector('#yahka_service_caption').textContent = serviceConfig.name + '[' + serviceConfig.type + ']';        
    }

    findHAPCharacteristic(serviceDef: IHAPServiceDefinition, characteristicName: string): IHAPCharacteristicDefintion {
        if(!serviceDef)
            return undefined;
        let x;
        if(x = serviceDef.characteristics[characteristicName])
            return x;
        return undefined;
    }

    findConfigCharacteristic(service: hkBridge.Configuration.IServiceConfig, characteristicName: string): hkBridge.Configuration.ICharacteristicConfig {
        if(!service)
            return undefined;

        for(let cfg of service.characteristics) {
            if (cfg.name == characteristicName)
                return cfg;
        }

        return undefined;
    }

    isEmptyCharacteristic(charConfig: hkBridge.Configuration.ICharacteristicConfig): boolean {
        if(charConfig === undefined)
            return true;
        if(charConfig.name === '')
            return true;


        if((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined))
            return true;

        return false;
    }

    removeCharacteristic(serviceConfig: hkBridge.Configuration.IServiceConfig, charConfig: hkBridge.Configuration.ICharacteristicConfig) {
        if(serviceConfig === undefined)
            return;

        let idx = serviceConfig.characteristics.indexOf(charConfig);
        if(idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.changeCallback();
        }
    }

    buildCharacteristicTable(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement) {
        let serviceDef = HAPServiceDictionary[serviceConfig.type];
        let createdCharacteristics: IDictionary<[string, boolean, DocumentFragment]> = {};
        for(let charConfig of serviceConfig.characteristics) {
            let charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
            if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                this.removeCharacteristic(serviceConfig, charConfig);
                continue;
            }
            let charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig);
            createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
        }

        // add undefined characteristics
        if(serviceDef) {
            for(let charName in serviceDef.characteristics) {
                if(createdCharacteristics[charName] === undefined) {
                    let charDef = serviceDef.characteristics[charName];
                    let charRow = this.createCharacteristicRow(charDef, serviceConfig, undefined);
                    createdCharacteristics[charName] = [charName, charDef.optional, charRow];
                }
            }
        }

        let charRows: Array<[string, boolean, DocumentFragment]> = [];
        
        for(let charRow in createdCharacteristics) 
            charRows.push(createdCharacteristics[charRow]);
        
        charRows.sort( (a, b) => {
            if (a[1] != b[1])
                return a[1] ? -1 : 1;
            return a[0].localeCompare(b[0]); 
        });

        let table = servicePanel.querySelector('#yahka_characteristic_table');
        while(table.childElementCount > 1) // first row is the header row
            table.removeChild(table.lastElementChild);
        for(let row of charRows) 
            table.appendChild(row[2]);
        
        
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


        let inputHelper = (selector: string, configName: string, selectList: string[]) => {
            let input = <HTMLSelectElement>rowElement.querySelector(selector);
            if(selectList !== undefined)
                this.fillSelectByArray(input, selectList);
            if(charConfig) { 
                let value = charConfig[configName];
                if(value !== undefined) 
                    input.value = value;
                else
                    input.value = "";                    
            }
            input.addEventListener('input', this.handleCharacteristicInputChange.bind(this, serviceConfig, name, configName));
        };

        inputHelper('#characteristic_inoutfunction', 'inOutFunction', inoutFunctions); 
        inputHelper('#characteristic_inoutparams', 'inOutParameters', undefined); 
        inputHelper('#characteristic_conversionfunction', 'conversionFunction', convFunctions); 
        inputHelper('#characteristic_conversionparams', 'conversionParameters', undefined);

        return rowElement;
    }

    fillSelectByArray(inoutSelect: HTMLSelectElement, stringlist: string[]) {
        for(let itemName of stringlist) {
            let optElem = document.createElement('option');
            optElem.value = itemName;
            optElem.text = itemName;
            inoutSelect.add(optElem);
        }
    }


    fillSelectByDict(inoutSelect: HTMLSelectElement, dictionary: IDictionary<ISelectListEntry>) {
        for(let key in dictionary) {
            let optElem = document.createElement('option');
            optElem.value = key;
            optElem.text = dictionary[key].text;
            inoutSelect.add(optElem);
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
        if(charConfig === undefined) {
            charConfig = {name: charName, enabled: false}
            serviceConfig.characteristics.push(charConfig);
        }
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        charConfig.enabled = inputTarget.checked;

        this.refreshEnabledClass(charRow, charConfig.enabled);

        this.changeCallback();
    }

    handleCharacteristicInputChange(serviceConfig: hkBridge.Configuration.IServiceConfig, charName: string, attribute: string, ev: Event) {
        let charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if(charConfig === undefined) {
            charConfig = {name: charName, enabled: false}
            serviceConfig.characteristics.push(charConfig);
        }

        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = inputTarget.value;
        charConfig[attribute] = inputValue;

        this.changeCallback();
    }


    handleBridgeMetaDataChange(bridgeConfig: hkBridge.Configuration.IBridgeConfig, propertyName: string, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        if(inputTarget.type == "checkbox")
            bridgeConfig[propertyName] = inputTarget.checked;
        else
            bridgeConfig[propertyName] = inputTarget.value;
        this.changeCallback();
    }

    handleDeviceMetaDataChange(deviceConfig: hkBridge.Configuration.IDeviceConfig, propertyName: string, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = inputTarget.value;
        let listItem = <HTMLElement>document.querySelector('div.list[data-device-ident="' + deviceConfig.name + '"]');
        deviceConfig[propertyName] = inputValue;
        this.refreshDeviceListEntry(deviceConfig, listItem);
        this.changeCallback();
    }

    handleServiceMetaDataChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, attribute: string, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = inputTarget.value;
        serviceConfig[attribute] = inputValue;

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.changeCallback();
    }


    handleServiceTypeChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = inputTarget.value;
        serviceConfig.type = inputValue;
        
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        
        this.buildCharacteristicTable(serviceConfig, servicePanel);

        this.changeCallback();
    }
    
}
