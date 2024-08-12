import { Characteristic, Formats, Units, Perms, Service, uuid } from 'hap-nodejs';

let hapTypesImported = false;
export function importHAPCommunityTypesAndFixes() {

    if (hapTypesImported)
        return;

    Characteristic[`Community: ${Timestamp.name}`]                        = Timestamp;
    Characteristic[`Community: ${AudioDataURL.name}`]                     = AudioDataURL;
    Characteristic[`Community: ${VideoDataURL.name}`]                     = VideoDataURL;
    Characteristic[`Community: ${AudioVolume.name}`]                      = AudioVolume;
    Characteristic[`Community: ${Muting.name}`]                           = Muting;
    Characteristic[`Community: ${PlaybackState.name}`]                    = PlaybackState;
    Characteristic[`Community: ${SkipForward.name}`]                      = SkipForward;
    Characteristic[`Community: ${SkipBackward.name}`]                     = SkipBackward;
    Characteristic[`Community: ${ShuffleMode.name}`]                      = ShuffleMode;
    Characteristic[`Community: ${RepeatMode.name}`]                       = RepeatMode;
    Characteristic[`Community: ${PlaybackSpeed.name}`]                    = PlaybackSpeed;
    Characteristic[`Community: ${MediaCurrentPosition.name}`]             = MediaCurrentPosition;
    Characteristic[`Community: ${MediaItemName.name}`]                    = MediaItemName;
    Characteristic[`Community: ${MediaItemAlbumName.name}`]               = MediaItemAlbumName;
    Characteristic[`Community: ${MediaItemArtist.name}`]                  = MediaItemArtist;
    Characteristic[`Community: ${MediaItemDuration.name}`]                = MediaItemDuration;
    Characteristic[`Community: ${StillImage.name}`]                       = StillImage;
    Characteristic[`Community: ${MediaTypeIdentifier.name}`]              = MediaTypeIdentifier;
    Characteristic[`Community: ${MediaWidth.name}`]                       = MediaWidth;
    Characteristic[`Community: ${MediaHeight.name}`]                      = MediaHeight;
    Characteristic[`Community: ${Volts.name}`]                            = Volts;
    Characteristic[`Community: ${Amperes.name}`]                          = Amperes;
    Characteristic[`Community: ${Watts.name}`]                            = Watts;
    Characteristic[`Community: ${VoltAmperes.name}`]                      = VoltAmperes;
    Characteristic[`Community: ${KilowattHours.name}`]                    = KilowattHours;
    Characteristic[`Community: ${KilowattVoltAmpereHour.name}`]           = KilowattVoltAmpereHour;
    Characteristic[`Community: ${BatteryLevel.name}`]                     = BatteryLevel;
    Characteristic[`Community: ${EveAirQuality.name}`]                    = EveAirQuality;
    Characteristic[`Community: ${EveOpenDuration.name}`]                  = EveOpenDuration;
    Characteristic[`Community: ${EveClosedDuration.name}`]                = EveClosedDuration;
    Characteristic[`Community: ${EveLastAction.name}`]                    = EveLastAction;
    Characteristic[`Community: ${EveTimesOpened.name}`]                   = EveTimesOpened;
    Characteristic[`Community: ${EveResetTotal.name}`]                    = EveResetTotal;
    Characteristic[`Community: ${AtmosphericPressureLevel.name}`]         = AtmosphericPressureLevel;
    Characteristic[`Community: ${NoiseLevel.name}`]                       = NoiseLevel;
    Characteristic[`Community: ${AirFlow.name}`]                          = AirFlow;
    Characteristic[`Community: ${NitrogenDioxideDetected.name}`]          = NitrogenDioxideDetected;
    Characteristic[`Community: ${NitrogenDioxideLevel.name}`]             = NitrogenDioxideLevel;
    Characteristic[`Community: ${NitrogenDioxidePeakLevel.name}`]         = NitrogenDioxidePeakLevel;
    Characteristic[`Community: ${OzoneDetected.name}`]                    = OzoneDetected;
    Characteristic[`Community: ${OzoneLevel.name}`]                       = OzoneLevel;
    Characteristic[`Community: ${OzonePeakLevel.name}`]                   = OzonePeakLevel;
    Characteristic[`Community: ${SodiumDioxideDetected.name}`]            = SodiumDioxideDetected;
    Characteristic[`Community: ${SodiumDioxideLevel.name}`]               = SodiumDioxideLevel;
    Characteristic[`Community: ${SodiumDioxidePeakLevel.name}`]           = SodiumDioxidePeakLevel;
    Characteristic[`Community: ${VolatileOrganicCompoundDetected.name}`]  = VolatileOrganicCompoundDetected;
    Characteristic[`Community: ${VolatileOrganicCompoundLevel.name}`]     = VolatileOrganicCompoundLevel;
    Characteristic[`Community: ${VolatileOrganicCompoundPeakLevel.name}`] = VolatileOrganicCompoundPeakLevel;
    Characteristic[`Community: ${NotificationCode.name}`]                 = NotificationCode;
    Characteristic[`Community: ${NotificationText.name}`]                 = NotificationText;
    Characteristic[`Community: ${LastEventTime.name}`]                    = LastEventTime;
    Characteristic[`Community: ${DownloadSpeed.name}`]                    = DownloadSpeed;
    Characteristic[`Community: ${UploadSpeed.name}`]                      = UploadSpeed;
    Characteristic[`Community: ${Ping.name}`]                             = Ping;
    Characteristic[`Community: ${Latency.name}`]                          = Latency;
    Characteristic[`Community: ${DewPoint.name}`]                         = DewPoint;
    Characteristic[`Community: ${InputVoltageAC.name}`]                   = InputVoltageAC;
    Characteristic[`Community: ${OutputVoltageAC.name}`]                  = OutputVoltageAC;
    Characteristic[`Community: ${BatteryVoltageDC.name}`]                 = BatteryVoltageDC;
    Characteristic[`Community: ${UPSLoadPercent.name}`]                   = UPSLoadPercent;

    Service[`Community: ${AudioDeviceService.name}`]            = AudioDeviceService;
    Service[`Community: ${PlaybackDeviceService.name}`]         = PlaybackDeviceService;
    Service[`Community: ${MediaInformationService.name}`]       = MediaInformationService;
    Service[`Community: ${StillImageService.name}`]             = StillImageService;
    Service[`Community: ${SecurityCameraService.name}`]         = SecurityCameraService;
    Service[`Community: ${AtmosphericPressureSensor.name}`]     = AtmosphericPressureSensor;
    Service[`Community: ${NoiseLevelSensor.name}`]              = NoiseLevelSensor;
    Service[`Community: ${AirFlowSensor.name}`]                 = AirFlowSensor;
    Service[`Community: ${NitrogenDioxideSensor.name}`]         = NitrogenDioxideSensor;
    Service[`Community: ${OzoneSensor.name}`]                   = OzoneSensor;
    Service[`Community: ${SodiumDioxideSensor.name}`]           = SodiumDioxideSensor;
    Service[`Community: ${VolatileOrganicCompoundSensor.name}`] = VolatileOrganicCompoundSensor;
    Service[`Community: ${NotificationService.name}`]           = NotificationService;

    hapTypesImported = true;
}

