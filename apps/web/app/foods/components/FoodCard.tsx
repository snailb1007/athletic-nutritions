import type { ApiFood } from "../../../lib/api";

type FoodCardProps = {
  food: ApiFood;
};

export function FoodCard({ food }: FoodCardProps) {
  const nutrients = {
    energy: getNutrientValue(food, "Energy"),
    protein: getNutrientValue(food, "Protein"),
    carbs: getNutrientValue(food, "Carbohydrate"),
    fat: getNutrientValue(food, "Fat"),
    fiber: getNutrientValue(food, "Fiber"),
  };

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="flex-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {food.nameLocal || food.name}
        </h3>
        {food.category && (
          <span className="inline-flex whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {food.category}
          </span>
        )}
      </div>

      {food.nameLocal && food.name !== food.nameLocal && (
        <p className="mb-4 text-sm italic text-gray-600 dark:text-gray-400">{food.name}</p>
      )}

      <dl className="my-4 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Năng lượng</dt>
          <dd className="text-base font-semibold text-gray-900 dark:text-gray-50">{formatNutrient(nutrients.energy, "kcal")}</dd>
        </div>
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Protein</dt>
          <dd className="text-base font-semibold text-gray-900 dark:text-gray-50">{formatNutrient(nutrients.protein, "g")}</dd>
        </div>
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Carbohydrate</dt>
          <dd className="text-base font-semibold text-gray-900 dark:text-gray-50">{formatNutrient(nutrients.carbs, "g")}</dd>
        </div>
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Chất béo</dt>
          <dd className="text-base font-semibold text-gray-900 dark:text-gray-50">{formatNutrient(nutrients.fat, "g")}</dd>
        </div>
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Chất xơ</dt>
          <dd className="text-base font-semibold text-gray-900 dark:text-gray-50">{formatNutrient(nutrients.fiber, "g")}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">
        <span className="font-medium">Trên 100g</span>
        {food.source && (
          <span className="italic">Nguồn: {food.source}</span>
        )}
      </div>
    </article>
  );
}

function getNutrientValue(food: ApiFood, key: string): number | null {
  const nutrient = food.nutrients.find((n) => n.nutrient.key === key);
  return nutrient ? nutrient.amount : null;
}

function formatNutrient(value: number | null, unit: string): string {
  if (value === null || typeof value !== "number") return "N/A";

  const decimals = unit === "kcal" ? 0 : 1;
  return `${value.toFixed(decimals)} ${unit}`;
}
