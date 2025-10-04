/* eslint-disable @typescript-eslint/no-explicit-any */
// tslint:disable: no-any
import { HttpStatusCode } from '../constants/http-status-codes.constant';
import { HttpException } from '../types/http-exception.interface';
import { Tree } from '../types/tree.interface';

const ROOT_KEY = 'root';

export const groupByParent = async (elements: Tree[]): Promise<Record<string, Tree[]>> =>
    elements.reduce<Record<string, Tree[]>>((acc, current) => {
        const key: string = current.parent ? current.parent._id : ROOT_KEY;
        acc[key] = acc[key] || [];
        acc[key].push(current);
        return acc;
    }, {});

export const assignChildrenToParent = async (groupedElements: Record<string, Tree[]>, repository: any): Promise<Tree[]> => {
    const result: Tree[] = [...(groupedElements[ROOT_KEY] || [])];
    for (const key of Object.keys(groupedElements)) {
        if (key === ROOT_KEY) {
            continue;
        }
        const existingParent = result.find((e) => String(e._id) === String(key));
        if (existingParent) {
            existingParent.children = groupedElements[key];
        } else {
            const parent: Tree | null = (await repository.findOne({ _id: key }).lean().exec()) as Tree;
            if (parent) {
                result.push({
                    ...parent,
                    children: groupedElements[key],
                });
            }
        }
    }
    return result;
};

export const flatTillRoot = async (element: Tree, repository: any): Promise<Tree> => {
    if (!element.parent) {
        return element;
    }
    const parentId = element.parent._id;
    const parent = ((await repository.findOne({ _id: parentId }).lean().exec()) as unknown) as Tree;
    if (!parent) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, parentId);
    }
    parent.children = [{ ...element }];
    return flatTillRoot(parent, repository);
};

export const mergeChildren = async (locations: Tree[], repository: any): Promise<Tree[]> => {
    const groupedTrees: Record<string, Tree[]> = await groupByParent(locations);
    const tempTrees: Tree[] = await assignChildrenToParent(groupedTrees, repository);
    return tempTrees.reduce<Promise<Tree[]>>(async (acc, current) => {
        const flatted = await flatTillRoot(current, repository);
        (await acc).push(flatted);
        return acc;
    }, Promise.resolve([]));
};

export const recursiveDeletion = async (element: Tree, repository: any) => {
    const elementChildren = await repository.find({ parent: element._id }).exec();
    for (const child of elementChildren) {
        await repository.delete(child._id);
        await recursiveDeletion(child, repository);
    }
    await repository.delete(element._id);
};
