import { TIoBrokerConversion_Scale } from './conversion.scale';

export class TIoBrokerConversion_Scale_Int extends TIoBrokerConversion_Scale {
    /**
     * @override
     */
    toHomeKit(value) {
        return Math.round(super.toHomeKit(value));
    }

    /**
     * @override
     */
    toIOBroker(value) {
        return Math.round(super.toIOBroker(value));
    }
}
