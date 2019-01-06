export interface IParameterEditor {
    refreshAndShow(inContainer: HTMLElement, withValue: any);
}

export type IParameterEditorDelegate = (newValue: any) => void;

export class ParameterEditor implements IParameterEditor {


    constructor(private valueChangeCallback: IParameterEditorDelegate) {

    }

    refreshAndShow(containerElement: HTMLElement, withValue: any) {

    }
    protected removeChildren(parentNode: HTMLElement) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    }

    protected cloneTemplateNode(selector: string): DocumentFragment {
        let node = <HTMLTemplateElement>document.querySelector(selector);
        return <DocumentFragment>document.importNode(node.content, true);
    }

    protected buildNewParameterValue(): any {
        return undefined;
    }

    protected valueChanged() {
        this.valueChangeCallback(this.buildNewParameterValue());
    }

}