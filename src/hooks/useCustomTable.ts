import { useState, useMemo } from "react"
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
} from "@tanstack/react-table"
import { priceFilterFn, stockFilterFn } from "@/hooks/SomeHooks"

type TFilterFn = "priceFilter" | "stockFilter" | string;

const AUTO_FILTER_COLUMNS: Record<string, { filterFn: TFilterFn; enableSorting?: boolean }> = {
    price: { filterFn: "priceFilter", enableSorting: true },
    stock: { filterFn: "stockFilter", enableSorting: true },
}

interface UseCustomTableProps<TData> {
    data: TData[]
    customColumns?: ColumnDef<TData, any>[]
    filterFns?: Record<string, FilterFn<TData>>

    skipColumns?: (keyof TData)[]
    columnKeys?: (keyof TData)[]

    customCells?: {
        [K in keyof TData]?: (info: CellContext<TData, TData[K]>) => React.ReactNode
    }
}

export function useCustomTable<TData extends Record<string, any>>({
    data = [],
    customColumns,
    filterFns,
    skipColumns = [],
    columnKeys,
    customCells = {}
}: UseCustomTableProps<TData>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const columns = useMemo(() => {
        if (customColumns) return customColumns

        const keys =
            data.length > 0
                ? Object.keys(data[0])
                : columnKeys?.map(String) ?? []

        return keys
            .filter((key) => !skipColumns.includes(key as keyof TData))
            .map((key) => {
                const filterConfig = AUTO_FILTER_COLUMNS[key]
                const column: ColumnDef<TData, any> = {
                    id: key,
                    accessorKey: key,
                    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
                    cell: customCells[key as keyof TData]
                        ? (info) => (customCells[key as keyof TData] as any)!(info)
                        : (info) => info.getValue(),
                    ...filterConfig,
                }
                return column
            })
    }, [data, customColumns, skipColumns, columnKeys, customCells])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        filterFns: {
            priceFilter: priceFilterFn,
            stockFilter: stockFilterFn,
            ...filterFns
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return {
        table,
        columns,
    }
}