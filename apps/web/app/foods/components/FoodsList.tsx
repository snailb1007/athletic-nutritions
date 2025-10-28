import { fetchFoods } from "../../../lib/api";
import { FoodCard } from "./FoodCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

type FoodsListProps = {
  page: number;
  search: string;
};

export async function FoodsList({ page, search }: FoodsListProps) {
  const { data, meta } = await fetchFoods(page, 10, search);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar defaultValue={search} />

      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>

          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            Không tìm thấy thực phẩm nào phù hợp với tìm kiếm của bạn.
          </p>
          {search && (
            <a
              href="/foods"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Xóa bộ lọc
            </a>
          )}
        </div>
      )}
    </div>
  );
}
