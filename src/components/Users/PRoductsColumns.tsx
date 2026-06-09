import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types"

export const PRODUCT_COLUMNS: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        accessorKey: "name",
        header: "اسم المنتج",
    },
    {
        accessorKey: "category",
        header: "الفئة",
    },
    {
        accessorKey: "price",
        header: "السعر",
        enableSorting: true,
        filterFn: "priceFilter",
    },
    {
        accessorKey: "stock",
        header: "الكمية في المخزن",
        enableSorting: true,
        filterFn: "stockFilter",
    },
];

export const productColumns = (): ColumnDef<Product>[] => PRODUCT_COLUMNS;