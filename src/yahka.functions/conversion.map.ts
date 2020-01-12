import { TIOBrokerConversionBase, IConversionFunction } from "./conversion.base";

export interface IIoBrokerConversion_MapEntry {
    left: any;
    right: any;
}
export interface IIoBrokerConversion_Map_Parameters {
    mappings: IIoBrokerConversion_MapEntry[];
}
export function isMultiStateParameter(params: any): params is IIoBrokerConversion_Map_Parameters {
    return "mappings" in params;
}

export class TIoBrokerConversion_Map extends TIOBrokerConversionBase implements IConversionFunction {
    protected mappingArrayToHomeKit = new Map<string, any>();
    protected mappingArrayToIOBroker = new Map<string, any>();
    private jsonReplacer = (key, value) => String(value);

    static create(adapter: ioBroker.Adapter, parameters: any): IConversionFunction {
        if (!isMultiStateParameter(parameters)) {
            return undefined;
        }

        return new TIoBrokerConversion_Map(adapter, parameters);
    }

    constructor(adapter: ioBroker.Adapter, protected parameters: IIoBrokerConversion_Map_Parameters) {
        super(adapter, "TIoBrokerConversion_Map");
        this.buildMappingArray();
    }

    buildMappingArray() {
        for(let mapDef of this.parameters.mappings) {
            let leftStr = JSON.stringify(mapDef.left, this.jsonReplacer);
            let rightStr = JSON.stringify(mapDef.right, this.jsonReplacer);
            
            this.mappingArrayToHomeKit.set(leftStr, mapDef.right);
            this.mappingArrayToIOBroker.set(rightStr, mapDef.left);
        }
    }

    toHomeKit(value: any) {
        let ioValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToHomeKit.get(ioValueStr);
    }
    toIOBroker(value: any) {
        let hkValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToIOBroker.get(hkValueStr);
    }
}