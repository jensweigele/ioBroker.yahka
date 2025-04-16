/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 *
 * iobroker.yahka adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "iobroker.yahka",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js iobroker.yahka Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@iobroker.yahka.com>"
 *          ]
 *          "desc":         "iobroker.yahka adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42
 *      }
 *  }
 *
 */
/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */

Object.defineProperty(exports, "__esModule", ({ value: true }));
const debug = __webpack_require__(/*! debug */ "debug");
debug.enable('EventedHTTPServer,HAPServer,Accessory,AccessoryLoader');
// you have to require the utils module and call adapter function
const utils = __webpack_require__(/*! @iobroker/adapter-core */ "@iobroker/adapter-core");
const hkAdapter = __webpack_require__(/*! ./yahka.ioBroker-adapter */ "./yahka.ioBroker-adapter.ts");
__webpack_require__(/*! ./yahka.functions/functions.import */ "./yahka.functions/functions.import.ts");
let yahkaAdapter;
function startAdapter(options = {}) {
    const ioAdapter = utils.Adapter({ name: 'yahka', systemConfig: true });
    yahkaAdapter = new hkAdapter.TIOBrokerAdapter(ioAdapter, utils.getAbsoluteDefaultDataDir());
    return ioAdapter;
}
// ...
if (module && module.parent) {
    // Export startAdapter in compact mode
    module.exports = startAdapter;
}
else {
    // Otherwise start the adapter immediately
    startAdapter();
}


/***/ }),

/***/ "./shared/yahka.logger.ts":
/*!********************************!*\
  !*** ./shared/yahka.logger.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YahkaLogger = void 0;
class YahkaLogger {
    constructor(adapter, logIdentifier) {
        this.adapter = adapter;
        this.logIdentifier = logIdentifier;
    }
    debug(message) {
        return this.adapter.log.debug(`[${this.logIdentifier}] ${message}`);
    }
    info(message) {
        return this.adapter.log.info(`[${this.logIdentifier}] ${message}`);
    }
    warn(message) {
        return this.adapter.log.warn(`[${this.logIdentifier}] ${message}`);
    }
    error(message) {
        return this.adapter.log.error(`[${this.logIdentifier}] ${message}`);
    }
}
exports.YahkaLogger = YahkaLogger;


/***/ }),

/***/ "./shared/yahka.utils.ts":
/*!*******************************!*\
  !*** ./shared/yahka.utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.propertyExists = propertyExists;
function propertyExists(object, property) {
    return property in object;
}


/***/ }),

/***/ "./yahka.community.types.ts":
/*!**********************************!*\
  !*** ./yahka.community.types.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationText = exports.NotificationCode = exports.VolatileOrganicCompoundPeakLevel = exports.VolatileOrganicCompoundLevel = exports.VolatileOrganicCompoundDetected = exports.SodiumDioxidePeakLevel = exports.SodiumDioxideLevel = exports.SodiumDioxideDetected = exports.OzonePeakLevel = exports.OzoneLevel = exports.OzoneDetected = exports.NitrogenDioxidePeakLevel = exports.NitrogenDioxideLevel = exports.NitrogenDioxideDetected = exports.AirFlow = exports.NoiseLevel = exports.AtmosphericPressureLevel = exports.EveResetTotal = exports.EveTimesOpened = exports.EveLastAction = exports.EveClosedDuration = exports.EveOpenDuration = exports.EveAirQuality = exports.BatteryLevel = exports.KilowattVoltAmpereHour = exports.KilowattHours = exports.VoltAmperes = exports.Watts = exports.Amperes = exports.Volts = exports.MediaHeight = exports.MediaWidth = exports.MediaTypeIdentifier = exports.StillImage = exports.MediaItemDuration = exports.MediaItemArtist = exports.MediaItemAlbumName = exports.MediaItemName = exports.MediaCurrentPosition = exports.PlaybackSpeed = exports.RepeatMode = exports.ShuffleMode = exports.SkipBackward = exports.SkipForward = exports.PlaybackState = exports.Muting = exports.AudioVolume = exports.VideoDataURL = exports.AudioDataURL = exports.Timestamp = void 0;
exports.NotificationService = exports.VolatileOrganicCompoundSensor = exports.SodiumDioxideSensor = exports.OzoneSensor = exports.NitrogenDioxideSensor = exports.AirFlowSensor = exports.NoiseLevelSensor = exports.AtmosphericPressureSensor = exports.SecurityCameraService = exports.StillImageService = exports.MediaInformationService = exports.PlaybackDeviceService = exports.AudioDeviceService = exports.UPSLoadPercent = exports.BatteryVoltageDC = exports.OutputVoltageAC = exports.InputVoltageAC = exports.DewPoint = exports.Latency = exports.Ping = exports.UploadSpeed = exports.DownloadSpeed = exports.LastEventTime = void 0;
exports.importHAPCommunityTypesAndFixes = importHAPCommunityTypesAndFixes;
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
let hapTypesImported = false;
function importHAPCommunityTypesAndFixes() {
    if (hapTypesImported) {
        return;
    }
    hap_nodejs_1.Characteristic[`Community: ${Timestamp.name}`] = Timestamp;
    hap_nodejs_1.Characteristic[`Community: ${AudioDataURL.name}`] = AudioDataURL;
    hap_nodejs_1.Characteristic[`Community: ${VideoDataURL.name}`] = VideoDataURL;
    hap_nodejs_1.Characteristic[`Community: ${AudioVolume.name}`] = AudioVolume;
    hap_nodejs_1.Characteristic[`Community: ${Muting.name}`] = Muting;
    hap_nodejs_1.Characteristic[`Community: ${PlaybackState.name}`] = PlaybackState;
    hap_nodejs_1.Characteristic[`Community: ${SkipForward.name}`] = SkipForward;
    hap_nodejs_1.Characteristic[`Community: ${SkipBackward.name}`] = SkipBackward;
    hap_nodejs_1.Characteristic[`Community: ${ShuffleMode.name}`] = ShuffleMode;
    hap_nodejs_1.Characteristic[`Community: ${RepeatMode.name}`] = RepeatMode;
    hap_nodejs_1.Characteristic[`Community: ${PlaybackSpeed.name}`] = PlaybackSpeed;
    hap_nodejs_1.Characteristic[`Community: ${MediaCurrentPosition.name}`] = MediaCurrentPosition;
    hap_nodejs_1.Characteristic[`Community: ${MediaItemName.name}`] = MediaItemName;
    hap_nodejs_1.Characteristic[`Community: ${MediaItemAlbumName.name}`] = MediaItemAlbumName;
    hap_nodejs_1.Characteristic[`Community: ${MediaItemArtist.name}`] = MediaItemArtist;
    hap_nodejs_1.Characteristic[`Community: ${MediaItemDuration.name}`] = MediaItemDuration;
    hap_nodejs_1.Characteristic[`Community: ${StillImage.name}`] = StillImage;
    hap_nodejs_1.Characteristic[`Community: ${MediaTypeIdentifier.name}`] = MediaTypeIdentifier;
    hap_nodejs_1.Characteristic[`Community: ${MediaWidth.name}`] = MediaWidth;
    hap_nodejs_1.Characteristic[`Community: ${MediaHeight.name}`] = MediaHeight;
    hap_nodejs_1.Characteristic[`Community: ${Volts.name}`] = Volts;
    hap_nodejs_1.Characteristic[`Community: ${Amperes.name}`] = Amperes;
    hap_nodejs_1.Characteristic[`Community: ${Watts.name}`] = Watts;
    hap_nodejs_1.Characteristic[`Community: ${VoltAmperes.name}`] = VoltAmperes;
    hap_nodejs_1.Characteristic[`Community: ${KilowattHours.name}`] = KilowattHours;
    hap_nodejs_1.Characteristic[`Community: ${KilowattVoltAmpereHour.name}`] = KilowattVoltAmpereHour;
    hap_nodejs_1.Characteristic[`Community: ${BatteryLevel.name}`] = BatteryLevel;
    hap_nodejs_1.Characteristic[`Community: ${EveAirQuality.name}`] = EveAirQuality;
    hap_nodejs_1.Characteristic[`Community: ${EveOpenDuration.name}`] = EveOpenDuration;
    hap_nodejs_1.Characteristic[`Community: ${EveClosedDuration.name}`] = EveClosedDuration;
    hap_nodejs_1.Characteristic[`Community: ${EveLastAction.name}`] = EveLastAction;
    hap_nodejs_1.Characteristic[`Community: ${EveTimesOpened.name}`] = EveTimesOpened;
    hap_nodejs_1.Characteristic[`Community: ${EveResetTotal.name}`] = EveResetTotal;
    hap_nodejs_1.Characteristic[`Community: ${AtmosphericPressureLevel.name}`] = AtmosphericPressureLevel;
    hap_nodejs_1.Characteristic[`Community: ${NoiseLevel.name}`] = NoiseLevel;
    hap_nodejs_1.Characteristic[`Community: ${AirFlow.name}`] = AirFlow;
    hap_nodejs_1.Characteristic[`Community: ${NitrogenDioxideDetected.name}`] = NitrogenDioxideDetected;
    hap_nodejs_1.Characteristic[`Community: ${NitrogenDioxideLevel.name}`] = NitrogenDioxideLevel;
    hap_nodejs_1.Characteristic[`Community: ${NitrogenDioxidePeakLevel.name}`] = NitrogenDioxidePeakLevel;
    hap_nodejs_1.Characteristic[`Community: ${OzoneDetected.name}`] = OzoneDetected;
    hap_nodejs_1.Characteristic[`Community: ${OzoneLevel.name}`] = OzoneLevel;
    hap_nodejs_1.Characteristic[`Community: ${OzonePeakLevel.name}`] = OzonePeakLevel;
    hap_nodejs_1.Characteristic[`Community: ${SodiumDioxideDetected.name}`] = SodiumDioxideDetected;
    hap_nodejs_1.Characteristic[`Community: ${SodiumDioxideLevel.name}`] = SodiumDioxideLevel;
    hap_nodejs_1.Characteristic[`Community: ${SodiumDioxidePeakLevel.name}`] = SodiumDioxidePeakLevel;
    hap_nodejs_1.Characteristic[`Community: ${VolatileOrganicCompoundDetected.name}`] = VolatileOrganicCompoundDetected;
    hap_nodejs_1.Characteristic[`Community: ${VolatileOrganicCompoundLevel.name}`] = VolatileOrganicCompoundLevel;
    hap_nodejs_1.Characteristic[`Community: ${VolatileOrganicCompoundPeakLevel.name}`] = VolatileOrganicCompoundPeakLevel;
    hap_nodejs_1.Characteristic[`Community: ${NotificationCode.name}`] = NotificationCode;
    hap_nodejs_1.Characteristic[`Community: ${NotificationText.name}`] = NotificationText;
    hap_nodejs_1.Characteristic[`Community: ${LastEventTime.name}`] = LastEventTime;
    hap_nodejs_1.Characteristic[`Community: ${DownloadSpeed.name}`] = DownloadSpeed;
    hap_nodejs_1.Characteristic[`Community: ${UploadSpeed.name}`] = UploadSpeed;
    hap_nodejs_1.Characteristic[`Community: ${Ping.name}`] = Ping;
    hap_nodejs_1.Characteristic[`Community: ${Latency.name}`] = Latency;
    hap_nodejs_1.Characteristic[`Community: ${DewPoint.name}`] = DewPoint;
    hap_nodejs_1.Characteristic[`Community: ${InputVoltageAC.name}`] = InputVoltageAC;
    hap_nodejs_1.Characteristic[`Community: ${OutputVoltageAC.name}`] = OutputVoltageAC;
    hap_nodejs_1.Characteristic[`Community: ${BatteryVoltageDC.name}`] = BatteryVoltageDC;
    hap_nodejs_1.Characteristic[`Community: ${UPSLoadPercent.name}`] = UPSLoadPercent;
    hap_nodejs_1.Service[`Community: ${AudioDeviceService.name}`] = AudioDeviceService;
    hap_nodejs_1.Service[`Community: ${PlaybackDeviceService.name}`] = PlaybackDeviceService;
    hap_nodejs_1.Service[`Community: ${MediaInformationService.name}`] = MediaInformationService;
    hap_nodejs_1.Service[`Community: ${StillImageService.name}`] = StillImageService;
    hap_nodejs_1.Service[`Community: ${SecurityCameraService.name}`] = SecurityCameraService;
    hap_nodejs_1.Service[`Community: ${AtmosphericPressureSensor.name}`] = AtmosphericPressureSensor;
    hap_nodejs_1.Service[`Community: ${NoiseLevelSensor.name}`] = NoiseLevelSensor;
    hap_nodejs_1.Service[`Community: ${AirFlowSensor.name}`] = AirFlowSensor;
    hap_nodejs_1.Service[`Community: ${NitrogenDioxideSensor.name}`] = NitrogenDioxideSensor;
    hap_nodejs_1.Service[`Community: ${OzoneSensor.name}`] = OzoneSensor;
    hap_nodejs_1.Service[`Community: ${SodiumDioxideSensor.name}`] = SodiumDioxideSensor;
    hap_nodejs_1.Service[`Community: ${VolatileOrganicCompoundSensor.name}`] = VolatileOrganicCompoundSensor;
    hap_nodejs_1.Service[`Community: ${NotificationService.name}`] = NotificationService;
    hapTypesImported = true;
}
class Timestamp extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Timestamp', 'FF000001-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.Timestamp = Timestamp;
class AudioDataURL extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Audio URL', 'FF000002-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
    }
}
exports.AudioDataURL = AudioDataURL;
class VideoDataURL extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Video URL', 'FF000003-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
    }
}
exports.VideoDataURL = VideoDataURL;
class AudioVolume extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Audio Volume', '00001001-0000-1000-8000-135D67EC4377', {
            format: "uint8" /* Formats.UINT8 */,
            unit: "percentage" /* Units.PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.AudioVolume = AudioVolume;
class Muting extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Muting', '00001002-0000-1000-8000-135D67EC4377', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.Muting = Muting;
class PlaybackState extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Playback State', '00002001-0000-1000-8000-135D67EC4377', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.PlaybackState = PlaybackState;
PlaybackState.PLAYING = 0;
PlaybackState.PAUSED = 1;
PlaybackState.STOPPED = 2;
class SkipForward extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Skip Forward', '00002002-0000-1000-8000-135D67EC4377', {
            format: "bool" /* Formats.BOOL */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.SkipForward = SkipForward;
