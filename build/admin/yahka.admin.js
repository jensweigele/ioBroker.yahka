"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


function isBridgeConfig(config) {
    if (config === undefined)
        return false;
    return config.configType === "bridge";
}
function isDeviceConfig(config) {
    if (config === undefined)
        return false;
    return config.configType === "customdevice" || config.services !== undefined;
}
function isIPCameraConfig(config) {
    if (config === undefined)
        return false;
    return config.configType === "ipcamera";
}
var defaultCommandLine = {
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
        '-s', '${resolution}',
        '-f', 'image2',
        '-'
    ]
};
var webcamCommandLine = {
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
};
var ffmpegCommandLines = {
    default: defaultCommandLine,
    webcam: webcamCommandLine
};
var inoutFunctions = [];
getObject('yahka.meta._inoutFunctions', function (error, object) {
    inoutFunctions = object.native;
});
var convFunctions = [];
getObject('yahka.meta._conversionFunctions', function (error, object) {
    convFunctions = object.native;
});
var HAPServiceDictionary = {};
getObject('yahka.meta._serviceDictionary', function (error, object) {
    HAPServiceDictionary = object.native;
});
var accessoryCategories = {};
getObject('yahka.meta._accessoryCategories', function (error, object) {
    accessoryCategories = object.native;
});
var ioBroker_YahkaAdmin = (function () {
    function ioBroker_YahkaAdmin() {
    }
    ioBroker_YahkaAdmin.prototype.loadSettings = function (settingsObject, onChangeCallback) {
        this.settings = settingsObject;
        new ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);
        onChangeCallback(false);
    };
    ioBroker_YahkaAdmin.prototype.saveSettings = function (callback) {
        callback(this.settings);
    };
    return ioBroker_YahkaAdmin;
}());
var ioBroker_YahkaPageBuilder = (function () {
    function ioBroker_YahkaPageBuilder(_bridgeSettings, cameraConfigs, _changeCallback) {
        this._bridgeSettings = _bridgeSettings;
        this.cameraConfigs = cameraConfigs;
        this._changeCallback = _changeCallback;
        this.pageBuilders = new Map();
        this._selectedDeviceConfig = undefined;
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
    ioBroker_YahkaPageBuilder.prototype.bootstrap = function () {
        var bridgeFrame = document.querySelector('#yahka_bridge_frame');
        this.deviceListHandler.buildDeviceList(bridgeFrame);
        this.buttonHandler.bindBridgeButtons(bridgeFrame);
        this.buttonHandler.refreshBridgeButtons(bridgeFrame);
        return bridgeFrame;
    };
    ioBroker_YahkaPageBuilder.prototype.getPageBuilderByConfig = function (deviceConfig) {
        if (deviceConfig === undefined) {
            return undefined;
        }
        var configType = deviceConfig.configType;
        if (configType === undefined) {
            if (isBridgeConfig(deviceConfig)) {
                configType = 'bridge';
            }
            else if (isDeviceConfig(deviceConfig)) {
                configType = 'customdevice';
            }
        }
        return this.pageBuilders.get(configType);
    };
    Object.defineProperty(ioBroker_YahkaPageBuilder.prototype, "bridgeSettings", {
        get: function () {
            return this._bridgeSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ioBroker_YahkaPageBuilder.prototype, "selectedDeviceConfig", {
        get: function () {
            return this._selectedDeviceConfig;
        },
        enumerable: true,
        configurable: true
    });
    ioBroker_YahkaPageBuilder.prototype.setSelectedDeviceConfig = function (deviceConfig, AFocusLastPanel) {
        this._selectedDeviceConfig = deviceConfig;
        var pageBuilder = this.getPageBuilderByConfig(deviceConfig);
        if (pageBuilder) {
            pageBuilder.refresh(deviceConfig, AFocusLastPanel);
        }
        this.buttonHandler.refreshBridgeButtons(document.body);
    };
    ioBroker_YahkaPageBuilder.prototype.refreshDeviceListEntry = function (deviceConfig, listItem) {
        return this.deviceListHandler.refreshDeviceListEntry(deviceConfig, listItem);
    };
    ioBroker_YahkaPageBuilder.prototype.changeCallback = function () {
        return this._changeCallback();
    };
    return ioBroker_YahkaPageBuilder;
}());
var ConfigPageBuilder_Base = (function () {
    function ConfigPageBuilder_Base(delegate) {
        this.delegate = delegate;
    }
    return ConfigPageBuilder_Base;
}());
var ioBroker_DeviceListHandler = (function (_super) {
    __extends(ioBroker_DeviceListHandler, _super);
    function ioBroker_DeviceListHandler(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.deviceListEntryTemplate = document.querySelector('#yahka_devicelist_entry');
        return _this;
    }
    ioBroker_DeviceListHandler.prototype.getDeviceList = function () {
        var result = [this.delegate.bridgeSettings];
        if (this.delegate.bridgeSettings.devices)
            result = result.concat(this.delegate.bridgeSettings.devices);
        if (this.delegate.cameraConfigs)
            result = result.concat(this.delegate.cameraConfigs);
        return result;
    };
    ioBroker_DeviceListHandler.prototype.createDeviceListEntry = function (deviceConfig) {
        var deviceEntry = document.importNode(this.deviceListEntryTemplate.content, true);
        var listItem = deviceEntry.querySelector('.list');
        this.refreshDeviceListEntry(deviceConfig, listItem);
        return deviceEntry;
    };
    ioBroker_DeviceListHandler.prototype.buildDeviceList = function (bridgeFrame) {
        var bridge = this.delegate.bridgeSettings;
        var deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        for (var _i = 0, _a = this.getDeviceList(); _i < _a.length; _i++) {
            var deviceConfig = _a[_i];
            deviceList.appendChild(this.createDeviceListEntry(deviceConfig));
        }
        var deviceListClickHandler = this.handleDeviceListClick.bind(this, bridge);
        $(deviceList).listview({ onListClick: deviceListClickHandler });
    };
    ioBroker_DeviceListHandler.prototype.refreshDeviceListEntry = function (deviceConfig, listItem) {
        if (!listItem)
            return;
        var cat;
        var iconClass = "mif-question";
        if (isBridgeConfig(deviceConfig)) {
            iconClass = 'mif-tree';
        }
        else if ((accessoryCategories !== undefined) && (isDeviceConfig(deviceConfig))) {
            if (cat = accessoryCategories[deviceConfig.category])
                iconClass = cat['icon'];
        }
        else if (isIPCameraConfig(deviceConfig)) {
            iconClass = 'mif-camera';
        }
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.dataset["deviceIdent"] = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.delegate.selectedDeviceConfig));
    };
    ioBroker_DeviceListHandler.prototype.findDeviceConfig = function (bridgeConfig, deviceIdent) {
        if (!bridgeConfig)
            return undefined;
        for (var _i = 0, _a = this.getDeviceList(); _i < _a.length; _i++) {
            var devConfig = _a[_i];
            if (devConfig.name == deviceIdent)
                return devConfig;
        }
        return undefined;
    };
    ioBroker_DeviceListHandler.prototype.handleDeviceListClick = function (bridgeConfig, deviceNode) {
        if (!deviceNode)
            return;
        var deviceIdent = deviceNode[0].dataset["deviceIdent"];
        var deviceConfig = this.findDeviceConfig(bridgeConfig, deviceIdent);
        this.delegate.setSelectedDeviceConfig(deviceConfig, false);
    };
    return ioBroker_DeviceListHandler;
}(ConfigPageBuilder_Base));
var ioBroker_ButtonHandler = (function (_super) {
    __extends(ioBroker_ButtonHandler, _super);
    function ioBroker_ButtonHandler(delegate, deviceListHandler) {
        var _this = _super.call(this, delegate) || this;
        _this.deviceListHandler = deviceListHandler;
        return _this;
    }
    ioBroker_ButtonHandler.prototype.bindBridgeButtons = function (bridgePane) {
        var _this = this;
        var bridge = this.delegate.bridgeSettings;
        var elem;
        if (elem = bridgePane.querySelector('#yahka_add_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var newCustomDevice = {
                    configType: "customdevice",
                    manufacturer: "",
                    model: "",
                    name: "<new device " + _this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    enabled: true,
                    category: 1,
                    services: []
                };
                bridge.devices.push(newCustomDevice);
                _this.delegate.setSelectedDeviceConfig(newCustomDevice, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_add_camera')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var newIPCamera = {
                    configType: "ipcamera",
                    ident: "",
                    manufacturer: "",
                    model: "",
                    name: "<new camera " + _this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    port: 0,
                    username: "d8:be:54:e7:06:f6",
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
                _this.delegate.cameraConfigs.push(newIPCamera);
                _this.delegate.setSelectedDeviceConfig(newIPCamera, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_add_service')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                if (!isDeviceConfig(dev))
                    return;
                dev.services.push({
                    name: '',
                    subType: '',
                    type: '',
                    characteristics: []
                });
                var pageBuilder = _this.delegate.getPageBuilderByConfig(dev);
                if (pageBuilder) {
                    pageBuilder.refresh(dev, true);
                }
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_remove_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                if (isDeviceConfig(dev)) {
                    var idx = bridge.devices.indexOf(dev);
                    if (idx > -1) {
                        bridge.devices.splice(idx, 1);
                        _this.delegate.changeCallback();
                        _this.delegate.setSelectedDeviceConfig(undefined, false);
                        _this.deviceListHandler.buildDeviceList(bridgePane);
                        _this.delegate.changeCallback();
                    }
                }
                else if (isIPCameraConfig(dev)) {
                    var idx = _this.delegate.cameraConfigs.indexOf(dev);
                    if (idx > -1) {
                        _this.delegate.cameraConfigs.splice(idx, 1);
                        _this.delegate.changeCallback();
                        _this.delegate.setSelectedDeviceConfig(undefined, false);
                        _this.deviceListHandler.buildDeviceList(bridgePane);
                        _this.delegate.changeCallback();
                    }
                }
            });
        }
    };
    ioBroker_ButtonHandler.prototype.refreshBridgeButtons = function (parent) {
        var addServiceButton = parent.querySelector('#yahka_add_service');
        var removeDeviceButton = parent.querySelector('#yahka_remove_device');
        var pageBuilder = this.delegate.getPageBuilderByConfig(this.delegate.selectedDeviceConfig);
        var addServiceEnabled = pageBuilder ? pageBuilder.addServiceAvailable : false;
        var removeDevEnabled = pageBuilder ? pageBuilder.removeDeviceAvailable : false;
        if (addServiceEnabled)
            addServiceButton.removeAttribute('disabled');
        else
            addServiceButton.setAttribute('disabled', '');
        if (removeDevEnabled)
            removeDeviceButton.removeAttribute('disabled');
        else
            removeDeviceButton.setAttribute('disabled', '');
    };
    return ioBroker_ButtonHandler;
}(ConfigPageBuilder_Base));
var ConfigPageBuilder_BridgeConfig = (function (_super) {
    __extends(ConfigPageBuilder_BridgeConfig, _super);
    function ConfigPageBuilder_BridgeConfig(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = false;
        _this.removeDeviceAvailable = false;
        _this.bridgeConfigPanelTemplate = document.querySelector('#yahka_bridgeconfig_template');
        return _this;
    }
    ConfigPageBuilder_BridgeConfig.prototype.refresh = function (config, AFocusLastPanel) {
        if (!isBridgeConfig(config)) {
            return;
        }
        this.refreshBridgeConfigPane(config);
    };
    ConfigPageBuilder_BridgeConfig.prototype.refreshBridgeConfigPane = function (bridge) {
        var _this = this;
        var devicePane = document.querySelector('#yahka_device_details');
        devicePane.innerHTML = '';
        var bridgeConfigFragment = document.importNode(this.bridgeConfigPanelTemplate.content, true);
        translateFragment(bridgeConfigFragment);
        var inputHelper = function (selector, propertyName) {
            var input = bridgeConfigFragment.querySelector(selector);
            var value = bridge[propertyName];
            if (value !== undefined) {
                input.value = value;
            }
            else {
                input.value = '';
            }
            input.addEventListener("input", _this.handleBridgeMetaDataChange.bind(_this, bridge, propertyName));
        };
        var checkboxHelper = function (selector, propertyName) {
            var input = bridgeConfigFragment.querySelector(selector);
            var value = bridge[propertyName];
            input.checked = value;
            input.addEventListener("click", _this.handleBridgeMetaDataChange.bind(_this, bridge, propertyName));
        };
        inputHelper('#bridge_name', 'name');
        inputHelper('#bridge_manufacturer', 'manufacturer');
        inputHelper('#bridge_model', 'model');
        inputHelper('#bridge_serial', 'serial');
        inputHelper('#bridge_username', 'username');
        inputHelper('#bridge_pincode', 'pincode');
        inputHelper('#bridge_port', 'port');
        checkboxHelper('#bridge_verboseLogging', 'verboseLogging');
        devicePane.appendChild(bridgeConfigFragment);
    };
    ConfigPageBuilder_BridgeConfig.prototype.handleBridgeMetaDataChange = function (bridgeConfig, propertyName, ev) {
        var inputTarget = ev.currentTarget;
        var listItem = document.querySelector('div.list[data-device-ident="' + bridgeConfig.name + '"]');
        if (inputTarget.type == "checkbox") {
            bridgeConfig[propertyName] = inputTarget.checked;
        }
        else {
            bridgeConfig[propertyName] = inputTarget.value;
        }
        this.delegate.refreshDeviceListEntry(bridgeConfig, listItem);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_BridgeConfig;
}(ConfigPageBuilder_Base));
var ConfigPageBuilder_CustomDevice = (function (_super) {
    __extends(ConfigPageBuilder_CustomDevice, _super);
    function ConfigPageBuilder_CustomDevice(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = true;
        _this.removeDeviceAvailable = true;
        _this.deviceInfoPanelTemplate = document.querySelector('#yahka_device_info_panel_template');
        _this.deviceServicePanelTemplate = document.querySelector('#yahka_device_service_panel');
        _this.characteristicRow = document.querySelector('#yahka_characteristic_row');
        return _this;
    }
    ConfigPageBuilder_CustomDevice.prototype.refresh = function (config, AFocusLastPanel) {
        if (!isDeviceConfig(config)) {
            return;
        }
        this.refreshDevicePane(config, AFocusLastPanel);
    };
    ConfigPageBuilder_CustomDevice.prototype.refreshDevicePane = function (deviceConfig, focusLast) {
        var devicePane = document.querySelector('#yahka_device_details');
        devicePane.innerHTML = '';
        if (deviceConfig === undefined)
            return;
        var lastPane = this.buildDeviceInformationPanel(deviceConfig, devicePane);
        for (var _i = 0, _a = deviceConfig.services; _i < _a.length; _i++) {
            var serviceConfig = _a[_i];
            var servicePanel = this.createServicePanel(deviceConfig, serviceConfig);
            devicePane.appendChild(servicePanel);
            lastPane = servicePanel;
        }
        if (focusLast && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                var heading = lastPane.querySelector('.heading');
                if (heading)
                    heading.click();
            }
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.buildDeviceInformationPanel = function (deviceConfig, devicePane) {
        var _this = this;
        var devInfoFragment = document.importNode(this.deviceInfoPanelTemplate.content, true);
        var devInfoPanel = devInfoFragment.querySelector('#yahka_device_info_panel');
        translateFragment(devInfoFragment);
        var inputHelper = function (selector, propertyName, selectList) {
            var input = devInfoPanel.querySelector(selector);
            if (selectList) {
                _this.fillSelectByDict(input, selectList);
            }
            var value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName));
            }
            else {
                if (value !== undefined) {
                    input.value = value;
                }
                else {
                    input.value = '';
                }
                input.addEventListener('input', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName));
            }
        };
        inputHelper('#device_name', 'name');
        inputHelper('#device_enabled', 'enabled');
        inputHelper('#device_manufacturer', 'manufacturer');
        inputHelper('#device_model', 'model');
        inputHelper('#device_serial', 'serial');
        inputHelper('#device_category', 'category', accessoryCategories);
        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    };
    ConfigPageBuilder_CustomDevice.prototype.createServicePanel = function (deviceConfig, serviceConfig) {
        var _this = this;
        var servicePanel = document.importNode(this.deviceServicePanelTemplate.content, true);
        var frameNode = servicePanel.querySelector('#yahka_service_panel');
        translateFragment(servicePanel);
        var inputHelper = function (selector, configName, popuplateServices, eventHandler) {
            var input = frameNode.querySelector(selector);
            if (popuplateServices === true) {
                var selectList = Object.keys(HAPServiceDictionary);
                _this.fillSelectByArray(input, selectList);
            }
            if (serviceConfig) {
                var value = serviceConfig[configName];
                if (value !== undefined) {
                    input.value = value;
                }
                else {
                    input.value = '';
                }
            }
            if (eventHandler !== undefined)
                input.addEventListener('input', eventHandler);
            else
                input.addEventListener('input', _this.handleServiceMetaDataChange.bind(_this, serviceConfig, frameNode, configName));
        };
        this.refreshServicePanelCaption(serviceConfig, frameNode);
        inputHelper('#service_name', 'name');
        inputHelper('#service_type', 'type', true, this.handleServiceTypeChange.bind(this, serviceConfig, frameNode));
        inputHelper('#service_subtype', 'subType');
        this.buildCharacteristicTable(serviceConfig, frameNode);
        frameNode.querySelector('#yakha_delete_service').addEventListener('click', function () {
            var idx = deviceConfig.services.indexOf(serviceConfig);
            if (idx > -1) {
                deviceConfig.services.splice(idx, 1);
                _this.delegate.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
        });
        return frameNode;
    };
    ConfigPageBuilder_CustomDevice.prototype.refreshServicePanelCaption = function (serviceConfig, servicePanel) {
        servicePanel.querySelector('#yahka_service_caption').textContent = serviceConfig.name + '[' + serviceConfig.type + ']';
    };
    ConfigPageBuilder_CustomDevice.prototype.findHAPCharacteristic = function (serviceDef, characteristicName) {
        if (!serviceDef)
            return undefined;
        var x;
        if (x = serviceDef.characteristics[characteristicName])
            return x;
        return undefined;
    };
    ConfigPageBuilder_CustomDevice.prototype.findConfigCharacteristic = function (service, characteristicName) {
        if (!service) {
            return undefined;
        }
        for (var _i = 0, _a = service.characteristics; _i < _a.length; _i++) {
            var cfg = _a[_i];
            if (cfg.name == characteristicName) {
                return cfg;
            }
        }
        return undefined;
    };
    ConfigPageBuilder_CustomDevice.prototype.isEmptyCharacteristic = function (charConfig) {
        if (charConfig === undefined)
            return true;
        if (charConfig.name === '')
            return true;
        if ((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined))
            return true;
        return false;
    };
    ConfigPageBuilder_CustomDevice.prototype.removeCharacteristic = function (serviceConfig, charConfig) {
        if (serviceConfig === undefined) {
            return;
        }
        var idx = serviceConfig.characteristics.indexOf(charConfig);
        if (idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.delegate.changeCallback();
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.buildCharacteristicTable = function (serviceConfig, servicePanel) {
        var serviceDef = HAPServiceDictionary[serviceConfig.type];
        var createdCharacteristics = {};
        for (var _i = 0, _a = serviceConfig.characteristics; _i < _a.length; _i++) {
            var charConfig = _a[_i];
            var charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
            if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                this.removeCharacteristic(serviceConfig, charConfig);
                continue;
            }
            var charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig);
            createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
        }
        if (serviceDef) {
            for (var charName in serviceDef.characteristics) {
                if (createdCharacteristics[charName] === undefined) {
                    var charDef = serviceDef.characteristics[charName];
                    var charRow = this.createCharacteristicRow(charDef, serviceConfig, undefined);
                    createdCharacteristics[charName] = [charName, charDef.optional, charRow];
                }
            }
        }
        var charRows = [];
        for (var charRow in createdCharacteristics)
            charRows.push(createdCharacteristics[charRow]);
        charRows.sort(function (a, b) {
            if (a[1] != b[1])
                return a[1] ? -1 : 1;
            return a[0].localeCompare(b[0]);
        });
        var table = servicePanel.querySelector('#yahka_characteristic_table');
        while (table.childElementCount > 1) {
            table.removeChild(table.lastElementChild);
        }
        for (var _b = 0, charRows_1 = charRows; _b < charRows_1.length; _b++) {
            var row = charRows_1[_b];
            table.appendChild(row[2]);
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.createCharacteristicRow = function (charDef, serviceConfig, charConfig) {
        var _this = this;
        var name = charConfig ? charConfig.name : charDef.name;
        var enabled = charConfig ? charConfig.enabled : false;
        var rowElement = document.importNode(this.characteristicRow.content, true);
        translateFragment(rowElement);
        var bracketElement = rowElement.querySelector('#characteristic');
        var checkBox = rowElement.querySelector('#characteristic_enabled');
        checkBox.checked = enabled;
        checkBox.addEventListener('click', this.handleCharacteristicEnabledChange.bind(this, serviceConfig, name, bracketElement));
        this.refreshEnabledClass(bracketElement, enabled);
        this.refershOptionalClass(bracketElement, charDef ? charDef.optional : true);
        rowElement.querySelector('#characteristic_name').textContent = name;
        var inputHelper = function (selector, configName, selectList) {
            var input = rowElement.querySelector(selector);
            if (selectList !== undefined)
                _this.fillSelectByArray(input, selectList);
            if (charConfig) {
                var value = charConfig[configName];
                if (value !== undefined)
                    input.value = value;
                else
                    input.value = "";
            }
            input.addEventListener('input', _this.handleCharacteristicInputChange.bind(_this, serviceConfig, name, configName));
        };
        inputHelper('#characteristic_inoutfunction', 'inOutFunction', inoutFunctions);
        inputHelper('#characteristic_inoutparams', 'inOutParameters', undefined);
        inputHelper('#characteristic_conversionfunction', 'conversionFunction', convFunctions);
        inputHelper('#characteristic_conversionparams', 'conversionParameters', undefined);
        return rowElement;
    };
    ConfigPageBuilder_CustomDevice.prototype.fillSelectByArray = function (inoutSelect, stringlist) {
        for (var _i = 0, stringlist_1 = stringlist; _i < stringlist_1.length; _i++) {
            var itemName = stringlist_1[_i];
            var optElem = document.createElement('option');
            optElem.value = itemName;
            optElem.text = itemName;
            inoutSelect.add(optElem);
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.fillSelectByDict = function (inoutSelect, dictionary) {
        for (var key in dictionary) {
            var optElem = document.createElement('option');
            optElem.value = key;
            optElem.text = dictionary[key].text;
            inoutSelect.add(optElem);
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.refreshEnabledClass = function (row, enabled) {
        row.classList.toggle('disabled', !enabled);
    };
    ConfigPageBuilder_CustomDevice.prototype.refershOptionalClass = function (row, optional) {
        row.classList.toggle('optional-characteristic', optional);
    };
    ConfigPageBuilder_CustomDevice.prototype.handleCharacteristicEnabledChange = function (serviceConfig, charName, charRow, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        charConfig.enabled = inputTarget.checked;
        this.refreshEnabledClass(charRow, charConfig.enabled);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleCharacteristicInputChange = function (serviceConfig, charName, attribute, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        charConfig[attribute] = inputValue;
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleDeviceMetaDataChange = function (deviceConfig, propertyName, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = (inputTarget.type === 'checkbox') ? inputTarget.checked : inputTarget.value;
        var listItem = document.querySelector('div.list[data-device-ident="' + deviceConfig.name + '"]');
        deviceConfig[propertyName] = inputValue;
        this.delegate.refreshDeviceListEntry(deviceConfig, listItem);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleServiceMetaDataChange = function (serviceConfig, servicePanel, attribute, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        serviceConfig[attribute] = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleServiceTypeChange = function (serviceConfig, servicePanel, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        serviceConfig.type = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.buildCharacteristicTable(serviceConfig, servicePanel);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_CustomDevice;
}(ConfigPageBuilder_Base));
var ConfigPageBuilder_IPCamera = (function (_super) {
    __extends(ConfigPageBuilder_IPCamera, _super);
    function ConfigPageBuilder_IPCamera(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = false;
        _this.removeDeviceAvailable = true;
        _this.configPanelTemplate = document.querySelector('#yahka_cameraConfig_template');
        return _this;
    }
    ConfigPageBuilder_IPCamera.prototype.refresh = function (config, AFocusLastPanel) {
        if (!isIPCameraConfig(config)) {
            return;
        }
        this.refreshConfigPane(config);
    };
    ConfigPageBuilder_IPCamera.prototype.refreshConfigPane = function (config) {
        var _this = this;
        var devicePane = document.querySelector('#yahka_device_details');
        devicePane.innerHTML = '';
        var configFragment = document.importNode(this.configPanelTemplate.content, true);
        translateFragment(configFragment);
        var inputHelper = function (selector, propertyName) {
            var input = configFragment.querySelector(selector);
            var value = config[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', _this.handlePropertyChange.bind(_this, config, propertyName));
            }
            else {
                if (value !== undefined) {
                    input.value = value.toString();
                }
                else {
                    input.value = '';
                }
                input.addEventListener('input', _this.handlePropertyChange.bind(_this, config, propertyName));
            }
        };
        var ffmpegHelper = function (selector, propertyName) {
            var input = configFragment.querySelector(selector);
            var inputErrorMsg = configFragment.querySelector(selector + '_error');
            var value = config.ffmpegCommandLine[propertyName];
            if (value !== undefined) {
                input.value = JSON.stringify(value, null, 2);
            }
            else {
                input.value = '';
            }
            input.addEventListener('input', _this.handleffMpegPropertyChange.bind(_this, config, propertyName, inputErrorMsg));
        };
        inputHelper('#camera_enabled', 'enabled');
        inputHelper('#camera_name', 'name');
        inputHelper('#camera_manufacturer', 'manufacturer');
        inputHelper('#camera_model', 'model');
        inputHelper('#camera_serial', 'serial');
        inputHelper('#camera_username', 'username');
        inputHelper('#camera_pincode', 'pincode');
        inputHelper('#camera_port', 'port');
        inputHelper('#camera_source', 'source');
        inputHelper('#camera_codec', 'codec');
        inputHelper('#camera_numberOfStreams', 'numberOfStreams');
        inputHelper('#camera_maxWidth', 'maxWidth');
        inputHelper('#camera_maxHeight', 'maxHeight');
        inputHelper('#camera_maxFPS', 'maxFPS');
        ffmpegHelper('#ffmpeg_snapshot', 'snapshot');
        ffmpegHelper('#ffmpeg_stream', 'stream');
        devicePane.appendChild(configFragment);
    };
    ConfigPageBuilder_IPCamera.prototype.handlePropertyChange = function (config, propertyName, ev) {
        var inputTarget = ev.currentTarget;
        var listItem = document.querySelector('div.list[data-device-ident="' + config.name + '"]');
        if (inputTarget.type == "checkbox") {
            config[propertyName] = inputTarget.checked;
        }
        else {
            config[propertyName] = inputTarget.value;
        }
        this.delegate.refreshDeviceListEntry(config, listItem);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_IPCamera.prototype.displayExceptionHint = function (textArea, msgPanel, message) {
        textArea.classList.toggle('validationError', message !== undefined);
        msgPanel.classList.toggle('validationError', message !== undefined);
        msgPanel.innerText = message;
    };
    ConfigPageBuilder_IPCamera.prototype.handleffMpegPropertyChange = function (config, propertyName, inputErrorMsgPanel, ev) {
        var inputTarget = ev.currentTarget;
        var listItem = document.querySelector('div.list[data-device-ident="' + config.name + '"]');
        try {
            config.ffmpegCommandLine[propertyName] = JSON.parse(inputTarget.value);
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, undefined);
        }
        catch (e) {
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, e.message);
        }
        this.delegate.refreshDeviceListEntry(config, listItem);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_IPCamera;
}(ConfigPageBuilder_Base));
//# sourceMappingURL=yahka.admin.js.map