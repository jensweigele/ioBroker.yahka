/// <reference path="../typings/index.d.ts" />
import * as hkBridge from '../yahka.configuration';
import * as $ from "jquery";
import { error } from 'util';

type TIOBrokerAdminChangeCallback = (changeMarker?: boolean) => void;
type TIOBrokerAdminSaveCallback = (settingsObject: any) => void;
function isBridgeConfig(config: hkBridge.Configuration.IBaseConfigNode): config is hkBridge.Configuration.IBridgeConfig {
    if (config === undefined)
        return false;
    return config.configType === "bridge";
}

function isDeviceConfig(config: hkBridge.Configuration.IBaseConfigNode): config is hkBridge.Configuration.IDeviceConfig {
    if (config === undefined)
        return false;
    return config.configType === "customdevice" || (<hkBridge.Configuration.IDeviceConfig>config).services !== undefined;
}

function isIPCameraConfig(config: hkBridge.Configuration.IBaseConfigNode): config is hkBridge.Configuration.ICameraConfig {
    if (config === undefined)
        return false;
    return config.configType === "ipcamera";
}


let defaultCommandLine: hkBridge.Configuration.ICameraFfmpegCommandLine =
    {
        stream: [
            '-re',
            '-i', '${source}',
            '-threads', '0',
            '-vcodec', '${codec}',
            '-an',
            '-pix_fmt', 'yuv420p',
            '-r', '${fps}',
            '-f', 'rawvideo',
            '-tune', 'zerolatency',
            '-vf', 'scale=${width}:${height}',
            '-b:v', '${bitrate}k',
            '-bufsize', '${bitrate}k',
            '-payload_type', '99',
            '-ssrc', '1',
            '-f', 'rtp',
            '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params', '${videokey}',
            'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=1378'
        ],
        snapshot: [
            '-re',
            '-i', '${source}',
            '-t', '1',
            '-s', '${width}x${height}',
            '-f', 'image2',
            '-'
        ]
    };
let webcamCommandLine: hkBridge.Configuration.ICameraFfmpegCommandLine = {
    stream: [
        '-re',
        '-f', 'dshow',
        '-i', '${source}',
        '-threads', '0',
        '-vcodec', '${codec}',
        '-an',
        '-pix_fmt', 'yuv420p',
        '-r', '${fps}',
        '-f', 'rawvideo',
        '-tune', 'zerolatency',
        '-vf', 'scale=${width}:${height}',
        '-b:v', '${bitrate}k',
        '-bufsize', '${bitrate}k',
        '-payload_type', '99',
        '-ssrc', '1',
        '-f', 'rtp',
        '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
        '-srtp_out_params', '${videokey}',
        'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=1378'
    ],
    snapshot: [
        '-re',
        '-f', 'dshow',
        '-i', '${source}',
        '-t', '1',
        '-s', '${width}x${height}',
        '-f', 'image2',
        '-'
    ]
}

const ffmpegCommandLines = {
    default: defaultCommandLine,
    webcam: webcamCommandLine
}



interface IDictionary<T> {
    [key: string]: T;
}

interface ISelectListEntry {
    text: string,
    [otherProps: string]: any;
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

function generateRandomUsername(): string {
    let usr = [];
    for (let i = 0; i < 6; i++)
        usr[i] = ('00' + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
    return usr.join(':');
}


interface IConfigPageBuilder {
    refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement);
    styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean;
    readonly addServiceAvailable: boolean;
    readonly removeDeviceAvailable: boolean;
    readonly dupliacteDeviceAvailable: boolean;

}

interface IConfigPageBuilderDelegate {
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


class ioBroker_YahkaAdmin {
    settings: any;

    loadSettings(settingsObject: any, onChangeCallback: TIOBrokerAdminChangeCallback) {
        this.settings = settingsObject;
        if(settingsObject.cameras === undefined) {
            settingsObject.cameras = []
        }

        new ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);

        onChangeCallback(false);
    }


