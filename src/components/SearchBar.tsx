import { Search, SlidersHorizontal, RotateCcw, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { GropingBy as getGroupingBy } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { FilterInputField } from "@/components/FilterSelector";

export type TypeOfGiniricType = "custom-select" | "range" | "select";

export interface FITERSType {
    id: string;
    label: string;
    type: TypeOfGiniricType;
    options?: { id: string; label: string }[];
    rangeConfig?: {
        minPlaceholder: string;
        maxPlaceholder: string;
        unit: string;
    };
}

export type SearchBarViewType = "products" | "users" | "orders";

interface SearchBarProps<TData> {
    type: SearchBarViewType;
    table: Table<TData>;
    rawData?: TData[];
    onSearch: (text: string) => void;
    placeholder?: string;
    filterColumns: FITERSType[];
}

export default function SearchBar<TData>({
    table,
    onSearch,
    rawData,
    placeholder = "Search...",
    filterColumns
}: SearchBarProps<TData>) {
    if (!table) return null;

    const columnFilters = table.getState().columnFilters;

    const dynamicFiltersOptions = useMemo(() => {
        const optionsMap: Record<string, string[]> = {};

        filterColumns.forEach((col) => {
            if (col.type === "select") {
                const grouped = getGroupingBy<TData>({
                    data: rawData as TData[],
                    keySelector: (item: any) => item[col.id] ?? "",
                });
                optionsMap[col.id] = Object.keys(grouped).filter(Boolean);
            }
        });
        return optionsMap;
    }, [rawData, filterColumns]);

    return (
        <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border w-full text-left" dir="ltr">
            <div className="flex flex-col sm:flex-row gap-3">

                {/* Input Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Advanced Filter Popover */}
                <div className="flex flex-col items-stretch sm:items-start justify-start gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-2 border border-border bg-card hover:bg-muted text-foreground px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 w-full sm:w-auto justify-center"
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>Advanced Filter</span>
                                {columnFilters.length > 0 && (
                                    <span className="flex h-2 w-2 rounded-full bg-primary" />
                                )}
                            </button>
                        </PopoverTrigger>

                        <PopoverContent align="end" className="w-72 p-4 bg-card border border-border rounded-2xl shadow-xl space-y-4 z-50" dir="ltr">
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-foreground">Advanced Filters</h4>
                                <p className="text-[10px] text-muted-foreground">Fine-tune your data view based on page requirements.</p>
                            </div>

                            <hr className="border-border" />

                            {/* روقان الـ Mapping هنا 👇 */}
                            <div className="space-y-4">
                                {filterColumns.map((col) => {
                                    const column = table?.getColumn(col.id);
                                    if (!column) return null;

                                    return (
                                        <FilterInputField
                                            key={col.id}
                                            config={col}
                                            column={column}
                                            dynamicOptions={dynamicFiltersOptions[col.id] || []}
                                        />
                                    );
                                })}
                            </div>

                            {/* Reset Button */}
                            {columnFilters.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => table.resetColumnFilters()}
                                    className="w-full flex items-center justify-center gap-1.5 text-[10px] font-medium text-destructive hover:bg-destructive/10 p-1.5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-destructive/20 mt-2"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Reset Filters</span>
                                </button>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <ActiveFilterBadges columnFilters={columnFilters} filterColumns={filterColumns} table={table} />
        </div>
    );
}


interface ActiveFilterBadgesProps<TData> {
    columnFilters: ColumnFiltersState;
    filterColumns: FITERSType[];
    table: Table<TData>;
}

function ActiveFilterBadges<TData>({ columnFilters, filterColumns, table }: ActiveFilterBadgesProps<TData>) {
    return (<AnimatePresence mode="popLayout">
        {columnFilters.length > 0 && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 500, damping: 30 }}
                className="flex flex-wrap gap-1.5 pt-1 items-center justify-start text-left"
            >
                <span className="text-[10px] text-muted-foreground font-medium mr-1">Active Filters:</span>

                {columnFilters.map((filter) => {
                    const config = filterColumns.find((c) => c.id === filter.id);
                    if (!config) return null;

                    const column = table.getColumn(filter.id);
                    const filterValue = filter.value;

                    if (config.type === "range" && filterValue && typeof filterValue === "object") {
                        const { min, max } = filterValue as { min?: number; max?: number };
                        if (min === undefined && max === undefined) return null;

                        const unit = config.rangeConfig?.unit || "";
                        let rangeLabel = "";

                        if (min !== undefined && max !== undefined) rangeLabel = `${min} - ${max} ${unit}`;
                        else if (min !== undefined) rangeLabel = `> ${min} ${unit}`;
                        else if (max !== undefined) rangeLabel = `< ${max} ${unit}`;

                        return (
                            <motion.div
                                layout
                                key={filter.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                            >
                                <span>{config.label}: {rangeLabel}</span>
                                <button
                                    type="button"
                                    onClick={() => column?.setFilterValue(undefined)}
                                    className="hover:bg-primary/20 rounded-full p-0.5 cursor-pointer"
                                >
                                    <X className="w-2.5 h-2.5" />
                                </button>
                            </motion.div>
                        );
                    }

                    if (typeof filterValue === "string" && filterValue) {
                        const displayValue = config.type === "custom-select"
                            ? config.options?.find(o => o.id === filterValue)?.label || filterValue
                            : filterValue;

                        return (
                            <motion.div
                                layout
                                key={filter.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                            >
                                <span>{config.label}: {displayValue}</span>
                                <button
                                    type="button"
                                    onClick={() => column?.setFilterValue(undefined)}
                                    className="hover:bg-primary/20 rounded-full p-0.5 cursor-pointer"
                                >
                                    <X className="w-2.5 h-2.5" />
                                </button>
                            </motion.div>
                        );
                    }

                    return null;
                })}
            </motion.div>
        )}
    </AnimatePresence>)
}