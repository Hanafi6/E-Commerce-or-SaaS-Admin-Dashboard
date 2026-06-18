import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    FilterFn,
    CellContext,
    FilterFnOption,
} from "@tanstack/react-table";

export type AutoColumnConfig<TData> = {
    [K in keyof TData]?: {
        // filterFn?: "equals" | "includesString" | "between" | FilterFnOption<T>;
        filterFn?: FilterFnOption<TData> | (string & {});
        enableSorting?: boolean;
    };
};
// filterFn?: FilterFnOption<TData> | (string & {});

interface UseCustomTableProps<TData> {
    data: TData[];
    columnKeys: (keyof TData)[];
    skipColumns?: (keyof TData)[];

    autoFilterColumns?: AutoColumnConfig<TData>;
    filterFns?: Record<string, FilterFn<TData>>;

    customCells?: {
        [K in keyof TData]?: (info: CellContext<TData, TData[K]>) => React.ReactNode;
    };
}

export function useCustomTable<TData extends Record<string, any>>({
    data = [],
    columnKeys,
    skipColumns = [],
    autoFilterColumns = {},
    filterFns = {},
    customCells = {},
}: UseCustomTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = useMemo(() => {
        return columnKeys
            .filter((key) => !skipColumns.includes(key))
            .map((key) => {
                const keyStr = String(key);

                const filterConfig = autoFilterColumns[key];

                const column: ColumnDef<TData, any> = {
                    id: keyStr,
                    accessorKey: keyStr,
                    header: keyStr
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase()),
                    cell: customCells[key]
                        ? (info) => customCells[key]!(info)
                        : (info) => info.getValue(),
                    ...filterConfig,
                    filterFn: filterConfig?.filterFn as any,
                };
                return column;
            });
    }, [columnKeys, skipColumns, autoFilterColumns, customCells]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        filterFns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return { table, columns };
}