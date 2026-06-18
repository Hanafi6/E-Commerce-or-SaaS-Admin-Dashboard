import { Column } from "@tanstack/react-table";
import { FITERSType } from "./SearchBar"; // أو من ملف الـ types عندك

interface FilterInputFieldProps<TData> {
    config: FITERSType;
    column: Column<TData, unknown>;
    dynamicOptions: string[];
}

export function FilterInputField<TData>({
    config,
    column,
    dynamicOptions
}: FilterInputFieldProps<TData>) {

    if (config.type === "select") {
        const currentValue = (column.getFilterValue() as string) ?? "";
        return (
            <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground">{config.label}</label>
                <select
                    value={currentValue}
                    onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                    className="w-full px-3 py-1.5 border border-border rounded-xl text-xs bg-background text-foreground capitalize cursor-pointer"
                >
                    <option value="">All {config.label}s</option>
                    {dynamicOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }

    if (config.type === "custom-select") {
        const currentValue = (column.getFilterValue() as string) ?? "";
        return (
            <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground">{config.label}</label>
                <select
                    value={currentValue}
                    onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                    className="w-full px-3 py-1.5 border border-border rounded-xl text-xs bg-background text-foreground cursor-pointer"
                >
                    <option value="">All {config.label}s</option>
                    {config.options?.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                </select>
            </div>
        );
    }

    if (config.type === "range") {
        const currentValue = (column.getFilterValue() as { min?: number; max?: number }) || {};
        return (
            <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground">{config.label}</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder={config.rangeConfig?.minPlaceholder || "Min"}
                        value={currentValue.min ?? ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            column.setFilterValue((old: any = {}) => ({
                                ...old,
                                min: val ? Number(val) : undefined,
                            }));
                        }}
                        className="w-full text-center p-1.5 border border-border rounded-xl text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                        type="number"
                        placeholder={config.rangeConfig?.maxPlaceholder || "Max"}
                        value={currentValue.max ?? ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            column.setFilterValue((old: any = {}) => ({
                                ...old,
                                max: val ? Number(val) : undefined,
                            }));
                        }}
                        className="w-full text-center p-1.5 border border-border rounded-xl text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>
        );
    }

    return null;
}