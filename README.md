# Shopping Cart E-Commerce App

## Project Overview
A modern, fully responsive e-commerce web application with a focus on premium UI/UX. The application allows users to browse products, apply filters, read detailed product reviews and specifications, manage a shopping cart, and simulate a checkout process. It features a polished interface with a signature green primary color, glassmorphism elements, and smooth physics-based scrolling.

## Technologies Used
- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query, Axios
- **Routing:** React Router DOM
- **Forms & Validation:** Formik, Zod (`zod-formik-adapter`)
- **UI Enhancements:** Lucide React (Icons), React Lenis (Smooth Scrolling), React Toastify (Notifications)

## Setup Instructions
1. Clone or download the repository to your local machine.
2. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
3. Open a terminal in the project directory (`d:\codenzic\shopping-cart` or your path).
4. Install the necessary dependencies using your preferred package manager (`pnpm` is recommended, but `npm` works as well).

## Commands to Run the Project
- **Install Dependencies:**
  ```bash
  pnpm install
  # or
  npm install
  ```
- **Start Development Server:**
  ```bash
  pnpm dev
  # or
  npm run dev
  ```
- **Build for Production:**
  ```bash
  pnpm build
  # or
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  pnpm preview
  # or
  npm run preview
  ```
- **Run Linter:**
  ```bash
  pnpm lint
  # or
  npm run lint
  ```

## API Used
**DummyJSON Products API:** `https://dummyjson.com/products`
- Provides the entire mock catalog of products.
- Provides dummy data for reviews, ratings, thumbnails, image galleries, and detailed specifications (SKU, weight, dimensions, shipping, and warranty info).
- Utilizes the `?limit=` query parameters to fetch large batches of products.

## Features Completed
- **Modern Explore Page:** A grid layout to display products with an interactive filter sidebar.
- **Responsive Mobile Layouts:** The sidebar filters intelligently convert into a slide-out drawer on mobile devices with a semi-transparent overlay to prevent overlap.
- **Advanced Filtering & Sorting:** Users can filter the product catalog by search text, category dropdown, max price slider, and sort by price or top-rated.
- **Premium Product Details Page:**
  - Interactive image gallery.
  - Custom Tabbed Navigation (Details, Reviews, Shipping).
  - Analytical Reviews Layout that dynamically calculates 5-star to 1-star percentage distributions with animated CSS progress bars.
- **Cart Management:** Persistent shopping cart state using Zustand. Supports add, remove, and quantity controls with a maximum item limit (5 per item), complete with Toast notifications.
- **Form Validation:** Checkout and shipping forms are securely validated on the client side using Formik and Zod schemas.
- **Smooth Scrolling:** Integrated `@studio-freight/react-lenis` to provide a premium, butter-smooth scrolling experience across all pages.

## Known Limitations
- **Simulated Checkout:** The checkout process is purely a front-end simulation. There is no actual backend order processing or payment gateway integration (e.g., Stripe).
- **Read-Only API:** Because the data comes from a public dummy API, actions like "Write a review" or inventory changes do not persist to a real backend database. They are either handled locally or mocked.
- **Image Quality:** The product images provided by the dummy JSON API are sometimes low resolution or inconsistent in aspect ratio, which is handled via CSS object-fit but cannot be fully upscale-corrected.
