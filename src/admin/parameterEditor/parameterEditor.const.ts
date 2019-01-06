import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";

export class ParameterEditor_Const extends ParameterEditor {
    private templateNode: DocumentFragment;
    private textField: HTMLTextAreaElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.const.inc.html'));
        this.textField = this.templateNode.querySelector("#textfield");
        this.textField.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);

        this.textField.value = parameterValue ? parameterValue : "";
    }

    protected buildNewParameterValue(): any {
        return this.textField.value;
    }
}
