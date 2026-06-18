import { useState, useEffect, useCallback, useRef } from "react";
import { useGetProductsQuery } from "@/redux/services/apiSlice";
import ProductsPageUI from "@/components/ProductsPageUI";
import { containsArabic } from "@/lib/searchUtils";
import { usePagination } from "@/hooks/usePagination";

export const PAGE_LIMIT = 10;

export default function ProductsPageContainer() {
    const [page, setPage] = useState<number>(1);
    const [category] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    const isFirstSearch = useRef(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);

            if (isFirstSearch.current) {
                isFirstSearch.current = false;
                return;
            }

            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const isArabicSearch = debouncedSearch.length > 0 && containsArabic(debouncedSearch) && false;

    const {
        data: products = [],
        isLoading,
        isFetching,
        isError,
        refetch,
        error
    } = useGetProductsQuery(
        { page, search: debouncedSearch, category },
        { skip: isArabicSearch }
    );


    const shouldCheckNextPage = !isArabicSearch && products.length === PAGE_LIMIT;

    const { data: nextPageProducts } = useGetProductsQuery(
        { page: page + 1, search: debouncedSearch, category },
        { skip: !shouldCheckNextPage }
    );


    const {
        isFirstPage,
        isLastPage,
        totalCount,
        totalPages,
    } = usePagination({
        page,
        pageSize: PAGE_LIMIT,
        currentItemsCount: products.length,
        nextPageItemsCount: shouldCheckNextPage ? nextPageProducts?.length : undefined,
    });

    const handlePageChange = useCallback((newPage: number) => {
        if (newPage < 1) return;
        if (newPage > page && isLastPage) return;
        setPage(newPage);
    }, [page, isLastPage]);

    const handleSearchChange = useCallback((text: string) => {
        setSearchInput(text);
    }, []);

    const displayProducts = isArabicSearch ? [] : products;

    return (
        <ProductsPageUI
            products={displayProducts}
            isLoading={isLoading && !isArabicSearch}
            isFetching={isFetching && !isArabicSearch}
            isError={isError}
            onRefetch={refetch}
            error={error}
            currentPage={page}
            onPageChange={handlePageChange}
            isFirstPage={isArabicSearch ? true : isFirstPage}
            isLastPage={isArabicSearch ? true : isLastPage}
            totalCount={isArabicSearch ? 0 : totalCount}
            totalPages={isArabicSearch ? 1 : totalPages}
            onSearchChange={handleSearchChange}
            searchQuery={debouncedSearch}
            isArabicSearch={isArabicSearch}
        />

    );
}
