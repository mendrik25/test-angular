import * as faker from 'faker';
import * as fs from 'fs';
import { logger } from '../../app/app.logger';

export const takeOneRandomlyFrom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const sliceRandomlyFrom = <T>(items: T[], max = 1000): T[] => {
    let start: number, end: number;
    do {
        start = Math.floor(Math.random() * items.length);
        end = Math.floor(Math.random() * items.length);
    } while (end < start || end - start > max);
    return items.slice(start, end + 1);
};

// String of 24 hex characters:
export const mongoDbObjectId = (): string => faker.random.uuid().slice(9).replace(/-/g, '');

export const writeToJson = <T>(filename: string, items: T[]) => {
    fs.writeFile(`./seeds/${filename}`, JSON.stringify(items), () => {
        logger.info(`${filename} successfully created, type 'npm run seed' to insert it into database`);
    });
};

export const getFromJson = <T>(filename: string): T[] => JSON.parse(fs.readFileSync(`./seeds/${filename}`, 'utf8')) as T[];