export class Timestamp extends Characteristic {
    constructor() {
        super(
            'Timestamp',
            'FF000001-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class AudioDataURL extends Characteristic {
    constructor() {
        super(
            'Audio URL',
            'FF000002-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
    }
}

export class VideoDataURL extends Characteristic {
    constructor() {
        super(
            'Video URL',
            'FF000003-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
    }
}

export class AudioVolume extends Characteristic {
    constructor() {
        super(
            'Audio Volume',
            '00001001-0000-1000-8000-135D67EC4377',
            {
                format  : Formats.UINT8,
                unit    : Units.PERCENTAGE,
                maxValue: 100,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class Muting extends Characteristic {
    constructor() {
        super(
            'Muting',
            '00001002-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class PlaybackState extends Characteristic {
    static PLAYING = 0;
    static PAUSED  = 1;
    static STOPPED = 2;

    constructor() {
        super(
            'Playback State',
            '00002001-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class SkipForward extends Characteristic {
    constructor() {
        super(
            'Skip Forward',
            '00002002-0000-1000-8000-135D67EC4377',
            {
                format: Formats.BOOL,
                perms : [Perms.PAIRED_WRITE]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class SkipBackward extends Characteristic {
    constructor() {
        super(
            'Skip Backward',
            '00002003-0000-1000-8000-135D67EC4377',
            {
                format: Formats.BOOL,
                perms : [Perms.PAIRED_WRITE]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class ShuffleMode extends Characteristic {
    //NOTE: If GROUP or SET is not supported, accessories should coerce to ALBUM.
    // If ALBUM is not supported, coerce to ITEM.
    // In general, it is recommended for apps to only assume OFF, ITEM, and ALBUM
    // are supported unless it is known that the accessory supports other settings.
    static OFF        = 0;
    //NOTE: INDIVIDUAL is deprecated.
    static INDIVIDUAL = 1;
    static ITEM       = 1;
    static GROUP      = 2; // e.g. iTunes "Groupings"
    static ALBUM      = 3; // e.g. album or season
    static SET        = 4; // e.g. T.V. Series or album box set
    constructor() {
        super(
            'Shuffle Mode',
            '00002004-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class RepeatMode extends Characteristic {
    static OFF = 0;
    static ONE = 1;
    static ALL = 2;

    constructor() {
        super(
            'Repeat Mode',
            '00002005-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class PlaybackSpeed extends Characteristic {
    constructor() {
        super(
            'Playback Speed',
            '00002006-0000-1000-8000-135D67EC4377',
            {
                format: Formats.FLOAT,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class MediaCurrentPosition extends Characteristic {
    constructor() {
        super(
            'Media Current Position',
            '00002007-0000-1000-8000-135D67EC4377',
            {
                format: Formats.FLOAT, // In seconds
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
    }
}


export class MediaItemName extends Characteristic {
    constructor() {
        super(
            'Media Name',
            '00003001-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class MediaItemAlbumName extends Characteristic {
    constructor() {
        super(
            'Media Album Name',
            '00003002-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class MediaItemArtist extends Characteristic {
    constructor() {
        super(
            'Media Artist',
            '00003003-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }

}

export class MediaItemDuration extends Characteristic {
    constructor() {
        super(
            'Media Duration',
            '00003005-0000-1000-8000-135D67EC4377',
            {
                format: Formats.FLOAT, // In seconds
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class StillImage extends Characteristic {
    constructor() {
        super(
            'Still Image',
            '00004001-0000-1000-8000-135D67EC4377',
            {
                format: Formats.DATA,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}

// Also known as MIME type...
export class MediaTypeIdentifier extends Characteristic {
    constructor() {
        super(
            'Media Type Identifier',
            '00004002-0000-1000-8000-135D67EC4377',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class MediaWidth extends Characteristic {
    constructor() {
        super(
            'Media Width',
            '00004003-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT32,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}


export class MediaHeight extends Characteristic {
    constructor() {
        super(
            'Media Width',
            '00004004-0000-1000-8000-135D67EC4377',
            {
                format: Formats.UINT32,
                perms : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://gist.github.com/gomfunkel/b1a046d729757120907c

export class Volts extends Characteristic {
    constructor() {
        super(
            'Volts',
            'E863F10A-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : 'V',
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}

export class Amperes extends Characteristic {
    constructor() {
        super(
            'Amps',
            'E863F126-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : "A",
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}

export class Watts extends Characteristic {
    constructor() {
        super(
            'Consumption',
            'E863F10D-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : 'W',
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class VoltAmperes extends Characteristic {
    constructor() {
        super(
            'Apparent Power',
            'E863F110-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : 'VA',
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}

export class KilowattHours extends Characteristic {
    constructor() {
        super(
            'Total Consumption',
            'E863F10C-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT32,
                unit    : "kWh",
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        )
        // this.value = this.getDefaultValue();
    }
}

export class KilowattVoltAmpereHour extends Characteristic {
    constructor() {
        super(
            'Apparent Energy',
            'E863F127-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT32,
                unit    : "kVAh",
                minValue: 0,
                maxValue: 65535,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class BatteryLevel extends Characteristic {
    constructor() {
        super(
            'Battery Level',
            'E863F11B-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : Units.PERCENTAGE,
                maxValue: 100,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ]
            }
        );
    }
}

export class EveAirQuality extends Characteristic {
    constructor() {
        super(
            'Eve Air Quality',
            'E863F10B-079E-48FF-8F27-9C2605A29F52',
            {
                format  : Formats.UINT16,
                unit    : "ppm",
                maxValue: 5000,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY],
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://github.com/ebaauw/homebridge-lib
// i should probably submit a PR for everything here that isn't in that repo...

export class EveOpenDuration extends Characteristic {
    constructor() {
        super(
            'Eve Open Duration',
            'E863F118-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                unit  : Units.SECONDS, // since last reset
                perms : [Perms.PAIRED_READ, Perms.NOTIFY, Perms.PAIRED_WRITE]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class EveClosedDuration extends Characteristic {
    constructor() {
        super(
            'Eve Closed Duration',
            'E863F119-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                unit  : Units.SECONDS, // since last reset
                perms : [Perms.PAIRED_READ, Perms.NOTIFY, Perms.PAIRED_WRITE]
            }
        );
    }
}

export class EveLastAction extends Characteristic {
    constructor() {
        super(
            'Eve Last Activation',
            'E863F11A-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                unit  : Units.SECONDS, // since last reset
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class EveTimesOpened extends Characteristic {
    constructor() {
        super(
            'Eve Times Opened',
            'E863F129-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
    }
}

export class EveResetTotal extends Characteristic {
    constructor() {
        super(
            'Eve Reset Total',
            'E863F112-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                unit  : Units.SECONDS, // since 2001/01/01
                perms : [Perms.PAIRED_READ, Perms.NOTIFY, Perms.PAIRED_WRITE]
            }
        );
        // this.value = this.getDefaultValue();
    }
}


// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors

export class AtmosphericPressureLevel extends Characteristic {
    constructor() {
        super(
            'Barometric Pressure',
            '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB',
            {
                format  : Formats.UINT8,
                unit    : "mbar",
                minValue: 800,
                maxValue: 1200,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
    }
}

export class NoiseLevel extends Characteristic {
    constructor() {
        super(
            'Noise Level',
            '2CD7B6FD-419A-4740-8995-E3BFE43735AB',
            {
                format  : Formats.UINT8,
                unit    : "dB",
                minValue: 0,
                maxValue: 200,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://github.com/homespun/homebridge-platform-snmp

export class AirFlow extends Characteristic {
    constructor() {
        super(
            'Air Flow',
            '49C8AE5A-A3A5-41AB-BF1F-12D5654F9F41',
            {
                format  : Formats.UINT8,
                unit    : "m/s",
                minValue: 0,
                maxValue: 135,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class NitrogenDioxideDetected extends Characteristic {
    static NO2_LEVELS_NORMAL   = 0;
    static NO2_LEVELS_ABNORMAL = 1;

    constructor() {
        super(
            'Nitrogen Dioxide Detected',
            'D737B40A-3AF0-4316-950F-76090B98C5CF',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class NitrogenDioxideLevel extends Characteristic {
    constructor() {
        super(
            'Nitrogen Dioxide Level',
            'B762A2AF-D9D0-4A79-814A-E9EBAB0ED290',
            {
                format  : Formats.FLOAT,
                unit    : "ppm",
                minValue: 0,
                maxValue: 1500,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class NitrogenDioxidePeakLevel extends Characteristic {
    constructor() {
        super(
            'Nitrogen Dioxide Peak Level',
            'B6594847-7B88-496C-A1A0-B7860F3D7601',
            {
                format  : Formats.FLOAT,
                unit    : "ppm",
                minValue: 0,
                maxValue: 1500,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://github.com/homespun/homebridge-platform-aqe

export class OzoneDetected extends Characteristic {
    static O3_LEVELS_NORMAL   = 0;
    static O3_LEVELS_ABNORMAL = 1;

    constructor() {
        super(
            'Ozone Detected',
            '0168FA60-5CF4-4314-AA45-0F84E389A093',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        this.value = this.getDefaultValue();
    }
}

export class OzoneLevel extends Characteristic {
    constructor() {
        super(
            'Ozone Level',
            '03C17FD9-672E-42F5-8DD4-30C6822C739A',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class OzonePeakLevel extends Characteristic {
    constructor() {
        super(
            'Ozone Peak Level',
            '550EE1FF-FC66-4BB6-A1C1-4B0A07109AE3',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class SodiumDioxideDetected extends Characteristic {
    static SO2_LEVELS_NORMAL   = 0;
    static SO2_LEVELS_ABNORMAL = 1;

    constructor() {
        super(
            'Sodium Dioxide Detected',
            '4D237DAB-1CB6-4D52-B446-4667F58F7D28',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class SodiumDioxideLevel extends Characteristic {
    constructor() {
        super(
            'Sodium Dioxide Level',
            '66C4D315-FBEF-470E-9434-B047679F1141',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class SodiumDioxidePeakLevel extends Characteristic {
    constructor() {
        super(
            'Sodium Dioxide Peak Level',
            '4CD6F648-2F92-43D8-86DF-0E8DE75E033B',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class VolatileOrganicCompoundDetected extends Characteristic {
    static VOC_LEVELS_NORMAL   = 0;
    static VOC_LEVELS_ABNORMAL = 1;

    constructor() {
        super(
            'Volatile Organic Compound Detected',
            '65DBC0F5-C40B-4E04-ADED-DC70031B0B82',
            {
                format: Formats.UINT8,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class VolatileOrganicCompoundLevel extends Characteristic {
    constructor() {
        super(
            'Volatile Organic Compound Level',
            '35C4C797-193D-4998-879F-A08514E87897',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class VolatileOrganicCompoundPeakLevel extends Characteristic {
    constructor() {
        super(
            'Volatile Organic Compound Peak Level',
            'A62CB784-1916-4BDF-B840-BDB9F8A264E9',
            {
                format  : Formats.FLOAT,
                unit    : "ppb",
                minValue: 0,
                maxValue: 1500,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class NotificationCode extends Characteristic {
    constructor() {
        super(
            'Notification Code',
            '381C47A3-CB06-4177-8E3D-A1B4C22EB031',
            {
                format  : Formats.UINT8,
                maxValue: 255,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.PAIRED_WRITE, Perms.NOTIFY]
            }
        );
        this.value = 255;
    }
}

export class NotificationText extends Characteristic {
    constructor() {
        super(
            'Notification Text',
            'e244ca80-813e-423a-86bd-02f293b857a0',
            {
                format: Formats.STRING,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// used by Elgato Eve, number of seconds since the epoch...

export class LastEventTime extends Characteristic {
    constructor() {
        super(
            'Last Event Time',
            'E863F11A-079E-48FF-8F27-9C2605A29F52',
            {
                format: Formats.UINT32,
                perms : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://github.com/SeydX/homebridge-broadband

export class DownloadSpeed extends Characteristic {
    constructor() {
        super(
            'Download Speed',
            'DA70DA1F-DA72-4DB3-81C2-99F158A15A9A',
            {
                format  : Formats.FLOAT,
                unit    : 'Mbps',
                maxValue: 1024,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class UploadSpeed extends Characteristic {
    constructor() {
        super(
            'Upload Speed',
            'AB74289E-D516-4A12-B2AE-1B32A74C035F',
            {
                format  : Formats.FLOAT,
                unit    : 'Mbps',
                maxValue: 1024,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class Ping extends Characteristic {
    constructor() {
        super(
            'Ping',
            'CC65A09A-E052-410C-981D-C11BDE2C3F60',
            {
                format  : Formats.INT,
                unit    : 'ms',
                maxValue: 999,
                minValue: 0,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class Latency extends Characteristic {
    constructor() {
        super(
            'Latency',
            '60EC80F9-F799-4E8E-B613-098E7EBCBB0B',
            {
                format  : Formats.INT,
                unit    : 'ms',
                maxValue: 999,
                minValue: 0,
                minStep : 0.001,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// https://github.com/naofireblade/homebridge-weather-plus

export class DewPoint extends Characteristic {
    constructor() {
        super(
            'Dew Point',
            '095c46e2-278e-4e3c-b9e7-364622a0f501',
            {
                format  : Formats.FLOAT,
                unit    : Units.CELSIUS,
                maxValue: 50,
                minValue: -50,
                minStep : 0.1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// courtesy of https://github.com/ToddGreenfield/homebridge-nut

export class InputVoltageAC extends Characteristic {
    constructor() {
        super(
            'Input Voltage AC',
            uuid.generate('CommunityTypes:usagedevice:InputVoltageAC'),
            // UUID.generate('CommunityTypes:usagedevice:InputVoltageAC'),
            {
                format  : Formats.FLOAT,
                unit    : "V",
                minValue: 0,
                maxValue: 65535,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            },
        );
    }
}

export class OutputVoltageAC extends Characteristic {
    constructor() {
        super(
            'Output Voltage AC',
            uuid.generate('CommunityTypes:usagedevice:OutputVoltageAC'),
            {
                format  : Formats.FLOAT,
                unit    : "V",
                minValue: 0,
                maxValue: 65535,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class BatteryVoltageDC extends Characteristic {
    constructor() {
        super(
            'Battery Voltage DC',
            uuid.generate('CommunityTypes:usagedevice:BatteryVoltageDC'),
            {
                format  : Formats.FLOAT,
                unit    : "V",
                minValue: 0,
                maxValue: 65535,
                minStep : 0.01,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

export class UPSLoadPercent extends Characteristic {
    constructor() {
        super(
            'UPS Load',
            uuid.generate('CommunityTypes:usagedevice:UPSLoadPercent'),
            {
                format  : Formats.UINT8,
                unit    : Units.PERCENTAGE,
                minValue: 0,
                maxValue: 100,
                minStep : 1,
                perms   : [Perms.PAIRED_READ, Perms.NOTIFY]
            }
        );
        // this.value = this.getDefaultValue();
    }
}

// Services

export class AudioDeviceService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '00000001-0000-1000-8000-135D67EC4377',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(AudioVolume);

        // Optional Characteristics
        this.addOptionalCharacteristic(Muting);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class PlaybackDeviceService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '00000002-0000-1000-8000-135D67EC4377',
            subtype
        );
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
        this.addOptionalCharacteristic(Characteristic.Name);
        // Artwork characteristics...would be better reported in a separate service?
        this.addOptionalCharacteristic(StillImage);
        this.addOptionalCharacteristic(MediaTypeIdentifier);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
    }
}

// A media information service that has no playback controls, for e.g. DAB radio...
export class MediaInformationService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '00000003-0000-1000-8000-135D67EC4377',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(MediaItemName);

        // Optional Characteristics
        this.addOptionalCharacteristic(MediaItemAlbumName);
        this.addOptionalCharacteristic(MediaItemArtist);
        this.addOptionalCharacteristic(MediaItemDuration);
        this.addOptionalCharacteristic(MediaCurrentPosition);
        this.addOptionalCharacteristic(Characteristic.Name);
        // Artwork characteristics...would be better reported in a separate service?
        this.addOptionalCharacteristic(StillImage);
        this.addOptionalCharacteristic(MediaTypeIdentifier);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
    }
}

export class StillImageService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '00000004-0000-1000-8000-135D67EC4377',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(StillImage);
        this.addCharacteristic(MediaTypeIdentifier);

        // Optional Characteristics
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class SecurityCameraService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '00000005-0000-1000-8000-135D67EC4377',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(StillImage);
        this.addCharacteristic(MediaTypeIdentifier);

        // Optional Characteristics
        this.addOptionalCharacteristic(Timestamp);
        this.addOptionalCharacteristic(MediaWidth);
        this.addOptionalCharacteristic(MediaHeight);
        this.addOptionalCharacteristic(VideoDataURL);
        this.addOptionalCharacteristic(AudioDataURL);
        this.addOptionalCharacteristic(Characteristic.MotionDetected);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors

export class AtmosphericPressureSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            'B77831FD-D66A-46A4-B66D-FD7EE8DFE3CE',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(AtmosphericPressureLevel);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class NoiseLevelSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(NoiseLevel);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

// courtesy of https://github.com/homespun/homebridge-platform-snmp

export class AirFlowSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            'AF5C192E-420F-4A13-AB67-B8F3968A4935',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(AirFlow);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class NitrogenDioxideSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '9F6B797D-D43B-4C88-9AA0-57018AB8A91E',
            subtype
        )

        // Required Characteristics
        this.addCharacteristic(NitrogenDioxideDetected);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(NitrogenDioxideLevel);
        this.addOptionalCharacteristic(NitrogenDioxidePeakLevel);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

// courtesy of https://github.com/homespun/homebridge-platform-aqe

export class OzoneSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            'B91C2BD6-D071-4F49-A23B-20721AC6CCEB',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(OzoneDetected);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(OzoneLevel);
        this.addOptionalCharacteristic(OzonePeakLevel);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class SodiumDioxideSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            'FE7CFB1F-12D0-405D-86FD-7E268D65C453',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(SodiumDioxideDetected);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(SodiumDioxideLevel);
        this.addOptionalCharacteristic(SodiumDioxidePeakLevel);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class VolatileOrganicCompoundSensor extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '776E34BC-1660-46EC-A33D-2DFE5B958699',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(VolatileOrganicCompoundDetected);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.StatusActive);
        this.addOptionalCharacteristic(Characteristic.StatusFault);
        this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
        this.addOptionalCharacteristic(VolatileOrganicCompoundLevel);
        this.addOptionalCharacteristic(VolatileOrganicCompoundPeakLevel);
        this.addOptionalCharacteristic(Characteristic.StatusTampered);
        this.addOptionalCharacteristic(Characteristic.Name);
    }
}

export class NotificationService extends Service {
    constructor(displayName, subtype) {
        super(
            displayName,
            '074D8CE9-5B4B-48D5-9990-D98850C2F3FE',
            subtype
        );

        // Required Characteristics
        this.addCharacteristic(NotificationCode);
        this.addCharacteristic(NotificationText);

        // Optional Characteristics
        this.addOptionalCharacteristic(Characteristic.Name);
        this.addOptionalCharacteristic(LastEventTime);
    }
}