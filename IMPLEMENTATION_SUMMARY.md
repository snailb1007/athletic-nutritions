# Implementation Summary: Foods List with Pagination

## Overview

Đã hoàn thành việc implement tính năng hiển thị danh sách thực phẩm với phân trang 10 items/trang, tích hợp với backend API.

## What Was Implemented

### 1. API Service Layer

**File**: `apps/web/lib/api.ts`

- Tạo service để fetch dữ liệu từ backend API
- Sử dụng Next.js native fetch với caching (revalidate every 60s)
- Type-safe API responses với TypeScript
- Endpoints:
  - `fetchFoods(page, limit, search)` - Lấy danh sách foods với pagination
  - `fetchFoodById(id)` - Lấy chi tiết 1 food

### 2. Foods List Page

**File**: `apps/web/app/foods/page.tsx`

- Server Component sử dụng Next.js 15 App Router
- Hỗ trợ search params: `?page=1&search=query`
- Sử dụng Suspense boundary để hiển thị loading state

### 3. Components

#### FoodsList Component
**File**: `apps/web/app/foods/components/FoodsList.tsx`

- Server Component fetch data từ API
- Hiển thị grid layout responsive
- Empty state khi không có dữ liệu

#### FoodCard Component
**File**: `apps/web/app/foods/components/FoodCard.tsx`

- Hiển thị thông tin chi tiết của 1 thực phẩm
- Nutrients: Energy, Protein, Carbs, Fat, Fiber
- Category tag
- Local name và English name

#### Pagination Component
**File**: `apps/web/app/foods/components/Pagination.tsx`

- Client Component với URL-based navigation
- Smart page numbers với ellipsis
- Previous/Next buttons
- Hiển thị "Showing X-Y of Z items"
- Responsive design

#### SearchBar Component
**File**: `apps/web/app/foods/components/SearchBar.tsx`

- Client Component với React useTransition
- Real-time search với URL sync
- Clear button
- Reset to page 1 on new search

#### FoodsListSkeleton Component
**File**: `apps/web/app/foods/components/FoodsListSkeleton.tsx`

- Loading skeleton với shimmer animation
- Hiển thị trong lúc fetch data

### 4. Styling

Tất cả components đều có CSS Modules riêng:
- `foods.module.css` - Page styles
- `FoodsList.module.css` - List layout
- `FoodCard.module.css` - Card styles
- `Pagination.module.css` - Pagination controls
- `SearchBar.module.css` - Search input
- `FoodsListSkeleton.module.css` - Loading skeleton

Features:
- Responsive grid layout
- Hover effects
- Smooth transitions
- Mobile-friendly

### 5. Integration Updates

#### Home Page
**File**: `apps/web/app/page.tsx`

- Updated "Khám phá ngay" button to link to `/foods` page
- Changed from Button component to anchor tag

#### Environment Variables
**File**: `apps/web/.env.example`

- Added `NEXT_PUBLIC_API_URL` for backend API

#### Documentation
**File**: `apps/web/README.md`

- Comprehensive documentation
- Setup instructions
- API integration guide
- Troubleshooting section

## Technical Decisions

### 1. Server vs Client Components

- **Server Components**: Page, FoodsList, FoodCard
  - Better performance
  - SEO-friendly
  - Reduced client bundle size

- **Client Components**: Pagination, SearchBar
  - Cần interactivity
  - URL navigation
  - Form handling

### 2. Data Fetching Strategy

- Sử dụng Next.js native fetch với `revalidate: 60`
- Server-side data fetching trong Server Components
- No client-side state management libraries needed

### 3. Pagination Approach

- URL-based state (`?page=2`)
  - Shareable URLs
  - Browser back/forward works
  - SEO-friendly
  - No client state management

### 4. Search Implementation

- URL-based với `useSearchParams`
- Backend handles search logic
- Reset to page 1 on new search
- Preserves page number when clearing search

## File Structure

```
athletic-nutritions/apps/web/
├── app/
│   ├── foods/
│   │   ├── components/
│   │   │   ├── FoodCard.tsx
│   │   │   ├── FoodCard.module.css
│   │   │   ├── FoodsList.tsx
│   │   │   ├── FoodsList.module.css
│   │   │   ├── Pagination.tsx
│   │   │   ├── Pagination.module.css
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchBar.module.css
│   │   │   ├── FoodsListSkeleton.tsx
│   │   │   └── FoodsListSkeleton.module.css
│   │   ├── page.tsx
│   │   └── foods.module.css
│   ├── page.tsx (updated)
│   └── page.module.css (updated)
├── lib/
│   ├── api.ts (new)
│   ├── db.ts (existing)
│   └── foods.ts (existing)
├── .env.example (updated)
└── README.md (updated)
```

## How to Test

### 1. Start Backend
```bash
cd athletic-nutritions-be
pnpm start:dev
```

Backend should run on http://localhost:3000

### 2. Setup Frontend Environment
```bash
cd athletic-nutritions/apps/web
cp .env.example .env
```

Edit `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_postgresql_url
```

### 3. Start Frontend
```bash
cd athletic-nutritions
pnpm dev
```

Frontend should run on http://localhost:3001

### 4. Test Features

1. **Home Page**: Visit http://localhost:3001
   - Click "Khám phá ngay" button → Should navigate to `/foods`

2. **Foods List**: Visit http://localhost:3001/foods
   - Should display 10 foods per page
   - Each card shows nutrients info

3. **Pagination**:
   - Click page numbers to navigate
   - URL should update: `/foods?page=2`
   - Previous/Next buttons should work
   - Ellipsis for many pages

4. **Search**:
   - Type in search box
   - Click "Tìm kiếm" or press Enter
   - Results should filter
   - URL updates: `/foods?search=query`
   - Click clear button (✕) to reset

5. **Loading States**:
   - Should see skeleton while loading
   - Smooth transitions between pages

## Backend API Requirements

Backend API phải:
1. Running on port 3000 (hoặc configure NEXT_PUBLIC_API_URL)
2. Có endpoint `GET /foods?page=1&limit=10&search=query`
3. CORS enabled (already configured in NestJS)
4. Return format:
   ```json
   {
     "data": [...],
     "meta": {
       "total": 100,
       "page": 1,
       "limit": 10,
       "totalPages": 10
     }
   }
   ```

## Next Steps (Optional Improvements)

1. **Loading Optimization**:
   - Implement infinite scroll as alternative
   - Add client-side caching with SWR/React Query

2. **Search Enhancement**:
   - Add debouncing for search input
   - Add filters (category, nutrients range)
   - Add sorting options

3. **Food Details Page**:
   - Create `/foods/[id]` route
   - Show full nutrient information
   - Related foods section

4. **Performance**:
   - Add image optimization
   - Implement virtual scrolling for large lists
   - Add service worker for offline support

5. **UX Improvements**:
   - Add keyboard navigation
   - Add food comparison feature
   - Add favorites/bookmarks

## Notes

- All components are fully typed with TypeScript
- Responsive design works on mobile/tablet/desktop
- Accessible with proper ARIA labels
- SEO-friendly with server-side rendering
- No external UI libraries needed (pure CSS Modules)
