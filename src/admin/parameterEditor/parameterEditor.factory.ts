import { IParameterEditorDelegate, IParameterEditor } from "./parameterEditor.base";
import { ParameterEditor_Null } from "./parameterEditor.null";
import { ParameterEditor_Const } from "./parameterEditor.const";
import { ParameterEditor_SingleState } from "./parameterEditor.singleState";
import { ParameterEditor_MultiState } from "./parameterEditor.multiState";
import { ParameterEditor_HomeMaticWindowCoveringTargetPosition } from "./parameterEditor.homematic.WindowCovering.TargetPosition";
import { ParameterEditor_ScaleConversionEditor } from "./parameterEditor.scaleConversion";
import { ParameterEditor_ConversionScript } from "./parameterEditor.conversionScript";
import { ParameterEditor_Map } from "./parameterEditor.map";
import { ParameterEditor_HomeMatic_Dimmer } from "./parameterEditor.homematic.dimmer";

export type ParameterEditorFactory = (valueChangeCallback: IParameterEditorDelegate) => IParameterEditor;
export let inoutFunctions = new Map<string, ParameterEditorFactory>([
    ["", (callback) => new ParameterEditor_Null(callback)],
    ["const", (callback) => new ParameterEditor_Const(callback)],
    ["ioBroker.State", (callback) => new ParameterEditor_SingleState(callback)],
    ["ioBroker.MultiState", (callback) => new ParameterEditor_MultiState(callback)],
    ["ioBroker.State.Defered", (callback) => new ParameterEditor_SingleState(callback)],
    ["ioBroker.State.OnlyACK", (callback) => new ParameterEditor_SingleState(callback)],
    ["ioBroker.homematic.WindowCovering.TargetPosition", (callback) => new ParameterEditor_HomeMaticWindowCoveringTargetPosition(callback)],
    ["ioBroker.homematic.Dimmer.On", (callback) => new ParameterEditor_HomeMatic_Dimmer(callback, true)],
    ["ioBroker.homematic.Dimmer.Brightness", (callback) => new ParameterEditor_HomeMatic_Dimmer(callback, false)]
]);

export let convFunctions = new Map<string, ParameterEditorFactory>([
    ["", (callback) => new ParameterEditor_Null(callback)],
    ["map", (callback) => new ParameterEditor_Map(callback)],
    ["hue", (callback) => new ParameterEditor_Null(callback)],
    ["level255", (callback) => new ParameterEditor_Null(callback)],
    ["passthrough", (callback) => new ParameterEditor_Null(callback)],
    ["inverse", (callback) => new ParameterEditor_Const(callback)],
    ["scaleInt", (callback) => new ParameterEditor_ScaleConversionEditor(callback)],
    ["scaleFloat", (callback) => new ParameterEditor_ScaleConversionEditor(callback)],
    ["round", (callback) => new ParameterEditor_Null(callback)],
    ["invert", (callback) => new ParameterEditor_Null(callback)],
    ["HomematicDirectionToHomekitPositionState", (callback) => new ParameterEditor_SingleState(callback)],
    ["HomematicControlModeToHomekitHeathingCoolingState", (callback) => new ParameterEditor_SingleState(callback)],
    ["script", (callback) => new ParameterEditor_ConversionScript(callback)],
]);