    saveSettings(callback: TIOBrokerAdminSaveCallback) {
        callback(this.settings);
    }
}

class ioBroker_YahkaPageBuilder implements IConfigPageBuilderDelegate {
    protected deviceListHandler: ioBroker_DeviceListHandler;
    protected buttonHandler: ioBroker_ButtonHandler;
    protected pageBuilders = new Map<hkBridge.Configuration.TConfigNodeType, IConfigPageBuilder>();
    protected _selectedDeviceConfig: hkBridge.Configuration.IBaseConfigNode = undefined;

    constructor(private _bridgeSettings: hkBridge.Configuration.IBridgeConfig, public cameraConfigs: [hkBridge.Configuration.ICameraConfig], private _changeCallback) {
        if (!_bridgeSettings.devices)
            _bridgeSettings.devices = [];
        _bridgeSettings.configType = 'bridge';

        this.deviceListHandler = new ioBroker_DeviceListHandler(this);
        this.buttonHandler = new ioBroker_ButtonHandler(this, this.deviceListHandler);

        this.pageBuilders.set('bridge', new ConfigPageBuilder_BridgeConfig(this));
        this.pageBuilders.set('customdevice', new ConfigPageBuilder_CustomDevice(this));
        this.pageBuilders.set('ipcamera', new ConfigPageBuilder_IPCamera(this));

        this.bootstrap();
    }

    bootstrap() {
        let bridgeFrame = <HTMLElement>document.querySelector('#yahka_bridge_frame');

        this.deviceListHandler.buildDeviceList(bridgeFrame);
        this.buttonHandler.bindBridgeButtons(bridgeFrame);
        this.buttonHandler.refreshBridgeButtons(bridgeFrame);

        return bridgeFrame;
    }

    public deviceIsUnique(deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        let devList = this.deviceListHandler.getDeviceList();
        return !devList.some((a) => (a.name == deviceConfig.name) && (a !== deviceConfig));
    }
    

    public getPageBuilderByConfig(deviceConfig: hkBridge.Configuration.IBaseConfigNode): IConfigPageBuilder {
        if (deviceConfig === undefined) {
            return undefined;
        }

        let configType = deviceConfig.configType;
        if (configType === undefined) {
            if (isBridgeConfig(deviceConfig)) {
                configType = 'bridge';
            } else if (isDeviceConfig(deviceConfig)) {
                configType = 'customdevice';
            }
        }

        return this.pageBuilders.get(configType);
    }

    public get bridgeSettings(): hkBridge.Configuration.IBridgeConfig {
        return this._bridgeSettings;
    }

    public get selectedDeviceConfig(): hkBridge.Configuration.IBaseConfigNode {
        return this._selectedDeviceConfig
    }

    public refreshDevicePanel(deviceConfig: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean) {
        let pageBuilder = this.getPageBuilderByConfig(deviceConfig);
        let devicePanel = <HTMLElement>document.querySelector('#yahka_device_details');
        if(devicePanel) {
            devicePanel.innerHTML = '';
        }
        if (pageBuilder) {
            pageBuilder.refresh(deviceConfig, AFocusLastPanel, devicePanel);
        }
    }

    setSelectedDeviceConfig(deviceConfig: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean) {
        this._selectedDeviceConfig = deviceConfig;
        this.refreshDevicePanel(deviceConfig, AFocusLastPanel);
        this.buttonHandler.refreshBridgeButtons(document.body);
    }


    public refreshDeviceListEntry(deviceConfig: hkBridge.Configuration.IBaseConfigNode) {
        this.deviceListHandler.refreshDeviceList();
    }

    public changeCallback() {
        return this._changeCallback()
    }



}

class ConfigPageBuilder_Base {
    constructor(protected delegate: IConfigPageBuilderDelegate) {
    }

    protected refreshSimpleErrorElement(errorElement: HTMLElement, validator: TValidatorFunction) {
        let errorVisible = false;
        if(validator) 
            errorVisible = validator();
        if(errorElement)
            errorElement.classList.toggle('validationError', errorVisible);        
    }
}

class ioBroker_DeviceListHandler extends ConfigPageBuilder_Base {
    deviceListEntryTemplate: HTMLTemplateElement;
    listEntryToConfigMap = new Map<HTMLElement, hkBridge.Configuration.IBaseConfigNode>();

