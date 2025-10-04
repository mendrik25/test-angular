import * as mongoose from "mongoose";
import { Page } from "../../shared/types/page.interface";
import { Sort } from "../../shared/types/sort.type";

export interface RepositoryRead<T extends mongoose.Document, U> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find(conditions: any): mongoose.Query<T[], T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginated(
    conditions: any,
    page: Page,
    order: Sort
  ): mongoose.Query<T[], T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count(conditions: any): Promise<number>;
  findById(id: string): mongoose.Query<T | null, T>;
  findOne(condition: Partial<T>): mongoose.Query<T | null, T>;
}
