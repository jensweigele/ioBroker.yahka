import { Configuration } from "./shared/yahka.configuration";

export interface IHasIHomeKitBridgeBinding {
    binding: IHomeKitBridgeBinding;
}
export interface IConversionFunction {
    toHomeKit(value: any): any;
    toIOBroker(value: any): any;
}

export interface IInOutFunction {
    toIOBroker(ioValue: any, callback: () => void);
    fromIOBroker(callback: (error: any, plainIOValue: any) => void);
}

export type IInOutChangeNotify = (plainIOValue: any) => void;

export interface IHomeKitBridgeBinding {
    conversion: IConversionFunction;
    inOut: IInOutFunction;
}

export interface ILogger {
    /** log message with debug level */
    debug(message: string);
    /** log message with info level */
    info(message: string);
    /** log message with info warn */
    warn(message: string);
    /** log message with info error */
    error(message: string);
}

export interface IHomeKitBridgeBindingFactory {
    CreateBinding(characteristicConfig: Configuration.ICharacteristicConfig, changeNotify: IInOutChangeNotify): IHomeKitBridgeBinding;
}