
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useCustomTable } from "@/hooks/useCustomTable";
import { FITERSType, User } from "@/types";
import { TablePagination } from "./TablePagination";
import { CustomTable } from "./CustomTable";
import { AlertCircle, Loader2, Plus, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import DashboardHeader from "./sub-components";
import { customStatusFilter } from "@/hooks/SomeHooks";

interface UsersPageUIProps {
    Users: User[];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    onRefetch?: () => void;
    error: FetchBaseQueryError | SerializedError | undefined;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalCount: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onSearchChange: (text: string) => void;

    searchQuery?: string;
    isArabicSearch?: boolean;
}

const TitlePage = "Users Dashboard";
const description = "Edite Status And Rules For Users";


const USERS_FILTER: FITERSType[] = [
    {
        id: "status",
        label: "Status",
        type: "select",
        options: [
            { id: "status", label: "Account Status" },
        ]
    },
    {
        id: "role",
        label: "Role",
        type: "select",
        options: [
            { id: "role", label: "Role" }
        ]
    }
];


const USERS_COLUMN_KEYS: (keyof User)[] =
    ["id", "name", "email", "role", "avatar", "status"];

function UsersPageUI
    ({
        Users = [],
        currentPage,
        error,
        isError,
        isFetching,
        isLoading,
        isFirstPage,
        isLastPage,
        onRefetch,
        totalCount,
        totalPages,
        isArabicSearch = false,
        onSearchChange,
        searchQuery = "",
        onPageChange
    }: UsersPageUIProps) {

    const { table } = useCustomTable<User>({
        data: Users as User[],
        columnKeys: USERS_COLUMN_KEYS,
        skipColumns: ["password", 'avatar'],
        autoFilterColumns: {
            status: { filterFn: "customStatusFilter", enableSorting: false },
            role: { filterFn: "equals", enableSorting: false },
        },
        filterFns: {
            customStatusFilter: customStatusFilter
        },
        customCells: {
            status: ({ getValue }) => {
                const status = getValue() as boolean;
                const RenderStateuWord = status ? "active" : "suspended";

                const statusColors: Record<string, string> = {
                    active: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 border border-emerald-500/20",
                    pending: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 border border-amber-500/20",
                    suspended: "bg-destructive/10 text-destructive border border-destructive/20",
                };
                const colorClass = statusColors[RenderStateuWord] || "bg-muted text-muted-foreground border border-border";

                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide capitalize backdrop-blur-[1px] transition-colors ${colorClass}`}
                    >
                        {RenderStateuWord}
                    </span>
                );
            }
        }
    },
    );


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
            (hasSearchQuery && Users.length === 0) ||
            (hasActiveFilters && filteredRowCount === 0));


    return (
        <section className="space-y-6" dir="rtl">

            <DashboardHeader size="sm" border="bottom">
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
                        type="users"
                        table={table}
                        rawData={Users}
                        onSearch={onSearchChange}
                        filterColumns={USERS_FILTER}
                    />
                </DashboardHeader.Content>
            </DashboardHeader>

            <div className="border border-border rounded-2xl min-h-0 min-w-0 bg-transparent p-4 relative shadow-sm">
                {/* الـ Overlay اللذيذ أثناء الـ Fetching الجانبي */}
                {isFetching && !isLoading && (
                    <div className="absolute inset-0 bg-card/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                )}

                {/* حالة التحميل الأساسية */}
                {isLoading && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                        <p className="text-[11px] text-muted-foreground">
                            جاري جلب المستخدمين من السيرفر...
                        </p>
                    </div>
                )}

                {/* حالة الخطأ الحقيقي من السيرفر */}
                {hasRealError && (
                    <div className="h-64 flex flex-col items-center justify-center text-center text-destructive">
                        <AlertCircle className="w-6 h-6 mb-2" />
                        <h3 className="text-xs font-semibold mb-1">فشل تحميل البيانات</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            {error && "status" in error ? `خطأ في السيرفر: ${error.status}` : "حدث خطأ غير متوقع في الاتصال"}
                        </p>
                    </div>
                )}

                {/* حالة عدم وجود نتائج فلاتر أو بحث */}
                {showNoResults && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-muted rounded-full mb-2 text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-semibold mb-1">لا توجد نتائج بحث</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            {isArabicSearch
                                ? "البحث باللغة العربية غير مدعوم حالياً. جرّب البحث بالإنجليزية."
                                : hasActiveFilters && filteredRowCount === 0
                                    ? "لا توجد حسابات تطابق خيارات التصفية المتقدمة الحالية."
                                    : "لم نجد أي مستخدم يطابق بحثك. جرّب كلمات مختلفة أو امسح البحث."}
                        </p>
                    </div>
                )}

                {/* حالة الصفحة فارغة تماماً من البداية (Database Empty) */}
                {!isLoading && !isError && Users.length === 0 && !hasActiveFilters && !hasSearchQuery && !isArabicSearch && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-muted rounded-full mb-2 text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-semibold mb-1">لا يوجد مستخدمين</h3>
                        <p className="text-[11px] text-muted-foreground max-w-sm">
                            لا يوجد مستخدمين مسجلين في النظام حالياً.
                        </p>
                    </div>
                )}

                {/* جدول البيانات الرئيسي مع الباجينيشن */}
                {!isLoading && !hasRealError && !showNoResults && Users.length > 0 && (
                    <>
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
                    </>
                )}
            </div>
        </section>
    )
}

export default UsersPageUI