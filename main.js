/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../hap-nodejs-community-types/types.js":
/*!**********************************************!*\
  !*** ../hap-nodejs-community-types/types.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherits = (__webpack_require__(/*! util */ "util").inherits);
var Service, Characteristic;

module.exports = function(homebridge, options) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUID = homebridge.hap.uuid;

  var CommunityTypes = {};

  if (!options) options = {};


  // Characteristics

  CommunityTypes.Timestamp = function() {
    Characteristic.call(this, "Timestamp", CommunityTypes.Timestamp.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Timestamp.UUID = 'FF000001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.Timestamp, Characteristic);

  CommunityTypes.AudioDataURL = function() {
    Characteristic.call(this, "Audio URL", CommunityTypes.AudioDataURL.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
  };
  CommunityTypes.AudioDataURL.UUID = 'FF000002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioDataURL, Characteristic);

  CommunityTypes.VideoDataURL = function() {
    Characteristic.call(this, "Video URL", CommunityTypes.VideoDataURL.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
  };
  CommunityTypes.VideoDataURL.UUID = 'FF000003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.VideoDataURL, Characteristic);

  CommunityTypes.AudioVolume = function() {
    Characteristic.call(this, 'Audio Volume', CommunityTypes.AudioVolume.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit: Characteristic.Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AudioVolume.UUID = '00001001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioVolume, Characteristic);

  CommunityTypes.Muting = function() {
    Characteristic.call(this, 'Muting', CommunityTypes.Muting.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Muting.UUID = '00001002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.Muting, Characteristic);

  CommunityTypes.PlaybackState = function() {
    Characteristic.call(this, 'Playback State', CommunityTypes.PlaybackState.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.PlaybackState.UUID = '00002001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackState, Characteristic);
  CommunityTypes.PlaybackState.PLAYING = 0;
  CommunityTypes.PlaybackState.PAUSED = 1;
  CommunityTypes.PlaybackState.STOPPED = 2;

  CommunityTypes.SkipForward = function() {
    Characteristic.call(this, 'Skip Forward', CommunityTypes.SkipForward.UUID);
    this.setProps({
      format:   Characteristic.Formats.BOOL,
      perms: [ Characteristic.Perms.WRITE ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SkipForward.UUID = '00002002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SkipForward, Characteristic);

  CommunityTypes.SkipBackward = function() {
    Characteristic.call(this, 'Skip Backward', CommunityTypes.SkipBackward.UUID);
    this.setProps({
      format:   Characteristic.Formats.BOOL,
      perms: [ Characteristic.Perms.WRITE ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SkipBackward.UUID = '00002003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SkipBackward, Characteristic);

  CommunityTypes.ShuffleMode = function() {
    Characteristic.call(this, 'Shuffle Mode', CommunityTypes.ShuffleMode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.ShuffleMode.UUID = '00002004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.ShuffleMode, Characteristic);
  //NOTE: If GROUP or SET is not supported, accessories should coerce to ALBUM.
  // If ALBUM is not supported, coerce to ITEM.
  // In general, it is recommended for apps to only assume OFF, ITEM, and ALBUM
  // are supported unless it is known that the accessory supports other settings.
  CommunityTypes.ShuffleMode.OFF = 0;
  //NOTE: INDIVIDUAL is deprecated.
  CommunityTypes.ShuffleMode.ITEM = CommunityTypes.ShuffleMode.INDIVIDUAL = 1;
  CommunityTypes.ShuffleMode.GROUP = 2; // e.g. iTunes "Groupings"
  CommunityTypes.ShuffleMode.ALBUM = 3; // e.g. album or season
  CommunityTypes.ShuffleMode.SET = 4; // e.g. T.V. Series or album box set

  CommunityTypes.RepeatMode = function() {
    Characteristic.call(this, 'Repeat Mode', CommunityTypes.RepeatMode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.RepeatMode.UUID = '00002005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.RepeatMode, Characteristic);
  CommunityTypes.RepeatMode.OFF = 0;
  CommunityTypes.RepeatMode.ONE = 1;
  CommunityTypes.RepeatMode.ALL = 2;

  CommunityTypes.PlaybackSpeed = function() {
    Characteristic.call(this, 'Playback Speed', CommunityTypes.PlaybackSpeed.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.PlaybackSpeed.UUID = '00002006-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackSpeed, Characteristic);

  CommunityTypes.MediaCurrentPosition = function() {
    Characteristic.call(this, 'Media Current Position', CommunityTypes.MediaCurrentPosition.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT, // In seconds
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaCurrentPosition.UUID = '00002007-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaCurrentPosition, Characteristic);

  CommunityTypes.MediaItemName = function() {
    Characteristic.call(this, 'Media Name', CommunityTypes.MediaItemName.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemName.UUID = '00003001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemName, Characteristic);

  CommunityTypes.MediaItemAlbumName = function() {
    Characteristic.call(this, 'Media Album Name', CommunityTypes.MediaItemAlbumName.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemAlbumName.UUID = '00003002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemAlbumName, Characteristic);

  CommunityTypes.MediaItemArtist = function() {
    Characteristic.call(this, 'Media Artist', CommunityTypes.MediaItemArtist.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemArtist.UUID = '00003003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemArtist, Characteristic);

  CommunityTypes.MediaItemDuration = function() {
    Characteristic.call(this, 'Media Duration', CommunityTypes.MediaItemDuration.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT, // In seconds
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemDuration.UUID = '00003005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemDuration, Characteristic);

  CommunityTypes.StillImage = function() {
    Characteristic.call(this, 'Still Image', CommunityTypes.StillImage.UUID);
    this.setProps({
      format:   Characteristic.Formats.DATA,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.StillImage.UUID = '00004001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.StillImage, Characteristic);

  // Also known as MIME type...
  CommunityTypes.MediaTypeIdentifier = function() {
    Characteristic.call(this, 'Media Type Identifier', CommunityTypes.MediaTypeIdentifier.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaTypeIdentifier.UUID = '00004002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaTypeIdentifier, Characteristic);

  CommunityTypes.MediaWidth = function() {
    Characteristic.call(this, 'Media Width', CommunityTypes.MediaWidth.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaWidth.UUID = '00004003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaWidth, Characteristic);

  CommunityTypes.MediaHeight = function() {
    Characteristic.call(this, 'Media Width', CommunityTypes.MediaHeight.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaHeight.UUID = '00004004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaHeight, Characteristic);
  

// courtesy of https://gist.github.com/gomfunkel/b1a046d729757120907c

  CommunityTypes.Volts = function() {
    Characteristic.call(this, 'Volts', CommunityTypes.Volts.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "V",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Volts.UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Volts, Characteristic);

  CommunityTypes.Amperes = function() {
    Characteristic.call(this, 'Amps', CommunityTypes.Amperes.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "A",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Amperes.UUID = 'E863F126-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Amperes, Characteristic);

  CommunityTypes.Watts = function() {
    Characteristic.call(this, 'Consumption', CommunityTypes.Watts.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "W",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Watts.UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Watts, Characteristic);

  CommunityTypes.VoltAmperes = function() {
    Characteristic.call(this, 'Apparent Power', CommunityTypes.VoltAmperes.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "VA",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VoltAmperes.UUID = 'E863F110-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.VoltAmperes, Characteristic);

  CommunityTypes.KilowattHours = function() {
    Characteristic.call(this, 'Total Consumption', CommunityTypes.KilowattHours.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      unit:     "kWh",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.KilowattHours.UUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.KilowattHours, Characteristic);

  CommunityTypes.KilowattVoltAmpereHour = function() {
    Characteristic.call(this, 'Apparent Energy', CommunityTypes.KilowattVoltAmpereHour.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      unit:     "kVAh",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.KilowattVoltAmpereHour.UUID = 'E863F127-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.KilowattVoltAmpereHour, Characteristic);

  CommunityTypes.BatteryLevel = function() {
    Characteristic.call(this, 'Battery Level', CommunityTypes.BatteryLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit: Characteristic.Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.BatteryLevel.UUID = 'E863F11B-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.BatteryLevel, Characteristic);

  CommunityTypes.EveAirQuality = function () {
    Characteristic.call(this, 'Eve Air Quality', CommunityTypes.EveAirQuality.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT16,
      unit: "ppm",
      maxValue: 5000,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ],
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveAirQuality.UUID = 'E863F10B-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveAirQuality, Characteristic);


// courtesy of https://github.com/ebaauw/homebridge-lib
// i should probably submit a PR for everything here that isn't in that repo...

  CommunityTypes.EveOpenDuration = function () {
    Characteristic.call(this, 'Eve Open Duration', CommunityTypes.EveOpenDuration.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT32,
      unit: Characteristic.Units.SECONDS, // since last reset
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveOpenDuration.UUID = 'E863F118-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveOpenDuration, Characteristic);

  CommunityTypes.EveClosedDuration = function () {
    Characteristic.call(this, 'Eve Closed Duration', CommunityTypes.EveClosedDuration.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT32,
      unit: Characteristic.Units.SECONDS, // since last reset
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveClosedDuration.UUID = 'E863F119-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveClosedDuration, Characteristic);

  CommunityTypes.EveLastActivation = function () {
    Characteristic.call(this, 'Eve Last Activation', CommunityTypes.EveLastActivation.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT32,
      unit: Characteristic.Units.SECONDS, // since last reset
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveLastActivation.UUID = 'E863F11A-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveLastActivation, Characteristic);

  CommunityTypes.EveTimesOpened = function () {
    Characteristic.call(this, 'Eve Times Opened', CommunityTypes.EveTimesOpened.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT32,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveTimesOpened.UUID = 'E863F129-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveTimesOpened, Characteristic);

  CommunityTypes.EveResetTotal = function () {
    Characteristic.call(this, 'Eve Reset Total', CommunityTypes.EveResetTotal.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT32,
      unit: Characteristic.Units.SECONDS, // since 2001/01/01
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveResetTotal.UUID = 'E863F112-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveResetTotal, Characteristic);


// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors

  CommunityTypes.AtmosphericPressureLevel = function () {
    Characteristic.call(this, 'Barometric Pressure', CommunityTypes.AtmosphericPressureLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "mbar",
      minValue: 800,
      maxValue: 1200,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AtmosphericPressureLevel.UUID = '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB';
  inherits(CommunityTypes.AtmosphericPressureLevel, Characteristic);

  CommunityTypes.NoiseLevel = function () {
    Characteristic.call(this, 'Noise Level', CommunityTypes.NoiseLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "dB",
      minValue: 0,
      maxValue: 200,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NoiseLevel.UUID = '2CD7B6FD-419A-4740-8995-E3BFE43735AB';
  inherits(CommunityTypes.NoiseLevel, Characteristic);


// courtesy of https://github.com/homespun/homebridge-platform-snmp

  CommunityTypes.AirFlow = function () {
    Characteristic.call(this, 'Air Flow', CommunityTypes.AirFlow.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "m/s",
      minValue: 0,
      maxValue: 135,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AirFlow.UUID = '49C8AE5A-A3A5-41AB-BF1F-12D5654F9F41';
  inherits(CommunityTypes.AirFlow, Characteristic);

  CommunityTypes.NitrogenDioxideDetected = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Detected', CommunityTypes.NitrogenDioxideDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxideDetected.UUID = 'D737B40A-3AF0-4316-950F-76090B98C5CF';
  inherits(CommunityTypes.NitrogenDioxideDetected, Characteristic);

  CommunityTypes.NitrogenDioxideDetected.NO2_LEVELS_NORMAL = 0;
  CommunityTypes.NitrogenDioxideDetected.NO2_LEVELS_ABNORMAL = 1;

  CommunityTypes.NitrogenDioxideLevel = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Level', CommunityTypes.NitrogenDioxideLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppm",
      minValue: 0,
      maxValue: 1500,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxideLevel.UUID = 'B762A2AF-D9D0-4A79-814A-E9EBAB0ED290';
  inherits(CommunityTypes.NitrogenDioxideLevel, Characteristic);

  CommunityTypes.NitrogenDioxidePeakLevel = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Peak Level', CommunityTypes.NitrogenDioxidePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppm",
      minValue: 0,
      maxValue: 1500,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxidePeakLevel.UUID = 'B6594847-7B88-496C-A1A0-B7860F3D7601';
  inherits(CommunityTypes.NitrogenDioxidePeakLevel, Characteristic);


// courtesy of https://github.com/homespun/homebridge-platform-aqe

  CommunityTypes.OzoneDetected = function () {
    Characteristic.call(this, 'Ozone Detected', CommunityTypes.OzoneDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzoneDetected.UUID = '0168FA60-5CF4-4314-AA45-0F84E389A093';
  inherits(CommunityTypes.OzoneDetected, Characteristic);

  CommunityTypes.OzoneDetected.O3_LEVELS_NORMAL = 0;
  CommunityTypes.OzoneDetected.O3_LEVELS_ABNORMAL = 1;

  CommunityTypes.OzoneLevel = function () {
    Characteristic.call(this, 'Ozone Level', CommunityTypes.OzoneLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzoneLevel.UUID = '03C17FD9-672E-42F5-8DD4-30C6822C739A';
  inherits(CommunityTypes.OzoneLevel, Characteristic);

  CommunityTypes.OzonePeakLevel = function () {
    Characteristic.call(this, 'Ozone Peak Level', CommunityTypes.OzonePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzonePeakLevel.UUID = '550EE1FF-FC66-4BB6-A1C1-4B0A07109AE3';
  inherits(CommunityTypes.OzonePeakLevel, Characteristic);

  CommunityTypes.SodiumDioxideDetected = function () {
    Characteristic.call(this, 'Sodium Dioxide Detected', CommunityTypes.SodiumDioxideDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxideDetected.UUID = '4D237DAB-1CB6-4D52-B446-4667F58F7D28';
  inherits(CommunityTypes.SodiumDioxideDetected, Characteristic);

  CommunityTypes.SodiumDioxideDetected.SO2_LEVELS_NORMAL = 0;
  CommunityTypes.SodiumDioxideDetected.SO2_LEVELS_ABNORMAL = 1;

  CommunityTypes.SodiumDioxideLevel = function () {
    Characteristic.call(this, 'Sodium Dioxide Level', CommunityTypes.SodiumDioxideLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxideLevel.UUID = '66C4D315-FBEF-470E-9434-B047679F1141';
  inherits(CommunityTypes.SodiumDioxideLevel, Characteristic);

  CommunityTypes.SodiumDioxidePeakLevel = function () {
    Characteristic.call(this, 'Sodium Dioxide Peak Level', CommunityTypes.SodiumDioxidePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxidePeakLevel.UUID = '4CD6F648-2F92-43D8-86DF-0E8DE75E033B';
  inherits(CommunityTypes.SodiumDioxidePeakLevel, Characteristic);

  CommunityTypes.VolatileOrganicCompoundDetected = function () {
    Characteristic.call(this, 'Volatile Organic Compound Detected', CommunityTypes.VolatileOrganicCompoundDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundDetected.UUID = '65DBC0F5-C40B-4E04-ADED-DC70031B0B82';
  inherits(CommunityTypes.VolatileOrganicCompoundDetected, Characteristic);

  CommunityTypes.VolatileOrganicCompoundDetected.VOC_LEVELS_NORMAL = 0;
  CommunityTypes.VolatileOrganicCompoundDetected.VOC_LEVELS_ABNORMAL = 1;

  CommunityTypes.VolatileOrganicCompoundLevel = function () {
    Characteristic.call(this, 'Volatile Organic Compound Level', CommunityTypes.VolatileOrganicCompoundLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundLevel.UUID = '35C4C797-193D-4998-879F-A08514E87897';
  inherits(CommunityTypes.VolatileOrganicCompoundLevel, Characteristic);

  CommunityTypes.VolatileOrganicCompoundPeakLevel = function () {
    Characteristic.call(this, 'Volatile Organic Compound Peak Level', CommunityTypes.VolatileOrganicCompoundPeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundPeakLevel.UUID = 'A62CB784-1916-4BDF-B840-BDB9F8A264E9';
  inherits(CommunityTypes.VolatileOrganicCompoundPeakLevel, Characteristic);

  CommunityTypes.NotificationCode = function() {
    Characteristic.call(this, 'Notification Code', CommunityTypes.NotificationCode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      maxValue: 255,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = 255;
  };
  CommunityTypes.NotificationCode.UUID = '381C47A3-CB06-4177-8E3D-A1B4C22EB031';
  inherits(CommunityTypes.NotificationCode, Characteristic);

  CommunityTypes.NotificationText = function() {
    Characteristic.call(this, 'Notification Text', CommunityTypes.NotificationText.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NotificationText.UUID = 'e244ca80-813e-423a-86bd-02f293b857a0';
  inherits(CommunityTypes.NotificationText, Characteristic);

// used by Elgato Eve, number of seconds since the epoch...
  CommunityTypes.LastEventTime = function() {
    Characteristic.call(this, 'Last Event Time', CommunityTypes.LastEventTime.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.LastEventTime.UUID = 'E863F11A-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.LastEventTime, Characteristic);


// courtesy of https://github.com/SeydX/homebridge-broadband

  CommunityTypes.DownloadSpeed = function() {
    Characteristic.call(this, 'Download Speed', CommunityTypes.DownloadSpeed.UUID);
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: (options.units && options.units.DownloadSpeed) || 'Mbps',
      maxValue: 1024,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.DownloadSpeed.UUID = 'DA70DA1F-DA72-4DB3-81C2-99F158A15A9A';
  inherits(CommunityTypes.DownloadSpeed, Characteristic);

  CommunityTypes.UploadSpeed = function() {
    Characteristic.call(this, 'Upload Speed', CommunityTypes.UploadSpeed.UUID);
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: 'Mbps',
      maxValue: 1024,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.UploadSpeed.UUID = 'AB74289E-D516-4A12-B2AE-1B32A74C035F';
  inherits(CommunityTypes.UploadSpeed, Characteristic);

  CommunityTypes.Ping = function() {
    Characteristic.call(this, 'Ping', CommunityTypes.Ping.UUID);
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: 'ms',
      maxValue: 999,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Ping.UUID = 'CC65A09A-E052-410C-981D-C11BDE2C3F60';
  inherits(CommunityTypes.Ping, Characteristic);

  CommunityTypes.Latency = function() {
    Characteristic.call(this, 'Latency', CommunityTypes.Latency.UUID);
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: 'ms',
      maxValue: 999,
      minValue: 0,
      minStep: 0.001,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Latency.UUID = '60EC80F9-F799-4E8E-B613-098E7EBCBB0B';
  inherits(CommunityTypes.Latency, Characteristic);


// https://github.com/naofireblade/homebridge-weather-plus

  CommunityTypes.DewPoint = function() {
    Characteristic.call(this, 'Dew Point', CommunityTypes.DewPoint.UUID);
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: Characteristic.Units.CELSIUS,
      maxValue: 50,
      minValue: -50,
      minStep: 0.1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.DewPoint.UUID = '095c46e2-278e-4e3c-b9e7-364622a0f501';
  inherits(CommunityTypes.DewPoint, Characteristic);


  // Services

  CommunityTypes.AudioDeviceService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AudioDeviceService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AudioVolume);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.Muting);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AudioDeviceService.UUID = '00000001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioDeviceService, Service);

  CommunityTypes.PlaybackDeviceService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.PlaybackDeviceService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.PlaybackState);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.SkipForward);
    this.addOptionalCharacteristic(CommunityTypes.SkipBackward);
    this.addOptionalCharacteristic(CommunityTypes.ShuffleMode);
    this.addOptionalCharacteristic(CommunityTypes.RepeatMode);
    this.addOptionalCharacteristic(CommunityTypes.PlaybackSpeed);
    this.addOptionalCharacteristic(CommunityTypes.MediaCurrentPosition);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemAlbumName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemArtist);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemDuration);
    this.addOptionalCharacteristic(Characteristic.Name);
    // Artwork characteristics...would be better reported in a separate service?
    this.addOptionalCharacteristic(CommunityTypes.StillImage);
    this.addOptionalCharacteristic(CommunityTypes.MediaTypeIdentifier);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
  };
  CommunityTypes.PlaybackDeviceService.UUID = '00000002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackDeviceService, Service);

  // A media information service that has no playback controls, for e.g. DAB radio...
  CommunityTypes.MediaInformationService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.MediaInformationService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.MediaItemName);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.MediaItemAlbumName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemArtist);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemDuration);
    this.addOptionalCharacteristic(CommunityTypes.MediaCurrentPosition);
    this.addOptionalCharacteristic(Characteristic.Name);
    // Artwork characteristics...would be better reported in a separate service?
    this.addOptionalCharacteristic(CommunityTypes.StillImage);
    this.addOptionalCharacteristic(CommunityTypes.MediaTypeIdentifier);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
  };
  CommunityTypes.MediaInformationService.UUID = '00000003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaInformationService, Service);

  CommunityTypes.StillImageService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.StillImageService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.StillImage);
    this.addCharacteristic(CommunityTypes.MediaTypeIdentifier);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.StillImageService.UUID = '00000004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.StillImageService, Service);

  CommunityTypes.SecurityCameraService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.SecurityCameraService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.StillImageService);
    this.addCharacteristic(CommunityTypes.MediaTypeIdentifier);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.Timestamp);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
    this.addOptionalCharacteristic(CommunityTypes.VideoDataURL);
    this.addOptionalCharacteristic(CommunityTypes.AudioDataURL);
    this.addOptionalCharacteristic(Characteristic.MotionDetected);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.SecurityCameraService.UUID = '00000005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SecurityCameraService, Service);


// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors

  CommunityTypes.AtmosphericPressureSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AtmosphericPressureSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AtmosphericPressureLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AtmosphericPressureSensor.UUID = 'B77831FD-D66A-46A4-B66D-FD7EE8DFE3CE';
  inherits(CommunityTypes.AtmosphericPressureSensor, Service);

  CommunityTypes.NoiseLevelSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NoiseLevelSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NoiseLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.NoiseLevelSensor.UUID = '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB';
  inherits(CommunityTypes.NoiseLevelSensor, Service);


// courtesy of https://github.com/ToddGreenfield/homebridge-nut

  CommunityTypes.InputVoltageAC = function() {
    Characteristic.call(this, 'Input Voltage AC', CommunityTypes.InputVoltageAC.UUID);
    this.setProps({
      format:   Characteristic.Formats.Float,
      unit:     "V",
      minValue: 0,
      maxValue: 65535,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.InputVoltageAC.UUID = UUID.generate('CommunityTypes:usagedevice:InputVoltageAC');
  inherits(CommunityTypes.InputVoltageAC, Characteristic);
  
  CommunityTypes.OutputVoltageAC = function() {
    Characteristic.call(this, 'Output Voltage AC', CommunityTypes.OutputVoltageAC.UUID);
    this.setProps({
      format:   Characteristic.Formats.Float,
      unit:     "V",
      minValue: 0,
      maxValue: 65535,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OutputVoltageAC.UUID = UUID.generate('CommunityTypes:usagedevice:OutputVoltageAC');
  inherits(CommunityTypes.OutputVoltageAC, Characteristic);
  
  CommunityTypes.BatteryVoltageDC = function() {
    Characteristic.call(this, 'Battery Voltage DC', CommunityTypes.BatteryVoltageDC.UUID);
    this.setProps({
      format:   Characteristic.Formats.Float,
      unit:     "V",
      minValue: 0,
      maxValue: 65535,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.BatteryVoltageDC.UUID = UUID.generate('CommunityTypes:usagedevice:BatteryVoltageDC');
  inherits(CommunityTypes.BatteryVoltageDC, Characteristic);
  
  CommunityTypes.UPSLoadPercent = function() {
    Characteristic.call(this, 'UPS Load', CommunityTypes.UPSLoadPercent.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit: Characteristic.Units.PERCENTAGE,
      minValue: 0,
      maxValue: 100,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.UPSLoadPercent.UUID = UUID.generate('CommunityTypes:usagedevice:UPSLoadPercent');
  inherits(CommunityTypes.UPSLoadPercent, Characteristic);


// courtesy of https://github.com/homespun/homebridge-platform-snmp

  CommunityTypes.AirFlowSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AirFlowSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AirFlow);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AirFlowSensor.UUID = 'AF5C192E-420F-4A13-AB67-B8F3968A4935';
  inherits(CommunityTypes.AirFlowSensor, Service);

  CommunityTypes.NitrogenDioxideSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NitrogenDioxideSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NitrogenDioxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.NitrogenDioxideLevel);
    this.addOptionalCharacteristic(CommunityTypes.NitrogenDioxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.NitrogenDioxideSensor.UUID = '9F6B797D-D43B-4C88-9AA0-57018AB8A91E';
  inherits(CommunityTypes.NitrogenDioxideSensor, Service);


// courtesy of https://github.com/homespun/homebridge-platform-aqe

  CommunityTypes.OzoneSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.OzoneSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.OzoneDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.OzoneLevel);
    this.addOptionalCharacteristic(CommunityTypes.OzonePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.OzoneSensor.UUID = 'B91C2BD6-D071-4F49-A23B-20721AC6CCEB';
  inherits(CommunityTypes.OzoneSensor, Service);

  CommunityTypes.SodiumDioxideSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.SodiumDioxideSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.SodiumDioxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.SodiumDioxideLevel);
    this.addOptionalCharacteristic(CommunityTypes.SodiumDioxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.SodiumDioxideSensor.UUID = 'FE7CFB1F-12D0-405D-86FD-7E268D65C453';
  inherits(CommunityTypes.SodiumDioxideSensor, Service);

  CommunityTypes.VolatileOrganicCompoundSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.VolatileOrganicCompoundSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.VolatileOrganicCompoundDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.VolatileOrganicCompoundLevel);
    this.addOptionalCharacteristic(CommunityTypes.VolatileOrganicCompoundPeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.VolatileOrganicCompoundSensor.UUID = '776E34BC-1660-46EC-A33D-2DFE5B958699';
  inherits(CommunityTypes.VolatileOrganicCompoundSensor, Service);

  CommunityTypes.NotificationService = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NotificationService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NotificationCode);
    this.addCharacteristic(CommunityTypes.NotificationText);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(CommunityTypes.LastEventTime);
  };
  CommunityTypes.NotificationService.UUID = '074D8CE9-5B4B-48D5-9990-D98850C2F3FE';
  inherits(CommunityTypes.NotificationService, Service);


  return CommunityTypes;
};


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
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

"use strict";

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

"use strict";

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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importHAPCommunityTypesAndFixes = importHAPCommunityTypesAndFixes;
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
const HapCommunity = __webpack_require__(/*! ../hap-nodejs-community-types */ "../hap-nodejs-community-types/types.js");
let hapTypesImported = false;
function importHAPCommunityTypesAndFixes() {
    if (hapTypesImported)
        return;
    let fakeBridge = {
        hap: {
            Service: hap_nodejs_1.Service,
            Characteristic: hap_nodejs_1.Characteristic,
            uuid: hap_nodejs_1.uuid
        }
    };
    let fakeOptions = {};
    let communityTypes = HapCommunity(fakeBridge, fakeOptions);
    for (let type in communityTypes) {
        let typeFct = communityTypes[type];
        if (typeFct.length == 0) { // characteristic
            hap_nodejs_1.Characteristic[`Community: ${type}`] = typeFct;
        }
        else if (typeFct.length == 2) { // service
            hap_nodejs_1.Service[`Community: ${type}`] = typeFct;
        }
    }
    hapTypesImported = true;
}


/***/ }),

/***/ "./yahka.functions/conversion.base.ts":
/*!********************************************!*\
  !*** ./yahka.functions/conversion.base.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIOBrokerConversionBase = void 0;
const functions_base_1 = __webpack_require__(/*! ./functions.base */ "./yahka.functions/functions.base.ts");
class TIOBrokerConversionBase extends functions_base_1.TYahkaFunctionBase {
    constructor(adapter, logIdentifier = '') {
        super(adapter, logIdentifier);
    }
    static castToNumber(value) {
        if (value === undefined)
            return undefined;
        else if (typeof value !== 'number')
            return Number(value);
        else
            return value;
    }
    static castToBool(value) {
        return !!value;
    }
    static parameterValueByName(parameters, name) {
        let paramArray = undefined;
        if (typeof parameters === 'object') {
            paramArray = parameters;
        }
        else {
            paramArray = JSON.parse(parameters);
        }
        if (paramArray === undefined)
            return undefined;
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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";

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
        this.log.debug('writing state to ioBroker: ' + JSON.stringify(plainIoValue));
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
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), 150);
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

"use strict";

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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition = void 0;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
class TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition extends iofunc_base_1.TIoBrokerInOutFunction_StateBase {
    static create(adapter, parameters) {
        let p;
        if (typeof parameters === 'string')
            p = [parameters];
        else if (parameters instanceof Array)
            p = parameters;
        else
            p = [];
        if (p.length == 0)
            return undefined;
        let stateName = p[0];
        let workingItemName;
        if (p.length >= 2)
            workingItemName = p[1];
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
            if (ioState)
                this.lastWorkingState = Boolean(ioState === null || ioState === void 0 ? void 0 : ioState.val);
            else
                this.lastWorkingState = undefined;
        });
    }
    subscriptionEvent(stateName, ioState, callback) {
        if (!ioState)
            return;
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_Homematic_Dimmer_Brightness = exports.TIoBrokerInOutFunction_Homematic_Dimmer_On = exports.TIoBrokerInOutFunction_Homematic_Dimmer_Base = void 0;
exports.isHomematic_Dimmer_Parameter = isHomematic_Dimmer_Parameter;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
const util_1 = __webpack_require__(/*! util */ "util");
const yahka_utils_1 = __webpack_require__(/*! ../shared/yahka.utils */ "./shared/yahka.utils.ts");
function isHomematic_Dimmer_Parameter(value) {
    if (value === undefined)
        return false;
    if (!(0, util_1.isObject)(value))
        return false;
    return (0, yahka_utils_1.propertyExists)(value, 'levelState');
}
class TIoBrokerInOutFunction_Homematic_Dimmer_Base extends iofunc_base_1.TIoBrokerInOutFunctionBase {
    static parseParameters(parameters) {
        if (!isHomematic_Dimmer_Parameter(parameters)) {
            return undefined;
        }
        ;
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIoBrokerInOutFunction_MultiState = void 0;
exports.isMultiStateParameter = isMultiStateParameter;
const iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
const util_1 = __webpack_require__(/*! util */ "util");
function isMultiStateParameter(value) {
    if (value === undefined)
        return false;
    if (!(0, util_1.isObject)(value))
        return false;
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

"use strict";

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
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState === null || ioState === void 0 ? void 0 : ioState.val;
                return ioState === null || ioState === void 0 ? void 0 : ioState.val;
            }
            else {
                this.adapter.log.debug(`faking CurrentState.Read for [${this.stateName}]: ${JSON.stringify(this.lastAcknowledgedValue)}`);
                return this.lastAcknowledgedValue;
            }
        else
            return null;
    }
    getValueOnNotify(ioState) {
        if (ioState)
            if (ioState.ack) {
                this.lastAcknowledgedValue = ioState === null || ioState === void 0 ? void 0 : ioState.val;
                return ioState === null || ioState === void 0 ? void 0 : ioState.val;
            }
            else {
                this.adapter.log.debug(`discarding CurrentState.Notify for [${this.stateName}]`);
                return undefined;
            }
        else
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THomeKitBridge = void 0;
exports.initHAP = initHAP;
exports.deinitHAP = deinitHAP;
/// <reference path="./typings/index.d.ts" />
const debug = __webpack_require__(/*! debug */ "debug");
const util = __webpack_require__(/*! util */ "util");
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
                            mdns: {
                                interface: device.interface,
                                reuseAddr: true,
                            },
                        });
                    });
                }
                else {
                    try {
                        this.bridgeObject.addBridgedAccessory(hapDevice);
                    }
                    catch (e) {
                        this.FLogger.warn(e);
                        this.FLogger.warn('Error by adding: ' + JSON.stringify(device));
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
            this.FLogger.debug('Node Bridge identify:' + paired);
            callback(); // success
        });
        return hapBridge;
    }
    createDevice(device) {
        let devName = device.name;
        let deviceID = hap_nodejs_1.uuid.generate(this.config.ident + ':' + devName);
        let i = 0;
        while (this.bridgeObject.bridgedAccessories.some((a) => a.UUID == deviceID)) {
            devName = device.name + '_' + ++i;
            deviceID = hap_nodejs_1.uuid.generate(this.config.ident + ':' + devName);
        }
        this.FLogger.info('adding ' + devName + ' with UUID: ' + deviceID);
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
        this.serviceInitializer.initServices(hapDevice, device.services);
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
    (0, hap_nodejs_1.init)(storagePath);
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THomeKitIPCamera = void 0;
/// <reference path="./typings/index.d.ts" />
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
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
        let ffmpeg = (0, child_process_1.spawn)('ffmpeg', ffmpegCommand, { env: process.env });
        let imageBuffer = Buffer.alloc(0);
        ffmpeg.stdout.on('data', data => imageBuffer = Buffer.concat([imageBuffer, data]));
        ffmpeg.on('close', code => callback(undefined, imageBuffer));
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
                    // this.FLogger.debug("Stream run: ffmpeg " + ffmpegCommand.join(' '));
                    let ffmpeg = (0, child_process_1.spawn)('ffmpeg', ffmpegCommand, { env: process.env });
                    let started = false;
                    ffmpeg.stderr.on('data', (data) => {
                        if (!started) {
                            started = true;
                            this.FLogger.debug('FFMPEG: received first frame');
                            callback(); // do not forget to execute callback once set up
                        }
                        //this.FLogger.debug("FFMPEG:" + data.toString('utf8'));
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YahkaServiceInitializer = void 0;
const hap_nodejs_1 = __webpack_require__(/*! hap-nodejs */ "hap-nodejs");
class YahkaServiceInitializer {
    constructor(FBridgeFactory, FLogger) {
        this.FBridgeFactory = FBridgeFactory;
        this.FLogger = FLogger;
    }
    initServices(hapDevice, serviceConfigs) {
        if (serviceConfigs == null) {
            return;
        }
        for (const service of serviceConfigs) {
            this.initService(hapDevice, service);
        }
        for (const service of serviceConfigs) {
            this.establishServiceLinks(hapDevice, service);
        }
    }
    initService(hapDevice, serviceConfig) {
        if (serviceConfig.enabled === false) {
            this.FLogger.debug(`[${hapDevice.displayName}] service ${serviceConfig.name} is disabled`);
            return;
        }
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
            this.initCharacteristic(hapService, charactConfig);
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
    initCharacteristic(hapService, characteristicConfig) {
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
        });
        hapCharacteristic.on('get', (hkCallback) => {
            this.FLogger.debug(`${logName} got a get event`);
            this.getValueFromIOBroker(hapCharacteristic.binding, (error, ioValue, hkValue) => {
                this.FLogger.debug(`${logName} forwarding value from ioBroker(${JSON.stringify(ioValue)}) to homekit as (${JSON.stringify(hkValue)})`);
                try {
                    hkCallback(error, hkValue);
                }
                catch (e) {
                    this.FLogger.error(`${logName} error while setting value ${hkValue} - message: ${e}`);
                }
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIOBrokerAdapter = void 0;
/// <reference path="./typings/index.d.ts" />
const yahka_homekit_ipcamera_1 = __webpack_require__(/*! ./yahka.homekit-ipcamera */ "./yahka.homekit-ipcamera.ts");
const functions_factory_1 = __webpack_require__(/*! ./yahka.functions/functions.factory */ "./yahka.functions/functions.factory.ts");
const yahka_homekit_bridge_1 = __webpack_require__(/*! ./yahka.homekit-bridge */ "./yahka.homekit-bridge.ts");
const path_1 = __webpack_require__(/*! path */ "path");
function isSubscriptionRequestor(param) {
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
        (0, yahka_homekit_bridge_1.initHAP)((0, path_1.join)(this.dataDir, `${this.adapter.name}.${this.adapter.instance}.hapdata`), this.handleHAPLogEvent.bind(this));
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
            for (let i = 0; i < 6; i++)
                usr[i] = (`00${Math.floor((Math.random() * 256)).toString(16)}`).substr(-2);
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
        // Warning, state can be null if it was deleted
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
        if (typeof obj === 'object' && obj.message) {
            if (obj.command === 'send') {
                // Send response in callback if required
                if (obj.callback)
                    this.adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
            }
        }
    }
    handleUnload(callback) {
        try {
            this.adapter.log.info('cleaning up ...');
            (0, yahka_homekit_bridge_1.deinitHAP)();
            this.adapter.log.info('cleaned up ...');
            callback();
        }
        catch (e) {
            callback();
        }
    }
    handleInOutSubscriptionRequest(requestor, changeNotify) {
        if (requestor.subscriptionRequests.length == 0)
            return;
        for (let subscriptionRequest of requestor.subscriptionRequests) {
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
            if (isSubscriptionRequestor(inoutFunc)) {
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

"use strict";
module.exports = require("@iobroker/adapter-core");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "hap-nodejs":
/*!*****************************!*\
  !*** external "hap-nodejs" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("hap-nodejs");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "../package.json":
/*!***********************!*\
  !*** ../package.json ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"iobroker.yahka","version":"1.0.3","description":"ioBroker HomeKit Adapter","author":{"name":"Jens Weigele","email":"iobroker.yahka@gmail.com"},"contributors":[{"name":"Jens Weigele","email":"iobroker.yahka@gmail.com"}],"homepage":"https://github.com/jensweigele/ioBroker.yahka","license":"MIT","keywords":["ioBroker","iobroker.yahka","Smart Home","home automation","siri","homekit"],"repository":{"type":"git","url":"https://github.com/jensweigele/ioBroker.yahka"},"engines":{"node":">=12.0.0"},"dependencies":{"@iobroker/adapter-core":"^3.1.6","debug":"^4.3.6","dev-null":"^0.1.1","hap-nodejs":"^0.11.2","ip":"^1.1.9","macaddress":"0.5.3","util":"^0.12.5"},"devDependencies":{"@alcalzone/release-script":"^3.8.0","@alcalzone/release-script-plugin-iobroker":"^3.7.2","@alcalzone/release-script-plugin-license":"^3.7.0","@iobroker/types":"^6.0.10","@types/jquery":"^3.5.30","@types/node":"^22.2.0","assert":"^2.1.0","chai":"^4.5.0","crypto-browserify":"^3.12.0","gulp":"^4.0.2","html-webpack-plugin":"^5.6.0","mocha":"^10.7.3","path-browserify":"^1.0.1","process":"^0.11.10","raw-loader":"^4.0.2","stream-browserify":"^3.0.0","timers":"^0.1.1","ts-loader":"^9.5.1","typescript":"^5.5.4","webpack":"^5.93.0","webpack-cli":"^5.1.4","webpack-node-externals":"^3.0.0","xml2js":"^0.4.23"},"bugs":{"url":"https://github.com/jensweigele/ioBroker.yahka/issues"},"readmeFilename":"README.md","main":"main.js","files":["admin/","main.js","main.js.map","LICENSE","README.md","io-package.json","hap-nodejs-community-types/"],"scripts":{"test":"node node_modules/mocha/bin/mocha --exit","build":"gulp","_prepublishOnly":"gulp","release":"release-script","release-patch":"release-script patch --yes","release-minor":"release-script minor --yes","release-major":"release-script major --yes"}}');

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