"use strict";
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
        new ioBroker_YahkaPageBuilder(this.settings.bridge, onChangeCallback);
        onChangeCallback(false);
    };
    ioBroker_YahkaAdmin.prototype.saveSettings = function (callback) {
        callback(this.settings);
    };
    return ioBroker_YahkaAdmin;
}());
var ioBroker_YahkaPageBuilder = (function () {
    function ioBroker_YahkaPageBuilder(bridgeSettings, changeCallback) {
        this.bridgeSettings = bridgeSettings;
        this.changeCallback = changeCallback;
        this.selectedDeviceConfig = undefined;
        this.deviceListEntryTemplate = document.querySelector('#yahka_devicelist_entry');
        this.deviceInfoPanelTemplate = document.querySelector('#yahka_device_info_panel');
        this.deviceServicePanelTemplate = document.querySelector('#yahka_device_service_panel');
        this.characteristicRow = document.querySelector('#yahka_characteristic_row');
        this.refreshBridgeFrame();
    }
    ioBroker_YahkaPageBuilder.prototype.refreshBridgeFrame = function () {
        var bridgeFrame = document.querySelector('#yahka_bridge_frame');
        this.refreshBridgeFields(this.bridgeSettings);
        this.buildDeviceList(this.bridgeSettings, bridgeFrame);
        this.bindBridgeButtons(this.bridgeSettings, bridgeFrame);
        this.refreshBridgeButtons(bridgeFrame);
        return bridgeFrame;
    };
    ioBroker_YahkaPageBuilder.prototype.setSelectedDeviceConfig = function (deviceConfig, AFocusLastPanel) {
        this.selectedDeviceConfig = deviceConfig;
        this.refreshDevicePane(deviceConfig, AFocusLastPanel);
        this.refreshBridgeButtons(document.body);
    };
    ioBroker_YahkaPageBuilder.prototype.refreshBridgeFields = function (bridge) {
        var _this = this;
        var inputHelper = function (selector, propertyName) {
            var input = document.querySelector(selector);
            var value = bridge[propertyName];
            if (value !== undefined)
                input.value = value;
            else
                input.value = "";
            input.addEventListener("input", _this.handleBridgeMetaDataChange.bind(_this, bridge, propertyName));
        };
        var checkboxHelper = function (selector, propertyName) {
            var input = document.querySelector(selector);
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
    };
    ioBroker_YahkaPageBuilder.prototype.bindBridgeButtons = function (bridge, bridgePane) {
        var _this = this;
        var elem;
        if (elem = bridgePane.querySelector('#yahka_add_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var newDevice = {
                    manufacturer: "",
                    model: "",
                    name: "",
                    serial: "",
                    category: 1,
                    services: []
                };
                bridge.devices.push(newDevice);
                _this.setSelectedDeviceConfig(newDevice, true);
                _this.buildDeviceList(bridge, bridgePane);
                _this.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_add_service')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('click');
                var dev = _this.selectedDeviceConfig;
                if (dev === undefined)
                    return;
                dev.services.push({
                    name: '',
                    subType: '',
                    type: '',
                    characteristics: []
                });
                _this.refreshDevicePane(dev, true);
                _this.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_remove_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.selectedDeviceConfig;
                if (dev === undefined)
                    return;
                var idx = bridge.devices.indexOf(dev);
                if (idx > -1) {
                    bridge.devices.splice(idx, 1);
                    _this.changeCallback();
                    _this.setSelectedDeviceConfig(undefined, false);
                    _this.buildDeviceList(bridge, bridgePane);
                    _this.changeCallback();
                }
            });
        }
    };
    ioBroker_YahkaPageBuilder.prototype.refreshBridgeButtons = function (parent) {
        var addServiceButton = parent.querySelector('#yahka_add_service');
        var removeDeviceButton = parent.querySelector('#yahka_remove_device');
        console.log('refresh', parent, this.selectedDeviceConfig);
        if (this.selectedDeviceConfig === undefined) {
            addServiceButton.setAttribute('disabled', '');
            removeDeviceButton.setAttribute('disabled', '');
        }
        else {
            addServiceButton.removeAttribute('disabled');
            removeDeviceButton.removeAttribute('disabled');
        }
    };
    ioBroker_YahkaPageBuilder.prototype.buildDeviceList = function (bridge, bridgeFrame) {
        var deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        for (var _i = 0, _a = bridge.devices; _i < _a.length; _i++) {
            var deviceConfig = _a[_i];
            var deviceEntry = document.importNode(this.deviceListEntryTemplate.content, true);
            var listItem = deviceEntry.querySelector('.list');
            this.refreshDeviceListEntry(deviceConfig, listItem);
            deviceList.appendChild(deviceEntry);
        }
        var deviceListClickHandler = this.handleDeviceListClick.bind(this, bridge);
        $(deviceList).listview({ onListClick: deviceListClickHandler });
    };
    ioBroker_YahkaPageBuilder.prototype.refreshDeviceListEntry = function (deviceConfig, listItem) {
        if (!listItem)
            return;
        var cat;
        var iconClass = "mif-question";
        if (accessoryCategories !== undefined)
            if (cat = accessoryCategories[deviceConfig.category])
                iconClass = cat['icon'];
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.dataset["deviceIdent"] = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.selectedDeviceConfig));
    };
    ioBroker_YahkaPageBuilder.prototype.findDeviceConfig = function (bridgeConfig, deviceIdent) {
        if (!bridgeConfig)
            return undefined;
        for (var _i = 0, _a = bridgeConfig.devices; _i < _a.length; _i++) {
            var devConfig = _a[_i];
            if (devConfig.name == deviceIdent)
                return devConfig;
        }
        return undefined;
    };
    ioBroker_YahkaPageBuilder.prototype.handleDeviceListClick = function (bridgeConfig, deviceNode) {
        if (!deviceNode)
            return;
        var deviceIdent = deviceNode[0].dataset["deviceIdent"];
        var deviceConfig = this.findDeviceConfig(bridgeConfig, deviceIdent);
        this.setSelectedDeviceConfig(deviceConfig, false);
    };
    ioBroker_YahkaPageBuilder.prototype.refreshDevicePane = function (deviceConfig, focusLast) {
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
    ioBroker_YahkaPageBuilder.prototype.buildDeviceInformationPanel = function (deviceConfig, devicePane) {
        var _this = this;
        var devInfoFragment = document.importNode(this.deviceInfoPanelTemplate.content, true);
        var devInfoPanel = devInfoFragment.querySelector('#yahka_device_info_panel');
        var inputHelper = function (selector, propertyName, selectList) {
            var input = devInfoPanel.querySelector(selector);
            if (selectList)
                _this.fillSelectByDict(input, selectList);
            var value = deviceConfig[propertyName];
            if (value !== undefined)
                input.value = value;
            else
                input.value = "";
            input.addEventListener('input', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName));
        };
        inputHelper('#device_name', 'name');
        inputHelper('#device_manufacturer', 'manufacturer');
        inputHelper('#device_model', 'model');
        inputHelper('#device_serial', 'serial');
        inputHelper('#device_category', 'category', accessoryCategories);
        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    };
    ioBroker_YahkaPageBuilder.prototype.createServicePanel = function (deviceConfig, serviceConfig) {
        var _this = this;
        var servicePanel = document.importNode(this.deviceServicePanelTemplate.content, true);
        var frameNode = servicePanel.querySelector('#yahka_service_panel');
        var inputHelper = function (selector, configName, popuplateServices, eventHandler) {
            var input = frameNode.querySelector(selector);
            if (popuplateServices === true) {
                var selectList = Object.keys(HAPServiceDictionary);
                _this.fillSelectByArray(input, selectList);
            }
            if (serviceConfig) {
                var value = serviceConfig[configName];
                if (value !== undefined)
                    input.value = value;
                else
                    input.value = "";
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
                _this.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
        });
        return frameNode;
    };
    ioBroker_YahkaPageBuilder.prototype.refreshServicePanelCaption = function (serviceConfig, servicePanel) {
        servicePanel.querySelector('#yahka_service_caption').textContent = serviceConfig.name + '[' + serviceConfig.type + ']';
    };
    ioBroker_YahkaPageBuilder.prototype.findHAPCharacteristic = function (serviceDef, characteristicName) {
        if (!serviceDef)
            return undefined;
        var x;
        if (x = serviceDef.characteristics[characteristicName])
            return x;
        return undefined;
    };
    ioBroker_YahkaPageBuilder.prototype.findConfigCharacteristic = function (service, characteristicName) {
        if (!service)
            return undefined;
        for (var _i = 0, _a = service.characteristics; _i < _a.length; _i++) {
            var cfg = _a[_i];
            if (cfg.name == characteristicName)
                return cfg;
        }
        return undefined;
    };
    ioBroker_YahkaPageBuilder.prototype.isEmptyCharacteristic = function (charConfig) {
        if (charConfig === undefined)
            return true;
        if (charConfig.name === '')
            return true;
        if ((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined))
            return true;
        return false;
    };
    ioBroker_YahkaPageBuilder.prototype.removeCharacteristic = function (serviceConfig, charConfig) {
        if (serviceConfig === undefined)
            return;
        var idx = serviceConfig.characteristics.indexOf(charConfig);
        if (idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.changeCallback();
        }
    };
    ioBroker_YahkaPageBuilder.prototype.buildCharacteristicTable = function (serviceConfig, servicePanel) {
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
        while (table.childElementCount > 1)
            table.removeChild(table.lastElementChild);
        for (var _b = 0, charRows_1 = charRows; _b < charRows_1.length; _b++) {
            var row = charRows_1[_b];
            table.appendChild(row[2]);
        }
    };
    ioBroker_YahkaPageBuilder.prototype.createCharacteristicRow = function (charDef, serviceConfig, charConfig) {
        var _this = this;
        var name = charConfig ? charConfig.name : charDef.name;
        var enabled = charConfig ? charConfig.enabled : false;
        var rowElement = document.importNode(this.characteristicRow.content, true);
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
    ioBroker_YahkaPageBuilder.prototype.fillSelectByArray = function (inoutSelect, stringlist) {
        for (var _i = 0, stringlist_1 = stringlist; _i < stringlist_1.length; _i++) {
            var itemName = stringlist_1[_i];
            var optElem = document.createElement('option');
            optElem.value = itemName;
            optElem.text = itemName;
            inoutSelect.add(optElem);
        }
    };
    ioBroker_YahkaPageBuilder.prototype.fillSelectByDict = function (inoutSelect, dictionary) {
        for (var key in dictionary) {
            var optElem = document.createElement('option');
            optElem.value = key;
            optElem.text = dictionary[key].text;
            inoutSelect.add(optElem);
        }
    };
    ioBroker_YahkaPageBuilder.prototype.refreshEnabledClass = function (row, enabled) {
        row.classList.toggle('disabled', !enabled);
    };
    ioBroker_YahkaPageBuilder.prototype.refershOptionalClass = function (row, optional) {
        row.classList.toggle('optional-characteristic', optional);
    };
    ioBroker_YahkaPageBuilder.prototype.handleCharacteristicEnabledChange = function (serviceConfig, charName, charRow, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        charConfig.enabled = inputTarget.checked;
        this.refreshEnabledClass(charRow, charConfig.enabled);
        this.changeCallback();
    };
    ioBroker_YahkaPageBuilder.prototype.handleCharacteristicInputChange = function (serviceConfig, charName, attribute, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        charConfig[attribute] = inputValue;
        this.changeCallback();
    };
    ioBroker_YahkaPageBuilder.prototype.handleBridgeMetaDataChange = function (bridgeConfig, propertyName, ev) {
        var inputTarget = ev.currentTarget;
        if (inputTarget.type == "checkbox")
            bridgeConfig[propertyName] = inputTarget.checked;
        else
            bridgeConfig[propertyName] = inputTarget.value;
        this.changeCallback();
    };
    ioBroker_YahkaPageBuilder.prototype.handleDeviceMetaDataChange = function (deviceConfig, propertyName, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        var listItem = document.querySelector('div.list[data-device-ident="' + deviceConfig.name + '"]');
        deviceConfig[propertyName] = inputValue;
        this.refreshDeviceListEntry(deviceConfig, listItem);
        this.changeCallback();
    };
    ioBroker_YahkaPageBuilder.prototype.handleServiceMetaDataChange = function (serviceConfig, servicePanel, attribute, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        serviceConfig[attribute] = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.changeCallback();
    };
    ioBroker_YahkaPageBuilder.prototype.handleServiceTypeChange = function (serviceConfig, servicePanel, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = inputTarget.value;
        serviceConfig.type = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.buildCharacteristicTable(serviceConfig, servicePanel);
        this.changeCallback();
    };
    return ioBroker_YahkaPageBuilder;
}());
//# sourceMappingURL=yahka.admin.js.map