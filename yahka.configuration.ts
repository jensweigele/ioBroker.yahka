
export module Configuration {

    export type TConfigNodeType = 'bridge' | 'customdevice' | 'ipcamera' | undefined;

    export interface ICharacteristicConfig {
        name:string;
        enabled:boolean;
        [key:string]:any;
    }

    export interface IServiceConfig {
        name:string;
        type:string;
        subType:string;
        characteristics:(ICharacteristicConfig)[];
        [key:string]:any;
    }

    
    export interface IBaseConfigNode {
        configType:TConfigNodeType;
        name:string;
    }

    export interface IBaseHomeKitDeviceConfig extends IBaseConfigNode {
        manufacturer:string;
        model:string;
        serial:string;        
    }
    export interface IDeviceConfig extends IBaseHomeKitDeviceConfig {
        enabled:boolean;
        category:number;
        services:(IServiceConfig)[];
        [key:string]:any;
    }

    export interface IBridgeConfig extends IBaseHomeKitDeviceConfig {
        ident:string;
        name:string;
        username:string;
        pincode:string;
        port:number;
        verboseLogging:boolean;
        devices:(IDeviceConfig)[];
        [key:string]:any;
    }

    export interface ICameraConfig extends IBridgeConfig {
        source: String;
        codec: String;
        numberOfStreams: number | undefined;
        maxWidth: number;
        maxHeight: number;
        maxFPS: number;
    
    }
        
}
