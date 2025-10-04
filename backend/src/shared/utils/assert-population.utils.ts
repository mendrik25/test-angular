import { get } from 'lodash';
import { HttpStatusCode } from '../constants/http-status-codes.constant';
import { HttpException } from '../types/http-exception.interface';

export const assertIsPopulated = (objectName: string, data: object | object[], field: string, entireField = field) => {
    const obj = Array.isArray(data) ? data[0] : data;
    if (!obj) {
        return;
    }
    const [curr, ...rest] = field.split('.');
    let subObj = get(obj, curr);
    Array.isArray(subObj) && (subObj = subObj[0]);
    if (!subObj) {
        return;
    }
    const path = `${objectName}.${entireField.split(field)[0]}${field}`;
    if (typeof subObj === 'string') {
        throw new HttpException(HttpStatusCode.METHOD_FAILURE, `Field '${path}' is not populated`);
    }
    if (rest.length === 0) {
        return;
    }
    assertIsPopulated(objectName, subObj, rest.join('.'), entireField);
};
