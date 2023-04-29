import { format, getTime, formatDistanceToNow } from 'date-fns';
import { fr } from "date-fns/locale"

export function fDate(date, newFormat) {
    const fm = newFormat || 'dd MMMM yyyy';

    return date ? format(new Date(date), fm, { locale: fr }) : '';
}

export function fDateTime(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy p';

    return date ? format(new Date(date), fm, { locale: fr }) : '';
}

export function fTimestamp(date) {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: fr
        })
        : '';
}