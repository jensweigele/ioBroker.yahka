
import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";

export class ParameterEditor_Null extends ParameterEditor {
    private lastParamValue: string;
    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        this.lastParamValue = parameterValue;
    }

    protected buildNewParameterValue(): any {
        return this.lastParamValue;
    }
}