class SkipBackward extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Skip Backward', '00002003-0000-1000-8000-135D67EC4377', {
            format: "bool" /* Formats.BOOL */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.SkipBackward = SkipBackward;
class ShuffleMode extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Shuffle Mode', '00002004-0000-1000-8000-135D67EC4377', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.ShuffleMode = ShuffleMode;
//NOTE: If GROUP or SET is not supported, accessories should coerce to ALBUM.
// If ALBUM is not supported, coerce to ITEM.
// In general, it is recommended for apps to only assume OFF, ITEM, and ALBUM
// are supported unless it is known that the accessory supports other settings.
ShuffleMode.OFF = 0;
//NOTE: INDIVIDUAL is deprecated.
ShuffleMode.INDIVIDUAL = 1;
ShuffleMode.ITEM = 1;
ShuffleMode.GROUP = 2; // e.g., iTunes "Groupings"
ShuffleMode.ALBUM = 3; // e.g., album or season
ShuffleMode.SET = 4; // e.g., T.V. Series or album box set
class RepeatMode extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Repeat Mode', '00002005-0000-1000-8000-135D67EC4377', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.RepeatMode = RepeatMode;
RepeatMode.OFF = 0;
RepeatMode.ONE = 1;
RepeatMode.ALL = 2;
class PlaybackSpeed extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Playback Speed', '00002006-0000-1000-8000-135D67EC4377', {
            format: "float" /* Formats.FLOAT */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.PlaybackSpeed = PlaybackSpeed;
class MediaCurrentPosition extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Current Position', '00002007-0000-1000-8000-135D67EC4377', {
            format: "float" /* Formats.FLOAT */, // In seconds
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */],
        });
    }
}
exports.MediaCurrentPosition = MediaCurrentPosition;
class MediaItemName extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Name', '00003001-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaItemName = MediaItemName;
class MediaItemAlbumName extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Album Name', '00003002-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaItemAlbumName = MediaItemAlbumName;
class MediaItemArtist extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Artist', '00003003-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaItemArtist = MediaItemArtist;
class MediaItemDuration extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Duration', '00003005-0000-1000-8000-135D67EC4377', {
            format: "float" /* Formats.FLOAT */, // In seconds
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaItemDuration = MediaItemDuration;
class StillImage extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Still Image', '00004001-0000-1000-8000-135D67EC4377', {
            format: "data" /* Formats.DATA */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.StillImage = StillImage;
// Also known as MIME type...
class MediaTypeIdentifier extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Type Identifier', '00004002-0000-1000-8000-135D67EC4377', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaTypeIdentifier = MediaTypeIdentifier;
class MediaWidth extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Width', '00004003-0000-1000-8000-135D67EC4377', {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.MediaWidth = MediaWidth;
class MediaHeight extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Media Width', '00004004-0000-1000-8000-135D67EC4377', {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.MediaHeight = MediaHeight;
// courtesy of https://gist.github.com/gomfunkel/b1a046d729757120907c
class Volts extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Volts', 'E863F10A-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: 'V',
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.Volts = Volts;
class Amperes extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Amps', 'E863F126-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: "A",
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.Amperes = Amperes;
class Watts extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Consumption', 'E863F10D-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: 'W',
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.Watts = Watts;
class VoltAmperes extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Apparent Power', 'E863F110-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: 'VA',
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.VoltAmperes = VoltAmperes;
class KilowattHours extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Total Consumption', 'E863F10C-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "kWh",
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.KilowattHours = KilowattHours;
class KilowattVoltAmpereHour extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Apparent Energy', 'E863F127-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "kVAh",
            minValue: 0,
            maxValue: 65535,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.KilowattVoltAmpereHour = KilowattVoltAmpereHour;
class BatteryLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Battery Level', 'E863F11B-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: "percentage" /* Units.PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */]
        });
    }
}
exports.BatteryLevel = BatteryLevel;
class EveAirQuality extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Air Quality', 'E863F10B-079E-48FF-8F27-9C2605A29F52', {
            format: "uint16" /* Formats.UINT16 */,
            unit: "ppm",
            maxValue: 5000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */],
        });
        // this.value = this.getDefaultValue();
    }
}
exports.EveAirQuality = EveAirQuality;
// courtesy of https://github.com/ebaauw/homebridge-lib
// i should probably submit a PR for everything here that isn't in that repo...
class EveOpenDuration extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Open Duration', 'E863F118-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "seconds" /* Units.SECONDS */, // since last reset
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */, "pw" /* Perms.PAIRED_WRITE */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.EveOpenDuration = EveOpenDuration;
class EveClosedDuration extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Closed Duration', 'E863F119-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "seconds" /* Units.SECONDS */, // since last reset
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */, "pw" /* Perms.PAIRED_WRITE */]
        });
    }
}
exports.EveClosedDuration = EveClosedDuration;
class EveLastAction extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Last Activation', 'E863F11A-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "seconds" /* Units.SECONDS */, // since last reset
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.EveLastAction = EveLastAction;
class EveTimesOpened extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Times Opened', 'E863F129-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
    }
}
exports.EveTimesOpened = EveTimesOpened;
class EveResetTotal extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Eve Reset Total', 'E863F112-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            unit: "seconds" /* Units.SECONDS */, // since 2001/01/01
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */, "pw" /* Perms.PAIRED_WRITE */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.EveResetTotal = EveResetTotal;
// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors
class AtmosphericPressureLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Barometric Pressure', '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB', {
            format: "uint8" /* Formats.UINT8 */,
            unit: "mbar",
            minValue: 800,
            maxValue: 1200,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
    }
}
exports.AtmosphericPressureLevel = AtmosphericPressureLevel;
class NoiseLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Noise Level', '2CD7B6FD-419A-4740-8995-E3BFE43735AB', {
            format: "uint8" /* Formats.UINT8 */,
            unit: "dB",
            minValue: 0,
            maxValue: 200,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.NoiseLevel = NoiseLevel;
// courtesy of https://github.com/homespun/homebridge-platform-snmp
class AirFlow extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Air Flow', '49C8AE5A-A3A5-41AB-BF1F-12D5654F9F41', {
            format: "uint8" /* Formats.UINT8 */,
            unit: "m/s",
            minValue: 0,
            maxValue: 135,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.AirFlow = AirFlow;
class NitrogenDioxideDetected extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Nitrogen Dioxide Detected', 'D737B40A-3AF0-4316-950F-76090B98C5CF', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.NitrogenDioxideDetected = NitrogenDioxideDetected;
NitrogenDioxideDetected.NO2_LEVELS_NORMAL = 0;
NitrogenDioxideDetected.NO2_LEVELS_ABNORMAL = 1;
class NitrogenDioxideLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Nitrogen Dioxide Level', 'B762A2AF-D9D0-4A79-814A-E9EBAB0ED290', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppm",
            minValue: 0,
            maxValue: 1500,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.NitrogenDioxideLevel = NitrogenDioxideLevel;
class NitrogenDioxidePeakLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Nitrogen Dioxide Peak Level', 'B6594847-7B88-496C-A1A0-B7860F3D7601', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppm",
            minValue: 0,
            maxValue: 1500,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.NitrogenDioxidePeakLevel = NitrogenDioxidePeakLevel;
// courtesy of https://github.com/homespun/homebridge-platform-aqe
class OzoneDetected extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Ozone Detected', '0168FA60-5CF4-4314-AA45-0F84E389A093', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        this.value = this.getDefaultValue();
    }
}
exports.OzoneDetected = OzoneDetected;
OzoneDetected.O3_LEVELS_NORMAL = 0;
OzoneDetected.O3_LEVELS_ABNORMAL = 1;
class OzoneLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Ozone Level', '03C17FD9-672E-42F5-8DD4-30C6822C739A', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.OzoneLevel = OzoneLevel;
class OzonePeakLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Ozone Peak Level', '550EE1FF-FC66-4BB6-A1C1-4B0A07109AE3', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.OzonePeakLevel = OzonePeakLevel;
class SodiumDioxideDetected extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Sodium Dioxide Detected', '4D237DAB-1CB6-4D52-B446-4667F58F7D28', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.SodiumDioxideDetected = SodiumDioxideDetected;
SodiumDioxideDetected.SO2_LEVELS_NORMAL = 0;
SodiumDioxideDetected.SO2_LEVELS_ABNORMAL = 1;
class SodiumDioxideLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Sodium Dioxide Level', '66C4D315-FBEF-470E-9434-B047679F1141', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.SodiumDioxideLevel = SodiumDioxideLevel;
class SodiumDioxidePeakLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Sodium Dioxide Peak Level', '4CD6F648-2F92-43D8-86DF-0E8DE75E033B', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.SodiumDioxidePeakLevel = SodiumDioxidePeakLevel;
class VolatileOrganicCompoundDetected extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Volatile Organic Compound Detected', '65DBC0F5-C40B-4E04-ADED-DC70031B0B82', {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.VolatileOrganicCompoundDetected = VolatileOrganicCompoundDetected;
VolatileOrganicCompoundDetected.VOC_LEVELS_NORMAL = 0;
VolatileOrganicCompoundDetected.VOC_LEVELS_ABNORMAL = 1;
class VolatileOrganicCompoundLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Volatile Organic Compound Level', '35C4C797-193D-4998-879F-A08514E87897', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.VolatileOrganicCompoundLevel = VolatileOrganicCompoundLevel;
class VolatileOrganicCompoundPeakLevel extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Volatile Organic Compound Peak Level', 'A62CB784-1916-4BDF-B840-BDB9F8A264E9', {
            format: "float" /* Formats.FLOAT */,
            unit: "ppb",
            minValue: 0,
            maxValue: 1500,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.VolatileOrganicCompoundPeakLevel = VolatileOrganicCompoundPeakLevel;
class NotificationCode extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Notification Code', '381C47A3-CB06-4177-8E3D-A1B4C22EB031', {
            format: "uint8" /* Formats.UINT8 */,
            maxValue: 255,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "ev" /* Perms.NOTIFY */]
        });
        this.value = 255;
    }
}
exports.NotificationCode = NotificationCode;
class NotificationText extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Notification Text', 'e244ca80-813e-423a-86bd-02f293b857a0', {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.NotificationText = NotificationText;
// used by Elgato Eve, number of seconds since the epoch...
class LastEventTime extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Last Event Time', 'E863F11A-079E-48FF-8F27-9C2605A29F52', {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.LastEventTime = LastEventTime;
// courtesy of https://github.com/SeydX/homebridge-broadband
class DownloadSpeed extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Download Speed', 'DA70DA1F-DA72-4DB3-81C2-99F158A15A9A', {
            format: "float" /* Formats.FLOAT */,
            unit: 'Mbps',
            maxValue: 1024,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.DownloadSpeed = DownloadSpeed;
class UploadSpeed extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Upload Speed', 'AB74289E-D516-4A12-B2AE-1B32A74C035F', {
            format: "float" /* Formats.FLOAT */,
            unit: 'Mbps',
            maxValue: 1024,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.UploadSpeed = UploadSpeed;
class Ping extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Ping', 'CC65A09A-E052-410C-981D-C11BDE2C3F60', {
            format: "int" /* Formats.INT */,
            unit: 'ms',
            maxValue: 999,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.Ping = Ping;
class Latency extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Latency', '60EC80F9-F799-4E8E-B613-098E7EBCBB0B', {
            format: "int" /* Formats.INT */,
            unit: 'ms',
            maxValue: 999,
            minValue: 0,
            minStep: 0.001,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.Latency = Latency;
// https://github.com/naofireblade/homebridge-weather-plus
class DewPoint extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Dew Point', '095c46e2-278e-4e3c-b9e7-364622a0f501', {
            format: "float" /* Formats.FLOAT */,
            unit: "celsius" /* Units.CELSIUS */,
            maxValue: 50,
            minValue: -50,
            minStep: 0.1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.DewPoint = DewPoint;
// courtesy of https://github.com/ToddGreenfield/homebridge-nut
class InputVoltageAC extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Input Voltage AC', hap_nodejs_1.uuid.generate('CommunityTypes:usagedevice:InputVoltageAC'), 
        // UUID.generate('CommunityTypes:usagedevice:InputVoltageAC'),
        {
            format: "float" /* Formats.FLOAT */,
            unit: "V",
            minValue: 0,
            maxValue: 65535,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
    }
}
exports.InputVoltageAC = InputVoltageAC;
class OutputVoltageAC extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Output Voltage AC', hap_nodejs_1.uuid.generate('CommunityTypes:usagedevice:OutputVoltageAC'), {
            format: "float" /* Formats.FLOAT */,
            unit: "V",
            minValue: 0,
            maxValue: 65535,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.OutputVoltageAC = OutputVoltageAC;