    constructor(delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.deviceListEntryTemplate = <HTMLTemplateElement>document.querySelector('#yahka_devicelist_entry');
    }


    getDeviceList(): hkBridge.Configuration.IBaseConfigNode[] {
        let result: hkBridge.Configuration.IBaseConfigNode[] = [this.delegate.bridgeSettings];
        let devices: hkBridge.Configuration.IBaseConfigNode[] = [];
        if (this.delegate.bridgeSettings.devices)
            devices = devices.concat(this.delegate.bridgeSettings.devices)
        if (this.delegate.cameraConfigs)
            devices = devices.concat(this.delegate.cameraConfigs)
        return result.concat(devices.sort( (a,b) => a.name.localeCompare(b.name)));
    }

    createDeviceListEntry(deviceConfig: hkBridge.Configuration.IBaseConfigNode) {
        let deviceEntry = <DocumentFragment>document.importNode(this.deviceListEntryTemplate.content, true);

        let listItem = (<HTMLElement>deviceEntry.querySelector('.list'));
        this.refreshDeviceListEntry(deviceConfig, listItem);
        return deviceEntry;
    }

    buildDeviceList(bridgeFrame: HTMLElement) {
        let bridge = this.delegate.bridgeSettings;
        let deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        this.listEntryToConfigMap.clear();
        for (let deviceConfig of this.getDeviceList()) {
            let fragment = this.createDeviceListEntry(deviceConfig);
            let node = (<HTMLElement>fragment.querySelector('.list'));
            this.listEntryToConfigMap.set(node, deviceConfig);
            deviceList.appendChild(fragment);
        }


        (<any>$(deviceList)).listview({ onListClick: this.handleDeviceListClick.bind(this) });
    }

    public refreshDeviceList() {
        this.listEntryToConfigMap.forEach( (node, element) => this.refreshDeviceListEntry(node, element))
    }

    private refreshDeviceListEntry(deviceConfig: hkBridge.Configuration.IBaseConfigNode, listItem: HTMLElement) {
        if (!listItem)
            return;

        let pageBuilder = this.delegate.getPageBuilderByConfig(deviceConfig);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.delegate.selectedDeviceConfig));
        let stylingDone = false
        if(pageBuilder !== undefined) {
            stylingDone = pageBuilder.styleListItem(listItem, deviceConfig)
        }
        listItem.classList.toggle('error', !this.delegate.deviceIsUnique(deviceConfig));
        
        if (!stylingDone) {
            let listIcon = listItem.querySelector('.list-icon');
            listIcon.className = 'list-icon icon mif-question';
        }        
    }

    handleDeviceListClick(deviceNode: JQuery) {
        if (!deviceNode)
            return;

        let deviceConfig = this.listEntryToConfigMap.get(deviceNode[0]);
        this.delegate.setSelectedDeviceConfig(deviceConfig, false);
    }
}

class ioBroker_ButtonHandler extends ConfigPageBuilder_Base {

    constructor(delegate: IConfigPageBuilderDelegate, protected deviceListHandler: ioBroker_DeviceListHandler) {
        super(delegate);

    }



