import { flexRender, Table as TableInstance } from "@tanstack/react-table";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface CustomTableProps<TData> {
    table: TableInstance<TData>;
    emptyMessage?: string;
    className?: string;
}

export function CustomTable<TData>({
    table,
    emptyMessage = "لا توجد بيانات تطابق الفلاتر الحالية.",
    className,
}: CustomTableProps<TData>) {
    const rows = table.getRowModel().rows;

    if (rows.length === 0) {
        return (
            <div className={cn("rounded-2xl border border-border bg-card p-8 text-center", className)}>
                <p className="text-xs text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={cn("w-full", className)} dir="rtl">
            {/* Mobile: cards */}
            <div className="space-y-3 md:hidden">
                {rows.map((row) => (
                    <div
                        key={row.id}
                        className="rounded-xl border border-border bg-card p-3 shadow-sm space-y-2"
                    >
                        {row.getVisibleCells().map((cell) => (
                            <div
                                key={cell.id}
                                className="flex items-start justify-between gap-3 text-xs"
                            >
                                <span className="text-muted-foreground shrink-0">
                                    {typeof cell.column.columnDef.header === "string"
                                        ? cell.column.columnDef.header
                                        : cell.column.id}
                                </span>
                                <span className="font-medium text-foreground text-left wrap-break-word">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
                <table className="w-full min-w-[700px] caption-bottom text-sm border-collapse">
                    <TableHeader className="bg-muted/40">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b border-border hover:bg-transparent"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="whitespace-nowrap text-right font-bold text-muted-foreground border-l border-border last:border-l-0 h-10 px-4 text-xs"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    "flex items-center justify-end gap-1",
                                                    header.column.getCanSort() && "cursor-pointer select-none"
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <span className="text-[10px] text-muted-foreground opacity-70">
                                                        {header.column.getIsSorted() === "asc"
                                                            ? "↑"
                                                            : header.column.getIsSorted() === "desc"
                                                                ? "↓"
                                                                : "↕"}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="border-l border-border last:border-l-0 py-2.5 px-4 text-xs text-foreground font-medium text-right max-w-[220px] truncate"
                                        title={String(cell.getValue() ?? "")}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </div>
        </div>
    );
}
