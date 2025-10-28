import { query } from "./db";

type FoodRow = {
  id: number;
  name_local: string | null;
  name_english: string | null;
  category: string | null;
  energy: string | number | null;
  protein: string | number | null;
  carbs: string | number | null;
  fats: string | number | null;
  fiber: string | number | null;
};

export type FoodSummary = {
  id: number;
  name: string;
  englishName: string | null;
  category: string | null;
  energyKcal: number | null;
  proteinGrams: number | null;
  carbsGrams: number | null;
  fatGrams: number | null;
  fiberGrams: number | null;
};

const FEATURED_FOODS_SQL = `
  SELECT *
  FROM (
    SELECT
      f."id" AS id,
      COALESCE(NULLIF(f."nameLocal", ''), f."name") AS name_local,
      f."name" AS name_english,
      f."category" AS category,
      MAX(CASE WHEN n."key" = 'Energy' THEN fn.amount END) AS energy,
      MAX(CASE WHEN n."key" = 'Protein' THEN fn.amount END) AS protein,
      MAX(CASE WHEN n."key" = 'Carbohydrate' THEN fn.amount END) AS carbs,
      MAX(CASE WHEN n."key" = 'Fat' THEN fn.amount END) AS fats,
      MAX(CASE WHEN n."key" = 'Fiber' THEN fn.amount END) AS fiber
    FROM "Food" f
    LEFT JOIN "FoodNutrient" fn ON fn."foodId" = f."id"
    LEFT JOIN "NutrientDef" n ON n."id" = fn."nutrientId"
    WHERE f."nameLocal" IS NOT NULL
    GROUP BY f."id", f."nameLocal", f."name", f."category"
    HAVING MAX(CASE WHEN n."key" = 'Energy' THEN fn.amount END) IS NOT NULL
  ) AS stats
  ORDER BY COALESCE(stats.protein, 0) DESC
  LIMIT $1
`;

export async function getFeaturedFoods(limit = 6): Promise<FoodSummary[]> {
  const result = await query<FoodRow>(FEATURED_FOODS_SQL, [limit]);

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name_local ?? row.name_english ?? "Món dinh dưỡng",
    englishName: row.name_english,
    category: row.category,
    energyKcal: parseNumeric(row.energy, 0),
    proteinGrams: parseNumeric(row.protein),
    carbsGrams: parseNumeric(row.carbs),
    fatGrams: parseNumeric(row.fats),
    fiberGrams: parseNumeric(row.fiber),
  }));
}

function parseNumeric(
  value: string | number | null,
  decimals: number = 1
): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  const numeric =
    typeof value === "number" ? value : Number.parseFloat(String(value));

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const factor = 10 ** decimals;
  return Math.round(numeric * factor) / factor;
}

