import { User } from './user.model';

export const USER_ERRORS = {
    OLD_PASSWORD_INCORRECT: 'Ancien mot de passe incorrecte',
    NEW_PASSWORD_EQUALS_TO_OLD: 'Ancien mot de passe identique au nouveau mot de passe',
};

export type FilterFieldMap = Record<string, keyof User>;

export const USERS_FILTER_FIELDS_MAP: FilterFieldMap = {};

export const USERS_SEARCH_FIELDS_MAP: Array<string> = ['firstName', 'lastName', 'login', 'role.name'];

export const ROLE_POPULATION_STAGES = [
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
