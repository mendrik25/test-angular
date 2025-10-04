import { FilterItem } from "../shared/types/filter-item.interface";
import { Paginated } from "../shared/types/page.interface";

export enum UserPrivileges {
  VIEW_USER = "VIEW_USER",
  CREATE_USER = "CREATE_USER",
  EDIT_USER = "EDIT_USER",
  DELETE_USER = "DELETE_USER",
  VIEW_USER_PROFILE = "VIEW_USER_PROFILE",
  EDIT_USER_PROFILE = "EDIT_USER_PROFILE",
  VIEW_ROLE = "VIEW_ROLE",
  CREATE_ROLE = "CREATE_ROLE",
  EDIT_ROLE = "EDIT_ROLE",
  DELETE_ROLE = "DELETE_ROLE",

  VIEW_PATIENT = "VIEW_PATIENT",
  CREATE_PATIENT = "CREATE_PATIENT",
  EDIT_PATIENT = "EDIT_PATIENT",
  DELETE_PATIENT = "DELETE_PATIENT",
}

export enum PrivilegeCategories {
  USER = "USER",
  ROLE = "ROLE",
  PATIENT = "PATIENT",
}

export interface Privilege {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  name: UserPrivileges;
  category: PrivilegeCategories;
}

export interface PrivilegeFilterUpdates extends Record<string, FilterItem[]> {
  firstnames: FilterItem[];
}

export interface PaginatedPrivilege extends Paginated<Privilege> {
  filter: PrivilegeFilterUpdates;
}
