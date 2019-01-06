import { IDictionary } from "../shared/yahka.configuration";



export interface IHAPServiceDefinition {
    type: string;
    characteristics: IDictionary<IHAPCharacteristicDefintion>;
}

export interface IHAPCharacteristicDefintion {
    name: string;
    optional: boolean;
    properties: IHAPCharacteristicProperties;
}

export interface IHAPCharacteristicProperties {
    [key: string]: any;
}