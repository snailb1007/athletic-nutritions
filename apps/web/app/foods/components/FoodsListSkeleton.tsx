import { cn } from "@/lib/utils";

interface FoodsListSkeletonProps {
  count?: number;
  showSearchBar?: boolean;
  nutrientsCount?: number;
}

interface SkeletonBarProps {
  className?: string;
}

interface FoodCardSkeletonProps {
  nutrientsCount: number;
}

const SkeletonBar = ({ className }: SkeletonBarProps) => (
  <div
    className={cn(
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded",
      className
    )}
  />
);

const FoodCardSkeleton = ({ nutrientsCount }: FoodCardSkeletonProps) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
    <div className="flex items-start justify-between gap-3 mb-3">
      <SkeletonBar className="h-6 flex-1" />
      <SkeletonBar className="h-6 w-20" />
    </div>
    <div className="space-y-2.5 my-4">
      {Array.from({ length: nutrientsCount }).map((_, index) => (
        <SkeletonBar key={index} className="h-5" />
      ))}
    </div>
  </div>
);

export function FoodsListSkeleton({
  count = 10,
  showSearchBar = true,
  nutrientsCount = 5,
}: FoodsListSkeletonProps = {}) {
  return (
    <div className="flex flex-col gap-6">
      {showSearchBar && <SkeletonBar className="h-12" />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <FoodCardSkeleton key={index} nutrientsCount={nutrientsCount} />
        ))}
      </div>
    </div>
  );
}
