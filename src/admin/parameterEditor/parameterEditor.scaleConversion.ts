import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";

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
                this.txtHKMin.value = parameterValue;
                return
            }
        }
        this.txtHKMin.value = parameterArray["homekit.min"];
        this.txtHKMax.value = parameterArray["homekit.max"];
        this.txtIOBrokerMin.value = parameterArray["iobroker.min"];
        this.txtIOBrokerMax.value = parameterArray["iobroker.max"];
    }

    protected buildNewParameterValue(): any {
        return {
            "homekit.min": this.txtHKMin.valueAsNumber,
            "homekit.max": this.txtHKMax.valueAsNumber,
            "iobroker.min": this.txtIOBrokerMin.valueAsNumber,
            "iobroker.max": this.txtIOBrokerMax.valueAsNumber
        };
    }
}
