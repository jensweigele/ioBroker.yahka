import * as $ from 'jquery';

declare function translateWord(text: string): string | undefined;

export function translateFragment(fragment) {
    const elements = fragment.querySelectorAll('.translate');
    if (elements) {
        for (let e = 0; e < elements.length; e++) {
            let text = $(elements[e]).attr('data-lang');
            if (!text) {
                text = $(elements[e]).html();
                $(elements[e]).attr('data-lang', text);
            }


            const transText = translateInternal(text);
            if (transText) {
                $(elements[e]).html(transText);
            }
        }
    }

    const placeholders = fragment.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(placeholder => {
        const translated = translateInternal(placeholder.placeholder);
        placeholder.placeholder = translated ? translated : placeholder.placeholder;
    })
}

export function translateInternal(text: string): string | undefined {
    return translateWord(text);
}