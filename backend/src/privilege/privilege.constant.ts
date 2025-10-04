import { Privilege } from './privilege.model';

export const PRIVILEGES_FILTER_FIELDS_MAP: Record<string, string> = {
    names: 'name',
};

export const PRIVILEGES_SEARCH_FIELDS_MAP: Array<keyof Privilege> = ['name'];
export const PRIVILEGES_AUTOCOMPLETION_SEARCH_FIELDS_MAP: Array<keyof Privilege> = ['name'];
