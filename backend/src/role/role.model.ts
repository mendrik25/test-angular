import { ObjectId } from 'mongodb';
import { Privilege } from '../privilege/privilege.model';
import { FilterItem } from '../shared/types/filter-item.interface';
import { Paginated } from '../shared/types/page.interface';

export enum RoleType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    CLIENT = 'CLIENT',
}

export interface Role {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id: any;
    name: string;
    privileges: Privilege[] | ObjectId[];
    type?: RoleType;
}

export interface RoleFilterUpdates extends Record<string, FilterItem[]> {
    firstnames: FilterItem[];
}

export interface PaginatedRole extends Paginated<Role> {
    filter: RoleFilterUpdates;
}
