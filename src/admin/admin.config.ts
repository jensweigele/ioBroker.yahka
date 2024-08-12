import { IDictionary } from '../shared/yahka.configuration';


export interface IHAPServiceDefinition {
    type: string;
    characteristics: IDictionary<IHAPCharacteristicDefintion>;
}

export interface IHAPCharacteristicDefintion {
    uuid: string;
    name: string;
    displayName: string;
    optional: boolean;
    properties: IHAPCharacteristicProperties;
}

export interface IHAPCharacteristicProperties {
    [key: string]: any;
}

export interface ISelectListEntry {
    text: string,
    value?: string,
    [otherProps: string]: any;
}



