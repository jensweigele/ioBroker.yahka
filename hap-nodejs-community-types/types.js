var inherits = require('util').inherits;
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