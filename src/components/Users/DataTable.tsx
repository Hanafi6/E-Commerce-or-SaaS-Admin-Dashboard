"use client"

import { useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { motion, AnimatePresence } from "framer-motion"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data = [],
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        columnResizeMode: "onChange",
    })

    const MotionTableRow = motion.create(TableRow)

    const nameSearchValue = (columnFilters.find((f) => f.id === "name")?.value as string) || ""
    const roleSearchValue = (columnFilters.find((f) => f.id === "role")?.value as string) || ""
    const ageSearchValue = (columnFilters.find((f) => f.id === "age")?.value as number) || ""

    return (
        <div className="space-y-4">

            {/* 🛠️ 2️⃣ بار الفلاتر المجمعة */}
            <div className="flex flex-wrap items-center gap-4 py-2">

                {/* أ) فلتر الإسم (Text Input) */}
                <input
                    placeholder="Search name..."
                    value={nameSearchValue}
                    onChange={(e) => {
                        table.getColumn("name")?.setFilterValue(e.target.value);
                    }}
                    className="w-full max-w-xs px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* ب) فلتر الـ Role لو أدمن أو مستخدم (Select Dropdown) */}
                <select
                    value={roleSearchValue}
                    onChange={(e) => {
                        // لو اختار "All" بنباصي undefined أو string فاضي عشان نلغي فلتر العمود ده
                        table.getColumn("role")?.setFilterValue(e.target.value || undefined);
                    }}
                    className="px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>

                {/* ج) فلتر السن فوق الـ 30 (Checkbox مخصص) */}
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={ageSearchValue === 30}
                        onChange={(e) => {
                            // لو معلم عليه، بنقول للتن ستاك فلتر عمود الـ age. 
                            // 💡 تنبيه: تان ستاك بيعمل سرش بـ النص الافتراضي، عشان تعمل مقارنة (أكبر من) 
                            // هقولك بنظبطها فين في الـ Columns Def تحت كود الجدول.
                            table.getColumn("age")?.setFilterValue(e.target.checked ? 30 : undefined);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>Show Age &gt; 30 Only</span>
                </label>
            </div>

            {/* هيكل الجدول المتبقي كما هو بدون أي تغيير */}
            <div className="overflow-x-auto rounded-md border bg-background">
                <Table style={{ minWidth: table.getCenterTotalSize() }} className="w-full table-fixed border-collapse">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            rowSpan={header.rowSpan}
                                            style={{ width: header.getSize() }}
                                            className="relative text-center font-bold border-b border-r last:border-r-0 h-12 select-none"
                                        >
                                            <div
                                                className={`flex items-center justify-center gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                {header.column.getCanSort() && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : " ↕️"}
                                                    </span>
                                                )}
                                            </div>

                                            {header.column.getCanResize() && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`absolute right-0 top-0 h-full w-1 cursor-col-resize user-select-none touch-none z-10
                                                        hover:bg-primary/50 transition-colors duration-150
                                                        ${header.column.getIsResizing() ? "bg-primary w-1.5" : "bg-transparent"}
                                                    `}
                                                />
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody className="relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <MotionTableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="w-full"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{ width: cell.column.getSize() }}
                                                className="border-r last:border-r-0 truncate text-center"
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </MotionTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* الـ Pagination Footer بتاعك ثابت وجميل */}
            <div className="flex items-center justify-between py-2 px-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 transition-all active:scale-95 text-sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium mx-1">{table.getState().pagination.pageIndex + 1}</span>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 transition-all active:scale-95 text-sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}