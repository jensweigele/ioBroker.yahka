import { ParameterEditor, IParameterEditorDelegate } from './parameterEditor.base';
import { createAndCloneTemplateElement } from '../admin.pageLoader';
import { Utils } from '../admin.utils';
import { TIoBrokerInOutFunction_MultiStateParameter, isMultiStateParameter, TIoBrokerInOutFunction_MultiState } from '../../yahka.functions/iofunc.multi-state';
import { write } from 'fs';

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
        let addRow = this.templateNode.querySelector('#addRow');
        addRow.addEventListener('click', this.addRowClicked.bind(this));
    }

    createRow(item: TIoBrokerInOutFunction_MultiStateParameter | undefined): Element {
        let importedRow = <DocumentFragment>document.importNode(this.stateTemplate.content, true);
        let myRow = this.lastRow.parentElement.insertBefore(importedRow.firstElementChild, this.lastRow);
        this.stateRows.push(myRow);

        let readField = <HTMLInputElement>myRow.querySelector('#readState');
        readField.addEventListener('input', (ev) => this.valueChanged());

        let writeField = <HTMLInputElement>myRow.querySelector('#writeState');
        writeField.addEventListener('input', (ev) => this.valueChanged());

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
            return;
        }

        const params = TIoBrokerInOutFunction_MultiState.parseParameters(parameterValue);
        if (params === undefined) {
            return;
        }

        params.forEach(item => this.createRow(item));
    }

    protected buildNewParameterValue(): any {
        return this.stateRows.map((row): TIoBrokerInOutFunction_MultiStateParameter => {
            const readField = <HTMLInputElement>row.querySelector('#readState');
            const writeField = <HTMLInputElement>row.querySelector('#writeState');
            return {
                readState: Utils.getInputValue(readField)?.toString(),
                writeState: Utils.getInputValue(writeField)?.toString(),
            };
        });
    }
}