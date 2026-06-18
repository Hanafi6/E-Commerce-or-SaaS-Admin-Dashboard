import { Plus, Search, Loader2, AlertCircle } from "lucide-react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { FITERSType, Product } from "@/types";
import SearchBar from "./SearchBar";
import { CustomTable } from "@/components/CustomTable";
import { TablePagination } from "@/components/TablePagination";
import { useCustomTable } from "@/hooks/useCustomTable";
import { priceFilterFn, stockFilterFn } from "@/hooks/SomeHooks";

import DashboardHeader from "@/components/sub-components";

const PRODUCT_COLUMN_KEYS: (keyof Product)[] =
    ["id", "name", "category", "price", "stock"];

interface ProductsPageUIProps {
    products: Product[];
    isLoading: boolean;
    isFetching?: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    onRefetch?: () => void;

    currentPage: number;
    onPageChange: (page: number) => void;

    totalCount: number;
    onSearchChange: (text: string) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalPages: number;

    searchQuery?: string;
    isArabicSearch?: boolean;
}


const PRODUCT_FILTERS: FITERSType[] = [
    {
        id: "stock",
        label: "Socket",
        type: "custom-select",
        options: [
            { id: "available", label: "In Socket" },
            { id: "out", label: "The quantity has been sold out" }
        ]
    },
    {
        id: "price",
        label: "Price",
        type: "range",
        rangeConfig: {
            minPlaceholder: "smaller",
            maxPlaceholder: "The biggest",
            unit: "EGP"
        }
    }
];
const TitlePage = "Products Dashboard";
const description = "Edite Status  For Products";

export default function ProductsPageUI({
    products,
    isLoading,
    isFetching = false,
    isError,
    error,
    onRefetch,
    currentPage,
    onPageChange,
    totalCount,
    onSearchChange,
    isFirstPage,
    isLastPage,
    totalPages,
    searchQuery = "",
    isArabicSearch = false,
}: ProductsPageUIProps) {

    const { table } = useCustomTable<Product>({
        data: products,
        columnKeys: PRODUCT_COLUMN_KEYS,
        skipColumns: ["image"],
        autoFilterColumns: {
            price: { filterFn: "priceFilter", enableSorting: true },
            stock: { filterFn: "stockFilter", enableSorting: true },
        },
        filterFns: {
            priceFilter: priceFilterFn,
            stockFilter: stockFilterFn,

        },
    });

    const filteredRowCount = table.getFilteredRowModel().rows.length;
    const hasActiveFilters = table.getState().columnFilters.length > 0;
    const hasSearchQuery = searchQuery.trim().length > 0;
    const is404Search = isError && (error as any)?.status === 404;

    const hasRealError = isError && !is404Search;

    const showNoResults =
        !isLoading &&
        !hasRealError &&
        (isArabicSearch ||
            is404Search ||
            (hasSearchQuery && products.length === 0) ||
            (hasActiveFilters && filteredRowCount === 0));


    return (
        <section className="space-y-6" dir="rtl">

            <DashboardHeader size="lg">
                <DashboardHeader.Title
                    title={TitlePage}
                    description={description}
                    onRefetch={onRefetch}
                    actionButtonText="Add User"
                    // onActionClick={handleAddUser}
                    actionIcon={<Plus size={14} />}

                />
                <DashboardHeader.Content >
                    <SearchBar
                        rawData={products}
                        type="products" table={table} onSearch={onSearchChange}
                        filterColumns={PRODUCT_FILTERS}
                    />
                </DashboardHeader.Content>
            </DashboardHeader>
            <div className="border border-border rounded-2xl min-h-0 min-w-0 bg-transparent p-4 relative shadow-sm">

                {isFetching && !isLoading && (
                    <div className="absolute inset-0 bg-card/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                )}

                {isLoading && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                        <p className="text-[11px] text-muted-foreground">
                            جاري جلب المنتجات من السيرفر...
                        </p>
                    </div>
                )}

                {hasRealError && (
                    <div className="h-64 flex flex-col items-center justify-center text-center text-destructive">
                        <AlertCircle className="w-6 h-6 mb-2" />
                        <h3 className="text-xs font-semibold mb-1">فشل تحميل البيانات</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            {error && "status" in error ? `خطأ في السيرفر: ${error.status}` : "حدث خطأ غير متوقع في الاتصال"}
                        </p>
                    </div>
                )}

                {showNoResults && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-muted rounded-full mb-2 text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-semibold mb-1">لا توجد نتائج بحث</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            {isArabicSearch
                                ? "البحث باللغة العربية غير مدعوم حالياً. جرّب البحث بالإنجليزية أو الـ SKU."
                                : hasActiveFilters && filteredRowCount === 0
                                    ? "لا توجد منتجات تطابق خيارات التصفية المتقدمة الحالية."
                                    : "لم نجد أي منتجات تطابق بحثك. جرّب كلمات مختلفة أو امسح البحث."}
                        </p>
                    </div>
                )}

                {!isLoading && !isError && products.length === 0 && !hasActiveFilters && !hasSearchQuery && !isArabicSearch && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-muted rounded-full mb-2 text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-semibold mb-1">لا توجد منتجات</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            لا توجد منتجات مسجلة في النظام حالياً.
                        </p>
                    </div>
                )}

                {!isLoading && !hasRealError && !showNoResults && products.length > 0 && (
                    <div className="space-y-4">
                        <CustomTable table={table} />

                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalCount={totalCount}
                            isFirstPage={isFirstPage}
                            isLastPage={isLastPage}
                            isFetching={isFetching}
                            onPageChange={onPageChange}
                            className="sticky bottom-0 bg-card"
                            PaginationButtons={true}
                        />
                    </div>
                )}
            </div>
        </section >
    );
}