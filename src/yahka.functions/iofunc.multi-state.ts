import { TIoBrokerInOutFunctionBase, IInOutFunction } from './iofunc.base';
import { isObject } from 'util';


export interface TIoBrokerInOutFunction_MultiStateParameter {
    readState: string;
    writeState?: string;
    onlyAcknowledged?: boolean;
}

export function isMultiStateParameter(value: any): value is TIoBrokerInOutFunction_MultiStateParameter {
    if (value === undefined)
        return false;
    if (!isObject(value))
        return false;
    let propName: keyof TIoBrokerInOutFunction_MultiStateParameter = "readState";
    return (propName in value);
}

export class TIoBrokerInOutFunction_MultiState extends TIoBrokerInOutFunctionBase {

    static parseParameters(parameters: any): TIoBrokerInOutFunction_MultiStateParameter[] {
        if (Array.isArray(parameters)) {
            return parameters.filter(isMultiStateParameter);
        } else if (typeof parameters === "string") {
            return [{ readState: parameters }];
        } else {
            return undefined
        }
    }
    static create(adapter: ioBroker.Adapter, parameters: any): IInOutFunction {
        let stateNames = TIoBrokerInOutFunction_MultiState.parseParameters(parameters);
        if (stateNames === undefined) {
            return undefined
        }
        return new TIoBrokerInOutFunction_MultiState(adapter, stateNames);
    }

    constructor(protected adapter: ioBroker.Adapter, protected stateProperties: TIoBrokerInOutFunction_MultiStateParameter[]) {
        super(adapter, "TIoBrokerInOutFunctionMultiState");
        for (let state of stateProperties) {
            this.addSubscriptionRequest(state.readState);
        }
    }

    protected recalculateHomekitValues(stateName: string) {
        let hkValues = this.stateProperties.map((state) => this.stateCache.get(state.readState)?.val);
        return hkValues.length === 1 ? hkValues[0] : hkValues;
    }

    private updateSingleIOBrokerValue(state: TIoBrokerInOutFunction_MultiStateParameter, newValue: any): Promise<void> {
        if (newValue === undefined)
            return Promise.resolve();

        return new Promise<void>((resolve, reject) => {
            let stateName = state.writeState || state.readState;
            this.log.debug('writing state to ioBroker [' + stateName + ']: ' + JSON.stringify(newValue));
            this.adapter.getForeignState(stateName, (error, ioState) => {
                let value = ioState.val;
                let valueChanged = value !== newValue;
                this.log.debug('checking value change: ' + JSON.stringify(value) + ' != ' + JSON.stringify(newValue) + ' = ' + valueChanged);
                if (valueChanged) {
                    this.adapter.setForeignState(stateName, newValue, false, (error) => {
                        if (error) {
                            this.log.error('setForeignState error [' + stateName + '] to [' + JSON.stringify(newValue) + ']: ' + error);
                            reject(error);
                        }
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    protected updateIOBrokerValue(plainIoValue: any, callback: () => void) {
        let ioValueArray = Array.isArray(plainIoValue) ? plainIoValue : [plainIoValue];
        let promiseArray = this.stateProperties.map((state, index) => {
            let newValueForThisState = ioValueArray[index];
            return this.updateSingleIOBrokerValue(state, newValueForThisState);
        });
        Promise.all(promiseArray).then(() => {
            this.log.debug('wrote all states sucessfully to ioBroker');
            callback();
        }).catch((e) => {
            this.log.error('could not write all states to ioBroker: ' + JSON.stringify(e));
            callback();
        });
    }
}
