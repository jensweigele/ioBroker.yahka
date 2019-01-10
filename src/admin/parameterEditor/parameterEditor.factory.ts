import { IParameterEditorDelegate, IParameterEditor } from "./parameterEditor.base";
import { ParameterEditor_Null } from "./parameterEditor.null";
import { ParameterEditor_Const } from "./parameterEditor.const";
import { ParameterEditor_SingleState } from "./parameterEditor.singleState";
import { ParameterEditor_MultiState } from "./parameterEditor.multiState";
import { ParameterEditor_HomeMaticWindowCoveringTargetPosition } from "./parameterEditor.homeMaticWindowCoveringTargetPosition";
import { ParameterEditor_ScaleConversionEditor } from "./parameterEditor.scaleConversion";
import { ParameterEditor_ConversionScript } from "./parameterEditor.conversionScript";

export type ParameterEditorFactory = new (valueChangeCallback: IParameterEditorDelegate) => IParameterEditor;
export let inoutFunctions = new Map<string, ParameterEditorFactory>([
    ["", (valueChangeCallback) => new ParameterEditor_Null(valueChangeCallback)],
    ["const", (valueChangeCallback) => new ParameterEditor_Const(valueChangeCallback)],
    ["ioBroker.State", (valueChangeCallback) => new ParameterEditor_SingleState(valueChangeCallback)],
    ["ioBroker.MultiState", (valueChangeCallback) => new ParameterEditor_MultiState(valueChangeCallback)],
    ["ioBroker.State.Defered", (valueChangeCallback) => new ParameterEditor_SingleState(valueChangeCallback)],
    ["ioBroker.State.OnlyACK", (valueChangeCallback) => new ParameterEditor_SingleState(valueChangeCallback)],
    ["ioBroker.homematic.WindowCovering.TargetPosition", (valueChangeCallback) => new ParameterEditor_HomeMaticWindowCoveringTargetPosition(valueChangeCallback)]
]);
export let convFunctions = new Map<string, ParameterEditorFactory>([
    ["", (valueChangeCallback) => new ParameterEditor_Null(valueChangeCallback)],
    ["hue", (valueChangeCallback) => new ParameterEditor_Null(valueChangeCallback)],
    ["level255", (valueChangeCallback) => new ParameterEditor_Null(valueChangeCallback)],
    ["passthrough", (valueChangeCallback) => new ParameterEditor_Null(valueChangeCallback)],
    ["inverse", (valueChangeCallback) => new ParameterEditor_Const(valueChangeCallback)],
    ["scaleInt", (valueChangeCallback) => new ParameterEditor_ScaleConversionEditor(valueChangeCallback)],
    ["scaleFloat", (valueChangeCallback) => new ParameterEditor_ScaleConversionEditor(valueChangeCallback)],
    ["HomematicDirectionToHomekitPositionState", (valueChangeCallback) => new ParameterEditor_SingleState(valueChangeCallback)],
    ["HomematicControlModeToHomekitHeathingCoolingState", (valueChangeCallback) => new ParameterEditor_SingleState(valueChangeCallback)],
    ["script", (valueChangeCallback) => new ParameterEditor_ConversionScript(valueChangeCallback)],

]);
