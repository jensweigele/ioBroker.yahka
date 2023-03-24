/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import * as $ from 'jquery';
import { Defaults } from '../admin.defaults';
import { ConfigPageBuilder_Base, IConfigPageBuilder, IConfigPageBuilderDelegate } from './pageBuilder.base';
import { ConfigPageBuilder_CustomDevice } from './pageBuilder.customDevice';
import { ConfigPageBuilder_BridgeConfig } from './pageBuilder.bridgeConfig';
import { ConfigPageBuilder_IPCamera } from './pageBuilder.ipCam';
import { createTemplateElement } from '../admin.pageLoader';

function generateRandomUsername(): string {
    let usr = [];
    for (let i = 0; i < 6; i++)
        usr[i] = (`00${Math.floor((Math.random() * 256)).toString(16)}`).substr(-2);
    return usr.join(':');
}

export class ioBroker_YahkaPageBuilder implements IConfigPageBuilderDelegate {
    protected deviceListHandler: ioBroker_DeviceListHandler;
    protected buttonHandler: ioBroker_ButtonHandler;
    protected pageBuilders = new Map<hkBridge.Configuration.TConfigNodeType, IConfigPageBuilder>();
    protected _selectedDeviceConfig: hkBridge.Configuration.IBaseConfigNode = undefined;

