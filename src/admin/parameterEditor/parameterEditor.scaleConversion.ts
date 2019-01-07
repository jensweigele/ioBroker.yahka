import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";
import { Utils } from "../admin.utils";

export class ParameterEditor_ScaleConversionEditor extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtHKMin: HTMLInputElement;
    private txtHKMax: HTMLInputElement;
    private txtIOBrokerMin: HTMLInputElement;
    private txtIOBrokerMax: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.scaleConversion.inc.html'));
        this.txtHKMin = this.templateNode.querySelector("#hkMin");
        this.txtHKMin.addEventListener('input', (ev) => this.valueChanged());
        this.txtHKMax = this.templateNode.querySelector("#hkMax");
        this.txtHKMax.addEventListener('input', (ev) => this.valueChanged());
        this.txtIOBrokerMin = this.templateNode.querySelector("#ioMin");
        this.txtIOBrokerMin.addEventListener('input', (ev) => this.valueChanged());
        this.txtIOBrokerMax = this.templateNode.querySelector("#ioMax");
        this.txtIOBrokerMax.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);

        let parameterArray = undefined;
        if (typeof parameterValue === 'object') {
            parameterArray = parameterValue
        } else {
            try {
                parameterArray = JSON.parse(parameterValue);
            } catch (e) {
                Utils.setInputValue(this.txtHKMin, parameterValue);
                return
            }
        }

        Utils.setInputValue(this.txtHKMin, parameterArray["homekit.min"]);
        Utils.setInputValue(this.txtHKMax, parameterArray["homekit.max"]);
        Utils.setInputValue(this.txtIOBrokerMin, parameterArray["iobroker.min"]);
        Utils.setInputValue(this.txtIOBrokerMax, parameterArray["iobroker.max"]);
    }

    protected buildNewParameterValue(): any {
        return {
            "homekit.min": Utils.getInputValue(this.txtHKMin),
            "homekit.max": Utils.getInputValue(this.txtHKMax),
            "iobroker.min": Utils.getInputValue(this.txtIOBrokerMin),
            "iobroker.max": Utils.getInputValue(this.txtIOBrokerMax)
        };
    }
}
