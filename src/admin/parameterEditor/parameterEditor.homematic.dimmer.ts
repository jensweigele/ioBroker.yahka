import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";
import { Utils } from "../admin.utils";
import { TIoBrokerInOutFunction_Homematic_Dimmer_Base, TIoBrokerInOutFunction_Homematic_Dimmer_Parameter } from "../../yahka.functions/iofunc.homematic.dimmer";

export class ParameterEditor_HomeMatic_Dimmer extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtLevel: HTMLInputElement;
    private txtDefaultLevel: HTMLInputElement;
    private chkRestoreToPrevious: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate, private showExtendedDimmerProps: boolean) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.homematic.dimmer.inc.html'));
        this.txtLevel = this.templateNode.querySelector("#level");
        this.txtLevel.addEventListener('input', (ev) => this.valueChanged());
        this.chkRestoreToPrevious = this.templateNode.querySelector("#restoreToPreviousLevel");
        this.chkRestoreToPrevious.addEventListener('click', (ev) => this.valueChanged());
        this.txtDefaultLevel = this.templateNode.querySelector("#defaultLevel");
        this.txtDefaultLevel.addEventListener('input', (ev) => this.valueChanged());
        if (!showExtendedDimmerProps) {
            $(this.templateNode).find('.extended-dimmer-properties').hide();
        }
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);

        if (parameterValue === undefined) {
            return
        }

        var params = TIoBrokerInOutFunction_Homematic_Dimmer_Base.parseParameters(parameterValue);
        if (params === undefined) {
            return
        }

        Utils.setInputValue(this.txtLevel, params.levelState);
        Utils.setInputValue(this.chkRestoreToPrevious, params.restoreToPreviousLevel);
        Utils.setInputValue(this.txtDefaultLevel, params.defaultSwitchOnLevel);
    }

    protected buildNewParameterValue(): any {
        var result: TIoBrokerInOutFunction_Homematic_Dimmer_Parameter = {
            levelState: Utils.getInputValue(this.txtLevel)?.toString()
        }

        if (this.showExtendedDimmerProps) {
            result.restoreToPreviousLevel = Utils.getInputValue(this.chkRestoreToPrevious) as boolean;
            result.defaultSwitchOnLevel = Utils.getInputValue(this.txtDefaultLevel) as number;
        }
        return result;
    }
}