    constructor(private _bridgeSettings: hkBridge.Configuration.IBridgeConfig, public cameraConfigs: [hkBridge.Configuration.ICameraConfig], private _changeCallback) {
        if (!_bridgeSettings.devices) {
            _bridgeSettings.devices = [];
        }
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

    public rebuildDeviceList() {
        let bridgeFrame = <HTMLElement>document.querySelector('#yahka_bridge_frame');

        this.deviceListHandler.buildDeviceList(bridgeFrame);
        this.buttonHandler.refreshBridgeButtons(bridgeFrame);
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
            if (hkBridge.Configuration.isBridgeConfig(deviceConfig)) {
                configType = 'bridge';
            } else if (hkBridge.Configuration.isDeviceConfig(deviceConfig)) {
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
        if (devicePanel) {
            devicePanel.innerHTML = '';
        }
        if (pageBuilder) {
            pageBuilder.refresh(deviceConfig, AFocusLastPanel, devicePanel);
        }
    }

    public setSelectedDeviceConfig(deviceConfig: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean) {
        this._selectedDeviceConfig = deviceConfig;
        this.refreshDevicePanel(deviceConfig, AFocusLastPanel);
        this.buttonHandler.refreshBridgeButtons(document.body);
    }

    public refreshSelectedDeviceConfig() {
        this.setSelectedDeviceConfig(this._selectedDeviceConfig, false);
    }


    public refreshDeviceListEntry(deviceConfig?: hkBridge.Configuration.IBaseConfigNode) {
        this.deviceListHandler.refreshDeviceList();
    }

    public changeCallback() {
        return this._changeCallback()
    }
}

class ioBroker_DeviceListHandler extends ConfigPageBuilder_Base {
    deviceListEntryTemplate: HTMLTemplateElement;
    deviceListEntryGroupTemplate: HTMLTemplateElement;
    listEntryToConfigMap = new Map<HTMLElement, hkBridge.Configuration.IBaseConfigNode>();
    entryGroupMap = new Map<string, HTMLElement>();

    constructor(delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.deviceListEntryTemplate = createTemplateElement(require('./pageBuilder.main.deviceListEntry.inc.html'));
        this.deviceListEntryGroupTemplate = createTemplateElement(require('./pageBuilder.main.deviceListEntryGroup.inc.html'));
    }


    getDeviceList(): hkBridge.Configuration.IBaseConfigNode[] {
        let result: hkBridge.Configuration.IBaseConfigNode[] = [this.delegate.bridgeSettings];
        let devices: hkBridge.Configuration.IBaseConfigNode[] = [];
        if (this.delegate.bridgeSettings.devices)
            devices = devices.concat(this.delegate.bridgeSettings.devices)
        if (this.delegate.cameraConfigs)
            devices = devices.concat(this.delegate.cameraConfigs)
        return result.concat(devices.sort((a, b) => a.name.localeCompare(b.name)));
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
        deviceList.innerHTML = '';
        this.listEntryToConfigMap.clear();
        this.entryGroupMap.clear();
        for (let deviceConfig of this.getDeviceList().sort((a, b) => a.name?.localeCompare(b.name))) {
            const groupNode = this.getDeviceGroupNode(deviceList, deviceConfig);
            let fragment = this.createDeviceListEntry(deviceConfig);
            let node = (<HTMLElement>fragment.querySelector('.list'));
            this.listEntryToConfigMap.set(node, deviceConfig);
            groupNode.appendChild(fragment);
        }
        [...deviceList.children]
            .sort((a: HTMLElement, b: HTMLElement) => a.innerText?.localeCompare(b.innerText))
            .forEach(node => {
                return deviceList.appendChild(node);
            });

        (<any>$(deviceList)).listview({ onListClick: this.handleDeviceListClick.bind(this) });
    }

    private getDeviceGroupNode(deviceList: Element, deviceConfig: hkBridge.Configuration.IBaseConfigNode): HTMLElement {
        const groupName = deviceConfig.groupString ? deviceConfig.groupString : '<no group>';
        const dictIdentifier = groupName.toLocaleLowerCase();
        const existingNode = this.entryGroupMap.get(dictIdentifier);
        if (existingNode != null) {
            return existingNode;
        }
        const fragment = <DocumentFragment>document.importNode(this.deviceListEntryGroupTemplate.content, true);
        const listGroupNode = (<HTMLElement>fragment.querySelector('.list-group'));
        const listGroupName = (<HTMLElement>fragment.querySelector('.list-group-toggle'));
        const listGroupContent = (<HTMLElement>fragment.querySelector('.list-group-content'));
        listGroupName.innerText = groupName;
        this.entryGroupMap.set(dictIdentifier, listGroupContent);
        deviceList.appendChild(listGroupNode);
        return listGroupContent;
    }

    public refreshDeviceList() {
        this.listEntryToConfigMap.forEach((node, element) => this.refreshDeviceListEntry(node, element))
    }

    private refreshDeviceListEntry(deviceConfig: hkBridge.Configuration.IBaseConfigNode, listItem: HTMLElement) {
        if (!listItem)
            return;

        let pageBuilder = this.delegate.getPageBuilderByConfig(deviceConfig);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.delegate.selectedDeviceConfig));
        let stylingDone = false
        if (pageBuilder !== undefined) {
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
                    configType: 'customdevice',
                    manufacturer: '',
                    model: '',
                    name: `<new device ${this.deviceListHandler.getDeviceList().length}>`,
                    serial: '',
                    firmware: '',
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
                    configType: 'ipcamera',
                    ident: '',
                    manufacturer: '',
                    model: '',
                    name: `<new camera ${this.deviceListHandler.getDeviceList().length}>`,
                    serial: '',
                    firmware: '',
                    port: 0,
                    username: generateRandomUsername(),
                    pincode: '123-45-678',
                    enabled: true,
                    source: '',
                    codec: 'libx264',
                    maxWidth: 1920,
                    maxHeight: 1080,
                    maxFPS: 60,
                    verboseLogging: false,
                    numberOfStreams: undefined,
                    ffmpegCommandLine: Defaults.ffmpegCommandLines.default,
                    enableAudio: false,
                    devices: [],
                    services: []
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
                if (!hkBridge.Configuration.isDeviceConfig(dev) && !hkBridge.Configuration.isIPCameraConfig(dev))
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
                if (hkBridge.Configuration.isIPCameraConfig(dev)) {
                    let idx = this.delegate.cameraConfigs.indexOf(dev);
                    if (idx > -1) {
                        this.delegate.cameraConfigs.splice(idx, 1);
                        this.delegate.changeCallback();
                        this.delegate.setSelectedDeviceConfig(undefined, false);
                        this.deviceListHandler.buildDeviceList(bridgePane);
                        this.delegate.changeCallback();
                    }
                } else if (hkBridge.Configuration.isDeviceConfig(dev)) {
                    let idx = bridge.devices.indexOf(dev);
                    if (idx > -1) {
                        bridge.devices.splice(idx, 1);
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
                copyOfDevice.name = `${copyOfDevice.name} copy`
                if (hkBridge.Configuration.isIPCameraConfig(copyOfDevice)) {
                    copyOfDevice.serial = '';
                    this.delegate.cameraConfigs.push(copyOfDevice);
                } else if (hkBridge.Configuration.isDeviceConfig(copyOfDevice)) {
                    copyOfDevice.serial = '';
                    bridge.devices.push(copyOfDevice);
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
        let duplicateDeviceEnabled = pageBuilder ? pageBuilder.duplicateDeviceAvailable : false;

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

