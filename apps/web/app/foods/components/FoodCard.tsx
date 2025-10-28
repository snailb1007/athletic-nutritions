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
    <article className="bg-white border border-gray-200 rounded-lg p-6 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {food.nameLocal || food.name}
        </h3>
        {food.category && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
            {food.category}
          </span>
        )}
      </div>

      {food.nameLocal && food.name !== food.nameLocal && (
        <p className="text-gray-600 text-sm mb-4 italic">{food.name}</p>
      )}

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 my-4">
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-600 font-medium">Năng lượng</dt>
          <dd className="text-base text-gray-900 font-semibold">{formatNutrient(nutrients.energy, "kcal")}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-600 font-medium">Protein</dt>
          <dd className="text-base text-gray-900 font-semibold">{formatNutrient(nutrients.protein, "g")}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-600 font-medium">Carbohydrate</dt>
          <dd className="text-base text-gray-900 font-semibold">{formatNutrient(nutrients.carbs, "g")}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-600 font-medium">Chất béo</dt>
          <dd className="text-base text-gray-900 font-semibold">{formatNutrient(nutrients.fat, "g")}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-600 font-medium">Chất xơ</dt>
          <dd className="text-base text-gray-900 font-semibold">{formatNutrient(nutrients.fiber, "g")}</dd>
        </div>
      </dl>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
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
