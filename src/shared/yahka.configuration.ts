
export interface IDictionary<T> {
    [key: string]: T;
}

export module Configuration {

    export type TConfigNodeType = 'bridge' | 'customdevice' | 'ipcamera' | undefined;
    export interface ICharacteristicProperties {
        [key: string]: any;
    }
    export interface ICharacteristicConfig {
        name: string;
        enabled: boolean;
        properties?: ICharacteristicProperties;
        [key: string]: any;
    }

    export interface IServiceConfig {
        name: string;
        type: string;
        subType: string;
        characteristics: (ICharacteristicConfig)[];
        [key: string]: any;
    }


    export interface IBaseConfigNode {
        configType: TConfigNodeType;
        name: string;
    }

    export interface IBaseHomeKitDeviceConfig extends IBaseConfigNode {
        manufacturer: string;
        model: string;
        serial: string;
        firmware: string;
    }
    export interface IDeviceConfig extends IBaseHomeKitDeviceConfig {
        enabled: boolean;
        category: number;
        services: (IServiceConfig)[];
        [key: string]: any;
    }

    export interface IBridgeConfig extends IBaseHomeKitDeviceConfig {
        ident: string;
        name: string;
        username: string;
        pincode: string;
        port: number;
        interface?: string;
        verboseLogging: boolean;
        devices: (IDeviceConfig)[];
    }

    export interface ICameraFfmpegCommandLine {
        stream: String[],
        snapshot: String[]
    }

    export interface ICameraConfig extends IBridgeConfig {
        enabled: boolean;
        source: String;
        codec: String;
        numberOfStreams: number | undefined;
        maxWidth: number;
        maxHeight: number;
        maxFPS: number;
        ffmpegCommandLine: ICameraFfmpegCommandLine;
    }

    export function isBridgeConfig(config: IBaseConfigNode): config is IBridgeConfig {
        if (config === undefined)
            return false;
        return config.configType === "bridge";
    }

    export function isDeviceConfig(config: IBaseConfigNode): config is IDeviceConfig {
        if (config === undefined)
            return false;
        return config.configType === "customdevice" || (<IDeviceConfig>config).services !== undefined;
    }

    export function isIPCameraConfig(config: IBaseConfigNode): config is ICameraConfig {
        if (config === undefined)
            return false;
        return config.configType === "ipcamera";
    }

}
