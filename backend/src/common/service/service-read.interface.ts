import { Page, Paginated } from '../../shared/types/page.interface';
import { Sort } from '../../shared/types/sort.type';

export interface ServiceRead<T> {
    getPaginatedList(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        criteria: Record<string, any>,
        page: Page,
        order: Sort
    ): Promise<Paginated<T>>;
    getById(id: string): Promise<T | null>;
}
