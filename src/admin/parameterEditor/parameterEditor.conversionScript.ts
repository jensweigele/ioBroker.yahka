import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";

export class ParameterEditor_ConversionScript extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtToHomeKit: HTMLInputElement;
    private txtToIOBroker: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = this.cloneTemplateNode('#editor_conversion_script');
        this.txtToHomeKit = this.templateNode.querySelector("#toHomeKit");
        this.txtToHomeKit.addEventListener('input', (ev) => this.valueChanged());
        this.txtToIOBroker = this.templateNode.querySelector("#toIOBroker");
        this.txtToIOBroker.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        this.txtToHomeKit.value = parameterValue["toHomeKit"] ? parameterValue["toHomeKit"] : "";
        this.txtToIOBroker.value = parameterValue["toIOBroker"] ? parameterValue["toIOBroker"] : "";
    }

    protected buildNewParameterValue(): any {
        return {
            "toHomeKit": this.txtToHomeKit.value,
            "toIOBroker": this.txtToIOBroker.value
        }
    }
}