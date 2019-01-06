import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";

export class ParameterEditor_SingleState extends ParameterEditor {
    private templateNode: DocumentFragment;
    private textField: HTMLTextAreaElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = this.cloneTemplateNode('#editor_single_state');
        this.textField = this.templateNode.querySelector("#textfield");
        this.textField.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);

        this.textField.value = parameterValue;
    }

    protected buildNewParameterValue(): any {
        return this.textField.value;
    }
}