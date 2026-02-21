# STUDENT TASKS

This document contains **10 structured tasks** for you to complete. Each task focuses on improving the existing codebase by fixing bugs, adding functionality, or optimizing user experience.

The application is already built with all pages styled and functional at a basic level. Your job is to **improve logic, fix bugs, and implement missing features** — not rebuild UI from scratch.

---

## Task 1: Implement Full Search, Filters, Sorting, and Pagination

### Objective
Wire the Products Listing page to use the `filterProducts()` function from the service layer instead of manually loading all products.

### Why It Matters
Real e-commerce apps process filtering, sorting, and pagination server-side. Using a dedicated service function mirrors this pattern and keeps UI components clean.

### Technical Requirements
- Import and call `filterProducts()` from `src/services/productService.js`
- Pass the current `search`, `selectedCategory`, `sortBy`, `sortOrder`, `currentPage`, and `productsPerPage` as parameters
- Update state with the returned `{ data, total, page, totalPages, limit }` object
- Trigger a re-fetch when any filter, sort, or pagination value changes (use `useEffect` with proper dependencies)
- Remove the manual client-side slicing logic

### Expected Behavior
- Typing in the search box filters products by title/description
- Selecting a category shows only products in that category
- Changing sort order reorders the results
- Pagination updates correctly based on filtered total
- All filters can be combined (e.g., search "leather" + category "Fashion" + price low-to-high)

### Acceptance Criteria
- [ ] Search filters products in real-time (debounce optional)
- [ ] Category dropdown filters products
- [ ] Sort dropdown reorders products
- [ ] Pagination reflects filtered totals, not total product count
- [ ] Changing any filter resets pagination to page 1
- [ ] Empty search shows all products

### Edge Cases
- Search query that matches zero products
- Selecting a category with only 1-2 products (pagination should hide)
- Rapid filter changes (no stale results displayed)

### Hints
- Look at the `filterProducts` function signature in `src/services/productService.js`
- Use a single `useEffect` with all filter values in the dependency array
- Consider adding `minPrice` and `maxPrice` filter UI for bonus points

---

## Task 2: Store Filters in URL Query Parameters

### Objective
Persist search, filters, sorting, and pagination state in URL query parameters so users can share links and use browser back/forward navigation.

### Why It Matters
URL-driven state is a core UX pattern in e-commerce. It enables shareable links, browser history navigation, and refresh persistence — all critical for usability.

### Technical Requirements
- Use `useSearchParams` from `react-router-dom`
- Read initial state from URL parameters on page load
- Update URL parameters when any filter changes
- Support parameters: `search`, `category`, `sortBy`, `sortOrder`, `page`

### Expected Behavior
- Navigating to `/products?category=Electronics&sortBy=price&sortOrder=asc` shows filtered results immediately
- Changing filters updates the URL without full page reload
- Browser back button restores previous filter state
- Refreshing the page preserves all active filters

### Acceptance Criteria
- [ ] All filter values are reflected in the URL
- [ ] Page loads with correct filters when URL has parameters
- [ ] Changing filters updates URL in real-time
- [ ] Browser navigation (back/forward) works with filter states
- [ ] Empty/default values are omitted from URL (clean URLs)

### Edge Cases
- Invalid parameter values in URL (e.g., `page=999`, `category=NonExistent`)
- URL with partially set parameters
- Direct navigation to URL with all parameters set

### Hints
- `useSearchParams()` returns `[searchParams, setSearchParams]`
- Use `searchParams.get('key')` to read values
- Call `setSearchParams(params)` to update the URL
- Initialize component state from URL parameters in a `useEffect` or `useMemo`

---

## Task 3: Implement Full Wishlist Functionality

### Objective
Complete the wishlist feature so users can add, remove, and manage items in their wishlist.

### Why It Matters
Wishlist is a standard e-commerce feature. Implementing it demonstrates state management with Zustand and data flow between components.

### Technical Requirements
- Complete `removeFromWishlist` in `src/features/wishlist/useWishlistStore.js`
- Add toggle functionality (add if not in wishlist, remove if already added)
- Optionally add persistence using Zustand's `persist` middleware
- Ensure the wishlist page "Move to Cart" button works correctly
- Ensure the "Remove" button on the wishlist page works

### Expected Behavior
- Clicking the heart icon on a product card toggles wishlist status
- Heart icon is filled/colored when product is in wishlist
- Wishlist page shows all saved items
- "Move to Cart" adds item to cart and removes from wishlist
- "Remove" button removes item from wishlist

### Acceptance Criteria
- [ ] `removeFromWishlist` correctly removes items by ID
- [ ] Heart icon toggles between active and inactive states
- [ ] Wishlist page updates in real-time when items are added/removed
- [ ] "Move to Cart" button works end-to-end
- [ ] Wishlist count is accurate

### Edge Cases
- Adding the same product twice (should not duplicate)
- Removing an item that does not exist
- Empty wishlist state displays correctly