class BatteryVoltageDC extends hap_nodejs_1.Characteristic {
    constructor() {
        super('Battery Voltage DC', hap_nodejs_1.uuid.generate('CommunityTypes:usagedevice:BatteryVoltageDC'), {
            format: "float" /* Formats.FLOAT */,
            unit: "V",
            minValue: 0,
            maxValue: 65535,
            minStep: 0.01,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.BatteryVoltageDC = BatteryVoltageDC;
class UPSLoadPercent extends hap_nodejs_1.Characteristic {
    constructor() {
        super('UPS Load', hap_nodejs_1.uuid.generate('CommunityTypes:usagedevice:UPSLoadPercent'), {
            format: "uint8" /* Formats.UINT8 */,
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
            perms: ["pr" /* Perms.PAIRED_READ */, "ev" /* Perms.NOTIFY */]
        });
        // this.value = this.getDefaultValue();
    }
}
exports.UPSLoadPercent = UPSLoadPercent;
// Services
class AudioDeviceService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '00000001-0000-1000-8000-135D67EC4377', subtype);
        // Required Characteristics
        this.addCharacteristic(AudioVolume);
        // Optional Characteristics
        this.addOptionalCharacteristic(Muting);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.AudioDeviceService = AudioDeviceService;
class PlaybackDeviceService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '00000002-0000-1000-8000-135D67EC4377', subtype);
        // Required Characteristics
        this.addCharacteristic(PlaybackState);
        // Optional Characteristics
        this.addOptionalCharacteristic(SkipForward);
        this.addOptionalCharacteristic(SkipBackward);
        this.addOptionalCharacteristic(ShuffleMode);
        this.addOptionalCharacteristic(RepeatMode);
        this.addOptionalCharacteristic(PlaybackSpeed);
        this.addOptionalCharacteristic(MediaCurrentPosition);
        this.addOptionalCharacteristic(MediaItemName);
        this.addOptionalCharacteristic(MediaItemAlbumName);
        this.addOptionalCharacteristic(MediaItemArtist);
        this.addOptionalCharacteristic(MediaItemDuration);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
        // Artwork characteristics...would be better reported in a separate service?
        this.addOptionalCharacteristic(StillImage);
        this.addOptionalCharacteristic(MediaTypeIdentifier);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
    }
}
exports.PlaybackDeviceService = PlaybackDeviceService;
// A media information service that has no playback controls, for e.g. DAB radio...
class MediaInformationService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '00000003-0000-1000-8000-135D67EC4377', subtype);
        // Required Characteristics
        this.addCharacteristic(MediaItemName);
        // Optional Characteristics
        this.addOptionalCharacteristic(MediaItemAlbumName);
        this.addOptionalCharacteristic(MediaItemArtist);
        this.addOptionalCharacteristic(MediaItemDuration);
        this.addOptionalCharacteristic(MediaCurrentPosition);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
        // Artwork characteristics...would be better reported in a separate service?
        this.addOptionalCharacteristic(StillImage);
        this.addOptionalCharacteristic(MediaTypeIdentifier);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
    }
}
exports.MediaInformationService = MediaInformationService;
class StillImageService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '00000004-0000-1000-8000-135D67EC4377', subtype);
        // Required Characteristics
        this.addCharacteristic(StillImage);
        this.addCharacteristic(MediaTypeIdentifier);
        // Optional Characteristics
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.StillImageService = StillImageService;
class SecurityCameraService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '00000005-0000-1000-8000-135D67EC4377', subtype);
        // Required Characteristics
        this.addCharacteristic(StillImage);
        this.addCharacteristic(MediaTypeIdentifier);
        // Optional Characteristics
        this.addOptionalCharacteristic(Timestamp);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
        this.addOptionalCharacteristic(VideoDataURL);
        this.addOptionalCharacteristic(AudioDataURL);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.MotionDetected);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.SecurityCameraService = SecurityCameraService;
// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors
class AtmosphericPressureSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, 'B77831FD-D66A-46A4-B66D-FD7EE8DFE3CE', subtype);
        // Required Characteristics
        this.addCharacteristic(AtmosphericPressureLevel);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.AtmosphericPressureSensor = AtmosphericPressureSensor;
class NoiseLevelSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB', subtype);
        // Required Characteristics
        this.addCharacteristic(NoiseLevel);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.NoiseLevelSensor = NoiseLevelSensor;
// courtesy of https://github.com/homespun/homebridge-platform-snmp
class AirFlowSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, 'AF5C192E-420F-4A13-AB67-B8F3968A4935', subtype);
        // Required Characteristics
        this.addCharacteristic(AirFlow);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.AirFlowSensor = AirFlowSensor;
class NitrogenDioxideSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '9F6B797D-D43B-4C88-9AA0-57018AB8A91E', subtype);
        // Required Characteristics
        this.addCharacteristic(NitrogenDioxideDetected);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(NitrogenDioxideLevel);
        this.addOptionalCharacteristic(NitrogenDioxidePeakLevel);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.NitrogenDioxideSensor = NitrogenDioxideSensor;
// courtesy of https://github.com/homespun/homebridge-platform-aqe
class OzoneSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, 'B91C2BD6-D071-4F49-A23B-20721AC6CCEB', subtype);
        // Required Characteristics
        this.addCharacteristic(OzoneDetected);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(OzoneLevel);
        this.addOptionalCharacteristic(OzonePeakLevel);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.OzoneSensor = OzoneSensor;
class SodiumDioxideSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, 'FE7CFB1F-12D0-405D-86FD-7E268D65C453', subtype);
        // Required Characteristics
        this.addCharacteristic(SodiumDioxideDetected);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(SodiumDioxideLevel);
        this.addOptionalCharacteristic(SodiumDioxidePeakLevel);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.SodiumDioxideSensor = SodiumDioxideSensor;
class VolatileOrganicCompoundSensor extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '776E34BC-1660-46EC-A33D-2DFE5B958699', subtype);
        // Required Characteristics
        this.addCharacteristic(VolatileOrganicCompoundDetected);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusActive);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusFault);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(VolatileOrganicCompoundLevel);
        this.addOptionalCharacteristic(VolatileOrganicCompoundPeakLevel);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.StatusTampered);
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
    }
}
exports.VolatileOrganicCompoundSensor = VolatileOrganicCompoundSensor;
class NotificationService extends hap_nodejs_1.Service {
    constructor(displayName, subtype) {
        super(displayName, '074D8CE9-5B4B-48D5-9990-D98850C2F3FE', subtype);
        // Required Characteristics
        this.addCharacteristic(NotificationCode);
        this.addCharacteristic(NotificationText);
        // Optional Characteristics
        this.addOptionalCharacteristic(hap_nodejs_1.Characteristic.Name);
        this.addOptionalCharacteristic(LastEventTime);
    }
}
exports.NotificationService = NotificationService;


/***/ }),

/***/ "./yahka.functions/conversion.base.ts":
/*!********************************************!*\
  !*** ./yahka.functions/conversion.base.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIOBrokerConversionBase = void 0;
const functions_base_1 = __webpack_require__(/*! ./functions.base */ "./yahka.functions/functions.base.ts");
class TIOBrokerConversionBase extends functions_base_1.TYahkaFunctionBase {
    constructor(adapter, logIdentifier = '') {
        super(adapter, logIdentifier);
    }
    static castToNumber(value) {
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== 'number') {
            return Number(value);
        }
        return value;
    }
    static castToBool(value) {
        return !!value;
    }
    static parameterValueByName(parameters, name) {
        let paramArray;
        if (typeof parameters === 'object') {
            paramArray = parameters;
        }
        else {
            paramArray = JSON.parse(parameters);
        }
        if (paramArray === undefined) {
            return undefined;
        }
        return paramArray[name];
    }
}
exports.TIOBrokerConversionBase = TIOBrokerConversionBase;


/***/ }),

/***/ "./yahka.functions/conversion.homekit.homematic.ts":
/*!*********************************************************!*\
  !*** ./yahka.functions/conversion.homekit.homematic.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_HomematicControlMode_To_CoolingState = exports.TIoBrokerConversion_HomematicDirection_To_PositionState = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
class TIoBrokerConversion_HomematicDirection_To_PositionState extends conversion_base_1.TIOBrokerConversionBase {
    toHomeKit(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let result = undefined;
        switch (num) {
            case 0:
                result = hap_nodejs_1.Characteristic.PositionState.STOPPED;
                break;
            case 1:
                result = hap_nodejs_1.Characteristic.PositionState.INCREASING;
                break;
            case 2:
                result = hap_nodejs_1.Characteristic.PositionState.DECREASING;
                break;
            default:
                result = hap_nodejs_1.Characteristic.PositionState.STOPPED;
                break;
        }
        this.adapter.log.debug(`HomematicDirectionToHomekitPositionState.toHomeKit, from ${JSON.stringify(value)}[${typeof value}] to ${JSON.stringify(result)}`);
        return result;
    }
    toIOBroker(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let result = undefined;
        switch (num) {
            case hap_nodejs_1.Characteristic.PositionState.STOPPED:
                result = 0;
                break;
            case hap_nodejs_1.Characteristic.PositionState.INCREASING:
                result = 1;
                break;
            case hap_nodejs_1.Characteristic.PositionState.DECREASING:
                result = 2;
                break;
            default:
                result = 0;
                break;
        }
        this.adapter.log.debug(`HomematicDirectionToHomekitPositionState.toIOBroker, from ${JSON.stringify(value)}[${typeof value}] to ${JSON.stringify(result)}`);
        return result;
    }
}
exports.TIoBrokerConversion_HomematicDirection_To_PositionState = TIoBrokerConversion_HomematicDirection_To_PositionState;
class TIoBrokerConversion_HomematicControlMode_To_CoolingState extends conversion_base_1.TIOBrokerConversionBase {
    toHomeKit(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let result = undefined;
        switch (num) {
            case 0:
                result = hap_nodejs_1.Characteristic.TargetHeatingCoolingState.AUTO;
                break;
            case 1:
                result = hap_nodejs_1.Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            case 2:
                result = hap_nodejs_1.Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            case 3:
                result = hap_nodejs_1.Characteristic.TargetHeatingCoolingState.HEAT;
                break;
            default:
                result = hap_nodejs_1.Characteristic.TargetHeatingCoolingState.OFF;
                break;
        }
        this.adapter.log.debug(`HomematicDirectionToHomekitHeatingCoolingState.toHomeKit, from ${JSON.stringify(value)}[${typeof value}] to ${JSON.stringify(result)}`);
        return result;
    }
    toIOBroker(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let result = undefined;
        switch (num) {
            case hap_nodejs_1.Characteristic.TargetHeatingCoolingState.OFF:
                result = 0;
                break;
            case hap_nodejs_1.Characteristic.TargetHeatingCoolingState.HEAT:
                result = 1;
                break;
            case hap_nodejs_1.Characteristic.TargetHeatingCoolingState.COOL:
                result = 0;
                break;
            case hap_nodejs_1.Characteristic.TargetHeatingCoolingState.AUTO:
                result = 0;
                break;
            default:
                result = 0;
                break;
        }
        this.adapter.log.debug(`HomematicDirectionToHomekitHeatingCoolingState.toIOBroker, from ${JSON.stringify(value)}[${typeof value}] to ${JSON.stringify(result)}`);
        return result;
    }
}
exports.TIoBrokerConversion_HomematicControlMode_To_CoolingState = TIoBrokerConversion_HomematicControlMode_To_CoolingState;


/***/ }),

/***/ "./yahka.functions/conversion.inverse.ts":
/*!***********************************************!*\
  !*** ./yahka.functions/conversion.inverse.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Inverse = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Inverse extends conversion_base_1.TIOBrokerConversionBase {
    static create(adapter, parameters) {
        let maxValue = conversion_base_1.TIOBrokerConversionBase.castToNumber(parameters);
        return new TIoBrokerConversion_Inverse(adapter, maxValue);
    }
    constructor(adapter, maxValue) {
        super(adapter);
        this.maxValue = maxValue;
    }
    toHomeKit(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let newValue = this.maxValue - num;
        this.adapter.log.debug(`inverse: converting value to homekit: ${value} to ${newValue}`);
        return newValue;
    }
    toIOBroker(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let newValue = this.maxValue - num;
        this.adapter.log.debug(`inverse: converting value to ioBroker: ${value} to ${newValue}`);
        return newValue;
    }
}
exports.TIoBrokerConversion_Inverse = TIoBrokerConversion_Inverse;


/***/ }),

/***/ "./yahka.functions/conversion.invert.ts":
/*!**********************************************!*\
  !*** ./yahka.functions/conversion.invert.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Invert = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Invert extends conversion_base_1.TIOBrokerConversionBase {
    toHomeKit(value) {
        return !conversion_base_1.TIOBrokerConversionBase.castToBool(value);
    }
    toIOBroker(value) {
        return !conversion_base_1.TIOBrokerConversionBase.castToBool(value);
    }
}
exports.TIoBrokerConversion_Invert = TIoBrokerConversion_Invert;


/***/ }),

/***/ "./yahka.functions/conversion.map.ts":
/*!*******************************************!*\
  !*** ./yahka.functions/conversion.map.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Map = void 0;
exports.isMultiStateParameter = isMultiStateParameter;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
function isMultiStateParameter(params) {
    return 'mappings' in params;
}
class TIoBrokerConversion_Map extends conversion_base_1.TIOBrokerConversionBase {
    static create(adapter, parameters) {
        if (!isMultiStateParameter(parameters)) {
            return undefined;
        }
        return new TIoBrokerConversion_Map(adapter, parameters);
    }
    constructor(adapter, parameters) {
        super(adapter, 'TIoBrokerConversion_Map');
        this.parameters = parameters;
        this.mappingArrayToHomeKit = new Map();
        this.mappingArrayToIOBroker = new Map();
        this.jsonReplacer = (key, value) => String(value);
        this.buildMappingArray();
    }
    buildMappingArray() {
        for (let mapDef of this.parameters.mappings) {
            let leftStr = JSON.stringify(mapDef.left, this.jsonReplacer);
            let rightStr = JSON.stringify(mapDef.right, this.jsonReplacer);
            this.mappingArrayToHomeKit.set(leftStr, mapDef.right);
            this.mappingArrayToIOBroker.set(rightStr, mapDef.left);
        }
    }
    toHomeKit(value) {
        let ioValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToHomeKit.get(ioValueStr);
    }
    toIOBroker(value) {
        let hkValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToIOBroker.get(hkValueStr);
    }
}
exports.TIoBrokerConversion_Map = TIoBrokerConversion_Map;


/***/ }),

/***/ "./yahka.functions/conversion.passthrough.ts":
/*!***************************************************!*\
  !*** ./yahka.functions/conversion.passthrough.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Passthrough = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Passthrough extends conversion_base_1.TIOBrokerConversionBase {
    toHomeKit(value) {
        return value;
    }
    toIOBroker(value) {
        return value;
    }
}
exports.TIoBrokerConversion_Passthrough = TIoBrokerConversion_Passthrough;


/***/ }),

/***/ "./yahka.functions/conversion.round.ts":
/*!*********************************************!*\
  !*** ./yahka.functions/conversion.round.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Round = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Round extends conversion_base_1.TIOBrokerConversionBase {
    toHomeKit(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        return Math.round(num);
    }
    toIOBroker(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        return Math.round(num);
    }
}
exports.TIoBrokerConversion_Round = TIoBrokerConversion_Round;


/***/ }),

