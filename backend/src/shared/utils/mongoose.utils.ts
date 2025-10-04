/* eslint-disable no-bitwise */
export const generateObjectId = () => {
    const currentTimestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return currentTimestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asId = <T extends { _id: any }>(o: T | string): string => (typeof o === 'string' ? o : (o._id.toString() as string));
