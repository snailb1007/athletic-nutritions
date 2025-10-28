/\*\*

- Component Variants Showcase
-
- This file demonstrates all available variants for Foods module components.
- Use these examples as a reference for implementing components.
  \*/

import type { ApiFood } from "@/lib/api";

// ============================================================================
// SearchBar Variants
// ============================================================================

/\*\*

- Default SearchBar (Horizontal)
  \*/
  <SearchBar defaultValue="" />

/\*\*

- Vertical Layout SearchBar
- Useful for mobile or sidebar layouts
  \*/
  <SearchBar 
    defaultValue="" 
    layout="vertical" 
  />

/\*\*

- Custom Placeholder
  \*/
  <SearchBar 
    defaultValue="" 
    placeholder="Tìm kiếm món ăn yêu thích..."
  />

// ============================================================================
// FoodCard Variants
// ============================================================================

/\*\*

- Default FoodCard
  \*/
  <FoodCard food={sampleFood} />

/\*\*

- Highlighted FoodCard
- Use for featured or promoted foods
  \*/
  <FoodCard 
    food={sampleFood} 
    variant="highlighted" 
  />

// ============================================================================
// Pagination Variants
// ============================================================================

/\*\*

- Standard Pagination
  \*/
  <Pagination 
    currentPage={1} 
    totalPages={10} 
    total={100} 
  />

// ============================================================================
// FoodsListSkeleton Variants
// ============================================================================

/\*\*

- Default Skeleton (10 cards with search bar)
  \*/
  <FoodsListSkeleton />

/\*\*

- Compact Skeleton (6 cards, no search bar)
- Useful for sidebar or preview sections
  \*/
  <FoodsListSkeleton 
    count={6} 
    showSearchBar={false} 
  />

/\*\*

- Minimal Skeleton (3 nutrients per card)
- For mobile or compact layouts
  \*/
  <FoodsListSkeleton 
    count={8}
    nutrientsCount={3}
  />

/\*\*

- Grid Preview (4 cards)
- For homepage or landing page previews
  \*/
  <FoodsListSkeleton 
    count={4}
    showSearchBar={false}
    nutrientsCount={4}
  />

// ============================================================================
// Sample Data for Testing
// ============================================================================

const sampleFood: ApiFood = {
id: 1,
name: "Brown Rice",
nameLocal: "Gạo lứt",
category: "Grains",
source: "USDA",
nutrients: [
{
nutrient: { key: "Energy", name: "Năng lượng" },
amount: 370,
},
{
nutrient: { key: "Protein", name: "Protein" },
amount: 7.9,
},
{
nutrient: { key: "Carbohydrate", name: "Carbohydrate" },
amount: 77.2,
},
{
nutrient: { key: "Fat", name: "Chất béo" },
amount: 2.9,
},
{
nutrient: { key: "Fiber", name: "Chất xơ" },
amount: 3.5,
},
],
};

// ============================================================================
// CVA Variant Definitions
// ============================================================================

/\*\*

- Button Variants (used in SearchBar, Pagination)
-
- Variants:
- - primary: Blue background, white text (main CTAs)
- - secondary: Gray background, dark text (secondary actions)
- - ghost: Transparent background, hover effect (tertiary actions)
-
- Sizes:
- - sm: Compact size for inline actions
- - md: Standard size for most use cases
- - lg: Large size for primary CTAs
    \*/

/\*\*

- Card Variants (used in FoodCard)
-
- Variants:
- - default: Standard card with hover effect
- - highlighted: Featured card with colored border and shadow
    \*/

/\*\*

- Badge Variants (used in FoodCard for categories)
-
- Variants:
- - default: Blue badge (standard category)
- - success: Green badge (healthy/recommended)
- - warning: Amber badge (caution/moderation)
    \*/

// ============================================================================
// Responsive Behavior
// ============================================================================

/\*\*

- Grid Layout Breakpoints:
-
- - Mobile (< 768px): 1 column
- - Tablet (768px - 1023px): 2 columns
- - Desktop (≥ 1024px): 3 columns
-
- SearchBar Layout:
- - Horizontal: Input and button side by side
- - Vertical: Input and button stacked
-
- Pagination:
- - Mobile: Icon-only navigation buttons
- - Desktop: Text + icon navigation buttons
    \*/

// ============================================================================
// Dark Mode
// ============================================================================

/\*\*

- All components automatically adapt to dark mode.
-
- Dark mode is activated via:
- - System preference (prefers-color-scheme: dark)
- - Tailwind's dark: variant
-
- Color mappings:
- - Background: white → gray-800
- - Text: gray-900 → gray-100
- - Border: gray-200 → gray-700
- - Input: white → gray-800
- - Primary: blue-600 → blue-500
    \*/

// ============================================================================
// Custom Styling with cn()
// ============================================================================

/\*\*

- Extending component styles with cn() utility
  \*/

import { cn } from "@/lib/utils";

// Add custom classes to SearchBar

<div className={cn("mb-8", "custom-class")}>
  <SearchBar defaultValue="" />
</div>

// Conditional styling for FoodCard
<FoodCard
food={sampleFood}
variant={isPromoted ? "highlighted" : "default"}
/>

// ============================================================================
// Accessibility Features
// ============================================================================

/\*\*

- All components include:
-
- - Semantic HTML (article, nav, dl/dt/dd)
- - ARIA labels (aria-label, aria-current)
- - Keyboard navigation support
- - Focus indicators
- - Screen reader friendly text
- - Proper heading hierarchy
    \*/

// ============================================================================
// Performance Considerations
// ============================================================================

/\*\*

- FoodsListSkeleton:
- - Use appropriate count for viewport
- - Consider hiding search bar for faster initial render
- - Reduce nutrientsCount for mobile
-
- FoodsList:
- - Server-side rendered for better SEO
- - Suspense boundaries for progressive loading
- - Automatic code splitting
    \*/

export {}; // Make this a module
