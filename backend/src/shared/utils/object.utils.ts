import { uniq } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = (object: any, path: string) => {
    const value = path.split('.').reduce((m, o) => (Array.isArray(m) ? uniq(m.map((e) => e[o])) : m && m[o]), object);
    // eslint-disable-next-line id-blacklist
    return value === undefined ? 'null' : value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any) => value instanceof Object && value.constructor === Object;