    bindBridgeButtons(bridgePane: HTMLElement) {
        let bridge = this.delegate.bridgeSettings;
        let elem: HTMLElement;
        if (elem = <HTMLElement>bridgePane.querySelector('#yahka_add_device')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let newCustomDevice: hkBridge.Configuration.IDeviceConfig = {
                    configType: "customdevice",
                    manufacturer: "",
                    model: "",
                    name: "<new device " + this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    enabled: true,
                    category: 1,
                    services: []
                };
                bridge.devices.push(newCustomDevice);
                this.delegate.setSelectedDeviceConfig(newCustomDevice, true);
                this.deviceListHandler.buildDeviceList(bridgePane);
                this.delegate.changeCallback();
            })
        }

        if (elem = <HTMLElement>bridgePane.querySelector('#yahka_add_camera')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let newIPCamera: hkBridge.Configuration.ICameraConfig = {
                    configType: "ipcamera",
                    ident: "",
                    manufacturer: "",
                    model: "",
                    name: "<new camera " + this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    port: 0,
                    username: generateRandomUsername(),
                    pincode: "123-45-678",
                    enabled: true,
                    source: "",
                    codec: "libx264",
                    maxWidth: 1920,
                    maxHeight: 1080,
                    maxFPS: 60,
                    verboseLogging: false,
                    numberOfStreams: undefined,
                    ffmpegCommandLine: ffmpegCommandLines.default,
                    devices: []
                };

                this.delegate.cameraConfigs.push(newIPCamera);
                this.delegate.setSelectedDeviceConfig(newIPCamera, true);
                this.deviceListHandler.buildDeviceList(bridgePane);
                this.delegate.changeCallback();
            })
        }


        if (elem = <HTMLElement>bridgePane.querySelector('#yahka_add_service')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let dev = this.delegate.selectedDeviceConfig;
                if (!isDeviceConfig(dev))
                    return;


                dev.services.push({
                    name: '',
                    subType: '',
                    type: '',
                    characteristics: []
                });

                this.delegate.refreshDevicePanel(dev, true);
                this.delegate.changeCallback();
            });
        }


        if (elem = <HTMLElement>bridgePane.querySelector('#yahka_remove_device')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let dev = this.delegate.selectedDeviceConfig;
                if (isDeviceConfig(dev)) {
                    let idx = bridge.devices.indexOf(dev);
                    if (idx > -1) {
                        bridge.devices.splice(idx, 1);
                        this.delegate.changeCallback();
                        this.delegate.setSelectedDeviceConfig(undefined, false);
                        this.deviceListHandler.buildDeviceList(bridgePane);
                        this.delegate.changeCallback();
                    }
                } else if (isIPCameraConfig(dev)) {
                    let idx = this.delegate.cameraConfigs.indexOf(dev);
                    if (idx > -1) {
                        this.delegate.cameraConfigs.splice(idx, 1);
                        this.delegate.changeCallback();
                        this.delegate.setSelectedDeviceConfig(undefined, false);
                        this.deviceListHandler.buildDeviceList(bridgePane);
                        this.delegate.changeCallback();
                    }
                }
            });
        }

        if (elem = <HTMLElement>bridgePane.querySelector('#yahka_duplicate_device')) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let dev = this.delegate.selectedDeviceConfig;
                let copyOfDevice = $.extend(true, {}, dev)
                copyOfDevice.name = copyOfDevice.name + " copy"
                if (isDeviceConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    bridge.devices.push(copyOfDevice);
                } else if (isIPCameraConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    this.delegate.cameraConfigs.push(copyOfDevice);
                } else {
                    return 
                }
                this.delegate.setSelectedDeviceConfig(copyOfDevice, true);
                this.deviceListHandler.buildDeviceList(bridgePane);
                this.delegate.changeCallback();                 
            });
        }


    }


    refreshBridgeButtons(parent: HTMLElement) {
        // let addDeviceButton    = <HTMLElement>document.querySelector('#yahka_add_device');
        let addServiceButton = <HTMLElement>parent.querySelector('#yahka_add_service');
        let removeDeviceButton = <HTMLElement>parent.querySelector('#yahka_remove_device');
        let duplicateDeviceButton = <HTMLElement>parent.querySelector('#yahka_duplicate_device');
        
        let pageBuilder = this.delegate.getPageBuilderByConfig(this.delegate.selectedDeviceConfig);
        let addServiceEnabled = pageBuilder ? pageBuilder.addServiceAvailable : false;
        let removeDevEnabled = pageBuilder ? pageBuilder.removeDeviceAvailable : false;
        let duplicateDeviceEnabled = pageBuilder ? pageBuilder.dupliacteDeviceAvailable : false;

        if (addServiceEnabled)
            addServiceButton.removeAttribute('disabled');
        else
            addServiceButton.setAttribute('disabled', '');

        if (removeDevEnabled)
            removeDeviceButton.removeAttribute('disabled');
        else
            removeDeviceButton.setAttribute('disabled', '');

        if (duplicateDeviceEnabled)
            duplicateDeviceButton.removeAttribute('disabled');
        else
            duplicateDeviceButton.setAttribute('disabled', '');
    }
}

