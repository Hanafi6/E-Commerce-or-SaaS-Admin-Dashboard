import { useMemo } from "react";

const DEFAULT_PAGE_SIZE = 10;

interface UsePaginationArgs {
    page: number;
    pageSize?: number;
    currentItemsCount: number;
    nextPageItemsCount?: number;
}

export function usePagination({
    page,
    pageSize = DEFAULT_PAGE_SIZE,
    currentItemsCount,
    nextPageItemsCount,
}: UsePaginationArgs) {
    return useMemo(() => {
        const isFirstPage = page === 1;

        let isLastPage = false;

        if (currentItemsCount === 0) {
            isLastPage = true;
        } else if (currentItemsCount < pageSize) {
            isLastPage = true;
        } else if (nextPageItemsCount !== undefined) {
            isLastPage = nextPageItemsCount === 0;
        }

        const totalCount = isLastPage
            ? (page - 1) * pageSize + currentItemsCount
            : page * pageSize;

        const totalPages = isLastPage ? Math.max(page, 1) : page + 1;

        return {
            isFirstPage,
            isLastPage,
            totalCount,
            totalPages,
            pageSize,
        };
    }, [page, pageSize, currentItemsCount, nextPageItemsCount]);
}
