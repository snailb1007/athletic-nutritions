"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paginationButtonVariants = cva(
  "px-4 py-2 font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        active:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        outline:
          "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  total: number;
};

export function Pagination({
  currentPage,
  totalPages,
  total,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/foods?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
        Hiển thị{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {startItem} - {endItem}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {total}
        </span>{" "}
        thực phẩm
      </div>

      <nav
        className="flex items-center gap-2 order-1 sm:order-2"
        aria-label="Điều hướng phân trang"
      >
        <button
          className={paginationButtonVariants({ variant: "outline" })}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Trang trước"
        >
          <span className="hidden sm:inline">← Trước</span>
          <span className="sm:hidden">←</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-gray-400 dark:text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                className={cn(
                  paginationButtonVariants({
                    variant: page === currentPage ? "active" : "default",
                  }),
                  "min-w-[40px]"
                )}
                onClick={() => goToPage(page as number)}
                aria-label={`Trang ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className={paginationButtonVariants({ variant: "outline" })}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Trang sau"
        >
          <span className="hidden sm:inline">Sau →</span>
          <span className="sm:hidden">→</span>
        </button>
      </nav>
    </div>
  );
}