type TValidatorFunction = () => boolean;

class ConfigPageBuilder_BridgeConfig extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = false;
    public removeDeviceAvailable: boolean = false;
    public dupliacteDeviceAvailable: boolean = false;
    bridgeConfigPanelTemplate: HTMLTemplateElement;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.bridgeConfigPanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_bridgeconfig_template');
    }

    public refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!isBridgeConfig(config)) {
            return
        }
        let bridgeConfigFragment = <DocumentFragment>document.importNode(this.bridgeConfigPanelTemplate.content, true);
        translateFragment(bridgeConfigFragment);

        let inputHelper = (selector: string, propertyName: string, validator: TValidatorFunction = undefined)  => {
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



interface IHAPCharacteristicDefintion {
    name: string;
    optional: boolean;
}

interface IHAPServiceDefinition {
    type: string;
    characteristics: IDictionary<IHAPCharacteristicDefintion>;
}

class ConfigPageBuilder_CustomDevice extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = true;
    public removeDeviceAvailable: boolean = true;
    public dupliacteDeviceAvailable: boolean = true;
    deviceInfoPanelTemplate: HTMLTemplateElement;
    deviceServicePanelTemplate: HTMLTemplateElement;
    characteristicRow: HTMLTemplateElement;

    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.deviceInfoPanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_device_info_panel_template');
        this.deviceServicePanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_device_service_panel');
        this.characteristicRow = <HTMLTemplateElement>document.querySelector('#yahka_characteristic_row');
    }

    public refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!isDeviceConfig(config)) {
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
        if (!isDeviceConfig(deviceConfig)) {
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
            let input = <HTMLSelectElement>devInfoPanel.querySelector(selector);
            let errorElement = <HTMLElement>devInfoPanel.querySelector(selector + '_error');

            if (selectList) {
                this.fillSelectByDict(input, selectList);
            }

            let value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator))
            } else {
                if (value !== undefined) {
                    input.value = value;
                } else {
                    input.value = '';
                }
                input.addEventListener('input', this.handleDeviceMetaDataChange.bind(this, deviceConfig, propertyName, errorElement, validator));
            }
            this.refreshSimpleErrorElement(errorElement, validator);
        };

        inputHelper('#name', 'name', undefined, () => !this.delegate.deviceIsUnique(deviceConfig));
        inputHelper('#enabled', 'enabled');
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
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

            if (serviceConfig) {
                let value = serviceConfig[configName];
                if (value !== undefined) {
                    input.value = value;
                } else {
                    input.value = '';
                }
            }

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
            if (selectList !== undefined)
                this.fillSelectByArray(input, selectList);
            if (charConfig) {
                let value = charConfig[configName];
                if (value !== undefined)
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
        for (let itemName of stringlist) {
            let optElem = document.createElement('option');
            optElem.value = itemName;
            optElem.text = itemName;
            inoutSelect.add(optElem);
        }
    }


    fillSelectByDict(inoutSelect: HTMLSelectElement, dictionary: IDictionary<ISelectListEntry>) {
        for (let key in dictionary) {
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
        let inputValue = inputTarget.value;
        charConfig[attribute] = inputValue;

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
        let inputValue = inputTarget.value;
        serviceConfig[attribute] = inputValue;

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }


    handleServiceTypeChange(serviceConfig: hkBridge.Configuration.IServiceConfig, servicePanel: HTMLElement, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        let inputValue = inputTarget.value;
        serviceConfig.type = inputValue;

        this.refreshServicePanelCaption(serviceConfig, servicePanel);

        this.buildCharacteristicTable(serviceConfig, servicePanel);

        this.delegate.changeCallback();
    }
}


