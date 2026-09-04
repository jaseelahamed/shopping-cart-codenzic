# Codenzic Shopping Cart

A responsive, feature-rich shopping cart application built with React, TypeScript, and Vite. This project demonstrates state management, API integration, data validation, and modern UI implementation.

## 🚀 Project Overview

This application allows users to browse a catalog of products, search by title, filter by category and price, and manage a shopping cart. The cart state is persistent across page reloads. A simulated multi-step checkout flow is provided, including a robust shipping form with validation.

## 🛠 Technologies Used

- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (with Persist middleware)
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Validation**: Zod
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🔌 API Used

The application uses the public DummyJSON API for product data:
`https://dummyjson.com/products`

## 📦 Features Completed

- **Product Listing**: Responsive grid displaying products with images, titles, prices, categories, and ratings. Handles loading, error, and empty states.
- **Search & Filtering**: Real-time filtering by search query, category dropdown, and max price slider. Logic encapsulated in a custom hook.
- **Cart Management**: Add/remove items, update quantity (limits: 1 to 5), and clear cart.
- **Cart Summary**: Displays subtotal, tax (5%), and discount (10% off if subtotal > $100). Validates a minimum checkout value of $10.
- **Cart Persistence**: Cart data is saved to `localStorage` using Zustand's persist middleware, retaining state after refresh.
- **Checkout Flow**: 
  - **Step 1: Cart Review** (review items and totals)
  - **Step 2: Shipping** (React state form validated by Zod, no external form library)
  - **Step 3: Payment Summary** (read-only review before placing order)
- **UI/UX**: Clean, modern aesthetics using Tailwind CSS. Includes responsive layouts for mobile, tablet, and desktop.

## ⚠️ Known Limitations

- The checkout is simulated; there is no actual payment gateway integration.
- The API fetch retrieves a fixed number of products (e.g. 100) upfront to allow for fast, localized filtering and searching instead of server-side pagination.
- No actual user authentication is implemented.

## 💻 Setup Instructions

1. Ensure you have Node.js and `pnpm` installed on your machine.
2. Clone this repository (or download the source code).
3. Navigate to the project directory in your terminal.

## 🏃 Commands to Run the Project

- **Install dependencies:**
  ```bash
  pnpm install
  ```

- **Run the development server:**
  ```bash
  pnpm dev
  ```
  The app will typically be available at `http://localhost:5173`.

- **Build for production:**
  ```bash
  pnpm build
  ```

- **Preview production build:**
  ```bash
  pnpm preview
  ```

## 📝 Evaluation Notes

- The UI is designed to feel premium with subtle borders, shadows, rounded corners, and a primary accent color `#aa3bff`.
- Zod is used for robust runtime typing of both the API response (preventing unexpected API schema changes from crashing the app) and the shipping form data.
- Zustand handles global state efficiently without unnecessary re-renders.
- Components are modularized for better readability (`ProductCard`, `CartSidebar`, `Navbar`).
