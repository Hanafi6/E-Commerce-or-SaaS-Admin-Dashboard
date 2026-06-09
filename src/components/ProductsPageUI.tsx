import { Plus, Search, Loader2, AlertCircle } from "lucide-react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Product } from "@/types";
import SearchBar from "./SearchBar";
import { CustomTable } from "@/components/CustomTable";
import { TablePagination } from "@/components/TablePagination";
import { useCustomTable } from "@/hooks/useCustomTable";

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
    });

    const filteredRowCount = table.getFilteredRowModel().rows.length;
    const hasActiveFilters = table.getState().columnFilters.length > 0;
    const hasSearchQuery = searchQuery.trim().length > 0;

    // 🕵️‍♂️ قفش نوع الخطأ: هل هو 404 بسبب السيرش الغريب؟
    const is404Search = isError && (error as any)?.status === 404;

    // 💥 خطأ حقيقي كارثي: لو حصل إيرور بس "مش" 404 (زي سيرفر واقع 500 أو نت فاصل)
    const hasRealError = isError && !is404Search;

    // 🔍 شاشة "لا توجد نتائج": تظهر لو مفيش تحميل، ومفيش خطأ سيرفر حقيقي، وتحقق شرط من دول
    const showNoResults =
        !isLoading &&
        !hasRealError &&
        (isArabicSearch ||
            is404Search ||
            (hasSearchQuery && products.length === 0) ||
            (hasActiveFilters && filteredRowCount === 0));

    return (
        <section className="space-y-6" dir="rtl">
            {/* الهيدر والأزرار ثابتة وزي الفل */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">
                        إدارة المخزون والمنتجات
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        إضافة، تعديل، ومتابعة كميات المنتجات المتوفرة.
                    </p>
                </div>
                <div className="flex gap-2">
                    {onRefetch && (
                        <button
                            onClick={onRefetch}
                            className="border border-border bg-card px-3 py-2 rounded-xl text-xs font-semibold hover:bg-muted transition-colors cursor-pointer shadow-sm active:scale-95"
                        >
                            تحديث البيانات
                        </button>
                    )}
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer w-fit shadow-sm active:scale-95">
                        <Plus className="w-4 h-4" />
                        <span>إضافة منتج جديد</span>
                    </button>
                </div>
            </div>

            <SearchBar table={table} onSearch={onSearchChange} />

            <div className="border border-border rounded-2xl min-h-0 min-w-0 bg-card p-4 relative shadow-sm">

                {/* الـ Overlay اللذيذ أثناء الـ Fetching الجانبي */}
                {isFetching && !isLoading && (
                    <div className="absolute inset-0 bg-card/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                )}

                {/* 1. شاشة التحميل المبدئي */}
                {isLoading && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                        <p className="text-[11px] text-muted-foreground">
                            جاري جلب المنتجات من السيرفر...
                        </p>
                    </div>
                )}

                {/* 2. شاشة الخطأ الحقيقي (السيرفر وقع مثلاً) وليس الـ 404 بتاع السيرش */}
                {hasRealError && (
                    <div className="h-64 flex flex-col items-center justify-center text-center text-destructive">
                        <AlertCircle className="w-6 h-6 mb-2" />
                        <h3 className="text-xs font-semibold mb-1">فشل تحميل البيانات</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            {error && "status" in error ? `خطأ في السيرفر: ${error.status}` : "حدث خطأ غير متوقع في الاتصال"}
                        </p>
                    </div>
                )}

                {/* 3. شاشة لا توجد نتائج (بما فيها حالة الـ 404 المتروضة) */}
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