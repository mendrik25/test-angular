import { BaseRepository } from '../common/repository/base.repository';
import { Role } from './role.model';
import { RoleDocument, roleModel } from './role.schema';

class RoleRepository extends BaseRepository<RoleDocument, Role> {
    PRIVILEGE_POPULATION_STAGE = [
        {
            $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'role'
            }
        },
        {
            $unwind: {
                path: '$role',
                preserveNullAndEmptyArrays: true
            }
        }
    ];

    constructor() {
        super(roleModel);
    }
}

export const roleRepository = new RoleRepository();
