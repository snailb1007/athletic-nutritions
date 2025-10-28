const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export type ApiFood = {
  id: number;
  name: string;
  nameLocal: string | null;
  wastePercentage: number | null;
  category: string | null;
  source: string | null;
  nutrients: {
    amount: number;
    nutrient: {
      id: number;
      key: string;
      name: string;
      unit: string;
    };
  }[];
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function fetchFoods(
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<PaginatedResponse<ApiFood>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append('search', search);
  }

  const response = await fetch(`${API_BASE_URL}/foods?${params.toString()}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch foods: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchFoodById(id: number): Promise<ApiFood> {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch food: ${response.statusText}`);
  }

  return response.json();
}
