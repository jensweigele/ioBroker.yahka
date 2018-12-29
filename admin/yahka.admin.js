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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};


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
        '-s', '${width}x${height}',
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
var inoutFunctions = new Map([
    ["", function (valueChangeCallback) { return new ParameterEditor_Null(valueChangeCallback); }],
    ["const", function (valueChangeCallback) { return new ParameterEditor_Const(valueChangeCallback); }],
    ["ioBroker.State", function (valueChangeCallback) { return new ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.State.Defered", function (valueChangeCallback) { return new ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.State.OnlyACK", function (valueChangeCallback) { return new ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.homematic.WindowCovering.TargetPosition", function (valueChangeCallback) { return new ParameterEditor_HomeMaticWindowCoveringTargetPosition(valueChangeCallback); }]
]);
var convFunctions = new Map([
    ["", function (valueChangeCallback) { return new ParameterEditor_Null(valueChangeCallback); }],
    ["hue", function (valueChangeCallback) { return new ParameterEditor_Null(valueChangeCallback); }],
    ["level255", function (valueChangeCallback) { return new ParameterEditor_Null(valueChangeCallback); }],
    ["passthrough", function (valueChangeCallback) { return new ParameterEditor_Null(valueChangeCallback); }],
    ["inverse", function (valueChangeCallback) { return new ParameterEditor_Const(valueChangeCallback); }],
    ["scaleInt", function (valueChangeCallback) { return new ParameterEditor_ScaleConversionEditor(valueChangeCallback); }],
    ["scaleFloat", function (valueChangeCallback) { return new ParameterEditor_ScaleConversionEditor(valueChangeCallback); }],
    ["HomematicDirectionToHomekitPositionState", function (valueChangeCallback) { return new ParameterEditor_SingleState(valueChangeCallback); }],
    ["HomematicControlModeToHomekitHeathingCoolingState", function (valueChangeCallback) { return new ParameterEditor_SingleState(valueChangeCallback); }],
    ["script", function (valueChangeCallback) { return new ParameterEditor_ConversionScript(valueChangeCallback); }],
]);
var HAPServiceDictionary = {};
getObject('yahka.meta._serviceDictionary', function (error, object) {
    HAPServiceDictionary = object.native;
});
var accessoryCategories = {};
getObject('yahka.meta._accessoryCategories', function (error, object) {
    accessoryCategories = object.native;
});
function generateRandomUsername() {
    var usr = [];
    for (var i = 0; i < 6; i++)
        usr[i] = ('00' + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
    return usr.join(':');
}
var ioBroker_YahkaAdmin = (function () {
    function ioBroker_YahkaAdmin() {
    }
    ioBroker_YahkaAdmin.prototype.loadSettings = function (settingsObject, onChangeCallback) {
        this.settings = settingsObject;
        if (settingsObject.cameras === undefined) {
            settingsObject.cameras = [];
        }
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
    ioBroker_YahkaPageBuilder.prototype.deviceIsUnique = function (deviceConfig) {
        var devList = this.deviceListHandler.getDeviceList();
        return !devList.some(function (a) { return (a.name == deviceConfig.name) && (a !== deviceConfig); });
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
    ioBroker_YahkaPageBuilder.prototype.refreshDevicePanel = function (deviceConfig, AFocusLastPanel) {
        var pageBuilder = this.getPageBuilderByConfig(deviceConfig);
        var devicePanel = document.querySelector('#yahka_device_details');
        if (devicePanel) {
            devicePanel.innerHTML = '';
        }
        if (pageBuilder) {
            pageBuilder.refresh(deviceConfig, AFocusLastPanel, devicePanel);
        }
    };
    ioBroker_YahkaPageBuilder.prototype.setSelectedDeviceConfig = function (deviceConfig, AFocusLastPanel) {
        this._selectedDeviceConfig = deviceConfig;
        this.refreshDevicePanel(deviceConfig, AFocusLastPanel);
        this.buttonHandler.refreshBridgeButtons(document.body);
    };
    ioBroker_YahkaPageBuilder.prototype.refreshDeviceListEntry = function (deviceConfig) {
        this.deviceListHandler.refreshDeviceList();
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
    ConfigPageBuilder_Base.prototype.refreshSimpleErrorElement = function (errorElement, validator) {
        var errorVisible = false;
        if (validator)
            errorVisible = validator();
        if (errorElement)
            errorElement.classList.toggle('validationError', errorVisible);
    };
    return ConfigPageBuilder_Base;
}());
var ioBroker_DeviceListHandler = (function (_super) {
    __extends(ioBroker_DeviceListHandler, _super);
    function ioBroker_DeviceListHandler(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.listEntryToConfigMap = new Map();
        _this.deviceListEntryTemplate = document.querySelector('#yahka_devicelist_entry');
        return _this;
    }
    ioBroker_DeviceListHandler.prototype.getDeviceList = function () {
        var result = [this.delegate.bridgeSettings];
        var devices = [];
        if (this.delegate.bridgeSettings.devices)
            devices = devices.concat(this.delegate.bridgeSettings.devices);
        if (this.delegate.cameraConfigs)
            devices = devices.concat(this.delegate.cameraConfigs);
        return result.concat(devices.sort(function (a, b) { return a.name.localeCompare(b.name); }));
    };
    ioBroker_DeviceListHandler.prototype.createDeviceListEntry = function (deviceConfig) {
        var deviceEntry = document.importNode(this.deviceListEntryTemplate.content, true);
        var listItem = deviceEntry.querySelector('.list');
        this.refreshDeviceListEntry(deviceConfig, listItem);
        return deviceEntry;
    };
    ioBroker_DeviceListHandler.prototype.buildDeviceList = function (bridgeFrame) {
        var e_1, _a;
        var bridge = this.delegate.bridgeSettings;
        var deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        this.listEntryToConfigMap.clear();
        try {
            for (var _b = __values(this.getDeviceList()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var deviceConfig = _c.value;
                var fragment = this.createDeviceListEntry(deviceConfig);
                var node = fragment.querySelector('.list');
                this.listEntryToConfigMap.set(node, deviceConfig);
                deviceList.appendChild(fragment);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        $(deviceList).listview({ onListClick: this.handleDeviceListClick.bind(this) });
    };
    ioBroker_DeviceListHandler.prototype.refreshDeviceList = function () {
        var _this = this;
        this.listEntryToConfigMap.forEach(function (node, element) { return _this.refreshDeviceListEntry(node, element); });
    };
    ioBroker_DeviceListHandler.prototype.refreshDeviceListEntry = function (deviceConfig, listItem) {
        if (!listItem)
            return;
        var pageBuilder = this.delegate.getPageBuilderByConfig(deviceConfig);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.delegate.selectedDeviceConfig));
        var stylingDone = false;
        if (pageBuilder !== undefined) {
            stylingDone = pageBuilder.styleListItem(listItem, deviceConfig);
        }
        listItem.classList.toggle('error', !this.delegate.deviceIsUnique(deviceConfig));
        if (!stylingDone) {
            var listIcon = listItem.querySelector('.list-icon');
            listIcon.className = 'list-icon icon mif-question';
        }
    };
    ioBroker_DeviceListHandler.prototype.handleDeviceListClick = function (deviceNode) {
        if (!deviceNode)
            return;
        var deviceConfig = this.listEntryToConfigMap.get(deviceNode[0]);
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
                _this.delegate.refreshDevicePanel(dev, true);
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
        if (elem = bridgePane.querySelector('#yahka_duplicate_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                var copyOfDevice = $.extend(true, {}, dev);
                copyOfDevice.name = copyOfDevice.name + " copy";
                if (isDeviceConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    bridge.devices.push(copyOfDevice);
                }
                else if (isIPCameraConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    _this.delegate.cameraConfigs.push(copyOfDevice);
                }
                else {
                    return;
                }
                _this.delegate.setSelectedDeviceConfig(copyOfDevice, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
    };
    ioBroker_ButtonHandler.prototype.refreshBridgeButtons = function (parent) {
        var addServiceButton = parent.querySelector('#yahka_add_service');
        var removeDeviceButton = parent.querySelector('#yahka_remove_device');
        var duplicateDeviceButton = parent.querySelector('#yahka_duplicate_device');
        var pageBuilder = this.delegate.getPageBuilderByConfig(this.delegate.selectedDeviceConfig);
        var addServiceEnabled = pageBuilder ? pageBuilder.addServiceAvailable : false;
        var removeDevEnabled = pageBuilder ? pageBuilder.removeDeviceAvailable : false;
        var duplicateDeviceEnabled = pageBuilder ? pageBuilder.dupliacteDeviceAvailable : false;
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
        _this.dupliacteDeviceAvailable = false;
        _this.bridgeConfigPanelTemplate = document.querySelector('#yahka_bridgeconfig_template');
        return _this;
    }
    ConfigPageBuilder_BridgeConfig.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        var _this = this;
        if (!isBridgeConfig(config)) {
            return;
        }
        var bridgeConfigFragment = document.importNode(this.bridgeConfigPanelTemplate.content, true);
        translateFragment(bridgeConfigFragment);
        var inputHelper = function (selector, propertyName, validator) {
            if (validator === void 0) { validator = undefined; }
            var input = bridgeConfigFragment.querySelector(selector);
            var errorElement = bridgeConfigFragment.querySelector(selector + '_error');
            var value = config[propertyName];
            if (value !== undefined) {
                input.value = value;
            }
            else {
                input.value = '';
            }
            input.addEventListener("input", _this.handleBridgeMetaDataChange.bind(_this, config, propertyName, errorElement, validator));
            _this.refreshSimpleErrorElement(errorElement, validator);
        };
        var checkboxHelper = function (selector, propertyName, validator) {
            if (validator === void 0) { validator = undefined; }
            var input = bridgeConfigFragment.querySelector(selector);
            var errorElement = bridgeConfigFragment.querySelector(selector + '_error');
            var value = config[propertyName];
            input.checked = value;
            input.addEventListener("click", _this.handleBridgeMetaDataChange.bind(_this, config, propertyName, errorElement, validator));
            _this.refreshSimpleErrorElement(errorElement, validator);
        };
        inputHelper('#name', 'name', function () { return !_this.delegate.deviceIsUnique(config); });
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#username', 'username');
        inputHelper('#pincode', 'pincode');
        inputHelper('#port', 'port');
        checkboxHelper('#verboseLogging', 'verboseLogging');
        devicePanel.appendChild(bridgeConfigFragment);
    };
    ConfigPageBuilder_BridgeConfig.prototype.styleListItem = function (listItem, deviceConfig) {
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-tree';
        listItem.classList.add('fg-grayDark');
        return true;
    };
    ConfigPageBuilder_BridgeConfig.prototype.handleBridgeMetaDataChange = function (bridgeConfig, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            bridgeConfig[propertyName] = inputTarget.checked;
        }
        else {
            bridgeConfig[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(bridgeConfig);
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
        _this.dupliacteDeviceAvailable = true;
        _this.deviceInfoPanelTemplate = document.querySelector('#yahka_device_info_panel_template');
        _this.deviceServicePanelTemplate = document.querySelector('#yahka_device_service_panel');
        _this.characteristicRow = document.querySelector('#yahka_characteristic_row');
        return _this;
    }
    ConfigPageBuilder_CustomDevice.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        var e_2, _a;
        if (!isDeviceConfig(config)) {
            return;
        }
        var lastPane = this.buildDeviceInformationPanel(config, devicePanel);
        try {
            for (var _b = __values(config.services), _c = _b.next(); !_c.done; _c = _b.next()) {
                var serviceConfig = _c.value;
                var servicePanel = this.createServicePanel(config, serviceConfig);
                devicePanel.appendChild(servicePanel);
                lastPane = servicePanel;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (AFocusLastPanel && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                var heading = lastPane.querySelector('.heading');
                if (heading)
                    heading.click();
            }
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.styleListItem = function (listItem, deviceConfig) {
        if (!isDeviceConfig(deviceConfig)) {
            return false;
        }
        var iconClass = "mif-question";
        var cat;
        if (accessoryCategories !== undefined) {
            if (cat = accessoryCategories[deviceConfig.category])
                iconClass = cat['icon'];
        }
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    };
    ConfigPageBuilder_CustomDevice.prototype.buildDeviceInformationPanel = function (deviceConfig, devicePane) {
        var _this = this;
        var devInfoFragment = document.importNode(this.deviceInfoPanelTemplate.content, true);
        var devInfoPanel = devInfoFragment.querySelector('#yahka_device_info_panel');
        translateFragment(devInfoFragment);
        var inputHelper = function (selector, propertyName, selectList, validator) {
            if (validator === void 0) { validator = undefined; }
            var input = devInfoPanel.querySelector(selector);
            var errorElement = devInfoPanel.querySelector(selector + '_error');
            if (selectList) {
                _this.fillSelectByDict(input, selectList);
            }
            var value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName, errorElement, validator));
            }
            else {
                if (value !== undefined) {
                    input.value = value;
                }
                else {
                    input.value = '';
                }
                input.addEventListener('input', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName, errorElement, validator));
            }
            _this.refreshSimpleErrorElement(errorElement, validator);
        };
        inputHelper('#name', 'name', undefined, function () { return !_this.delegate.deviceIsUnique(deviceConfig); });
        inputHelper('#enabled', 'enabled');
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#category', 'category', accessoryCategories);
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
            _this.delegate.setSelectedDeviceConfig(undefined, false);
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
        var e_3, _a;
        if (!service) {
            return undefined;
        }
        try {
            for (var _b = __values(service.characteristics), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cfg = _c.value;
                if (cfg.name == characteristicName) {
                    return cfg;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
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
        var e_4, _a, e_5, _b;
        var serviceDef = HAPServiceDictionary[serviceConfig.type];
        var createdCharacteristics = {};
        try {
            for (var _c = __values(serviceConfig.characteristics), _d = _c.next(); !_d.done; _d = _c.next()) {
                var charConfig = _d.value;
                var charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
                if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                    this.removeCharacteristic(serviceConfig, charConfig);
                    continue;
                }
                var charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig);
                createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
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
        try {
            for (var charRows_1 = __values(charRows), charRows_1_1 = charRows_1.next(); !charRows_1_1.done; charRows_1_1 = charRows_1.next()) {
                var row = charRows_1_1.value;
                table.appendChild(row[2]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (charRows_1_1 && !charRows_1_1.done && (_b = charRows_1.return)) _b.call(charRows_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.getParameterEditor = function (functionName, valueChangeCallback, functionMap) {
        if (!functionMap.has(functionName)) {
            return new ParameterEditor_Null(valueChangeCallback);
        }
        var constr = functionMap.get(functionName);
        return new constr(valueChangeCallback);
    };
    ConfigPageBuilder_CustomDevice.prototype.updateParameterEditor = function (functionName, parameterContainer, parameterValue, parameterChangeCallback, functionMap) {
        var editor = this.getParameterEditor(functionName, parameterChangeCallback, functionMap);
        if (editor == undefined)
            return;
        editor.refreshAndShow(parameterContainer, parameterValue);
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
        var functionSelector = function (selector, containerSelector, configName, parameterName, functionMap) {
            var input = rowElement.querySelector(selector);
            var container = rowElement.querySelector(containerSelector);
            if (functionMap !== undefined) {
                var mapKeys = __spread(functionMap.keys());
                _this.fillSelectByArray(input, mapKeys);
            }
            var parameterValue = '';
            if (charConfig) {
                var value = charConfig[configName];
                if (value !== undefined)
                    input.value = value;
                else
                    input.value = "";
                parameterValue = charConfig[parameterName];
            }
            if (!parameterValue)
                parameterValue = '';
            var paramUpdateMethod = function (newValue) {
                var charConfig = _this.findConfigCharacteristic(serviceConfig, name);
                if (charConfig === undefined) {
                    charConfig = { name: name, enabled: false };
                    serviceConfig.characteristics.push(charConfig);
                }
                charConfig[parameterName] = newValue;
                _this.delegate.changeCallback();
            };
            _this.updateParameterEditor(input.value, container, parameterValue, paramUpdateMethod, functionMap);
            input.addEventListener('input', function (e) {
                _this.handleCharacteristicInputChange(serviceConfig, name, configName, e);
                _this.updateParameterEditor(input.value, container, charConfig[parameterName], paramUpdateMethod, functionMap);
                return false;
            });
        };
        functionSelector('#characteristic_inoutfunction', '#characteristic_inoutparams_container', 'inOutFunction', 'inOutParameters', inoutFunctions);
        functionSelector('#characteristic_conversionfunction', '#characteristic_conversionparams_container', 'conversionFunction', 'conversionParameters', convFunctions);
        return rowElement;
    };
    ConfigPageBuilder_CustomDevice.prototype.fillSelectByArray = function (inoutSelect, stringlist) {
        var e_6, _a;
        try {
            for (var stringlist_1 = __values(stringlist), stringlist_1_1 = stringlist_1.next(); !stringlist_1_1.done; stringlist_1_1 = stringlist_1.next()) {
                var itemName = stringlist_1_1.value;
                var optElem = document.createElement('option');
                optElem.value = itemName;
                optElem.text = itemName;
                inoutSelect.add(optElem);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (stringlist_1_1 && !stringlist_1_1.done && (_a = stringlist_1.return)) _a.call(stringlist_1);
            }
            finally { if (e_6) throw e_6.error; }
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
    ConfigPageBuilder_CustomDevice.prototype.handleDeviceMetaDataChange = function (deviceConfig, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = (inputTarget.type === 'checkbox') ? inputTarget.checked : inputTarget.value;
        deviceConfig[propertyName] = inputValue;
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(deviceConfig);
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
        _this.dupliacteDeviceAvailable = true;
        _this.configPanelTemplate = document.querySelector('#yahka_cameraConfig_template');
        return _this;
    }
    ConfigPageBuilder_IPCamera.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        var _this = this;
        if (!isIPCameraConfig(config)) {
            return;
        }
        var configFragment = document.importNode(this.configPanelTemplate.content, true);
        translateFragment(configFragment);
        var inputHelper = function (selector, propertyName, validator) {
            if (validator === void 0) { validator = undefined; }
            var input = configFragment.querySelector(selector);
            var errorElement = configFragment.querySelector(selector + '_error');
            var value = config[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', _this.handlePropertyChange.bind(_this, config, propertyName, errorElement, validator));
            }
            else {
                if (value !== undefined) {
                    input.value = value.toString();
                }
                else {
                    input.value = '';
                }
                input.addEventListener('input', _this.handlePropertyChange.bind(_this, config, propertyName, errorElement, validator));
            }
            _this.refreshSimpleErrorElement(errorElement, validator);
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
        inputHelper('#enabled', 'enabled');
        inputHelper('#name', 'name', function () { return !_this.delegate.deviceIsUnique(config); });
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
    };
    ConfigPageBuilder_IPCamera.prototype.styleListItem = function (listItem, deviceConfig) {
        if (!isIPCameraConfig(deviceConfig)) {
            return false;
        }
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-camera';
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    };
    ConfigPageBuilder_IPCamera.prototype.handlePropertyChange = function (config, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            config[propertyName] = inputTarget.checked;
        }
        else {
            config[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_IPCamera.prototype.displayExceptionHint = function (textArea, msgPanel, message) {
        textArea.classList.toggle('validationError', message !== undefined);
        msgPanel.classList.toggle('validationError', message !== undefined);
        msgPanel.innerText = message;
    };
    ConfigPageBuilder_IPCamera.prototype.handleffMpegPropertyChange = function (config, propertyName, inputErrorMsgPanel, ev) {
        var inputTarget = ev.currentTarget;
        try {
            config.ffmpegCommandLine[propertyName] = JSON.parse(inputTarget.value);
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, undefined);
        }
        catch (e) {
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, e.message);
        }
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_IPCamera;
}(ConfigPageBuilder_Base));
var ParameterEditor = (function () {
    function ParameterEditor(valueChangeCallback) {
        this.valueChangeCallback = valueChangeCallback;
    }
    ParameterEditor.prototype.refreshAndShow = function (containerElement, withValue) {
    };
    ParameterEditor.prototype.removeChildren = function (parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    };
    ParameterEditor.prototype.cloneTemplateNode = function (selector) {
        var node = document.querySelector(selector);
        return document.importNode(node.content, true);
    };
    ParameterEditor.prototype.buildNewParameterValue = function () {
        return undefined;
    };
    ParameterEditor.prototype.valueChanged = function () {
        this.valueChangeCallback(this.buildNewParameterValue());
    };
    return ParameterEditor;
}());
var ParameterEditor_Null = (function (_super) {
    __extends(ParameterEditor_Null, _super);
    function ParameterEditor_Null() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParameterEditor_Null.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        this.lastParamValue = parameterValue;
    };
    ParameterEditor_Null.prototype.buildNewParameterValue = function () {
        return this.lastParamValue;
    };
    return ParameterEditor_Null;
}(ParameterEditor));
var ParameterEditor_SingleState = (function (_super) {
    __extends(ParameterEditor_SingleState, _super);
    function ParameterEditor_SingleState(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = _this.cloneTemplateNode('#editor_single_state');
        _this.textField = _this.templateNode.querySelector("#textfield");
        _this.textField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_SingleState.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        this.textField.value = parameterValue;
    };
    ParameterEditor_SingleState.prototype.buildNewParameterValue = function () {
        return this.textField.value;
    };
    return ParameterEditor_SingleState;
}(ParameterEditor));
var ParameterEditor_Const = (function (_super) {
    __extends(ParameterEditor_Const, _super);
    function ParameterEditor_Const(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = _this.cloneTemplateNode('#editor_const');
        _this.textField = _this.templateNode.querySelector("#textfield");
        _this.textField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_Const.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        this.textField.value = parameterValue;
    };
    ParameterEditor_Const.prototype.buildNewParameterValue = function () {
        return this.textField.value;
    };
    return ParameterEditor_Const;
}(ParameterEditor));
var ParameterEditor_ScaleConversionEditor = (function (_super) {
    __extends(ParameterEditor_ScaleConversionEditor, _super);
    function ParameterEditor_ScaleConversionEditor(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = _this.cloneTemplateNode('#editor_conversion_scale');
        _this.txtHKMin = _this.templateNode.querySelector("#hkMin");
        _this.txtHKMin.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtHKMax = _this.templateNode.querySelector("#hkMax");
        _this.txtHKMax.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtIOBrokerMin = _this.templateNode.querySelector("#ioMin");
        _this.txtIOBrokerMin.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtIOBrokerMax = _this.templateNode.querySelector("#ioMax");
        _this.txtIOBrokerMax.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_ScaleConversionEditor.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        var parameterArray = undefined;
        if (typeof parameterValue === 'object') {
            parameterArray = parameterValue;
        }
        else {
            try {
                parameterArray = JSON.parse(parameterValue);
            }
            catch (e) {
                this.txtHKMin.value = parameterValue;
                return;
            }
        }
        this.txtHKMin.value = parameterArray["homekit.min"];
        this.txtHKMax.value = parameterArray["homekit.max"];
        this.txtIOBrokerMin.value = parameterArray["iobroker.min"];
        this.txtIOBrokerMax.value = parameterArray["iobroker.max"];
    };
    ParameterEditor_ScaleConversionEditor.prototype.buildNewParameterValue = function () {
        return {
            "homekit.min": this.txtHKMin.valueAsNumber,
            "homekit.max": this.txtHKMax.valueAsNumber,
            "iobroker.min": this.txtIOBrokerMin.valueAsNumber,
            "iobroker.max": this.txtIOBrokerMax.valueAsNumber
        };
    };
    return ParameterEditor_ScaleConversionEditor;
}(ParameterEditor));
var ParameterEditor_HomeMaticWindowCoveringTargetPosition = (function (_super) {
    __extends(ParameterEditor_HomeMaticWindowCoveringTargetPosition, _super);
    function ParameterEditor_HomeMaticWindowCoveringTargetPosition(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = _this.cloneTemplateNode('#editor_conversion_HomeMaticWindowCoveringTargetPosition');
        _this.txtLevel = _this.templateNode.querySelector("#level");
        _this.txtLevel.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtWorking = _this.templateNode.querySelector("#working");
        _this.txtWorking.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_HomeMaticWindowCoveringTargetPosition.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        try {
            var p = void 0;
            if (typeof parameterValue === 'string')
                p = [parameterValue];
            else if (parameterValue instanceof Array)
                p = parameterValue;
            else
                p = [];
            this.txtLevel.value = (p.length >= 1) ? p[0] : "";
            this.txtWorking.value = (p.length >= 2) ? p[1] : "";
        }
        catch (e) {
            this.txtLevel.value = parameterValue;
            this.txtWorking.value = "";
        }
    };
    ParameterEditor_HomeMaticWindowCoveringTargetPosition.prototype.buildNewParameterValue = function () {
        var resultArray = [this.txtLevel.value];
        if (this.txtWorking.value)
            resultArray.push(this.txtWorking.value);
        return resultArray;
    };
    return ParameterEditor_HomeMaticWindowCoveringTargetPosition;
}(ParameterEditor));
var ParameterEditor_ConversionScript = (function (_super) {
    __extends(ParameterEditor_ConversionScript, _super);
    function ParameterEditor_ConversionScript(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = _this.cloneTemplateNode('#editor_conversion_script');
        _this.txtToHomeKit = _this.templateNode.querySelector("#toHomeKit");
        _this.txtToHomeKit.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtToIOBroker = _this.templateNode.querySelector("#toIOBroker");
        _this.txtToIOBroker.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_ConversionScript.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        this.txtToHomeKit.value = parameterValue["toHomeKit"] ? parameterValue["toHomeKit"] : "";
        this.txtToIOBroker.value = parameterValue["toIOBroker"] ? parameterValue["toIOBroker"] : "";
    };
    ParameterEditor_ConversionScript.prototype.buildNewParameterValue = function () {
        return {
            "toHomeKit": this.txtToHomeKit.value,
            "toIOBroker": this.txtToIOBroker.value
        };
    };
    return ParameterEditor_ConversionScript;
}(ParameterEditor));
//# sourceMappingURL=yahka.admin.js.map