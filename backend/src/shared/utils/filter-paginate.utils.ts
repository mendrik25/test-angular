import { uniq } from "lodash";
import { Aggregate, Document, Model } from "mongoose";
import { BaseRepository } from "../../common/repository/base.repository";
import { FilterItem } from "../types/filter-item.interface";
import { PeriodFilter } from "../types/period-filter.interface";
import { Sort } from "../types/sort.type";

export type FilterFieldMap = Record<string, string>;

export type SearchFields = string[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListBoxFilter = Record<string, Array<any>>;

export type FilterUpdates = Record<string, FilterItem[]>;

export interface FilterUpdateConfig {
  filter: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: BaseRepository<any, any>;
  criteria: object;
  field: string;
  addNull: boolean;
}

interface FilterParam<T extends Document> {
  model: Model<T>;
  populationStages?: object[];
  listBoxFilterFieldMap?: FilterFieldMap;
  searchFields?: SearchFields;
  search?: string;
  listBoxFilter?: ListBoxFilter;
  additionnalCriteria?: object;
  sort?: Sort;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = (object: any, path: string) => {
  const value = path
    .split(".")
    .reduce(
      (m, o) => (Array.isArray(m) ? uniq(m.map((e) => e[o])) : m && m[o]),
      object
    );
  // eslint-disable-next-line id-blacklist
  return value === undefined ? "null" : value;
};

export const initFilterUpdates = async <T extends Document, U>(
  fieldMap: FilterFieldMap,
  repository: BaseRepository<T, U>
): Promise<FilterUpdates> => {
  const filterUpdates: FilterUpdates = {};
  for (const key in fieldMap) {
    if (fieldMap.hasOwnProperty(key)) {
      const items = await repository.find({}).distinct(fieldMap[key]).exec();
      items.sort();
      filterUpdates[key] = (items as string[]).map(
        (name: string): FilterItem => ({ name, count: 0 })
      );
    }
  }
  return filterUpdates;
};

export const initFilterUpdatesUsingMultipleRepository = async (
  filterUpdateConfigs: FilterUpdateConfig[]
): Promise<Record<string, FilterItem[]>> => {
  const filterUpdates: FilterUpdates = {};
  for (const {
    filter,
    repository,
    criteria,
    field,
    addNull,
  } of filterUpdateConfigs) {
    const items = await repository.find(criteria).distinct(field).exec();
    items.sort();
    filterUpdates[filter] = items.map(
      (name: string): FilterItem => ({ name, count: 0 })
    );
    if (addNull) {
      filterUpdates[filter].push({ name: "null", count: 0 });
    }
  }
  return filterUpdates as Record<string, FilterItem[]>;
};

export const setFilterUpdatesCounts = <T>(
  filterUpdates: FilterUpdates,
  entities: T[],
  listBoxFilterFieldMap: FilterFieldMap,
  incrementFn: (entity: T) => number = () => 1
) => {
  const counts: Record<string, Record<string, number>> = Object.assign(
    {},
    ...Object.keys(listBoxFilterFieldMap).map((key) => ({ [key]: {} }))
  );
  entities.forEach((entity: T) => {
    Object.entries(listBoxFilterFieldMap).forEach(([key, value]) => {
      const val = get(entity, value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values: any[] = Array.isArray(val) ? val : [val];
      values.forEach((v) => {
        counts[key][v] = (counts[key][v] || 0) + incrementFn(entity);
      });
    });
  });
  Object.entries(filterUpdates).forEach(([key, filterItems]) => {
    filterItems.forEach(
      (filterItem: FilterItem) =>
        (filterItem.count = counts[key][filterItem.name])
    );
  });
};

export const buildSearchCriteria = (
  search: string | null | undefined,
  searchFields: Array<string> = []
): Object =>
  search
    ? {
        $or: searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      }
    : {};

export const buildFilterCriteria = (
  listBoxFilter: ListBoxFilter = {},
  fieldMap: FilterFieldMap = {}
): object => {
  const filterCriteria = listBoxFilter
    ? Object.assign(
        {},
        ...Object.entries(listBoxFilter)
          .filter(
            ([key, value]) =>
              fieldMap[key as string] &&
              (Array.isArray(value) ? value.length : value)
          )
          .map(([key, value]) => ({
            [fieldMap[key as string]]: {
              $in: Array.isArray(value) ? value : [value],
            },
          }))
      )
    : {};
  return filterCriteria;
};

export const getFiltered = <T extends Document>({
  model,
  populationStages = [],
  listBoxFilterFieldMap,
  searchFields,
  search,
  listBoxFilter,
  additionnalCriteria = {},
  sort = undefined,
}: FilterParam<T>): Aggregate<T[]> => {
  const searchCriteria = buildSearchCriteria(search, searchFields);
  const filterCriteria = buildFilterCriteria(
    listBoxFilter,
    listBoxFilterFieldMap
  );
  return model.aggregate([
    ...(populationStages as any[]),
    {
      $match: {
        ...searchCriteria,
        ...filterCriteria,
        ...additionnalCriteria,
      },
    } as any,
    {
      $sort: sort
        ? {
            [sort.by]: sort.direction === "asc" ? 1 : -1,
          }
        : {},
    } as any,
  ]);
};

export const buildPeriodCriteria = (
  field: string,
  periodFilter: PeriodFilter
): object => {
  const { from, to } = periodFilter;
  return from || to
    ? {
        [field]: {
          ...(from ? { $gte: new Date(from) } : {}),
          ...(to ? { $lt: new Date(to) } : {}),
        },
      }
    : {};
};

export const checkDuplication = async <T extends Document, U>(
  repository: BaseRepository<T, U>,
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any
): Promise<boolean> => {
  let criteria: object = { [key]: target[key] };
  if (target._id) {
    criteria = { ...criteria, _id: { $ne: target._id } };
  }
  const existing = await repository.findOne(criteria).exec();
  return !!existing;
};
