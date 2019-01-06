import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";

export class ParameterEditor_HomeMaticWindowCoveringTargetPosition extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtLevel: HTMLInputElement;
    private txtWorking: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = this.cloneTemplateNode('#editor_conversion_HomeMaticWindowCoveringTargetPosition');
        this.txtLevel = this.templateNode.querySelector("#level");
        this.txtLevel.addEventListener('input', (ev) => this.valueChanged());
        this.txtWorking = this.templateNode.querySelector("#working");
        this.txtWorking.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        try {
            let p: Array<string>;
            if (typeof parameterValue === 'string')
                p = [parameterValue];
            else if (parameterValue instanceof Array)
                p = parameterValue;
            else
                p = [];

            this.txtLevel.value = (p.length >= 1) ? p[0] : "";
            this.txtWorking.value = (p.length >= 2) ? p[1] : "";
        }
        catch (e) {
            this.txtLevel.value = parameterValue;
            this.txtWorking.value = "";
        }
    }

    protected buildNewParameterValue(): any {
        var resultArray: Array<string> = [this.txtLevel.value];
        if (this.txtWorking.value)
            resultArray.push(this.txtWorking.value);
        return resultArray;
    }
}
