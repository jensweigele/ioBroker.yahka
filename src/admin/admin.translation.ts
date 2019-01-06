
import * as $ from "jquery";

declare function translateWord(text: string): string | undefined;
export function translateFragment(fragment) {
    var elements = fragment.querySelectorAll('.translate');
    if (elements) {
        for (var e = 0; e < elements.length; e++) {
            var text = $(elements[e]).attr('data-lang');
            if (!text) {
                text = $(elements[e]).html();
                $(elements[e]).attr('data-lang', text);
            }

            var transText = translateWord(text);
            if (transText) {
                $(elements[e]).html(transText);
            }
        }
    }
}
