import { ServiceWrite } from '../common/service/service-write.interface';
import { Page } from '../shared/types/page.interface';
import { SortDirection } from '../shared/types/sort.type';
import { getFiltered, initFilterUpdates, ListBoxFilter, setFilterUpdatesCounts } from '../shared/utils/filter-paginate.utils';
import { paginate } from '../shared/utils/paginate.utils';
import { PRIVILEGES_FILTER_FIELDS_MAP, PRIVILEGES_SEARCH_FIELDS_MAP } from './privilege.constant';
import { PaginatedPrivilege, Privilege, PrivilegeFilterUpdates } from './privilege.model';
import { privilegeRepository } from './privilege.repository';
import { privilegeModel } from './privilege.schema';

class PrivilegeService implements ServiceWrite<Privilege> {
    async getPaginatedList(search: string, listBoxFilter: ListBoxFilter, page: Page): Promise<PaginatedPrivilege> {
        const privileges = await getFiltered({
            model: privilegeModel,
            listBoxFilterFieldMap: PRIVILEGES_FILTER_FIELDS_MAP,
            searchFields: PRIVILEGES_SEARCH_FIELDS_MAP,
            search,
            listBoxFilter,
            sort: { by: 'lastname', direction: SortDirection.asc },
        });

        const filterUpdates = await initFilterUpdates(PRIVILEGES_FILTER_FIELDS_MAP, privilegeRepository);
        setFilterUpdatesCounts(filterUpdates, privileges, PRIVILEGES_FILTER_FIELDS_MAP);
        return {
            items: paginate(privileges, page),
            totalItems: privileges.length,
            filter: filterUpdates as PrivilegeFilterUpdates,
        };
    }
    async getAll() {
        return privilegeRepository.find({}).exec();
    }

    async getById(id: string): Promise<Privilege | null> {
        return privilegeRepository.findById(id).exec();
    }

    async create(item: Privilege): Promise<Privilege> {
        return privilegeRepository.create(item);
    }

    async delete(id: string): Promise<boolean> {
        return privilegeRepository.delete(id);
    }

    async update(id: string, item: Privilege): Promise<Privilege | null> {
        return privilegeRepository.update(id, item);
    }
}

export const privilegeService = new PrivilegeService();