class ConfigPageBuilder_IPCamera extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = false;
    public removeDeviceAvailable: boolean = true;
    public dupliacteDeviceAvailable: boolean = true;
    configPanelTemplate: HTMLTemplateElement;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.configPanelTemplate = <HTMLTemplateElement>document.querySelector('#yahka_cameraConfig_template');
    }

    public refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!isIPCameraConfig(config)) {
            return
        }

        let configFragment = <DocumentFragment>document.importNode(this.configPanelTemplate.content, true);
        translateFragment(configFragment);

        let inputHelper = (selector: string, propertyName: keyof hkBridge.Configuration.ICameraConfig, validator: TValidatorFunction = undefined) => {
            let input = <HTMLSelectElement>configFragment.querySelector(selector);
            let errorElement = <HTMLElement>configFragment.querySelector(selector + '_error');

            let value = config[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', this.handlePropertyChange.bind(this, config, propertyName, errorElement, validator))
            } else {
                if (value !== undefined) {
                    input.value = value.toString();
                } else {
                    input.value = '';
                }
                input.addEventListener('input', this.handlePropertyChange.bind(this, config, propertyName, errorElement, validator));
            }
            this.refreshSimpleErrorElement(errorElement, validator);
        };   
        
        let ffmpegHelper = (selector: string, propertyName: keyof hkBridge.Configuration.ICameraFfmpegCommandLine) => {
            let input = <HTMLTextAreaElement>configFragment.querySelector(selector);
            let inputErrorMsg = <HTMLElement>configFragment.querySelector(selector + '_error');

            let value = config.ffmpegCommandLine[propertyName];
            if (value !== undefined) {
                input.value = JSON.stringify(value, null, 2);
            } else {
                input.value = '';
            }
            input.addEventListener('input', this.handleffMpegPropertyChange.bind(this, config, propertyName, inputErrorMsg));
            
        };           

        inputHelper('#enabled', 'enabled');
        inputHelper('#name', 'name', () => !this.delegate.deviceIsUnique(config));
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#username', 'username');
        inputHelper('#pincode', 'pincode');
        inputHelper('#port', 'port');


        inputHelper('#source', 'source');
        inputHelper('#codec', 'codec');
        inputHelper('#numberOfStreams', 'numberOfStreams');
        inputHelper('#maxWidth', 'maxWidth');
        inputHelper('#maxHeight', 'maxHeight');
        inputHelper('#maxFPS', 'maxFPS');

        ffmpegHelper('#ffmpeg_snapshot', 'snapshot');
        ffmpegHelper('#ffmpeg_stream', 'stream');

        devicePanel.appendChild(configFragment);        
    }

    public styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        if (!isIPCameraConfig(deviceConfig)) {
            return false;
        }

        let listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-camera';
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    }

    handlePropertyChange(config: hkBridge.Configuration.ICameraConfig, propertyName: keyof hkBridge.Configuration.ICameraConfig, errorElement: HTMLElement, validator: TValidatorFunction, ev: Event) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            config[propertyName] = inputTarget.checked;
        } else {
            config[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    }

    displayExceptionHint(textArea: HTMLTextAreaElement, msgPanel: HTMLElement,  message: string | undefined) {
        textArea.classList.toggle('validationError', message !== undefined);
        msgPanel.classList.toggle('validationError', message !== undefined);
        msgPanel.innerText = message
    }



    handleffMpegPropertyChange(config: hkBridge.Configuration.ICameraConfig, propertyName: keyof hkBridge.Configuration.ICameraFfmpegCommandLine, inputErrorMsgPanel: HTMLElement, ev: Event) {
        let inputTarget = <HTMLTextAreaElement>ev.currentTarget;
        try {
            config.ffmpegCommandLine[propertyName] = JSON.parse(inputTarget.value);
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, undefined)
        } catch(e) {
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, e.message)
        }
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    }    
}