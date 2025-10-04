import { Role } from './role.model';

export type FilterFieldMap = Record<string, keyof Role>;

export const ROLES_FILTER_FIELDS_MAP: FilterFieldMap = {};

export const ROLES_SEARCH_FIELDS_MAP: Array<string> = ['name'];

export const PRIVILEGE_POPULATION_STAGES = [
    {
        $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'role',
        },
    },
    {
        $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true,
        },
    },
];
