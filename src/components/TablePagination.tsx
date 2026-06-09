import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize?: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    isFetching?: boolean;
    onPageChange: (page: number) => void;
    className?: string;
    PaginationButtons?: boolean;
}

export function TablePagination({
    currentPage,
    totalPages,
    totalCount,
    pageSize = 10,
    isFirstPage,
    isLastPage,
    isFetching = false,
    onPageChange,
    className,
    PaginationButtons=false,
}: TablePaginationProps) {
    const knownMinimum = (currentPage - 1) * pageSize + Math.min(pageSize, totalCount);
    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-3 text-[11px]",
                className
            )}
        >
            <div className="text-muted-foreground text-center sm:text-right">
                الصفحة:{" "}
                <span className="font-semibold text-foreground">{currentPage}</span>
                {" "}من{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
                <span className="mx-2 text-muted-foreground/60 hidden sm:inline">|</span>
                <span className="block sm:inline mt-1 sm:mt-0">
                    إجمالي العناصر:{" "}
                    <span className="font-semibold text-foreground">
                        {isLastPage ? totalCount : `${knownMinimum}+`}
                    </span>
                </span>
            </div>

            {PaginationButtons && (
            <div className="flex gap-1.5 justify-center sm:justify-end">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isFirstPage || isFetching}
                    className="flex items-center gap-1 border border-border px-2.5 py-1 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>السابق</span>
                </button>
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLastPage || isFetching}
                    className="flex items-center gap-1 border border-border px-2.5 py-1 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    <span>التالي</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
            </div>
            )}
        </div>
    );
}
