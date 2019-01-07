import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";
import { Utils } from "../admin.utils";

export class ParameterEditor_ConversionScript extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtToHomeKit: HTMLInputElement;
    private txtToIOBroker: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.conversionScript.inc.html'));
        this.txtToHomeKit = this.templateNode.querySelector("#toHomeKit");
        this.txtToHomeKit.addEventListener('input', (ev) => this.valueChanged());
        this.txtToIOBroker = this.templateNode.querySelector("#toIOBroker");
        this.txtToIOBroker.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        if (parameterValue) {
            Utils.setInputValue(this.txtToHomeKit, parameterValue["toHomeKit"]);
            Utils.setInputValue(this.txtToIOBroker, parameterValue["toIOBroker"]);
        } else {
            this.txtToHomeKit.value = "";
            this.txtToIOBroker.value = "";
        }
    }

    protected buildNewParameterValue(): any {
        return {
            "toHomeKit": Utils.getInputValue(this.txtToHomeKit),
            "toIOBroker": Utils.getInputValue(this.txtToIOBroker)
        }
    }
}