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

            const transText = translateWord(text);
            if (transText) {
                $(elements[e]).html(transText);
            }
        }
    }
}