/***/ "./yahka.functions/conversion.scale.ts":
/*!*********************************************!*\
  !*** ./yahka.functions/conversion.scale.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Scale_Rounded = exports.TIoBrokerConversion_Scale = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Scale extends conversion_base_1.TIOBrokerConversionBase {
    static isScaleParameter(parameters) {
        const castedParam = parameters;
        return castedParam['homekit.min'] !== undefined &&
            castedParam['homekit.max'] !== undefined &&
            castedParam['iobroker.min'] !== undefined &&
            castedParam['iobroker.max'] !== undefined;
    }
    constructor(adapter, parameters, logName) {
        super(adapter);
        this.parameters = parameters;
        this.logName = logName;
        if (!TIoBrokerConversion_Scale.isScaleParameter(parameters)) {
            this.parameters = {
                'homekit.min': 0,
                'homekit.max': 1,
                'iobroker.min': 0,
                'iobroker.max': 1
            };
        }
    }
    toHomeKit(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let homeKitMax = this.parameters['homekit.max'];
        let ioBrokerMax = this.parameters['iobroker.max'];
        let homeKitMin = this.parameters['homekit.min'];
        let ioBrokerMin = this.parameters['iobroker.min'];
        let newValue = ((num - ioBrokerMin) / (ioBrokerMax - ioBrokerMin)) * (homeKitMax - homeKitMin) + homeKitMin;
        this.adapter.log.debug(`${this.logName}: converting value to homekit: ${value} to ${newValue}`);
        return newValue;
    }
    toIOBroker(value) {
        let num = conversion_base_1.TIOBrokerConversionBase.castToNumber(value);
        let homeKitMax = this.parameters['homekit.max'];
        let ioBrokerMax = this.parameters['iobroker.max'];
        let homeKitMin = this.parameters['homekit.min'];
        let ioBrokerMin = this.parameters['iobroker.min'];
        let newValue = ((num - homeKitMin) / (homeKitMax - homeKitMin)) * (ioBrokerMax - ioBrokerMin) + ioBrokerMin;
        this.adapter.log.debug(`${this.logName}: converting value to ioBroker: ${value} to ${newValue}`);
        return newValue;
    }
}
exports.TIoBrokerConversion_Scale = TIoBrokerConversion_Scale;
class TIoBrokerConversion_Scale_Rounded extends TIoBrokerConversion_Scale {
    toHomeKit(value) {
        return Math.round(super.toHomeKit(value));
    }
    toIOBroker(value) {
        return Math.round(super.toIOBroker(value));
    }
}
exports.TIoBrokerConversion_Scale_Rounded = TIoBrokerConversion_Scale_Rounded;


/***/ }),

/***/ "./yahka.functions/conversion.script.ts":
/*!**********************************************!*\
  !*** ./yahka.functions/conversion.script.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerConversion_Script = void 0;
const conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
class TIoBrokerConversion_Script extends conversion_base_1.TIOBrokerConversionBase {
    static isScriptParameter(parameters) {
        const castedParam = parameters;
        return castedParam['toHomeKit'] !== undefined &&
            castedParam['toIOBroker'] !== undefined;
    }
    static create(adapter, parameters) {
        let params;
        if (TIoBrokerConversion_Script.isScriptParameter(parameters)) {
            params = parameters;
        }
        else {
            params = {
                toHomeKit: 'return value',
                toIOBroker: 'return value'
            };
        }
        return new TIoBrokerConversion_Script(adapter, params);
    }
    constructor(adapter, parameters) {
        super(adapter);
        this.parameters = parameters;
        this.toHKFunction = new Function('value', this.parameters.toHomeKit);
        this.toIOFunction = new Function('value', this.parameters.toIOBroker);
    }
    toHomeKit(value) {
        let newValue = this.toHKFunction(value);
        this.adapter.log.debug(`script: converting value to homekit: ${value} to ${newValue}`);
        return newValue;
    }
    toIOBroker(value) {
        let newValue = this.toIOFunction(value);
        this.adapter.log.debug(`script: converting value to ioBroker: ${value} to ${newValue}`);
        return newValue;
    }
}
exports.TIoBrokerConversion_Script = TIoBrokerConversion_Script;


/***/ }),

/***/ "./yahka.functions/functions.base.ts":
/*!*******************************************!*\
  !*** ./yahka.functions/functions.base.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TYahkaFunctionBase = void 0;
const yahka_logger_1 = __webpack_require__(/*! ../shared/yahka.logger */ "./shared/yahka.logger.ts");
class TYahkaFunctionBase {
    constructor(adapter, logIdentifier = '') {
        this.adapter = adapter;
        this.logIdentifier = logIdentifier;
        this.subscriptionRequests = [];
        this.stateCache = new Map();
        this.log = new yahka_logger_1.YahkaLogger(this.adapter, this.logIdentifier);
    }
    addSubscriptionRequest(stateName) {
        let subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    }
    shouldStateBeFiltered(stateName, ioState) {
        return false;
    }
    readValueFromCache(stateName) {
        if (this.stateCache.has(stateName)) {
            return this.stateCache.get(stateName);
        }
        else {
            return undefined;
        }
    }
    updateCache(stateName, ioState) {
        let needUpdate = false;
        if (this.stateCache.has(stateName)) {
            let curVal = this.stateCache.get(stateName);
            needUpdate = (curVal === null || curVal === void 0 ? void 0 : curVal.val) !== (ioState === null || ioState === void 0 ? void 0 : ioState.val);
        }
        else {
            needUpdate = true;
        }
        if (needUpdate)
            this.stateCache.set(stateName, ioState);
        return needUpdate;
    }
    subscriptionEvent(stateName, ioState, callback) {
        this.log.debug(`change event from ioBroker via [${stateName}]${JSON.stringify(ioState)}`);
        if (this.shouldStateBeFiltered(stateName, ioState)) {
            this.log.debug('state was filtered - notification is canceled');
            return;
        }
        let cacheChange = this.updateCache(stateName, ioState);
        if (!cacheChange) {
            this.log.debug('state value already in cache - notification is canceled');
            return;
        }
        this.cacheChanged(stateName, callback);
    }
    cacheChanged(stateName, callback) {
    }
}
exports.TYahkaFunctionBase = TYahkaFunctionBase;


/***/ }),

/***/ "./yahka.functions/functions.factory.ts":
/*!**********************************************!*\
  !*** ./yahka.functions/functions.factory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.functionFactory = exports.conversionFactory = exports.inOutFactory = void 0;
exports.inOutFactory = {};
exports.conversionFactory = {};
exports.functionFactory = {
    createInOutFunction: function (adapter, inOutFunction, inOutParameters) {
        if (!(inOutFunction in exports.inOutFactory))
            return exports.inOutFactory['const'](adapter, inOutParameters);
        return exports.inOutFactory[inOutFunction](adapter, inOutParameters);
    },
    createConversionFunction: function (adapter, conversionFunction, conversionParameters) {
        if (!(conversionFunction in exports.conversionFactory))
            return exports.conversionFactory['passthrough'](adapter, conversionParameters);
        return exports.conversionFactory[conversionFunction](adapter, conversionParameters);
    }
};


/***/ }),

/***/ "./yahka.functions/functions.import.ts":
/*!*********************************************!*\
  !*** ./yahka.functions/functions.import.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const functions_factory_1 = __webpack_require__(/*! ./functions.factory */ "./yahka.functions/functions.factory.ts");
const iofunc_state_1 = __webpack_require__(/*! ./iofunc.state */ "./yahka.functions/iofunc.state.ts");
const iofunc_const_1 = __webpack_require__(/*! ./iofunc.const */ "./yahka.functions/iofunc.const.ts");
const iofunc_homematic_covering_1 = __webpack_require__(/*! ./iofunc.homematic.covering */ "./yahka.functions/iofunc.homematic.covering.ts");
const conversion_passthrough_1 = __webpack_require__(/*! ./conversion.passthrough */ "./yahka.functions/conversion.passthrough.ts");
const conversion_homekit_homematic_1 = __webpack_require__(/*! ./conversion.homekit.homematic */ "./yahka.functions/conversion.homekit.homematic.ts");
const conversion_scale_1 = __webpack_require__(/*! ./conversion.scale */ "./yahka.functions/conversion.scale.ts");
const conversion_inverse_1 = __webpack_require__(/*! ./conversion.inverse */ "./yahka.functions/conversion.inverse.ts");
const conversion_script_1 = __webpack_require__(/*! ./conversion.script */ "./yahka.functions/conversion.script.ts");
const iofunc_multi_state_1 = __webpack_require__(/*! ./iofunc.multi-state */ "./yahka.functions/iofunc.multi-state.ts");
const conversion_map_1 = __webpack_require__(/*! ./conversion.map */ "./yahka.functions/conversion.map.ts");
const iofunc_homematic_dimmer_1 = __webpack_require__(/*! ./iofunc.homematic.dimmer */ "./yahka.functions/iofunc.homematic.dimmer.ts");
const conversion_round_1 = __webpack_require__(/*! ./conversion.round */ "./yahka.functions/conversion.round.ts");
const conversion_invert_1 = __webpack_require__(/*! ./conversion.invert */ "./yahka.functions/conversion.invert.ts");
functions_factory_1.inOutFactory['ioBroker.State'] = iofunc_state_1.TIoBrokerInOutFunction_State.create;
functions_factory_1.inOutFactory['ioBroker.MultiState'] = iofunc_multi_state_1.TIoBrokerInOutFunction_MultiState.create;
functions_factory_1.inOutFactory['ioBroker.State.Defered'] = iofunc_state_1.TIoBrokerInOutFunction_StateDeferred.create;
functions_factory_1.inOutFactory['ioBroker.State.OnlyACK'] = iofunc_state_1.TIoBrokerInOutFunction_State_OnlyACK.create;
functions_factory_1.inOutFactory['const'] = iofunc_const_1.TIoBrokerInOutFunction_Const.create;
functions_factory_1.inOutFactory['ioBroker.homematic.WindowCovering.TargetPosition'] = iofunc_homematic_covering_1.TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.create;
functions_factory_1.inOutFactory['ioBroker.homematic.Dimmer.On'] = iofunc_homematic_dimmer_1.TIoBrokerInOutFunction_Homematic_Dimmer_On.create;
functions_factory_1.inOutFactory['ioBroker.homematic.Dimmer.Brightness'] = iofunc_homematic_dimmer_1.TIoBrokerInOutFunction_Homematic_Dimmer_Brightness.create;
functions_factory_1.conversionFactory['passthrough'] = (adapter, param) => new conversion_passthrough_1.TIoBrokerConversion_Passthrough(adapter);
functions_factory_1.conversionFactory['HomematicDirectionToHomekitPositionState'] = (adapter, param) => new conversion_homekit_homematic_1.TIoBrokerConversion_HomematicDirection_To_PositionState(adapter);
functions_factory_1.conversionFactory['HomematicControlModeToHomekitHeathingCoolingState'] = (adapter, param) => new conversion_homekit_homematic_1.TIoBrokerConversion_HomematicControlMode_To_CoolingState(adapter);
functions_factory_1.conversionFactory['level255'] = (adapter, param) => new conversion_scale_1.TIoBrokerConversion_Scale(adapter, {
    'homekit.min': 0,
    'homekit.max': 100,
    'iobroker.min': 0,
    'iobroker.max': 255
}, 'level255');
functions_factory_1.conversionFactory['scaleInt'] = (adapter, param) => new conversion_scale_1.TIoBrokerConversion_Scale_Rounded(adapter, param, 'scaleInt');
functions_factory_1.conversionFactory['scaleFloat'] = (adapter, param) => new conversion_scale_1.TIoBrokerConversion_Scale(adapter, param, 'scaleFloat');
functions_factory_1.conversionFactory['hue'] = (adapter, param) => new conversion_scale_1.TIoBrokerConversion_Scale(adapter, {
    'homekit.min': 0,
    'homekit.max': 360,
    'iobroker.min': 0,
    'iobroker.max': 65535
}, 'hue');
functions_factory_1.conversionFactory['inverse'] = conversion_inverse_1.TIoBrokerConversion_Inverse.create;
functions_factory_1.conversionFactory['script'] = (adapter, param) => new conversion_script_1.TIoBrokerConversion_Script(adapter, param);
functions_factory_1.conversionFactory['map'] = conversion_map_1.TIoBrokerConversion_Map.create;
functions_factory_1.conversionFactory['round'] = (adapter, _param) => new conversion_round_1.TIoBrokerConversion_Round(adapter);
functions_factory_1.conversionFactory['invert'] = (adapter, _param) => new conversion_invert_1.TIoBrokerConversion_Invert(adapter);


/***/ }),