### Hints
- Look at how `addToCart` is implemented in `useCartStore.js` for patterns
- Use `Array.filter()` to implement removal
- Consider adding `persist` middleware similar to the cart store

---

## Task 4: Implement Product Comparison Feature

### Objective
Build a full comparison feature that highlights differences between two selected products.

### Why It Matters
Product comparison is a key conversion feature in e-commerce. Implementation involves dynamic data rendering and conditional formatting.

### Technical Requirements
- Allow selecting exactly two products from the dropdown or from product cards (e.g., "Add to Compare" button)
- Display a side-by-side table comparing all product attributes
- Highlight the "better" value in each row (e.g., lower price in green, higher rating in green)
- Add an "Add to Compare" button on `ProductCard.jsx` or `ProductDetailsPage.jsx`

### Expected Behavior
- Users can select two products using the dropdowns on the Compare page
- The comparison table shows all relevant attributes
- Visual indicators highlight which product has the better value for each attribute
- Users can clear selections and compare different products

### Acceptance Criteria
- [ ] Two products can be selected for comparison
- [ ] All fields are displayed in the comparison table
- [ ] Better values are visually highlighted
- [ ] Users can swap or clear selected products
- [ ] Cannot compare a product with itself

### Edge Cases
- Selecting the same product in both dropdowns
- Comparing products from different categories
- Products with identical values for some attributes

### Hints
- Create a `useCompareStore.js` with Zustand if you want a global compare feature
- For highlighting, compare numeric values and apply conditional CSS classes
- Limit compare to 2 products for simplicity

---

## Task 5: Add Product Reviews to Product Details

### Objective
Display customer reviews on the Product Details page using the mock review data.

### Why It Matters
Reviews build trust and influence purchase decisions. This task involves data fetching, rendering lists, and computing aggregates.

### Technical Requirements
- Import and call `getReviewsByProductId()` from the service layer
- Display reviews in the "Customer Reviews" placeholder section
- Show: reviewer name, rating (stars), comment, and date
- Show average rating and total review count at the top
- Sort reviews by date (newest first)

### Expected Behavior
- Reviews load when the product page loads
- Each review shows the user name, star rating, comment, and date
- An aggregate section shows average rating and "X reviews"
- Products with no reviews show "No reviews yet"

### Acceptance Criteria
- [ ] Reviews are fetched using `getReviewsByProductId`
- [ ] Each review displays all fields (user, rating, comment, date)
- [ ] Average rating is calculated correctly
- [ ] Reviews are sorted newest first
- [ ] Empty state shown for products without reviews

### Edge Cases
- Products with zero reviews
- Products with many reviews (consider showing top 5 with "Show all")
- Reviews with ratings of 1 or 5 (star rendering edge)

### Hints
- Use the existing `renderStars()` function already in the component
- Calculate average: `reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length`
- Format the date nicely using `new Date(date).toLocaleDateString()`

---

## Task 6: Add Checkout Form Validation

### Objective
Implement client-side validation for the checkout form.

### Why It Matters
Form validation prevents invalid data submission and improves UX. It demonstrates handling user input, error states, and conditional rendering.

