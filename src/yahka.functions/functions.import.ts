import { inOutFactory } from './functions.factory';
import { TIoBrokerInOutFunction_State, TIoBrokerInOutFunction_StateDeferred, TIoBrokerInOutFunction_State_OnlyACK} from "./iofunc.state";
import { TIoBrokerInOutFunction_Const } from './iofunc.const';
import { TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition } from './iofunc.homematic.covering';

inOutFactory["ioBroker.State"] = TIoBrokerInOutFunction_State.create;
inOutFactory["ioBroker.State.Defered"] = TIoBrokerInOutFunction_StateDeferred.create;
inOutFactory["ioBroker.State.OnlyACK"] = TIoBrokerInOutFunction_State_OnlyACK.create;
inOutFactory["const"] = TIoBrokerInOutFunction_Const.create;
inOutFactory["ioBroker.homematic.WindowCovering.TargetPosition"] = TIoBrokerInOutFunction_HomematicWindowCovering_TargetPosition.create;