/***/ "./yahka.functions/iofunc.base.ts":
/*!****************************************!*\
  !*** ./yahka.functions/iofunc.base.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_StateBase = exports.TIoBrokerInOutFunctionBase = void 0;
const functions_base_1 = __webpack_require__(/*! ./functions.base */ "./yahka.functions/functions.base.ts");
class TIoBrokerInOutFunctionBase extends functions_base_1.TYahkaFunctionBase {
    constructor() {
        super(...arguments);
        this.valueForHomeKit = undefined;
        this.errorForHomeKit = null;
    }
    fromIOBroker(callback) {
        this.log.debug(`fromIOBroker event - delivering cached value (${JSON.stringify(this.valueForHomeKit)})`);
        callback(null, this.valueForHomeKit);
    }
    toIOBroker(plainIoValue, callback) {
        this.log.debug(`writing state to ioBroker: ${JSON.stringify(plainIoValue)}`);
        this.updateIOBrokerValue(plainIoValue, callback);
    }
    cacheChanged(stateName, callback) {
        try {
            this.valueForHomeKit = this.recalculateHomekitValues(stateName);
            this.errorForHomeKit = null;
        }
        catch (e) {
            this.errorForHomeKit = e;
        }
        if (this.valueForHomeKit != null)
            callback(this.valueForHomeKit);
    }
    recalculateHomekitValues(stateName) {
        // noop
    }
    updateIOBrokerValue(plainIoValue, callback) {
        // to be filled in derived class
    }
}
exports.TIoBrokerInOutFunctionBase = TIoBrokerInOutFunctionBase;
class TIoBrokerInOutFunction_StateBase {
    constructor(adapter, stateName, deferredTime = 0) {
        this.adapter = adapter;
        this.stateName = stateName;
        this.deferredTime = deferredTime;
        this.debounceTimer = null;
        this.subscriptionRequests = [];
        this.addSubscriptionRequest(stateName);
    }
    addSubscriptionRequest(stateName) {
        let subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    }
    getValueOnRead(ioState) {
        return ioState === null || ioState === void 0 ? void 0 : ioState.val;
    }
    getValueOnNotify(ioState) {
        return ioState === null || ioState === void 0 ? void 0 : ioState.val;
    }
    toIOBroker(plainIoValue, callback) {
        this.adapter.log.debug(`writing state to ioBroker [${this.stateName}]: ${JSON.stringify(plainIoValue)}`);
        this.adapter.getForeignState(this.stateName, (error, ioState) => {
            let value = this.getValueOnRead(ioState);
            let valueChanged = value !== plainIoValue;
            this.adapter.log.debug(`checking value change: ${JSON.stringify(value)} != ${JSON.stringify(plainIoValue)} = ${valueChanged}`);
            if (valueChanged) {
                this.adapter.setForeignState(this.stateName, plainIoValue, false, (error) => {
                    if (error)
                        this.adapter.log.error(`setForeignState error [${this.stateName}] to [${JSON.stringify(plainIoValue)}]: ${error}`);
                    callback();
                });
            }
            else {
                callback();
            }
        });
    }
    fromIOBroker(callback) {
        this.adapter.log.debug(`reading state from ioBroker [${this.stateName}]`);
        this.adapter.getForeignState(this.stateName, (error, ioState) => {
            this.adapter.log.debug(`read state from ioBroker [${this.stateName}]: ${JSON.stringify(ioState)}`);
            if (error)
                this.adapter.log.error(`... with error: ${error}`);
            let value = this.getValueOnRead(ioState);
            callback(error, value);
        });
    }
    subscriptionEvent(stateName, ioState, callback) {
        this.adapter.log.debug(`change event from ioBroker via [${this.stateName}]${JSON.stringify(ioState)}`);
        let newValue = this.getValueOnNotify(ioState);
        if (newValue != null)
            this.executeCallback(callback, newValue);
        else
            this.adapter.log.debug('state was filtered - notification is canceled');
    }
    executeCallback(callback, plainIOValue) {
        if (this.deferredTime > 0)
            this.setupDeferredChangeEvent(callback, plainIOValue);
        else
            callback(plainIOValue);
    }
    setupDeferredChangeEvent(callback, plainIOValue) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), this.deferredTime);
    }
    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
    }
    deferredChangeEvent(callback, plainIOValue) {
        this.adapter.log.debug(`[${this.stateName}] firing deferred change event:${JSON.stringify(plainIOValue)}`);
        callback(plainIOValue);
    }
}
exports.TIoBrokerInOutFunction_StateBase = TIoBrokerInOutFunction_StateBase;


/***/ }),

/***/ "./yahka.functions/iofunc.const.ts":
/*!*****************************************!*\
  !*** ./yahka.functions/iofunc.const.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_Const = void 0;
class TIoBrokerInOutFunction_Const {
    static create(adapter, parameters) {
        return new TIoBrokerInOutFunction_Const(adapter, parameters);
    }
    constructor(adapter, parameters) {
        this.adapter = adapter;
        this.parameters = parameters;
    }
    toIOBroker(ioValue, callback) {
        callback();
    }
    fromIOBroker(callback) {
        callback(null, this.parameters);
    }
}
exports.TIoBrokerInOutFunction_Const = TIoBrokerInOutFunction_Const;


/***/ }),

/***/ "./yahka.functions/iofunc.homematic.covering.ts":
/*!******************************************************!*\
  !*** ./yahka.functions/iofunc.homematic.covering.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition = void 0;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
class TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition extends iofunc_base_1.TIoBrokerInOutFunction_StateBase {
    static create(adapter, parameters) {
        let p;
        if (typeof parameters === 'string') {
            p = [parameters];
        }
        else if (parameters instanceof Array) {
            p = parameters;
        }
        else {
            p = [];
        }
        if (p.length == 0) {
            return undefined;
        }
        let stateName = p[0];
        let workingItemName;
        if (p.length >= 2) {
            workingItemName = p[1];
        }
        else {
            let pathNames = stateName.split('.');
            pathNames[pathNames.length - 1] = 'WORKING';
            workingItemName = pathNames.join('.');
        }
        return new TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition(adapter, stateName, workingItemName);
    }
    constructor(adapter, stateName, workingItem) {
        super(adapter, stateName, 0);
        this.adapter = adapter;
        this.stateName = stateName;
        this.workingItem = workingItem;
        this.lastWorkingState = false;
        this.lastAcknowledgedValue = undefined;
        this.debounceTimer = null;
        this.addSubscriptionRequest(workingItem);
        adapter.getForeignState(workingItem, (error, ioState) => {
            if (ioState) {
                this.lastWorkingState = Boolean(ioState === null || ioState === void 0 ? void 0 : ioState.val);
            }
            else {
                this.lastWorkingState = undefined;
            }
        });
    }
    subscriptionEvent(stateName, ioState, callback) {
        if (!ioState) {
            return;
        }
        if (stateName == this.workingItem) {
            this.adapter.log.debug(`[${this.stateName}] got a working item change event: ${JSON.stringify(ioState)}`);
            this.lastWorkingState = Boolean(ioState === null || ioState === void 0 ? void 0 : ioState.val);
            this.setupDeferredChangeEvent(callback);
        }
        else if (stateName == this.stateName) {
            this.adapter.log.debug(`[${this.stateName}] got a target state change event:${JSON.stringify(ioState)}`);
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState === null || ioState === void 0 ? void 0 : ioState.val;
                this.setupDeferredChangeEvent(callback);
            }
        }
    }
    setupDeferredChangeEvent(callback) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback), 150);
    }
    cancelDeferredChangeEvent() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
    }
    deferredChangeEvent(callback) {
        if (!this.lastWorkingState) { // only fire callback if the covering does not move
            this.adapter.log.debug(`[${this.stateName}] firing target state change event:${JSON.stringify(this.lastAcknowledgedValue)}`);
            callback(this.lastAcknowledgedValue);
        }
        else {
            this.adapter.log.debug(`[${this.stateName}] canceling target state change event - covering is working`);
        }
    }
}
exports.TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition = TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition;


/***/ }),

/***/ "./yahka.functions/iofunc.homematic.dimmer.ts":
/*!****************************************************!*\
  !*** ./yahka.functions/iofunc.homematic.dimmer.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_Homematic_Dimmer_Brightness = exports.TIoBrokerInOutFunction_Homematic_Dimmer_On = exports.TIoBrokerInOutFunction_Homematic_Dimmer_Base = void 0;
exports.isHomematic_Dimmer_Parameter = isHomematic_Dimmer_Parameter;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
const yahka_utils_1 = __webpack_require__(/*! ../shared/yahka.utils */ "./shared/yahka.utils.ts");
function isHomematic_Dimmer_Parameter(value) {
    if (value === undefined || value === null || typeof value !== 'object') {
        return false;
    }
    return (0, yahka_utils_1.propertyExists)(value, 'levelState');
}
class TIoBrokerInOutFunction_Homematic_Dimmer_Base extends iofunc_base_1.TIoBrokerInOutFunctionBase {
    static parseParameters(parameters) {
        if (!isHomematic_Dimmer_Parameter(parameters)) {
            return undefined;
        }
        return parameters;
    }
    constructor(adapter, functionName, parameters) {
        super(adapter, `${functionName}[${parameters.levelState}]`);
        this.parameters = parameters;
        this.lastOnLevel = { val: undefined, ack: false, ts: undefined, lc: undefined, from: undefined };
        this.addSubscriptionRequest(parameters.levelState);
    }
    cacheChanged(stateName, callback) {
        // save level if we are switching off
        if (stateName === this.parameters.levelState) {
            const cacheValue = this.readValueFromCache(stateName);
            if (parseFloat(cacheValue.val) > 0) {
                this.lastOnLevel = cacheValue;
            }
        }
        super.cacheChanged(stateName, callback);
    }
}
exports.TIoBrokerInOutFunction_Homematic_Dimmer_Base = TIoBrokerInOutFunction_Homematic_Dimmer_Base;
class TIoBrokerInOutFunction_Homematic_Dimmer_On extends TIoBrokerInOutFunction_Homematic_Dimmer_Base {
    static create(adapter, parameters) {
        let params = TIoBrokerInOutFunction_Homematic_Dimmer_On.parseParameters(parameters);
        if (params === undefined) {
            return undefined;
        }
        return new TIoBrokerInOutFunction_Homematic_Dimmer_On(adapter, params);
    }
    constructor(adapter, parameters) {
        super(adapter, 'Homematic.Dimmer.On', parameters);
        this.adapter = adapter;
        this.parameters = parameters;
    }
    recalculateHomekitValues(stateName) {
        let hkValue = this.stateCache.get(this.parameters.levelState);
        return Boolean(parseFloat(hkValue === null || hkValue === void 0 ? void 0 : hkValue.val) > 0);
    }
    updateIOBrokerValue(plainIoValue, callback) {
        setTimeout(() => this.executeIOBrokerValue(plainIoValue, callback), 50);
    }
    executeIOBrokerValue(plainIoValue, callback) {
        var _a, _b;
        const isSwitchingOn = Boolean(plainIoValue);
        const stateName = this.parameters.levelState;
        const newOnValue = (this.parameters.restoreToPreviousLevel ? (_a = this.lastOnLevel) === null || _a === void 0 ? void 0 : _a.val : this.parameters.defaultSwitchOnLevel) || this.parameters.defaultSwitchOnLevel || 100;
        const newOffValue = 0;
        const newValue = isSwitchingOn ? newOnValue : newOffValue;
        if (isSwitchingOn && this.parameters.restoreToPreviousLevel) {
            this.log.debug(`using previous level for switching on: ${JSON.stringify((_b = this.lastOnLevel) === null || _b === void 0 ? void 0 : _b.val)}`);
        }
        this.log.debug(`writing state to ioBroker [${stateName}]: ${JSON.stringify(newValue)}`);
        this.adapter.getForeignState(stateName, (error, ioState) => {
            let value = parseFloat(ioState === null || ioState === void 0 ? void 0 : ioState.val);
            if (isSwitchingOn && value > 0) {
                this.log.debug(`function should switch on but level is already not equal to 0: ${JSON.stringify(value)}`);
                callback();
                return;
            }
            let valueChanged = value !== newValue;
            this.log.debug(`checking value change: ${JSON.stringify(value)} != ${JSON.stringify(newValue)} = ${valueChanged}`);
            if (valueChanged) {
                this.adapter.setForeignState(stateName, newValue, false, (error) => {
                    if (error) {
                        this.log.error(`setForeignState error [${stateName}] to [${JSON.stringify(newValue)}]: ${error}`);
                        callback();
                    }
                    callback();
                });
            }
            else {
                callback();
            }
        });
    }
}
exports.TIoBrokerInOutFunction_Homematic_Dimmer_On = TIoBrokerInOutFunction_Homematic_Dimmer_On;
class TIoBrokerInOutFunction_Homematic_Dimmer_Brightness extends TIoBrokerInOutFunction_Homematic_Dimmer_Base {
    static create(adapter, parameters) {
        let params = TIoBrokerInOutFunction_Homematic_Dimmer_On.parseParameters(parameters);
        if (params === undefined) {
            return undefined;
        }
        return new TIoBrokerInOutFunction_Homematic_Dimmer_Brightness(adapter, params);
    }
    constructor(adapter, parameters) {
        super(adapter, 'Homematic.Dimmer.Brightness', parameters);
        this.adapter = adapter;
        this.parameters = parameters;
    }
    recalculateHomekitValues(stateName) {
        var _a;
        let hkValue = this.stateCache.get(this.parameters.levelState);
        return (hkValue === null || hkValue === void 0 ? void 0 : hkValue.val) == 0 ? (_a = this.lastOnLevel) === null || _a === void 0 ? void 0 : _a.val : hkValue === null || hkValue === void 0 ? void 0 : hkValue.val;
    }
    updateIOBrokerValue(plainIoValue, callback) {
        const newValue = plainIoValue;
        const stateName = this.parameters.levelState;
        this.log.debug(`writing state to ioBroker [${stateName}]: ${JSON.stringify(newValue)}`);
        this.adapter.getForeignState(stateName, (error, ioState) => {
            let value = ioState === null || ioState === void 0 ? void 0 : ioState.val;
            let valueChanged = value !== newValue;
            this.log.debug(`checking value change: ${JSON.stringify(value)} != ${JSON.stringify(newValue)} = ${valueChanged}`);
            if (valueChanged) {
                this.adapter.setForeignState(stateName, newValue, false, (error) => {
                    if (error) {
                        this.log.error(`setForeignState error [${stateName}] to [${JSON.stringify(newValue)}]: ${error}`);
                        callback();
                    }
                    callback();
                });
            }
            else {
                callback();
            }
        });
    }
}
exports.TIoBrokerInOutFunction_Homematic_Dimmer_Brightness = TIoBrokerInOutFunction_Homematic_Dimmer_Brightness;


/***/ }),

