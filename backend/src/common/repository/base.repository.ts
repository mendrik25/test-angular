import * as mongoose from "mongoose";
import { Page } from "../../shared/types/page.interface";
import { Sort } from "../../shared/types/sort.type";
import { RepositoryRead } from "./repository-read.interface";
import { RepositoryWrite } from "./repository-write.interface";

export abstract class BaseRepository<T extends mongoose.Document, U>
  implements RepositoryRead<T, U>, RepositoryWrite<T, U>
{
  private readonly model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this.model = schemaModel;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find(conditions: any): mongoose.Query<T[], T> {
    return this.model.find(conditions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginated(
    conditions: any,
    page: Page,
    order: Sort
  ): mongoose.Query<T[], T> {
    return this.find(conditions)
      .sort({ [order.by]: order.direction === "asc" ? 1 : -1 })
      .skip((page.page - 1) * page.pageSize)
      .limit(page.pageSize);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count(conditions: any): Promise<number> {
    return this.model.countDocuments(conditions).exec();
  }

  findById(id: string): mongoose.Query<T | null, T> {
    return this.model.findById(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findOne(conditions: any): mongoose.Query<T | null, T> {
    return this.model.findOne(conditions);
  }

  create(item: Omit<U, "_id">): Promise<T> {
    return this.model.create(item);
  }

  delete(id: string): Promise<boolean> {
    return this.model.deleteOne({ _id: id }).then(() => true);
  }

  update(id: string, item: Partial<U>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, item as mongoose.UpdateQuery<T>, { new: true })
      .exec();
  }
}
