// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sort = (items: any[], sorting: any) => {
    const direction = sorting.direction === 'asc' ? 1 : -1;
    return items.sort((a, b) => (a[sorting.by] > b[sorting.by] ? direction : -direction));
};