/***/ "./yahka.functions/iofunc.multi-state.ts":
/*!***********************************************!*\
  !*** ./yahka.functions/iofunc.multi-state.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_MultiState = void 0;
exports.isMultiStateParameter = isMultiStateParameter;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
function isMultiStateParameter(value) {
    if (value === undefined || value === null || typeof value !== 'object') {
        return false;
    }
    let propName = 'readState';
    return (propName in value);
}
class TIoBrokerInOutFunction_MultiState extends iofunc_base_1.TIoBrokerInOutFunctionBase {
    static parseParameters(parameters) {
        if (Array.isArray(parameters)) {
            return parameters.filter(isMultiStateParameter);
        }
        else if (typeof parameters === 'string') {
            return [{ readState: parameters }];
        }
        else {
            return undefined;
        }
    }
    static create(adapter, parameters) {
        let stateNames = TIoBrokerInOutFunction_MultiState.parseParameters(parameters);
        if (stateNames === undefined) {
            return undefined;
        }
        return new TIoBrokerInOutFunction_MultiState(adapter, stateNames);
    }
    constructor(adapter, stateProperties) {
        super(adapter, 'TIoBrokerInOutFunctionMultiState');
        this.adapter = adapter;
        this.stateProperties = stateProperties;
        for (let state of stateProperties) {
            this.addSubscriptionRequest(state.readState);
        }
    }
    recalculateHomekitValues(stateName) {
        let hkValues = this.stateProperties.map((state) => { var _a; return (_a = this.stateCache.get(state.readState)) === null || _a === void 0 ? void 0 : _a.val; });
        return hkValues.length === 1 ? hkValues[0] : hkValues;
    }
    updateSingleIOBrokerValue(state, newValue) {
        if (newValue === undefined) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            let stateName = state.writeState || state.readState;
            this.log.debug(`writing state to ioBroker [${stateName}]: ${JSON.stringify(newValue)}`);
            this.adapter.setForeignState(stateName, newValue, false, (error) => {
                if (error) {
                    this.log.error(`setForeignState error [${stateName}] to [${JSON.stringify(newValue)}]: ${error}`);
                    reject(error);
                }
                resolve();
            });
        });
    }
    updateIOBrokerValue(plainIoValue, callback) {
        let ioValueArray = Array.isArray(plainIoValue) ? plainIoValue : [plainIoValue];
        let promiseArray = this.stateProperties.map((state, index) => {
            let newValueForThisState = ioValueArray[index];
            return this.updateSingleIOBrokerValue(state, newValueForThisState);
        });
        Promise.all(promiseArray).then(() => {
            this.log.debug('wrote all states successfully to ioBroker');
            callback();
        }).catch((e) => {
            this.log.error(`could not write all states to ioBroker: ${JSON.stringify(e)}`);
            callback();
        });
    }
}
exports.TIoBrokerInOutFunction_MultiState = TIoBrokerInOutFunction_MultiState;


/***/ }),

/***/ "./yahka.functions/iofunc.state.ts":
/*!*****************************************!*\
  !*** ./yahka.functions/iofunc.state.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_State_OnlyACK = exports.TIoBrokerInOutFunction_StateDeferred = exports.TIoBrokerInOutFunction_State = void 0;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
class TIoBrokerInOutFunction_State extends iofunc_base_1.TIoBrokerInOutFunction_StateBase {
    static create(adapter, parameters) {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName = parameters;
        return new TIoBrokerInOutFunction_State(adapter, stateName);
    }
}
exports.TIoBrokerInOutFunction_State = TIoBrokerInOutFunction_State;
class TIoBrokerInOutFunction_StateDeferred extends iofunc_base_1.TIoBrokerInOutFunction_StateBase {
    static create(adapter, parameters) {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName = parameters;
        return new TIoBrokerInOutFunction_StateDeferred(adapter, stateName, 250);
    }
}
exports.TIoBrokerInOutFunction_StateDeferred = TIoBrokerInOutFunction_StateDeferred;
class TIoBrokerInOutFunction_State_OnlyACK extends iofunc_base_1.TIoBrokerInOutFunction_StateBase {
    static create(adapter, parameters) {
        if (typeof parameters !== 'string')
            return undefined;
        const stateName = parameters;
        return new TIoBrokerInOutFunction_State_OnlyACK(adapter, stateName);
    }
    getValueOnRead(ioState) {
        if (ioState) {
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState === null || ioState === void 0 ? void 0 : ioState.val;
                return ioState === null || ioState === void 0 ? void 0 : ioState.val;
            }
            else {
                this.adapter.log.debug(`faking CurrentState.Read for [${this.stateName}]: ${JSON.stringify(this.lastAcknowledgedValue)}`);
                return this.lastAcknowledgedValue;
            }
        }
        else {
            return null;
        }
    }
    getValueOnNotify(ioState) {
        if (ioState) {
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState === null || ioState === void 0 ? void 0 : ioState.val;
                return ioState === null || ioState === void 0 ? void 0 : ioState.val;
            }
            this.adapter.log.debug(`discarding CurrentState.Notify for [${this.stateName}]`);
            return undefined;
        }
        return null;
    }
}
exports.TIoBrokerInOutFunction_State_OnlyACK = TIoBrokerInOutFunction_State_OnlyACK;


/***/ }),

/***/ "./yahka.homekit-bridge.ts":
/*!*********************************!*\
  !*** ./yahka.homekit-bridge.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THomeKitBridge = void 0;
exports.initHAP = initHAP;
exports.deinitHAP = deinitHAP;
/// <reference path="./typings/index.d.ts" />
const debug = __webpack_require__(/*! debug */ "debug");
const util = __webpack_require__(/*! node:util */ "node:util");
const yahka_community_types_1 = __webpack_require__(/*! ./yahka.community.types */ "./yahka.community.types.ts");
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
const yahka_homekit_service_1 = __webpack_require__(/*! ./yahka.homekit-service */ "./yahka.homekit-service.ts");
const pjson = __webpack_require__(/*! ../package.json */ "../package.json");
(0, yahka_community_types_1.importHAPCommunityTypesAndFixes)();
class THomeKitBridge {
    constructor(config, FBridgeFactory, FLogger) {
        this.config = config;
        this.FLogger = FLogger;
        this.serviceInitializer = new yahka_homekit_service_1.YahkaServiceInitializer(FBridgeFactory, FLogger);
        this.init();
    }
    init() {
        this.bridgeObject = this.setupBridge();
        const devicesToPublish = [
            () => {
                var _a;
                let advertiser = this.config.useLegacyAdvertiser ? "bonjour-hap" /* MDNSAdvertiser.BONJOUR */ : "avahi" /* MDNSAdvertiser.AVAHI */;
                advertiser = this.config.useCiaoAdvertiser ? "ciao" /* MDNSAdvertiser.CIAO */ : advertiser;
                this.FLogger.info(`publishing bridge ${this.config.name} on ${(_a = this.config.interface) !== null && _a !== void 0 ? _a : '0.0.0.0'} using ${advertiser}`);
                this.bridgeObject.publish({
                    username: this.config.username,
                    port: this.config.port,
                    pincode: this.config.pincode,
                    category: 2,
                    bind: this.config.interface != '' ? this.config.interface : undefined,
                    advertiser,
                });
            },
        ];
        if (this.config.devices) {
            for (let device of this.config.devices) {
                if (device.enabled === false) {
                    continue;
                }
                const hapDevice = this.createDevice(device);
                if (device.publishAsOwnDevice) {
                    devicesToPublish.push(() => {
                        var _a;
                        let advertiser = device.useLegacyAdvertiser ? "bonjour-hap" /* MDNSAdvertiser.BONJOUR */ : "avahi" /* MDNSAdvertiser.AVAHI */;
                        advertiser = device.useCiaoAdvertiser ? "ciao" /* MDNSAdvertiser.CIAO */ : advertiser;
                        this.FLogger.info(`publishing device ${device.name} on ${(_a = device.interface) !== null && _a !== void 0 ? _a : '0.0.0.0'} using ${advertiser}`);
                        hapDevice.publish({
                            username: device.username,
                            port: device.port,
                            pincode: device.pincode,
                            category: device.category,
                            advertiser,
                            bind: device.interface,
                        });
                    });
                }
                else {
                    try {
                        this.bridgeObject.addBridgedAccessory(hapDevice);
                    }
                    catch (e) {
                        this.FLogger.warn(e);
                        this.FLogger.warn(`Error by adding: ${JSON.stringify(device)}`);
                    }
                }
            }
        }
        devicesToPublish.forEach((m) => m());
    }
    setupBridge() {
        let hapBridge = new hap_nodejs_1.Bridge(this.config.name, hap_nodejs_1.uuid.generate(this.config.ident));
        let infoService = hapBridge.getService(hap_nodejs_1.Service.AccessoryInformation);
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Manufacturer, this.config.manufacturer || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Model, this.config.model || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.SerialNumber, this.config.serial || 'not configured');
        if (this.config.firmware !== undefined && this.config.firmware !== '') {
            infoService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, this.config.firmware);
        }
        else {
            infoService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, pjson.version);
        }
        // Listen for bridge identification event
        hapBridge.on('identify', (paired, callback) => {
            this.FLogger.debug(`Node Bridge identify:${paired}`);
            callback(); // success
        });
        return hapBridge;
    }
    createDevice(device) {
        let devName = device.name;
        let deviceID = hap_nodejs_1.uuid.generate(`${this.config.ident}:${devName}`);
        let i = 0;
        while (this.bridgeObject.bridgedAccessories.some((a) => a.UUID == deviceID)) {
            devName = `${device.name}_${++i}`;
            deviceID = hap_nodejs_1.uuid.generate(`${this.config.ident}:${devName}`);
        }
        this.FLogger.info(`adding ${devName} with UUID: ${deviceID}`);
        let hapDevice = new hap_nodejs_1.Accessory(devName, deviceID);
        let infoService = hapDevice.getService(hap_nodejs_1.Service.AccessoryInformation);
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Manufacturer, device.manufacturer || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Model, device.model || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.SerialNumber, device.serial || 'not configured');
        if (device.firmware !== undefined && device.firmware !== '') {
            infoService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, device.firmware);
        }
        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug(`[${device.name}] device identify`);
            callback(); // success
        });
        this.serviceInitializer.initServices(hapDevice, device.services, device.availableState);
        return hapDevice;
    }
}
exports.THomeKitBridge = THomeKitBridge;
let hapInited = false;
let originalLogMethod = debug.log;
function initHAP(storagePath, HAPdebugLogMethod) {
    if (hapInited) {
        return;
    }
    hap_nodejs_1.HAPStorage.setCustomStoragePath(storagePath);
    debug.log = function () {
        HAPdebugLogMethod(util.format.apply(this, arguments));
    };
}
function deinitHAP() {
    if (!hapInited) {
        return;
    }
    debug.disable();
    debug.log = originalLogMethod;
    hapInited = false;
}


/***/ }),

