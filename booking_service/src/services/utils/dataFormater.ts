import dayjs from 'dayjs';

export function dataFormater(value: string | undefined): string {
    if (!value) {
        return '';
    }

    const cleanedValue = value.replace(/\D/g, '');

    const limitedValue = cleanedValue.substring(0, 8);

    let formattedValue = '';

    if (limitedValue.length > 0) {
        formattedValue += limitedValue.substring(0, 2);
    }
    if (limitedValue.length >= 2) {
        formattedValue += '.' + limitedValue.substring(2, 4);
    }
    if (limitedValue.length >= 4) {
        formattedValue += '.' + limitedValue.substring(4, 8);
    }

    return formattedValue;
}

export const humanizeDate = (date: Date | string | undefined) => dayjs(date).format('DD.MM.YYYY');

export const getAltDate = (date: string | undefined | Date) => dayjs(date).format('YYYY-MM-DD');

export const getAltDateFor = (date: string | Date) => dayjs(date).format('MM.DD.YYYY');