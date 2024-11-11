export function phoneFormater(value: string | undefined): string {
    if (!value) {
        return '';
    }

    const cleanedValue = value.replace(/\D/g, '');

    const limitedValue = cleanedValue.substring(0, 11);

    let formattedValue = '+7';

    if (limitedValue.length > 1) {
        formattedValue += ` (${limitedValue.substring(1, 4)}`;
    }
    if (limitedValue.length >= 5) {
        formattedValue += `) ${limitedValue.substring(4, 7)}`;
    }
    if (limitedValue.length >= 8) {
        formattedValue += `-${limitedValue.substring(7, 9)}`;
    }
    if (limitedValue.length >= 10) {
        formattedValue += `-${limitedValue.substring(9, 11)}`;
    }

    return formattedValue;
}