/***/ "./yahka.homekit-ipcamera.ts":
/*!***********************************!*\
  !*** ./yahka.homekit-ipcamera.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THomeKitIPCamera = void 0;
/// <reference path="./typings/index.d.ts" />
const node_child_process_1 = __webpack_require__(/*! node:child_process */ "node:child_process");
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
const yahka_homekit_service_1 = __webpack_require__(/*! ./yahka.homekit-service */ "./yahka.homekit-service.ts");
class THomeKitIPCamera {
    constructor(camConfig, FBridgeFactory, FLogger) {
        this.camConfig = camConfig;
        this.FLogger = FLogger;
        this.pendingSessions = {};
        this.ongoingSessions = {};
        this.serviceInitializer = new yahka_homekit_service_1.YahkaServiceInitializer(FBridgeFactory, FLogger);
        this.init();
    }
    init() {
        if (!this.camConfig.enabled) {
            return;
        }
        this.createCameraDevice();
        this.createCameraController();
        this.createAdditionalServices();
        this.publishCamera();
    }
    createOptionsDictionary() {
        const videoResolutions = [];
        const maxFPS = this.camConfig.maxFPS > 30 ? 30 : this.camConfig.maxFPS;
        if (this.camConfig.maxWidth >= 320) {
            if (this.camConfig.maxHeight >= 240) {
                videoResolutions.push([320, 240, maxFPS]);
                if (maxFPS > 15) {
                    videoResolutions.push([320, 240, 15]);
                }
            }
            if (this.camConfig.maxHeight >= 180) {
                videoResolutions.push([320, 180, maxFPS]);
                if (maxFPS > 15) {
                    videoResolutions.push([320, 180, 15]);
                }
            }
        }
        if (this.camConfig.maxWidth >= 480) {
            if (this.camConfig.maxHeight >= 360) {
                videoResolutions.push([480, 360, maxFPS]);
            }
            if (this.camConfig.maxHeight >= 270) {
                videoResolutions.push([480, 270, maxFPS]);
            }
        }
        if (this.camConfig.maxWidth >= 640) {
            if (this.camConfig.maxHeight >= 480) {
                videoResolutions.push([640, 480, maxFPS]);
            }
            if (this.camConfig.maxHeight >= 360) {
                videoResolutions.push([640, 360, maxFPS]);
            }
        }
        if (this.camConfig.maxWidth >= 1280) {
            if (this.camConfig.maxHeight >= 960) {
                videoResolutions.push([1280, 960, maxFPS]);
            }
            if (this.camConfig.maxHeight >= 720) {
                videoResolutions.push([1280, 720, maxFPS]);
            }
        }
        if (this.camConfig.maxWidth >= 1920) {
            if (this.camConfig.maxHeight >= 1080) {
                videoResolutions.push([1920, 1080, maxFPS]);
            }
        }
        const options = {
            proxy: false, // Requires RTP/RTCP MUX Proxy
            disable_audio_proxy: false, // If proxy = true, you can opt out audio proxy via this
            srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
            supportedCryptoSuites: [0 /* SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80 */],
            video: {
                resolutions: videoResolutions,
                codec: {
                    profiles: [0 /* H264Profile.BASELINE */, 1 /* H264Profile.MAIN */, 2 /* H264Profile.HIGH */],
                    levels: [0 /* H264Level.LEVEL3_1 */, 1 /* H264Level.LEVEL3_2 */, 2 /* H264Level.LEVEL4_0 */],
                },
            },
            audio: {
                comfort_noise: false,
                codecs: [
                    {
                        type: "AAC-eld" /* AudioStreamingCodecType.AAC_ELD */,
                        samplerate: 16 /* AudioStreamingSamplerate.KHZ_16 */,
                    },
                ],
            },
        };
        return options;
    }
    createCameraDevice() {
        let deviceID = hap_nodejs_1.uuid.generate(this.camConfig.ident + ':' + this.camConfig.name);
        let hapDevice = new hap_nodejs_1.Accessory(this.camConfig.name, deviceID);
        let infoService = hapDevice.getService(hap_nodejs_1.Service.AccessoryInformation);
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Manufacturer, this.camConfig.manufacturer || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.Model, this.camConfig.model || 'not configured');
        infoService.setCharacteristic(hap_nodejs_1.Characteristic.SerialNumber, this.camConfig.serial || 'not configured');
        if (this.camConfig.firmware !== undefined && this.camConfig.firmware !== '') {
            infoService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, this.camConfig.firmware);
        }
        hapDevice.on('identify', (paired, callback) => {
            this.FLogger.debug('camera identify');
            callback(); // success
        });
        this.camera = hapDevice;
    }
    createCameraController() {
        this.cameraController = new hap_nodejs_1.CameraController({
            cameraStreamCount: 2, // HomeKit requires at least 2 streams, but 1 is also just fine
            delegate: this,
            streamingOptions: this.createOptionsDictionary(),
        });
        this.camera.configureController(this.cameraController);
    }
    createAdditionalServices() {
        this.serviceInitializer.initServices(this.camera, this.camConfig.services);
    }
    publishCamera() {
        var _a;
        let advertiser = this.camConfig.useLegacyAdvertiser ? "bonjour-hap" /* MDNSAdvertiser.BONJOUR */ : "avahi" /* MDNSAdvertiser.AVAHI */;
        advertiser = this.camConfig.useCiaoAdvertiser ? "ciao" /* MDNSAdvertiser.CIAO */ : advertiser;
        this.FLogger.info(`publishing camera ${this.camConfig.name} on ${(_a = this.camConfig.interface) !== null && _a !== void 0 ? _a : '0.0.0.0'} using ${advertiser}`);
        this.camera.publish({
            username: this.camConfig.username,
            port: this.camConfig.port,
            pincode: this.camConfig.pincode,
            category: 17 /* Categories.CAMERA */,
            bind: this.camConfig.interface != '' ? this.camConfig.interface : undefined,
            advertiser,
        }, false);
    }
    handleSnapshotRequest(request, callback) {
        let params = {
            source: this.camConfig.source,
            width: request.width,
            height: request.height,
        };
        let ffmpegCommand = this.camConfig.ffmpegCommandLine.snapshot.map((s) => s.replace(/\$\{(.*?)}/g, (_, word) => {
            return params[word];
        }));
        this.FLogger.debug(`Snapshot run: ffmpeg ${ffmpegCommand.join(' ')}`);
        let ffmpeg = (0, node_child_process_1.spawn)('ffmpeg', ffmpegCommand, { env: process.env });
        let imageBuffer = Buffer.alloc(0);
        ffmpeg.stdout.on('data', data => imageBuffer = Buffer.concat([imageBuffer, data]));
        ffmpeg.on('close', ( /* code */) => callback(undefined, imageBuffer));
    }
    prepareStream(request, callback) {
        let sessionInfo = {};
        const sessionID = request.sessionID;
        sessionInfo.address = request.targetAddress;
        let response = {};
        let videoInfo = request.video;
        if (videoInfo) {
            const targetPort = videoInfo.port;
            const videoCryptoSuite = videoInfo.srtpCryptoSuite; // could be used to support multiple crypto suite (or support no suite for debugging)
            const videoSrtpKey = videoInfo.srtp_key;
            const videoSrtpSalt = videoInfo.srtp_salt;
            const videoSSRC = hap_nodejs_1.CameraController.generateSynchronisationSource();
            response.video = {
                port: targetPort,
                ssrc: videoSSRC,
                srtp_key: videoSrtpKey,
                srtp_salt: videoSrtpSalt,
            };
            sessionInfo.videoPort = targetPort;
            sessionInfo.videoSRTP = Buffer.concat([videoSrtpKey, videoSrtpSalt]);
            sessionInfo.videoSSRC = videoSSRC;
            sessionInfo.videoCryptoSuite = videoCryptoSuite;
        }
        const audioInfo = request.audio;
        if (audioInfo) {
            const targetPort = audioInfo.port;
            const audioCryptoSuite = audioInfo.srtpCryptoSuite; // could be used to support multiple crypto suite (or support no suite for debugging)
            const audioSrtpKey = audioInfo.srtp_key;
            const audioSrtpSalt = audioInfo.srtp_salt;
            const audioSSRC = hap_nodejs_1.CameraController.generateSynchronisationSource();
            response.audio = {
                port: targetPort,
                ssrc: audioSSRC,
                srtp_key: audioSrtpKey,
                srtp_salt: audioSrtpSalt,
            };
            sessionInfo.audioPort = targetPort;
            sessionInfo.audioSRTP = Buffer.concat([audioSrtpKey, audioSrtpSalt]);
            sessionInfo.audioSSRC = audioSSRC;
            sessionInfo.audioCryptoSuite = audioCryptoSuite;
        }
        // let currentAddress = ip.address();
        // const addressResp: Partial<Address> = {
        //     address: currentAddress
        // };
        // if (ip.isV4Format(currentAddress)) {
        //     addressResp.type = 'v4';
        // } else {
        //     addressResp.type = 'v6';
        // }
        // response.address = addressResp as Address;
        this.pendingSessions[sessionID] = sessionInfo;
        callback(undefined, response);
    }
    handleStreamRequest(request, callback) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const sessionId = request.sessionID;
        switch (request.type) {
            case "start" /* StreamRequestTypes.START */: {
                const sessionInfo = this.pendingSessions[sessionId];
                this.FLogger.debug(`Session Request: ${JSON.stringify(request, undefined, 2)}`);
                if (sessionInfo) {
                    let width = 1280;
                    let height = 720;
                    let fps = 30;
                    let bitrate = 300;
                    let codec = (_a = this.camConfig.codec) !== null && _a !== void 0 ? _a : 'libx264';
                    const mtu = (_c = (_b = request.video) === null || _b === void 0 ? void 0 : _b.mtu) !== null && _c !== void 0 ? _c : 1316;
                    let videoInfo = request.video;
                    if (videoInfo) {
                        width = videoInfo.width;
                        height = videoInfo.height;
                        let expectedFPS = videoInfo.fps;
                        if (expectedFPS < fps) {
                            fps = expectedFPS;
                        }
                        bitrate = videoInfo.max_bit_rate;
                    }
                    let params = {
                        source: this.camConfig.source,
                        codec,
                        fps,
                        width,
                        height,
                        bitrate,
                        payloadtype: (_d = request.video.pt) !== null && _d !== void 0 ? _d : 99,
                        videokey: (_e = sessionInfo.videoSRTP) === null || _e === void 0 ? void 0 : _e.toString('base64'),
                        targetAddress: sessionInfo.address,
                        targetVideoPort: sessionInfo.videoPort,
                        targetVideoSsrc: sessionInfo.videoSSRC,
                        mtu,
                    };
                    let ffmpegCommand = this.camConfig.ffmpegCommandLine.stream.map((s) => s.replace(/\$\{(.*?)}/g, (_, word) => params[word]));
                    if (this.camConfig.enableAudio && request.audio != null) {
                        let params = {
                            source: this.camConfig.source,
                            bitrate: (_f = request.audio.max_bit_rate) !== null && _f !== void 0 ? _f : 16,
                            samplerate: (_g = request.audio.sample_rate) !== null && _g !== void 0 ? _g : 16,
                            channel: (_h = request.audio.channel) !== null && _h !== void 0 ? _h : 1,
                            payloadtype: (_j = request.audio.pt) !== null && _j !== void 0 ? _j : 110,
                            targetAddress: sessionInfo.address,
                            targetAudioPort: sessionInfo.audioPort,
                            targetAudioSsrc: sessionInfo.audioSSRC,
                            audiokey: (_k = sessionInfo.audioSRTP) === null || _k === void 0 ? void 0 : _k.toString('base64'),
                        };
                        ffmpegCommand = ffmpegCommand.concat(this.camConfig.ffmpegCommandLine.streamAudio.map((s) => s.replace(/\$\{(.*?)}/g, (_, word) => params[word])));
                    }
                    this.FLogger.debug("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    let ffmpeg = (0, node_child_process_1.spawn)('ffmpeg', ffmpegCommand, { env: process.env });
                    let started = false;
                    ffmpeg.stderr.on('data', (data) => {
                        if (!started) {
                            started = true;
                            this.FLogger.debug('FFMPEG: received first frame');
                            callback(); // do not forget to execute callback once set up
                        }
                        this.FLogger.debug("FFMPEG:" + data.toString('utf8'));
                    });
                    ffmpeg.on('error', (error) => {
                        this.FLogger.error(`[Video] Failed to start video stream: ${error.message}`);
                        callback(new Error('ffmpeg process creation failed!'));
                    });
                    ffmpeg.on('exit', (code, signal) => {
                        const message = `[Video] ffmpeg exited with code: ${code} and signal: ${signal}`;
                        if (code == null || code === 255) {
                            this.FLogger.debug(`${message} (Video stream stopped!)`);
                        }
                        else {
                            this.FLogger.error(`${message} (error)`);
                            if (!started) {
                                callback(new Error(message));
                            }
                            else {
                                this.cameraController.forceStopStreamingSession(sessionId);
                            }
                        }
                    });
                    this.ongoingSessions[sessionId] = {
                        localVideoPort: 0,
                        process: ffmpeg,
                    };
                    delete this.pendingSessions[sessionId];
                    break;
                }
            }
            // break; // here should be break
            case "reconfigure" /* StreamRequestTypes.RECONFIGURE */:
                callback();
                break;
            case "stop" /* StreamRequestTypes.STOP */:
                this.stopStreaming(sessionId);
                callback();
                break;
        }
    }
    stopStreaming(sessionId) {
        const ongoingSession = this.ongoingSessions[sessionId];
        try {
            ongoingSession.process.kill('SIGKILL');
        }
        catch (e) {
            this.FLogger.error('Error occurred terminating the video process!');
            this.FLogger.error(e);
        }
        delete this.ongoingSessions[sessionId];
        this.FLogger.debug('Stopped streaming session!');
    }
}
exports.THomeKitIPCamera = THomeKitIPCamera;


/***/ }),

