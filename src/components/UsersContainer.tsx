import { usePagination } from "@/hooks/usePagination";
import UsersPageUI from "./UsersPageUI";
import { useGetUsersQuery } from "@/redux/services/userSlice";
import type { User } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { containsArabic } from "@/lib/searchUtils";

const PAGE_LIMIT = 10;

function UsersContainer() {
    const [page, setPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    const isFirstSearch = useRef(true);

    const isArabicSearch = debouncedSearch.length > 0 && containsArabic(debouncedSearch) && false;

    // جلب بيانات الصفحة الحالية
    const { data: UsersData,
        isLoading,
        isFetching,
        isError,
        refetch,
        error
    } = useGetUsersQuery(
        // { page, search: debouncedSearch }
        { all: false, page, search: debouncedSearch, }
    );

    const shouldCheckNextPage = UsersData?.length === PAGE_LIMIT;

    // جلب بيانات الصفحة القادمة مسبقاً (Prefetching)
    const { data: nextPageUsers } = useGetUsersQuery(
        { page: page + 1, search: debouncedSearch },
        { skip: !shouldCheckNextPage }
    );

    // الـ Debounce الخاص بالبحث
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);

            if (isFirstSearch.current) {
                isFirstSearch.current = false;
                return;
            }
            setPage(1); // إرجاع المستخدم للصفحة 1 عند تغيير نص البحث
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // حسابات الـ Pagination الـ الحقيقية
    const {
        isFirstPage,
        isLastPage,
        totalCount,
        totalPages,
    } = usePagination({
        page,
        pageSize: PAGE_LIMIT,
        currentItemsCount: UsersData?.length as number,
        nextPageItemsCount: shouldCheckNextPage ? nextPageUsers?.length : undefined,
    });

    const handlePageChange = useCallback((newPage: number) => {
        if (newPage < 1) return;
        setPage(newPage);
        console.log("الانتقال إلى الصفحة:", newPage);
    }, []);

    const handleSearchChange = useCallback((text: string) => {
        setSearchInput(text);
    }, []);

    const displayProducts = isArabicSearch ? [] : UsersData;

    return (
        <UsersPageUI
            Users={displayProducts as User[]}
            isLoading={isLoading && !isArabicSearch}
            isFetching={isFetching && !isArabicSearch}
            isError={isError}
            onRefetch={refetch}
            error={error}
            currentPage={page}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            totalCount={totalCount}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
            searchQuery={debouncedSearch}
            isArabicSearch={isArabicSearch}
        />
    );
}

export default UsersContainer;