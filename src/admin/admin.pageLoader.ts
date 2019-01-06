
export function createTemplateElement(html: string): HTMLTemplateElement {
    let template = document.createElement('template');
    template.innerHTML = html;
    return template;
}

export function createAndCloneTemplateElement(html: string): DocumentFragment {
    let node = createTemplateElement(html);
    return <DocumentFragment>document.importNode(node.content, true);
}

