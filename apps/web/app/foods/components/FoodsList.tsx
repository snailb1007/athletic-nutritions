import { fetchFoods } from "../../../lib/api";
import { FoodCard } from "./FoodCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

type FoodsListProps = {
  page: number;
  search: string;
};

export async function FoodsList({ page, search }: FoodsListProps) {
  const PAGE_SIZE = 12;
  const { data, meta } = await fetchFoods(page, PAGE_SIZE, search);
  const hasResults = data.length > 0;

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value);

  const startItem = hasResults ? (meta.page - 1) * meta.limit + 1 : 0;
  const endItem = hasResults ? startItem + data.length - 1 : 0;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 px-6 py-8 shadow-sm dark:border-gray-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl dark:text-gray-50">
              Khám phá thực phẩm lành mạnh
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Tìm kiếm, so sánh và chọn lựa các loại thực phẩm phù hợp với mục tiêu dinh dưỡng của bạn.
            </p>
            {hasResults ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Đang hiển thị {formatNumber(startItem)} – {formatNumber(endItem)} trong tổng số{" "}
                {formatNumber(meta.total)} thực phẩm.
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thử tìm bằng tên thực phẩm, nhóm chất hoặc nguồn gốc.
              </p>
            )}
          </div>
          <div className="w-full max-w-md">
            <SearchBar defaultValue={search} layout="vertical" />
          </div>
        </div>
      </div>

      {hasResults ? (
        <>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
            />
          </div>
        </>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            🍽️
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Không tìm thấy thực phẩm phù hợp
          </h2>
          <p className="mt-3 max-w-md text-sm text-gray-600 dark:text-gray-400">
            Hãy thử điều chỉnh từ khóa tìm kiếm, tìm theo nhóm chất (ví dụ: protein, chất xơ) hoặc kiểm tra lại chính tả của bạn.
          </p>
          {search && (
            <a
              href="/foods"
              className="mt-6 inline-flex items-center rounded-full border border-blue-500 px-5 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400/10"
            >
              Xóa bộ lọc và xem tất cả
            </a>
          )}
        </div>
      )}
    </section>
  );
}
