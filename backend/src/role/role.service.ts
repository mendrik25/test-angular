import { ServiceWrite } from '../common/service/service-write.interface';
import { Page } from '../shared/types/page.interface';
import { SortDirection } from '../shared/types/sort.type';
import {
    checkDuplication,
    getFiltered,
    initFilterUpdates,
    ListBoxFilter,
    setFilterUpdatesCounts,
} from '../shared/utils/filter-paginate.utils';
import { paginate } from '../shared/utils/paginate.utils';
import { ROLES_FILTER_FIELDS_MAP, ROLES_SEARCH_FIELDS_MAP } from './role.constant';
import { PaginatedRole, Role, RoleFilterUpdates, RoleType } from './role.model';
import { roleRepository } from './role.repository';
import { roleModel } from './role.schema';

class RoleService implements ServiceWrite<Role> {
    async getPaginatedList(search: string, listBoxFilter: ListBoxFilter, page: Page): Promise<PaginatedRole> {
        const roles = await getFiltered({
            model: roleModel,
            listBoxFilterFieldMap: ROLES_FILTER_FIELDS_MAP,
            searchFields: ROLES_SEARCH_FIELDS_MAP,
            search,
            listBoxFilter,
            sort: { by: 'lastname', direction: SortDirection.asc },
        });

        const filterUpdates = await initFilterUpdates(ROLES_FILTER_FIELDS_MAP, roleRepository);
        setFilterUpdatesCounts(filterUpdates, roles, ROLES_FILTER_FIELDS_MAP);
        return {
            items: paginate(roles, page),
            totalItems: roles.length,
            filter: filterUpdates as RoleFilterUpdates,
        };
    }

    async getAll(): Promise<Role[]> {
        return roleRepository.find({ type: { $ne: RoleType.SUPER_ADMIN } }).exec();
    }

    async getById(id: string): Promise<Role | null> {
        return roleRepository.findById(id).exec();
    }

    async create(item: Role): Promise<Role> {
        delete item._id;
        return roleRepository.create(item);
    }

    async delete(id: string): Promise<boolean> {
        return roleRepository.delete(id);
    }

    async update(id: string, item: Role): Promise<Role | null> {
        return roleRepository.update(id, item);
    }

    async checkDuplication(role: Role): Promise<boolean> {
        return checkDuplication(roleRepository, 'name', role);
    }
}

export const roleService = new RoleService();
