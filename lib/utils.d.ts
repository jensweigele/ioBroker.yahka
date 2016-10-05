/// <reference path="../typings/ioBroker.d.ts" />
declare interface IUtils {
    adapter(settings: ioBroker.IAdapterOptions): ioBroker.IAdapter;
    controllerDir(...args: any[]): any;
    getConfig(...args: any[]): any;
    appName(...args: any[]): any;
}
declare var utils: IUtils;
export = utils;
