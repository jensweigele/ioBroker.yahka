import { IInternalInOutFunction, ISubscriptionRequest, IInOutChangeNotify } from './iofunc.base';
interface IObjectDictionary<T> {
    [name:string]:T;
}

type TInOutFunctionCreateFunction = (adapter:ioBroker.IAdapter, parameters:any) => IInternalInOutFunction;
export var inOutFactory:IObjectDictionary<TInOutFunctionCreateFunction> = { }
  
