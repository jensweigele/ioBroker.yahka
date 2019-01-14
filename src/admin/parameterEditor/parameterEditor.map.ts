import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";
import { Utils } from "../admin.utils";
import { IIoBrokerConversion_MapEntry, isMultiStateParameter, IIoBrokerConversion_Map_Parameters } from "../../yahka.functions/conversion.map";
import { isObject } from "util";

export class ParameterEditor_Map extends ParameterEditor {
    private templateNode: DocumentFragment;
    private stateRows: Element[] = [];
    private lastRow: HTMLDivElement;
    private stateTemplate: HTMLTemplateElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.Map.inc.html'));

        this.stateTemplate = this.templateNode.querySelector('#mappingRow');
        this.lastRow = this.templateNode.querySelector('#lastRow')
        let addRow = this.templateNode.querySelector("#addRow");
        addRow.addEventListener('click', this.addRowClicked.bind(this));
    }

    createRow(item: IIoBrokerConversion_MapEntry | undefined): Element {
        let importedRow = <DocumentFragment>document.importNode(this.stateTemplate.content, true);
        let myRow = this.lastRow.parentElement.insertBefore(importedRow.firstElementChild, this.lastRow);
        this.stateRows.push(myRow);

        let leftField = <HTMLInputElement>myRow.querySelector('#ioBrokerValue');
        leftField.addEventListener('input', (ev) => this.valueChanged());
        let leftCheck = <HTMLInputElement>myRow.querySelector('#isSimpleValue');
        leftCheck.addEventListener('input', (ev) => this.valueChanged());

        let rightField = <HTMLInputElement>myRow.querySelector('#homekitValue');
        rightField.addEventListener('input', (ev) => this.valueChanged());

        myRow.querySelector('#delRow').addEventListener('click', () => {
            myRow.remove();
            this.stateRows = this.stateRows.filter(row => row != myRow);
            this.valueChanged();
        });

        myRow.querySelector('#moveUp').addEventListener('click', () => {
            let myIndex = this.stateRows.indexOf(myRow);
            let prevIndex = myIndex - 1;
            if (prevIndex < 0) {
                return;
            }

            let prevRow = this.stateRows[prevIndex];
            this.stateRows[prevIndex] = myRow;
            this.stateRows[myIndex] = prevRow;
            this.lastRow.parentElement.insertBefore(myRow, prevRow);
            this.valueChanged();
        });

        myRow.querySelector('#moveDown').addEventListener('click', () => {
            let myIndex = this.stateRows.indexOf(myRow);
            let nextIndex = myIndex + 1;
            if ((myIndex < 0) || (nextIndex >= this.stateRows.length)) {
                return;
            }

            let nextRow = this.stateRows[nextIndex];
            this.stateRows[nextIndex] = myRow;
            this.stateRows[myIndex] = nextRow;
            this.lastRow.parentElement.insertBefore(nextRow, myRow);
            this.valueChanged();
        });

        if (item === undefined)
            return myRow;

        if (isObject(item.left)) {
            Utils.setInputValue(leftField, JSON.stringify(item.left));
            leftCheck.checked = false;
        } else {
            Utils.setInputValue(leftField, item.left);
            leftCheck.checked = true;
        }
        Utils.setInputValue(rightField, item.right);

    }

    addRowClicked() {
        this.createRow(undefined);
        return false;
    }

    refreshAndShow(containerElement: HTMLElement, parameterValue: any) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);

        if (parameterValue === undefined) {
            return
        }

        if (!isMultiStateParameter(parameterValue)) {
            return
        }

        parameterValue.mappings.forEach(item => this.createRow(item));
    }

    protected buildNewParameterValue(): any {
        return {
            mappings: this.stateRows.map((row): IIoBrokerConversion_MapEntry => {
                let ioValue = <HTMLInputElement>row.querySelector('#ioBrokerValue');
                let isSimpleValue = <HTMLInputElement>row.querySelector('#isSimpleValue');
                let leftValue = Utils.getInputValue(ioValue);
                let hkValue = <HTMLInputElement>row.querySelector('#homekitValue');
                return {
                    left: isSimpleValue.checked ? leftValue : JSON.parse(leftValue),
                    right: Utils.getInputValue(hkValue),
                }

            })
        }
    }
}