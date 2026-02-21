# ShopHub — E-Commerce Training Project

A portfolio-ready E-Commerce React application designed as a structured training project for the **Professional Program of React.js Developer** on **[Intern2Grow](https://intern2grow.pages.dev)**, developed by **[Ahmed Saber](https://ahmed0saber.pages.dev)**.

All pages are fully styled and partially functional — your job is to **improve logic, fix bugs, and implement missing features** using modern React patterns.

## Tech Stack

- **React 19** + **Vite 7**
- **React Router 7** — client-side routing
- **Zustand** — state management
- **Vitest** — unit testing
- **TailwindCSS v4** — modern utility-first styling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

## Project Structure

This project follows a **Feature-Based Architecture**, grouping logic by domain rather than file type.

```
src/
├── components/          # Shared layout components (Navbar, Footer, Layout)
├── data/                # Static mock data (products.js, reviews.js)
├── features/            # Feature domains
│   ├── products/        # Components, Services, and Tests for products
│   ├── cart/            # hooks (Zustand store) for cart logic
│   ├── wishlist/        # hooks (Zustand store) for wishlist logic
│   └── shared/          # Shared feature-specific utilities
├── pages/               # Page entry points (Home, Products, Details, etc.)
├── App.jsx              # Router & Route Definitions
├── index.css            # TailwindCSS v4 configuration
└── main.jsx             # React entry point
```

## Educational Features

- **Simulated Latency**: All service calls in `productService.js` have a built-in **500ms delay** to help you practice implementing loading states and skeletons.
- **Intentional Bugs**: The codebase contains several common mistakes (throttled timers, quantity edge cases) for students to identify and fix.
- **Unit Testing**: Core business logic is covered by Vitest suites to demonstrate reliability.

## Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Complete |
| Products | `/products` | ⚠️ Filters not wired |
| Product Details | `/products/:id` | ⚠️ No reviews |
| Cart | `/cart` | ⚠️ Quantity bug |
| Wishlist | `/wishlist` | ⚠️ Partial logic |
| Compare | `/compare` | ⚠️ Basic layout only |
| Checkout | `/checkout` | ⚠️ No validation |

## Student Tasks

See **[STUDENT_TASKS.md](./STUDENT_TASKS.md)** for 10 detailed tasks with acceptance criteria, edge cases, and implementation hints.

## Key Design Decisions

- **No external APIs** — all data is local mock data
- **No Context API or useReducer** — Zustand only for simplicity
- **No UI libraries** — pure Tailwind CSS for maximum control
- **Intentional bugs** — exist specifically for learning purposes
- **Feature-based architecture** — scaleable organizational pattern
