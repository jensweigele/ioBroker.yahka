/// <reference path="../../typings/index.d.ts" />
import * as hkBridge from '../../shared/yahka.configuration';
import * as $ from 'jquery';
import { ConfigPageBuilder_Base, IConfigPageBuilder, IConfigPageBuilderDelegate, TValidatorFunction } from './pageBuilder.base';
import { translateFragment } from '../admin.translation';
import { createTemplateElement } from '../admin.pageLoader';
import { IDictionary } from '../../shared/yahka.configuration';
import { ISelectListEntry } from '../admin.config';
import { ioBrokerInterfaceList } from '../yahka.admin';
import { Defaults } from '../admin.defaults';
import { ConfigPageBuilder_ServicePanel } from './pageBuilder.servicePanel';

export class ConfigPageBuilder_IPCamera extends ConfigPageBuilder_Base implements IConfigPageBuilder {
    public addServiceAvailable: boolean = true;
    public removeDeviceAvailable: boolean = true;
    public dupliacteDeviceAvailable: boolean = true;
    private configPanelTemplate: HTMLTemplateElement;
    private servicePanelBuilder: ConfigPageBuilder_ServicePanel;
    constructor(protected delegate: IConfigPageBuilderDelegate) {
        super(delegate);
        this.servicePanelBuilder = new ConfigPageBuilder_ServicePanel(delegate);
        this.configPanelTemplate = createTemplateElement(require('./pageBuilder.ipCam.main.inc.html'));
    }

    public async refresh(config: hkBridge.Configuration.IBaseConfigNode, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        if (!hkBridge.Configuration.isIPCameraConfig(config)) {
            return;
        }

        this.refreshCameraPanels(config, AFocusLastPanel, devicePanel);
        this.refreshServicePanels(config, AFocusLastPanel, devicePanel);
    }

    private async refreshCameraPanels(config: hkBridge.Configuration.ICameraConfig, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        let configFragment = <DocumentFragment>document.importNode(this.configPanelTemplate.content, true);
        translateFragment(configFragment);

        let inputHelper = (
            selector: string,
            propertyName: keyof hkBridge.Configuration.ICameraConfig,
            selectList?: IDictionary<ISelectListEntry> | ISelectListEntry[],
            validator: TValidatorFunction = undefined,
            checkDefault = true
        ) => {
            let input = <HTMLInputElement>configFragment.querySelector(selector);
            let errorElement = <HTMLElement>configFragment.querySelector(selector + '_error');
            this.fillSelectByListEntries(input, selectList);
            let value = config[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? checkDefault : Boolean(value);
                input.addEventListener('change', this.handlePropertyChange.bind(this, config, propertyName, errorElement, validator));
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

            configFragment.querySelector(selector + '_reset').addEventListener('click', () => {
                input.value = JSON.stringify(Defaults.ffmpegCommandLines.default[propertyName], null, 2);
                input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                return true;
            });
        };

        inputHelper('#enabled', 'enabled');
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
        inputHelper('#useLegacyAdvertiser', 'useLegacyAdvertiser', undefined, undefined, false);
        inputHelper('#useCiaoAdvertiser', 'useCiaoAdvertiser', undefined, undefined, false);

        inputHelper('#source', 'source');
        inputHelper('#codec', 'codec');
        inputHelper('#enableAudio', 'enableAudio', undefined, undefined, false);
        inputHelper('#numberOfStreams', 'numberOfStreams');
        inputHelper('#maxWidth', 'maxWidth');
        inputHelper('#maxHeight', 'maxHeight');
        inputHelper('#maxFPS', 'maxFPS');

        ffmpegHelper('#ffmpeg_snapshot', 'snapshot');
        ffmpegHelper('#ffmpeg_stream', 'stream');
        ffmpegHelper('#ffmpeg_streamAudio', 'streamAudio');

        devicePanel.appendChild(configFragment);
    }

    private refreshServicePanels(config: hkBridge.Configuration.ICameraConfig, AFocusLastPanel: boolean, devicePanel: HTMLElement) {
        let lastPane: HTMLElement;
        config.services = config.services ?? [];
        for (let serviceConfig of config.services) {
            let servicePanel = this.servicePanelBuilder.createServicePanel(config.services, serviceConfig);
            devicePanel.appendChild(servicePanel);
            lastPane = servicePanel;
        }

        if (AFocusLastPanel && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                let heading = <HTMLElement>lastPane.querySelector('.heading');
                if (heading) heading.click();
            }
        }
    }

    public styleListItem(listItem: HTMLElement, deviceConfig: hkBridge.Configuration.IBaseConfigNode): boolean {
        if (!hkBridge.Configuration.isIPCameraConfig(deviceConfig)) {
            return false;
        }

        let listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-camera';
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    }

    public handlePropertyChange(
        config: hkBridge.Configuration.ICameraConfig,
        propertyName: keyof hkBridge.Configuration.ICameraConfig,
        errorElement: HTMLElement,
        validator: TValidatorFunction,
        ev: Event
    ) {
        let inputTarget = <HTMLInputElement>ev.currentTarget;
        if (inputTarget.type == 'checkbox') {
            (config[propertyName] as any) = inputTarget.checked;
        } else {
            (config[propertyName] as any) = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    }

    private displayExceptionHint(textArea: HTMLTextAreaElement, msgPanel: HTMLElement, message: string | undefined) {
        textArea.classList.toggle('validationError', message !== undefined);
        msgPanel.classList.toggle('validationError', message !== undefined);
        msgPanel.innerText = message;
    }

    private handleffMpegPropertyChange(
        config: hkBridge.Configuration.ICameraConfig,
        propertyName: keyof hkBridge.Configuration.ICameraFfmpegCommandLine,
        inputErrorMsgPanel: HTMLElement,
        ev: Event
    ) {
        let inputTarget = <HTMLTextAreaElement>ev.currentTarget;
        try {
            config.ffmpegCommandLine[propertyName] = JSON.parse(inputTarget.value);
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, undefined);
        } catch (e) {
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, e.message);
        }
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    }
}
