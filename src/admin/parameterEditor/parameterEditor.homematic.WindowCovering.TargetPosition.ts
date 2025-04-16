import { ParameterEditor, IParameterEditorDelegate } from './parameterEditor.base';
import { createAndCloneTemplateElement } from '../admin.pageLoader';
import { Utils } from '../admin.utils';

export class ParameterEditor_HomeMaticWindowCoveringTargetPosition extends ParameterEditor {
    private templateNode: DocumentFragment;
    private txtLevel: HTMLInputElement;
    private txtWorking: HTMLInputElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.homematic.WindowCovering.TargetPosition.inc.html'));
        this.txtLevel = this.templateNode.querySelector('.level');
        this.txtLevel.addEventListener('input', (ev) => this.valueChanged());
        this.txtWorking = this.templateNode.querySelector('.working');
        this.txtWorking.addEventListener('input', (ev) => this.valueChanged());
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        try {
            let p: Array<string>;
            if (typeof parameterValue === 'string') {
                p = [parameterValue];
            }
            else if (parameterValue instanceof Array) {
                p = parameterValue;
            }
            else {
                p = [];
            }

            Utils.setInputValue(this.txtLevel, (p.length >= 1) ? p[0] : '');
            Utils.setInputValue(this.txtWorking, (p.length >= 2) ? p[1] : '');
        }
        catch (e) {
            this.txtLevel.value = parameterValue;
            this.txtWorking.value = '';
        }
    }

    protected buildNewParameterValue(): any {
        const resultArray: Array<string> = [Utils.getInputValue(this.txtLevel).toString()];
        if (this.txtWorking.value) {
            resultArray.push(Utils.getInputValue(this.txtWorking)?.toString());
        }
        return resultArray;
    }
}
