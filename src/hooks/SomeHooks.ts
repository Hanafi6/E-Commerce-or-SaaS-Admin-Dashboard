export const priceFilterFn = (row: any, columnId: string, filterValue: { min?: number; max?: number }) => {
    if (!filterValue) return true;
    const price = Number(row.getValue(columnId));
    const { min, max } = filterValue;

    console.log(min !== undefined && price < min, max !== undefined && price > max);
    console.log();
    if (min !== undefined && price < min) return false;
    if (max !== undefined && price > max) return false;
    return true;
};

export const stockFilterFn = (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true;
    const stock = Number(row.getValue(columnId));

    if (filterValue === "available") return stock > 0;
    if (filterValue === "out") return stock === 0;
    return true;
};

export const customStatusFilter = (row: any, columnId: string, filterValue: string) => {
    const rowValue = row.getValue(columnId); // true أو false بوليان

    const parsedFilterValue = filterValue === "true" ? true : filterValue === "false" ? false : undefined;

    if (parsedFilterValue === undefined) return true;
    return rowValue === parsedFilterValue;
}