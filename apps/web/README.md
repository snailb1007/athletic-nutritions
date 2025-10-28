# Athletic Nutritions - Frontend

Frontend application for Athletic Nutritions, built with Next.js 15 (App Router).

## Features

- **Home Page**: Landing page with featured foods and app information
- **Foods List Page**: Browse all foods with pagination (10 items per page)
- **Search**: Search foods by name or local name
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Data Fetching**: Native fetch with Next.js caching

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager
- Backend API running (see `athletic-nutritions-be`)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database URL (for direct DB queries on homepage)
DATABASE_URL=your_postgresql_url
```

### Development

Run the development server:

```bash
pnpm dev
```

The app will be available at [http://localhost:3001](http://localhost:3001)

### Build

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Project Structure

```
apps/web/
├── app/
│   ├── foods/
│   │   ├── components/
│   │   │   ├── FoodCard.tsx         # Individual food card
│   │   │   ├── FoodsList.tsx        # Main foods list with data fetching
│   │   │   ├── Pagination.tsx       # Pagination controls
│   │   │   ├── SearchBar.tsx        # Search input
│   │   │   └── FoodsListSkeleton.tsx # Loading skeleton
│   │   ├── page.tsx                 # Foods page route
│   │   └── foods.module.css         # Page styles
│   ├── page.tsx                     # Home page
│   ├── layout.tsx                   # Root layout
│   └── page.module.css              # Home page styles
├── lib/
│   ├── api.ts                       # API service functions
│   ├── db.ts                        # Database connection (for homepage)
│   └── foods.ts                     # Food-related queries
└── public/                          # Static assets
```

## API Integration

The app connects to the backend API to fetch foods data:

### Endpoints Used

- `GET /foods?page=1&limit=10&search=query` - List foods with pagination

### Response Format

```typescript
{
  data: [
    {
      id: number;
      name: string;
      nameLocal: string | null;
      category: string | null;
      nutrients: [
        {
          amount: number;
          nutrient: {
            key: string;
            name: string;
            unit: string;
          }
        }
      ]
    }
  ],
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
```

## Features Details

### Pagination

- 10 items per page
- URL-based page state (`?page=2`)
- Shows page numbers with ellipsis for many pages
- Displays total items count

### Search

- Client-side search input with URL sync
- Searches in both `name` and `nameLocal` fields
- Case-insensitive search
- Resets to page 1 on new search

### Loading States

- Skeleton screens during data fetching
- Smooth transitions between pages
- Suspense boundaries for optimal UX

## Environment Variables

| Variable              | Description                  | Required | Default                 |
| --------------------- | ---------------------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL              | Yes      | `http://localhost:3000` |
| `DATABASE_URL`        | PostgreSQL connection string | Yes      | -                       |

## Troubleshooting

### Cannot connect to backend API

Make sure:

1. Backend server is running on port 3000
2. `NEXT_PUBLIC_API_URL` is set correctly in `.env`
3. CORS is enabled on backend (already configured in NestJS)

### Foods not loading

1. Check backend is running: `curl http://localhost:3000/foods`
2. Check browser console for errors
3. Verify environment variables are loaded

## License

Private - All rights reserved
