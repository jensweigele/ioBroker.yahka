import { ParameterEditor, IParameterEditorDelegate } from "./parameterEditor.base";
import { createAndCloneTemplateElement } from "../admin.pageLoader";
import { Utils } from "../admin.utils";
import { TIoBrokerInOutFunction_MultiStateParameter, isMultiStateParameter, TIoBrokerInOutFunction_MultiState } from "../../yahka.functions/iofunc.multi-state";
import { write } from "fs";

export class ParameterEditor_MultiState extends ParameterEditor {
    private templateNode: DocumentFragment;
    private stateRows: Element[] = [];
    private lastRow: HTMLDivElement;
    private stateTemplate: HTMLTemplateElement;
    constructor(valueChangeCallback: IParameterEditorDelegate) {
        super(valueChangeCallback);
        this.templateNode = createAndCloneTemplateElement(require('./parameterEditor.multiState.inc.html'));

        this.stateTemplate = this.templateNode.querySelector('#stateRow');
        this.lastRow = this.templateNode.querySelector('#lastRow')
        let addRow = this.templateNode.querySelector("#addRow");
        addRow.addEventListener('click', this.addRowClicked.bind(this));
    }

    createRow(item: TIoBrokerInOutFunction_MultiStateParameter | undefined): Element {
        let importedRow = <DocumentFragment>document.importNode(this.stateTemplate.content, true);
        let newRow = this.lastRow.parentElement.insertBefore(importedRow.firstElementChild, this.lastRow);
        this.stateRows.push(newRow);

        let readField = <HTMLInputElement>newRow.querySelector('#readState');
        readField.addEventListener('input', (ev) => this.valueChanged());

        let writeField = <HTMLInputElement>newRow.querySelector('#writeState');
        writeField.addEventListener('input', (ev) => this.valueChanged());

        let rowDeleter = newRow.querySelector('#delRow');
        rowDeleter.addEventListener('click', () => {
            newRow.remove();
            this.stateRows = this.stateRows.filter(row => row != newRow);
            this.valueChanged();
        });

        if (item === undefined)
            return newRow;
        Utils.setInputValue(readField, item.readState);
        Utils.setInputValue(writeField, item.writeState);

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

        var params = TIoBrokerInOutFunction_MultiState.parseParameters(parameterValue);
        if (params === undefined) {
            return
        }

        params.forEach(item => this.createRow(item));
    }

    protected buildNewParameterValue(): any {
        return this.stateRows.map( (row): TIoBrokerInOutFunction_MultiStateParameter => {
            let readField = <HTMLInputElement>row.querySelector('#readState');
            let writeField = <HTMLInputElement>row.querySelector('#writeState');
            return {
                readState: Utils.getInputValue(readField),
                writeState: Utils.getInputValue(writeField),
            }     
        });
    }
}