### Technical Requirements
- Validate all fields are required (not empty)
- Validate email format (use regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Validate phone format (accept: digits, spaces, dashes, parentheses, + prefix)
- Show inline error messages below each invalid field
- Prevent form submission when validation fails
- Show errors only after the user attempts to submit or after the field loses focus

### Expected Behavior
- Submitting with empty fields shows "This field is required" errors
- Invalid email shows "Please enter a valid email address"
- Invalid phone shows "Please enter a valid phone number"
- Valid submission proceeds as before
- Error messages disappear when the field is corrected

### Acceptance Criteria
- [ ] All fields require non-empty values
- [ ] Email validation with proper regex
- [ ] Phone validation with proper regex
- [ ] Inline error messages displayed below fields
- [ ] Form cannot be submitted with errors
- [ ] Errors clear when fields are corrected
- [ ] Error styles (red border, red text) applied to invalid fields

### Edge Cases
- Whitespace-only input (should be treated as empty)
- Email with multiple @ signs
- Phone number with international prefix
- Submitting, fixing one field, and submitting again

### Hints
- Create a `validateForm(form)` function that returns an errors object
- Store errors in state: `const [errors, setErrors] = useState({})`
- Add a `touched` or `submitted` state to control when errors display
- Apply conditional classes: `border-red-500` when field has error

---

## Task 7: Fix Cart Quantity Bug

### Objective
Fix the bug in the cart where product quantity can reach 0 or become negative.

### Why It Matters
A quantity of 0 or less makes no logical sense and can cause calculation errors. This teaches defensive programming and input validation.

### Technical Requirements
- Modify `updateQuantity` in `src/features/cart/useCartStore.js`
- Add a minimum quantity check: if `newQuantity < 1`, either:
  - Clamp to 1 (prevent going below), OR
  - Remove the item from the cart
- Ensure the UI reflects this constraint properly

### Expected Behavior
- Clicking "−" when quantity is 1 either keeps it at 1 or removes the item
- Quantity never displays as 0 or negative
- The total price calculation remains correct

### Acceptance Criteria
- [ ] Quantity cannot go below 1
- [ ] Decided behavior for quantity at 1 (clamp or remove)
- [ ] Total price is always correct
- [ ] UI buttons disabled or provide feedback at minimum quantity

### Edge Cases
- Rapid clicking of the "−" button
- Direct quantity input (if implemented later)
- Cart with multiple items at quantity 1

### Hints
- Add `if (newQuantity < 1) return;` before the state update, or
- Add `if (newQuantity < 1) { removeFromCart(productId); return; }`
- Consider disabling the "−" button in the UI when quantity is 1

---

## Task 8: Replace Spinner with Skeleton Loading

### Objective
Replace the loading spinner in the Products Listing page with skeleton loading UI (content placeholders).

### Why It Matters
Skeleton screens reduce perceived loading time and feel more polished than spinners. They are the industry standard for modern web applications (used by Facebook, YouTube, LinkedIn, etc.).

### Technical Requirements
- Create a `ProductCardSkeleton` component that matches the `ProductCard` layout
- Use animated Tailwind classes: `animate-pulse` with `bg-gray-200` blocks
- Show a grid of 8 skeleton cards during loading
- Replace the spinner in `ProductsPage.jsx` with the skeleton grid

### Expected Behavior
- While loading, users see a grid of placeholder cards that pulse/shimmer
- Skeleton cards match the real card dimensions (image, title, price, button areas)
- Transition to real content is smooth

### Acceptance Criteria
- [ ] `ProductCardSkeleton` component created
- [ ] Skeleton matches real `ProductCard` proportions
- [ ] 8 skeleton cards shown during loading
- [ ] Spinner is fully replaced
- [ ] Loading animation uses `animate-pulse`

### Edge Cases
- Very fast load times (skeleton should not flash briefly — optional: add minimum display time)
- Different screen sizes (skeleton should be responsive like real cards)

### Hints
- Structure: `<div className="animate-pulse"><div className="bg-gray-200 aspect-square rounded-2xl" /><div className="h-4 bg-gray-200 rounded mt-3 w-3/4" /></div>`
- Match the grid layout used for real products
- Tailwind's `animate-pulse` handles the shimmer animation automatically

---

## Task 9: Trigger Toast Notifications on Cart and Wishlist Actions

### Objective
Implement toast notifications for cart and wishlist actions to provide immediate feedback to users.

### Why It Matters
Toast notifications are a standard UI pattern for providing immediate feedback to users. They are the industry standard for modern web applications (used by Facebook, YouTube, LinkedIn, etc.).

### Technical Requirements
- Import and use `toast` from `react-hot-toast`
- Trigger toast notifications for cart and wishlist actions
- Use appropriate toast variants (e.g., `default`, `success`, `error`)
- Provide clear messages for each action
- Ensure toasts are dismissible

### Expected Behavior
- Adding to cart shows a toast notification
- Removing from cart shows a toast notification
- Adding to wishlist shows a toast notification
- Removing from wishlist shows a toast notification

### Acceptance Criteria
- [ ] Toast notifications are triggered for cart actions
- [ ] Toast notifications are triggered for wishlist actions
- [ ] Toast notifications are dismissible
- [ ] Toast notifications provide clear messages
- [ ] Toast notifications use appropriate variants

### Edge Cases
- Rapid clicking of the "Add to Cart" button
- Direct quantity input (if implemented later)
- Cart with multiple items at quantity 1
---

## Task 10: Persist State in Local Storage

### Objective
Configure the Cart, Wishlist, and Comparison stores to persist their state in `localStorage` so data is not lost when the user refreshes the page.

### Why It Matters
State persistence is essential for e-commerce UX. Users expect their shopping cart and wishlist to remain intact across sessions. This task teaches how to use Zustand's built-in middleware for common storage patterns.

### Technical Requirements
- Import `persist` from `zustand/middleware`
- Wrap each store implementation with the `persist` middleware
- Provide a unique `name` for each store's storage key (e.g., `"cart-storage"`, `"wishlist-storage"`, `"compare-storage"`)
- Ensure the state is correctly rehydrated on page load

### Expected Behavior
- Adding items to the cart and refreshing the page preserves the items
- Adding products to the wishlist and refreshing the page preserves the items
- Selected comparison products remain visible after a page reload

### Acceptance Criteria
- [ ] `useCartStore` uses `persist` middleware
- [ ] `useWishlistStore` uses `persist` middleware
- [ ] `useCompareStore` (if implemented) uses `persist` middleware
- [ ] Each store has a unique key name in `localStorage`
- [ ] No errors occur when the storage is empty (first load)

### Edge Cases
- State structure changes (versioning - optional)
- Manual clearing of `localStorage` from browser dev tools
- Storing empty arrays initially

### Hints
- The `persist` middleware is the second argument to `create` but wraps the whole store function: `create(persist((set, get) => ({ ... }), { name: '...' }))`
- Check the Application tab in Chrome DevTools under Local Storage to verify your keys are being created
