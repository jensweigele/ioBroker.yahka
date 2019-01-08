declare namespace ioBroker {
    export interface ILogger {
        /** log message with debug level */
        debug(message: string); 
        /** log message with info level (enabled by default for all adapters) */
        info(message: string);   
        /** log message with info warn */
        warn(message: string);        
        /** log message with info error */
        error(message: string);                 
    }

    export interface IState {
        /** the actual value - can be any type that is JSON-encodable */
        val?: any;
        /** a boolean flag indicating if the target system has acknowledged the value */
        ack?: boolean;
        /** a unix timestamp indicating the last update of the state */
        ts?: number;
        /** a unix timestamp indicating the last change of the state's actual value */
        lc?: number;
        /** adapter instance that did the "setState" */
        from?: string;
        /** a integer value that can be used to set states that expire after a given number of seconds. Can be used ony with setValue. After the value expires, it disappears from redisDB. */
        expire?: number;
        /** quality. Number with following states: 
            * 0x00 - 00000000 - good (can be undefined or null)
            * 0x01 - 00000001 - general bad, general problem
            * 0x41 - 01000001 - general problem by device
            * 0x81 - 10000001 - general problem by sensor
            * 0x42 - 01000010 - device not connected
            * 0x82 - 10000010 - sensor not connected
            * 0x44 - 01000100 - device reports error
            * 0x84 - 10000100 - sensor reports error
        */
        q?: number;        
    }

    export type IObject = any;

    export interface IAdapterOptions {
        /** mandatory - name of adapter */
        name: string;   
        /** optional - path to adapter (experts only) */
        dirName?: string;          
        /** optional - if system global config must be included in object (content of iobroker-data/iobroker.json)  */
        systemConfig?: boolean;   
        /** optional - alternate global configuration for adapter (experts only) */
        config?: any;          
        /** optional - instance of the adapter */
        instance?: any;        
        /** optional - if adapter wants format date according to global settings. if true (some libs must be preloaded) adapter can use "formatDate" function. */
        useFormatDate?: boolean;  
        /** optional - if adapter collects logs from all adapters (experts only) */
        logTransporter?: boolean; 
        /** optional - handler for subscribed objects changes */
        objectChange?: (string, IObject) => void;    
        /** optional - handler for messages for this adapter */
        message?: (any) => void;         
        /** optional - handler for subscribed states changes */
        stateChange?: (string, IState) => void;     
        /** optional - will be called when adapter is initialized */
        ready?: () => void;           
        /** optional - will be called by adapter termination */
        unload?: (callback) => void;          
        /** optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state" */
        noNamespace?: boolean;
    }

    export interface IAdapter {
        /** Name of adapter, e.g "adapterName" */
        name: string; 
        /** Host name, where the adapter instance runs */
        host: string; 
        /** instance number of this adapter instance */
        instance: number; 
        /** Namespace of adapter objects, e.g "adapterName.0" */
        namespace: string; 
        /** native part of adapter settings */
        config: any; 
        /** common part of adapter settings */
        common: any; 
        /** content of iobroker-data/iobroker.json (only if options.systemConfig = true) */
        systemConfig: any; 
        /** path to the adapter folder */
        adapterDir: string; 
        /** content of io-package.json */
        ioPack: any; 
        /** content of package.json */
        pack: any; 
        /** logger object */
        log: ILogger; 
        /** adapter version */
        version: string; 
        /** (experts only) */
        states: any; 
        /** (experts only) */
        objects: any; 
        /** if adapter connected to host */
        connected: boolean;  
        /** event registration */    
        on(eventName: string, callback: (...parameters: any[]) => any)
        /** subscribe on variables of this adapter instance */
        subscribeStates(pattern: string);
        /** subscribe on variables of other adapter instances */
        subscribeForeignStates(pattern: string);
        /** poll the state of a variable of this adapter instance */
        getState(identifier: string, callback: (error: string, value: IState) => void);
        /** poll the state of a variable of other adapter instances */
        getForeignState(identifier: string, callback: (error: string, value: IState) => void);

        /** set the value of a variable of this adapter instance */        
        setState(identifier: string, value: any, ack?: boolean);
        setState(identifier: string, value: any, ack: boolean, callback: (error: string) => void);
        setState(identifier: string, stateObject: IState);

        /** set the value of a variable of other adapter instances */        
        setForeignState(identifier: string, value: any, ack?: boolean);
        setForeignState(identifier: string, value: any, ack: boolean, callback: (error: string) => void);
        setForeignState(identifier: string, stateObject: IState);

        /** read an object this adapter instance */
        getObject(identifier: string, callback: (error: string, object: IObject) => void);
        /** read an object of other adapter instances */
        getForeignObject(identifier: string, callback: (error: string, object: IObject) => void);
                

        /** not yet documented */
        setObject(id: string, obj: IObject, callback: any);
        /** not yet documented */
        extendObject(id: string, obj: IObject, callback: any);
        /** not yet documented */
        setForeignObject(id: string, obj: IObject, callback: any);
        /** not yet documented */
        extendForeignObject(id: string, obj: IObject, callback: any);
        /** not yet documented */
        getEnum(_enum: any, callback: any);
        /** not yet documented */
        getEnums(_enumList: any, callback: any);
        /** not yet documented */
        getForeignObjects(pattern: string, type: any, enums: any, callback: any);
        /** not yet documented */
        findForeignState(id: string, type: any, callback: any);
        /** not yet documented */
        delObject(id: string, callback: any);
        /** not yet documented */
        delForeignObject(id: string, callback: any);
        /** not yet documented */
        subscribeObjects(pattern: string);
        /** not yet documented */
        subscribeObjects(pattern: string);
        /** not yet documented */
        setObjectNotExists(id: string, object: IObject, callback: any);
        /** not yet documented */
        setForeignObjectNotExists(id: string, obj: IObject, callback: any);
        /** not yet documented */
        createDevice(deviceName: string, common: any, _native: any, callback: any);
        /** not yet documented */
        createChannel(parentDevice: any, channelName: string, roleOrCommon: any, _native: any, callback: any);
        /** not yet documented */
        createState(parentDevice: any, parentChannel: any, stateName: string, roleOrCommon: any, _native: any, callback: any);
        /** not yet documented */
        deleteDevice(deviceName: string, callback: any);
        /** not yet documented */
        addChannelToEnum(enumName: string, addTo: any, parentDevice: any, channelName: string, callback: any);
        /** not yet documented */
        deleteChannelFromEnum(enumName: string, parentDevice: any, channelName: string, callback: any);
        /** not yet documented */
        deleteChannel(parentDevice: any, channelName: string, callback: any);
        /** not yet documented */
        deleteState(parentDevice: any, parentChannel: any, stateName: string, callback: any);
        /** not yet documented */
        getDevices(callback: any);
        /** not yet documented */
        getChannelsOf(parentDevice: any, callback: any);
        /** not yet documented */
        getStatesOf(parentDevice: any, parentChannel: any, callback: any);
        /** not yet documented */
        addStateToEnum(enumName: string, addTo: any, parentDevice: any, parentChannel: any, stateName: string, callback: any);
        /** not yet documented */
        deleteStateFromEnum(enumName: string, parentDevice: any, parentChannel: any, stateName: string, callback: any);
        /** not yet documented */
        rmDir(path: string, callback: any);
        /** not yet documented */
        mkDir(path: string, mode: any, callback: any);
        /** not yet documented */
        readDir(adapter: any, path: string, callback: any);
        /** not yet documented */
        unlink(adapter: any, Name: string, callback: any);
        /** not yet documented */
        rename(adapter: any, oldName: string, newName: string, callback: any);
        /** not yet documented */
        mkdir(adapter: any, dirName: string, callback: any);
        /** not yet documented */
        readFile(adapter: any, fileName: string, options: any, callback: any);
        /** not yet documented */
        writeFile(adapter: any, fileName: string, data: any, mimeType: any, callback: any);
        /** not yet documented */
        formatDate(dateobj: IObject, isSeconds: any, _format: any);
        /** not yet documented */
        sendTo(objName: string, command: any, message: any, callback: any);
        /** not yet documented */
        sendToHost(objName: string, command: any, message: any, callback: any);
        /** not yet documented */
        getStateHistory(id: string, start: any, end: any, callback: any);
        /** not yet documented */
        getStateHistory(id: string, start: any, end: any, callback: any);
        /** not yet documented */
        idToDCS(id: string);
        /** not yet documented */
        delForeignState(id: string, callback: any);
        /** not yet documented */
        delState(id: string, callback: any);
        /** not yet documented */
        getStates(pattern: string, callback: any);
        /** not yet documented */
        getForeignStates(pattern: string, callback: any);
        /** not yet documented */
        unsubscribeForeignStates(pattern: string);
        /** not yet documented */
        pushFifo(id: string, state: any, callback: any);
        /** not yet documented */
        trimFifo(id: string, start: any, end: any, callback: any);
        /** not yet documented */
        getFifoRange(id: string, start: any, end: any, callback: any);
        /** not yet documented */
        getFifo(id: string, callback: any);
        /** not yet documented */
        lenFifo(id: string, callback: any);
        /** not yet documented */
        subscribeFifo(pattern: string);
        /** not yet documented */
        getSession(id: string, callback: any);
        /** not yet documented */
        setSession(id: string, ttl: any, data: any, callback: any);
        /** not yet documented */
        destroySession(id: string, callback: any);
        /** not yet documented */
        getMessage(callback: any);
        /** not yet documented */
        lenMessage(callback: any);
        /** not yet documented */
        setBinaryState(id: string, binary: any, callback: any);
        /** not yet documented */
        getBinaryState(id: string, callback: any);
        /** not yet documented */
        adapterGetPort(port: any, callback: any);
        /** not yet documented */
        checkPassword(user: string, pw: string, callback: any);
        /** not yet documented */
        setPassword(user: string, pw: string, callback: any);
        /** not yet documented */
        checkGroup(user: string, group: string, callback: any);

    }

    export interface IIPInformation {
        address: string
        family: string
        name: string
    }
}
