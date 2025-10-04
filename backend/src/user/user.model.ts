import * as mongoose from "mongoose";
import { Role } from "../role/role.model";
import { FilterItem } from "../shared/types/filter-item.interface";
import { Paginated } from "../shared/types/page.interface";

export interface User extends mongoose.Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  firstName: string;
  lastName: string;
  fullName: string;
  login: string;
  password: string;
  role: Role | string;
  validPassword: (p: string) => Promise<boolean>;
}

export interface UserProfile {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  login: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface UserFilterUpdates extends Record<string, FilterItem[]> {
  firstnames: FilterItem[];
}

export interface PaginatedUser extends Paginated<User> {
  filter: UserFilterUpdates;
}
