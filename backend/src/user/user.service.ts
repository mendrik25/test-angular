import { ServiceWrite } from "../common/service/service-write.interface";
import { RoleType } from "../role/role.model";
import { Page } from "../shared/types/page.interface";
import { SortDirection } from "../shared/types/sort.type";
import {
  checkDuplication,
  getFiltered,
  initFilterUpdates,
  ListBoxFilter,
  setFilterUpdatesCounts,
} from "../shared/utils/filter-paginate.utils";
import { paginate } from "../shared/utils/paginate.utils";
import {
  ROLE_POPULATION_STAGES,
  USERS_FILTER_FIELDS_MAP,
} from "./user.constant";
import { PaginatedUser, User, UserFilterUpdates } from "./user.model";
import { userRepository } from "./user.repository";
import { userModel } from "./user.schema";
import { UserUtils } from "./user.utils";

export type FilterFieldMap = Record<string, keyof User>;

const USER_FILTER_FIELDS_MAP: FilterFieldMap = {};
const USER_SEARCH_FIELDS_MAP: Array<string> = [
  "firstName",
  "lastName",
  "login",
  "role.name",
];

class UserService implements ServiceWrite<User> {
  update(id: string, item: User): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async getPaginatedList(
    search: string,
    listBoxFilter: ListBoxFilter,
    page: Page
  ): Promise<PaginatedUser> {
    const users: User[] = await getFiltered({
      model: userModel,
      populationStages: ROLE_POPULATION_STAGES,
      listBoxFilterFieldMap: USER_FILTER_FIELDS_MAP,
      searchFields: USER_SEARCH_FIELDS_MAP,
      search,
      additionnalCriteria: {
        "role.type": { $ne: RoleType.SUPER_ADMIN },
      },
      listBoxFilter,
      sort: {
        by: "fullname",
        direction: SortDirection.asc,
      },
    }).exec();

    const filterUpdates = await initFilterUpdates(
      USERS_FILTER_FIELDS_MAP,
      userRepository
    );
    setFilterUpdatesCounts(filterUpdates, users, USERS_FILTER_FIELDS_MAP);
    const items = paginate(users, page).map(
      ({ password, ...user }) => user as User
    );
    return {
      items,
      totalItems: users.length,
      filter: filterUpdates as UserFilterUpdates,
    };
  }

  async getById(id: string): Promise<User | null> {
    return userRepository.findById(id).exec();
  }

  async create(item: User): Promise<User> {
    const { _id, ...itemWithoutId } = item;
    return userRepository.create({
      ...itemWithoutId,
      fullName: UserUtils.getFullName(itemWithoutId),
    } as Omit<User, "_id>">);
  }

  async delete(id: string): Promise<boolean> {
    return userRepository.delete(id);
  }

  async checkDuplication(user: User): Promise<boolean> {
    return checkDuplication(userRepository, "login", user);
  }
}

export const userService = new UserService();
