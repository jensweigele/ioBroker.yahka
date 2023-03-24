export module Utils {
    export function getInputValue(input: HTMLInputElement | HTMLTextAreaElement, emptyStringAsUndefined: boolean = true) {
        if (input == null)
            return undefined;

        if ((input.type == 'checkbox') && ('checked' in input)) {
            return input.checked;
        }


        if ('valueAsDate' in input) {
            let dateValue = input.valueAsDate;
            if (dateValue)
                return dateValue;
        }

        if ('valueAsNumber' in input) {
            let numValue = input.valueAsNumber;
            if (!isNaN(numValue))
                return numValue;
        }

        let stringValue = input.value;
        if ((stringValue === '') && emptyStringAsUndefined) {
            return undefined;
        }

        if (stringValue !== '') {
            let strAsNumber = Number(stringValue);
            if (!isNaN(strAsNumber)) {
                return strAsNumber;
            }
        }

        return stringValue;
    }

    export function getSelectInputValue(input: HTMLSelectElement, emptyStringAsUndefined: boolean = true) {
        if (input == null)
            return undefined;

        let stringValue = input.value;
        if ((stringValue === '') && emptyStringAsUndefined)
            return undefined;

        if (stringValue !== '') {
            let strAsNumber = Number(stringValue);
            if (!isNaN(strAsNumber))
                return strAsNumber;
        }

        return stringValue;
    }

    export function setInputValue(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: any) {
        if (input === undefined || input === null)
            return;

        if (input.type == 'checkbox') {
            (<HTMLInputElement>input).checked = Boolean(value);
        } else {
            input.value = ((value !== undefined) && (value !== null)) ? value : '';
        }
    }

}