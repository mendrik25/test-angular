/* eslint-disable @typescript-eslint/no-explicit-any */
// tslint:disable: no-any

export interface Tree {
    _id: any;
    parent: any | null;
    children?: Tree[];
    chilrenLenght?: number;
}
