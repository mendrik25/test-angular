/* eslint-disable @typescript-eslint/no-explicit-any */

import { isObject } from './object.utils';

// eslint-disable-next-line complexity
export const parseQueryParams = (value: any): any => {
    if (isObject(value)) {
        Object.keys(value).forEach((key) => {
            value[key] = parseQueryParams(value[key]);
        });
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((v) => parseQueryParams(v));
    }
    if (value === 'null') {
        return null;
    }
    if (value === 'false') {
        return false;
    }
    if (value === 'true') {
        return true;
    }
    if (value === '') {
        return '';
    }
    if (!isNaN(value) && !/^0[0-9].*$/.test(value)) {
        return +value;
    }
    return value;
};

export const makeValuesArray = (criteria: Record<string, any>, fields: string[]): void => {
    for (const field of fields) {
        criteria[field] && (criteria[field] = Array.isArray(criteria[field]) ? criteria[field] : [criteria[field]]);
    }
};
