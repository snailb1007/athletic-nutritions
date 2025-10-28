import { Suspense } from "react";
import { FoodsList } from "./components/FoodsList";
import { FoodsListSkeleton } from "./components/FoodsListSkeleton";

type SearchParams = Promise<{
  page?: string;
  search?: string;
}>;

export default async function FoodsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Danh sách thực phẩm dinh dưỡng
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Tra cứu thông tin dinh dưỡng của hơn 1000+ thực phẩm thuần chay được
          đồng bộ từ cơ sở dữ liệu chính thức.
        </p>
      </header>

      <Suspense key={`${page}-${search}`} fallback={<FoodsListSkeleton />}>
        <FoodsList page={page} search={search} />
      </Suspense>
    </div>
  );
}
