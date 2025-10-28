"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva("flex gap-3 w-full", {
  variants: {
    layout: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

const inputVariants = cva(
  "w-full px-4 py-2.5 text-base border rounded-lg transition-all duration-200 outline-none",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-400",
        error:
          "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const buttonVariants = cva(
  "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        ghost:
          "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type SearchBarProps = VariantProps<typeof searchBarVariants> & {
  defaultValue: string;
  placeholder?: string;
};

export function SearchBar({
  defaultValue,
  placeholder = "Tìm kiếm thực phẩm (ví dụ: đậu, gạo, cà rốt...)",
  layout,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(defaultValue);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    startTransition(() => {
      router.push(`/foods?${params.toString()}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    handleSearch("");
  };

  return (
    <form className={searchBarVariants({ layout })} onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <input
          type="search"
          className={inputVariants({ variant: "default" })}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Tìm kiếm thực phẩm"
        />
        {searchValue && (
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center"
            )}
            onClick={handleClear}
            aria-label="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "primary" }),
          layout === "vertical" ? "w-full" : "whitespace-nowrap"
        )}
        disabled={isPending}
      >
        {isPending ? "Đang tìm..." : "Tìm kiếm"}
      </button>
    </form>
  );
}