/***/ "./yahka.homekit-service.ts":
/*!**********************************!*\
  !*** ./yahka.homekit-service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YahkaServiceInitializer = void 0;
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
class YahkaServiceInitializer {
    constructor(FBridgeFactory, FLogger) {
        this.FBridgeFactory = FBridgeFactory;
        this.FLogger = FLogger;
    }
    initServices(hapDevice, serviceConfigs, availabilityIobState) {
        if (serviceConfigs == null) {
            return;
        }
        let iobStateGiven = availabilityIobState !== undefined && availabilityIobState !== null && availabilityIobState.trim() !== '';
        let availableStateBinding = iobStateGiven ? this.FBridgeFactory.CreateBinding({
            name: 'Dummy',
            enabled: true,
            customCharacteristic: true,
            properties: [],
            inOutFunction: 'ioBroker.State',
            inOutParameters: availabilityIobState
        }, (dummy) => { })
            : null;
        for (const service of serviceConfigs) {
            this.initService(hapDevice, service, availableStateBinding);
        }
        for (const service of serviceConfigs) {
            this.establishServiceLinks(hapDevice, service);
        }
    }
    initService(hapDevice, serviceConfig, availabilityBinding) {
        if (serviceConfig.enabled === false) {
            this.FLogger.debug(`[${hapDevice.displayName}] service ${serviceConfig.name} is disabled`);
            return;
        }
        let newType = serviceConfig.type;
        switch (serviceConfig.type) {
            case 'BatteryType':
            case 'BatteryService': {
                newType = 'Battery';
                break;
            }
            case 'CameraEventRecordingManagement': {
                newType = 'CameraRecordingManagement';
                break;
            }
            case 'Relay': {
                newType = 'CloudRelay';
                break;
            }
            case 'Slat': {
                newType = 'Slats';
                break;
            }
            case 'TunneledBTLEAccessoryService': {
                newType = 'Tunnel';
                break;
            }
            case 'BridgeConfiguration':
            case 'BridgingState':
            case 'CameraControl':
            case 'TimeInformation': {
                this.FLogger.warn(`The type ${serviceConfig.type} is not supported anymore and has been removed. You can change your service configuration and remove the item.`);
                return;
            }
        }
        serviceConfig.type = newType;
        if (!(serviceConfig.type in hap_nodejs_1.Service)) {
            throw Error(`[${hapDevice.displayName}] unknown service type: ${serviceConfig.type}`);
        }
        this.FLogger.debug(`[${hapDevice.displayName}] adding Service ${serviceConfig.name}`);
        let isNew = false;
        let hapService = hapDevice.getService(hap_nodejs_1.Service[serviceConfig.type]);
        if (hapService !== undefined) {
            const existingSubType = hapService.subtype ? hapService.subtype : '';
            if (existingSubType != serviceConfig.subType)
                hapService = undefined;
        }
        if (hapService === undefined) {
            hapService = new hap_nodejs_1.Service[serviceConfig.type](serviceConfig.name, serviceConfig.subType);
            isNew = true;
        }
        if (serviceConfig.isHidden != null) {
            hapService.setHiddenService(serviceConfig.isHidden);
        }
        if (serviceConfig.isPrimary != null) {
            hapService.setPrimaryService(serviceConfig.isPrimary);
        }
        for (let charactConfig of serviceConfig.characteristics) {
            this.initCharacteristic(hapService, charactConfig, availabilityBinding);
        }
        if (isNew) {
            hapDevice.addService(hapService);
        }
    }
    establishServiceLinks(hapDevice, serviceConfig) {
        if (serviceConfig.enabled == false) {
            return;
        }
        if (serviceConfig.linkTo == null) {
            return;
        }
        if (serviceConfig.linkTo == '') {
            return;
        }
        const existingService = hapDevice.getService(serviceConfig.name);
        const linkToService = hapDevice.getService(serviceConfig.linkTo);
        if (existingService == null || linkToService == null) {
            this.FLogger.error(`[${serviceConfig.name}] unable to establish link between ${serviceConfig.linkTo} and ${serviceConfig.name} - one of the services was not found or is disabled`);
            return;
        }
        linkToService.addLinkedService(existingService);
        this.FLogger.debug(`[${serviceConfig.name}] established link from ${existingService.displayName} to ${linkToService.displayName}`);
    }
    initCharacteristic(hapService, characteristicConfig, availabilityBinding) {
        const logName = `[${hapService.displayName}.${characteristicConfig.name}]`;
        if (!characteristicConfig.enabled) {
            return;
        }
        let hapCharacteristic = hapService.getCharacteristic(hap_nodejs_1.Characteristic[characteristicConfig.name]);
        if (!hapCharacteristic) {
            this.FLogger.warn(`${logName} unknown characteristic: ${characteristicConfig.name}`);
            return;
        }
        if (characteristicConfig.properties !== undefined)
            hapCharacteristic.setProps(characteristicConfig.properties);
        hapCharacteristic.binding = this.FBridgeFactory.CreateBinding(characteristicConfig, (plainIOValue) => {
            this.FLogger.debug(`${logName} got a change notify event, ioValue: ${JSON.stringify(plainIOValue)}`);
            let binding = hapCharacteristic.binding;
            if (!binding) {
                this.FLogger.error(`${logName} no binding!`);
                return;
            }
            let hkValue = binding.conversion.toHomeKit(plainIOValue);
            this.FLogger.debug(`${logName} forwarding value from ioBroker (${JSON.stringify(plainIOValue)}) to homekit as (${JSON.stringify(hkValue)})`);
            try {
                hapCharacteristic.setValue(hkValue, binding);
            }
            catch (e) {
                this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
            }
        });
        this.getValueFromIOBroker(hapCharacteristic.binding, (error, ioValue, hkValue) => {
            this.FLogger.debug(`${logName} initializing homekit with value from ioBroker(${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
            try {
                hapCharacteristic.setValue(hkValue, hapCharacteristic.binding);
            }
            catch (e) {
                this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
            }
        });
        hapCharacteristic.on('set', (hkValue, callback, context) => {
            let availableCallback = () => {
                this.FLogger.debug(`${logName} got a set event, hkValue: ${JSON.stringify(hkValue)} `);
                let binding = hapCharacteristic.binding;
                if (!binding) {
                    this.FLogger.error(`${logName} no binding!`);
                    callback();
                    return;
                }
                if (context === binding) {
                    this.FLogger.debug(`${logName} set was initiated from ioBroker - exiting here`);
                    callback();
                    return;
                }
                let ioValue = binding.conversion.toIOBroker(hkValue);
                binding.inOut.toIOBroker(ioValue, () => {
                    this.FLogger.debug(`${logName} set was accepted by ioBroker(value: ${JSON.stringify(ioValue)})`);
                    callback();
                });
            };
            if (availabilityBinding === null || availabilityBinding === undefined) {
                availableCallback();
                return;
            }
            availabilityBinding.inOut.fromIOBroker((error, plainIOValue) => {
                if (!plainIOValue) {
                    callback(-70402 /* HAPStatus.SERVICE_COMMUNICATION_FAILURE */);
                    return;
                }
                availableCallback();
            });
        });
        hapCharacteristic.on('get', (hkCallback) => {
            this.FLogger.debug(`${logName} got a get event`);
            const availableCallback = () => {
                this.getValueFromIOBroker(hapCharacteristic.binding, (error, ioValue, hkValue) => {
                    this.FLogger.debug(`${logName} forwarding value from ioBroker(${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
                    try {
                        hkCallback(error, hkValue);
                    }
                    catch (e) {
                        this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
                    }
                });
            };
            if (availabilityBinding === null || availabilityBinding === undefined) {
                availableCallback();
                return;
            }
            availabilityBinding.inOut.fromIOBroker((error, plainIOValue) => {
                if (!plainIOValue) {
                    hkCallback(-70402 /* HAPStatus.SERVICE_COMMUNICATION_FAILURE */);
                    return;
                }
                availableCallback();
            });
        });
    }
    getValueFromIOBroker(binding, callback) {
        if (!binding) {
            callback('no binding', null, null);
            return;
        }
        binding.inOut.fromIOBroker((ioBrokerError, ioValue) => {
            let hkValue = binding.conversion.toHomeKit(ioValue);
            // check if the value can be converted to a number
            if ((hkValue !== undefined) && (hkValue !== "")) {
                let numValue = Number(hkValue);
                if (!isNaN(numValue)) {
                    hkValue = numValue;
                }
            }
            callback(ioBrokerError, ioValue, hkValue);
        });
    }
}
exports.YahkaServiceInitializer = YahkaServiceInitializer;


/***/ }),

/***/ "./yahka.ioBroker-adapter.ts":
/*!***********************************!*\
  !*** ./yahka.ioBroker-adapter.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIOBrokerAdapter = void 0;
/// <reference path="./typings/index.d.ts" />
const node_path_1 = __webpack_require__(/*! node:path */ "node:path");
const yahka_homekit_ipcamera_1 = __webpack_require__(/*! ./yahka.homekit-ipcamera */ "./yahka.homekit-ipcamera.ts");
const functions_factory_1 = __webpack_require__(/*! ./yahka.functions/functions.factory */ "./yahka.functions/functions.factory.ts");
const yahka_homekit_bridge_1 = __webpack_require__(/*! ./yahka.homekit-bridge */ "./yahka.homekit-bridge.ts");
function isSubscriptionRequester(param) {
    return param['subscriptionRequests'] !== undefined &&
        param['subscriptionRequests'] instanceof Array;
}
function isCustomCharacteristicConfig(config) {
    if (!config)
        return false;
    let myConfig = config;
    return (myConfig.inOutFunction !== undefined) || (myConfig.conversionFunction !== undefined) || (myConfig.inOutParameters !== undefined);
}
class TIOBrokerAdapter {
    constructor(adapter, dataDir) {
        this.adapter = adapter;
        this.dataDir = dataDir;
        this.stateToEventMap = new Map();
        this.objectToEventMap = new Map();
        this.devices = [];
        this.verboseHAPLogging = false;
        adapter.on('ready', this.adapterReady.bind(this));
        adapter.on('stateChange', this.handleState.bind(this));
        adapter.on('message', this.handleMessage.bind(this));
        adapter.on('unload', this.handleUnload.bind(this));
    }
    adapterReady() {
        (0, yahka_homekit_bridge_1.initHAP)((0, node_path_1.join)(this.dataDir, `${this.adapter.name}.${this.adapter.instance}.hapdata`), this.handleHAPLogEvent.bind(this));
        this.adapter.log.info('adapter ready, checking config');
        let config = this.adapter.config;
        this.createHomeKitBridges(config);
        this.createCameraDevices(config);
    }
    createHomeKitBridges(config) {
        let bridgeConfig = config.bridge;
        if (!config.firstTimeInitialized) {
            this.adapter.log.info('first time initialization');
            this.adapter.log.debug(`system config: ${JSON.stringify(this.adapter.systemConfig)}`);
            bridgeConfig.ident = `Yahka-${this.adapter.instance}`;
            bridgeConfig.name = bridgeConfig.ident;
            bridgeConfig.serial = bridgeConfig.ident;
            let usr = [];
            for (let i = 0; i < 6; i++) {
                usr[i] = (`00${Math.floor((Math.random() * 256)).toString(16)}`).substr(-2);
            }
            bridgeConfig.username = usr.join(':');
            bridgeConfig.pincode = '123-45-678';
            bridgeConfig.port = 0;
            bridgeConfig.verboseLogging = false;
            config.firstTimeInitialized = true;
            this.adapter.extendForeignObject(`system.adapter.${this.adapter.name}.${this.adapter.instance}`, { native: config }, undefined);
        }
        this.verboseHAPLogging = bridgeConfig.verboseLogging == true;
        this.adapter.log.debug('creating bridge');
        this.devices.push(new yahka_homekit_bridge_1.THomeKitBridge(config.bridge, this, this.adapter.log));
    }
    createCameraDevices(config) {
        let cameraArray = config.cameras;
        if (cameraArray === undefined)
            return;
        for (let cameraConfig of cameraArray) {
            this.adapter.log.debug('creating camera');
            this.devices.push(new yahka_homekit_ipcamera_1.THomeKitIPCamera(cameraConfig, this, this.adapter.log));
        }
    }
    handleHAPLogEvent(message) {
        if (this.verboseHAPLogging) {
            console.log('HAP debug message', message);
            this.adapter.log.debug(`HAP debug message: ${message}`);
        }
    }
    handleState(id, state) {
        // Warning, the state can be null if it was deleted
        let notifyArray = this.stateToEventMap.get(id);
        if (!notifyArray) {
            //this.adapter.log.debug('nobody subscribed for this state');
            return;
        }
        this.adapter.log.debug(`got a stateChange for [${id}]`);
        // try to convert it to a number
        convertStateValueToNumber(state);
        for (let method of notifyArray)
            method(state);
    }
    handleMessage(obj) {
        if (typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.message)) {
            if (obj.command === 'send') {
                // Send response in callback if required
                if (obj.callback) {
                    this.adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
                }
            }
        }
    }
    handleUnload(callback) {
        try {
            this.adapter.log.info('cleaning up ...');
            (0, yahka_homekit_bridge_1.deinitHAP)();
            this.adapter.log.info('cleaned up ...');
        }
        catch (e) {
        }
        callback();
    }
    handleInOutSubscriptionRequest(requester, changeNotify) {
        if (requester.subscriptionRequests.length == 0)
            return;
        for (let subscriptionRequest of requester.subscriptionRequests) {
            let changeInterceptor = (ioValue) => subscriptionRequest.subscriptionEvent(ioValue, changeNotify);
            if (subscriptionRequest.subscriptionType === 'state') {
                let existingArray = this.stateToEventMap.get(subscriptionRequest.subscriptionIdentifier);
                if (!existingArray) {
                    existingArray = [changeInterceptor];
                    this.stateToEventMap.set(subscriptionRequest.subscriptionIdentifier, existingArray);
                }
                else
                    existingArray.push(changeInterceptor);
                this.adapter.subscribeForeignStates(subscriptionRequest.subscriptionIdentifier);
                this.adapter.log.debug(`added subscription for: [${subscriptionRequest.subscriptionType}]${subscriptionRequest.subscriptionIdentifier}`);
                this.adapter.getForeignState(subscriptionRequest.subscriptionIdentifier, (_, value) => {
                    convertStateValueToNumber(value);
                    changeInterceptor(value);
                });
            }
            else {
                this.adapter.log.warn(`unknown subscription type: ${subscriptionRequest.subscriptionType}`);
            }
        }
    }
    CreateBinding(characteristicConfig, changeNotify) {
        if (isCustomCharacteristicConfig(characteristicConfig)) {
            let inoutFunc = functions_factory_1.functionFactory.createInOutFunction(this.adapter, characteristicConfig.inOutFunction, characteristicConfig.inOutParameters);
            if (inoutFunc === undefined) {
                this.adapter.log.error(`[${characteristicConfig.name}] could not create inout-function: ${characteristicConfig.inOutFunction} with params: ${JSON.stringify(characteristicConfig.inOutParameters)}`);
                return undefined;
            }
            let convFunc = functions_factory_1.functionFactory.createConversionFunction(this.adapter, characteristicConfig.conversionFunction, characteristicConfig.conversionParameters);
            if (convFunc === undefined) {
                this.adapter.log.error(`[${characteristicConfig.name}] could not create conversion-function: ${characteristicConfig.conversionFunction} with params: ${JSON.stringify(characteristicConfig.conversionParameters)}`);
                return undefined;
            }
            if (isSubscriptionRequester(inoutFunc)) {
                this.handleInOutSubscriptionRequest(inoutFunc, changeNotify);
            }
            return {
                conversion: convFunc,
                inOut: inoutFunc
            };
        }
        return null;
    }
}
exports.TIOBrokerAdapter = TIOBrokerAdapter;
function convertStateValueToNumber(state) {
    if (((state === null || state === void 0 ? void 0 : state.val) != null)) {
        let numValue = Number(state.val);
        if (!isNaN(numValue)) {
            state.val = numValue;
        }
    }
}


/***/ }),

/***/ "@iobroker/adapter-core":
/*!*****************************************!*\
  !*** external "@iobroker/adapter-core" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@iobroker/adapter-core");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ "hap-nodejs":
/*!*****************************!*\
  !*** external "hap-nodejs" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("hap-nodejs");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "../package.json":
/*!***********************!*\
  !*** ../package.json ***!
  \***********************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"iobroker.yahka","version":"1.1.0","description":"ioBroker HomeKit Adapter","author":{"name":"Jens Weigele","email":"iobroker.yahka@gmail.com"},"contributors":[{"name":"Jens Weigele","email":"iobroker.yahka@gmail.com"},{"name":"Tarik Weiss","email":"kontakt@tarikweiss.de"}],"homepage":"https://github.com/jensweigele/ioBroker.yahka","license":"MIT","keywords":["ioBroker","iobroker.yahka","Smart Home","home automation","siri","homekit"],"repository":{"type":"git","url":"https://github.com/jensweigele/ioBroker.yahka"},"engines":{"node":">=18.0.0"},"dependencies":{"@iobroker/adapter-core":"^3.1.6","debug":"^4.3.6","dev-null":"^0.1.1","hap-nodejs":"1.1.0","ip":"^2.0.1","macaddress":"0.5.3"},"devDependencies":{"@alcalzone/release-script":"^3.8.0","@alcalzone/release-script-plugin-iobroker":"^3.7.2","@alcalzone/release-script-plugin-license":"^3.7.0","@iobroker/adapter-dev":"^1.3.0","@iobroker/types":"^6.0.11","@types/jquery":"^3.5.30","@types/materialize-css":"^1.0.14","@types/node":"^22.5.1","assert":"^2.1.0","buffer":"^6.0.3","chai":"^4.5.0","crypto-browserify":"^3.12.0","html-webpack-plugin":"^5.6.0","mocha":"^10.7.3","path-browserify":"^1.0.1","process":"^0.11.10","raw-loader":"^4.0.2","stream-browserify":"^3.0.0","timers":"^0.1.1","ts-loader":"^9.5.1","typescript":"^5.5.4","webpack":"^5.94.0","webpack-cli":"^5.1.4","webpack-node-externals":"^3.0.0","xml2js":"^0.6.2"},"bugs":{"url":"https://github.com/jensweigele/ioBroker.yahka/issues"},"readmeFilename":"README.md","main":"main.js","files":["admin/","main.js","main.js.map","LICENSE","README.md","io-package.json","hap-nodejs-community-types/"],"scripts":{"test":"node node_modules/mocha/bin/mocha --exit","build":"node tasks","_prepublishOnly":"node tasks","release":"release-script","release-patch":"release-script patch --yes","release-minor":"release-script minor --yes","release-major":"release-script major --yes","setupDev":"dev-server setup","startDev":"dev-server watch --no-start"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map