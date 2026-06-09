import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Column, sortingFns, Table } from "@tanstack/react-table";

interface SearchBarProps<TData> {
    onSearch: (text: string) => void;
    table: Table<TData>;
}

function getColumnSafe<TData>(table: Table<TData>, id: string): Column<TData, unknown> | undefined {
    return table.getAllLeafColumns().find((col) => col.id === id);
}

export default function SearchBar<TData>({ onSearch, table }: SearchBarProps<TData>) {
    if (!table) return null;

    const columnFilters = table.getState().columnFilters;


    const stockColumn = getColumnSafe(table, "stock");
    const stockSearchValue = (stockColumn?.getFilterValue() as string) ?? "";
    const priceColumn = getColumnSafe(table, "price");
    const priceFilterValue = priceColumn?.getFilterValue() as { min?: number; max?: number } | undefined;

    const minPriceValue = priceFilterValue?.min ?? "";
    const maxPriceValue = priceFilterValue?.max ?? "";

    return (
        <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl border border-border">
            <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="البحث باسم المنتج أو الـ SKU..."
                    className="w-full bg-background border border-border rounded-lg pr-9 pl-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-right"
                    dir="rtl"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-start">
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2 border border-border bg-card hover:bg-muted text-foreground px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 w-full sm:w-auto justify-center"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>تصفية متقدمة</span>
                            {columnFilters.length > 0 && (
                                <span className="flex h-2 w-2 rounded-full bg-primary" />
                            )}
                        </button>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-72 p-4 bg-card border border-border rounded-2xl shadow-xl space-y-4 z-50 animate-in fade-in-50 duration-200" dir="rtl">
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-foreground">خيارات التصفية الفنية</h4>
                            <p className="text-[10px] text-muted-foreground">فلترة دقيقة لبيانات المخزن الحالي.</p>
                        </div>

                        <hr className="border-border" />

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-muted-foreground">حالة كمية المنتج</label>
                            <select
                                value={stockSearchValue}
                                onChange={(e) => {
                                    stockColumn?.setFilterValue(e.target.value || undefined);
                                }}
                                className="w-full text-right px-3 py-1.5 border border-border rounded-xl text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                            >
                                <option value="">كل الحالات</option>
                                <option value="available">متوفر في المخزن</option>
                                <option value="out">نفذت الكمية</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-muted-foreground">نطاق السعر (جنيه)</label>
                            <div className="flex gap-2" dir="ltr">
                                <input
                                    type="number"
                                    placeholder="الأعلى"
                                    value={maxPriceValue}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        priceColumn?.setFilterValue((old: { min?: number; max?: number } = {}) => ({
                                            ...old,
                                            max: val ? Number(val) : undefined,
                                        }));
                                    }}
                                    className="w-full text-center p-1.5 border border-border rounded-xl text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="number"
                                    placeholder="الأدنى"
                                    value={minPriceValue}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        priceColumn?.setFilterValue((old: { min?: number; max?: number } = {}) => ({
                                            ...old,
                                            min: val ? Number(val) : undefined,
                                        }));
                                    }}
                                    className="w-full text-center p-1.5 border border-border rounded-xl text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {columnFilters.length > 0 && (
                            <button
                                type="button"
                                onClick={() => table.resetColumnFilters()}
                                className="w-full flex items-center justify-center gap-1.5 text-[10px] font-medium text-destructive hover:bg-destructive/10 p-1.5 rounded-xl transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span>إعادة تعيين الفلاتر</span>
                            </button>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
