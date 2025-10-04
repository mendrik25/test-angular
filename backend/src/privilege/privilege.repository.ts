import { BaseRepository } from '../common/repository/base.repository';
import { Privilege } from './privilege.model';
import { PrivilegeDocument, privilegeModel } from './privilege.schema';

class PrivilegeRepository extends BaseRepository<PrivilegeDocument, Privilege> {
    constructor() {
        super(privilegeModel);
    }
}

export const privilegeRepository = new PrivilegeRepository();
