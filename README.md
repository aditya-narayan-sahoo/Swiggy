# Swiggy Clone - Food & Grocery Delivery Platform

A modern, highly responsive, and premium web application clone of Swiggy, featuring both **Food Delivery** and **Instamart (Grocery)** services. Built with React, TypeScript, and custom Vanilla CSS, the application offers an immersive user experience, glassmorphism aesthetics, a dynamic dark mode, and seamless simulated workflows from browsing to checkout and live order tracking.

---

## 🌟 Key Features

### 🛵 Food Delivery Module
- **Restaurant Discovery:** Explore a curated list of top-rated restaurants with dynamic filters (cuisine types, pure veg, delivery time, rating, cost sorting).
- **Interactive Menus:** Search for food items within a restaurant, toggle veg/non-veg options, and add items to a unified cart.
- **Cart & Checkout:** Manage cart items, select saved delivery addresses, apply discount codes, and choose payment methods.
- **Simulated Payment Gateway:** Experience a sleek checkout spinner that simulates transaction verification.
- **Live Order Tracking:** Track your order status in real time with a interactive step-by-step progress tracker (Order Confirmed, Preparing, Out for Delivery, Delivered).

### 🛒 Instamart Module
- **Grocery Shopping:** Instantly switch to the Instamart interface to shop for fresh vegetables, snacks, beverages, dairy, and household essentials.
- **Category Filter:** Easily browse products by category with a clean sidebar/grid layout.

### 👤 Profile & Address Management
- **User Profile:** Manage personal info, view past orders, and add/edit multiple delivery addresses (e.g., Home, Work).
- **Order History:** View detailed summary of past orders, prices, items, and status.

### 🎨 Modern Design & UX
- **Dynamic Theme:** Support for seamless **Light** and **Dark** themes.
- **Vibrant CSS Aesthetics:** Customized gradients, card hover animations, clean typography (Inter & Outfit fonts), and glassmorphism elements.
- **Fully Responsive:** Optimised for desktop, tablet, and mobile displays.

---

## 🛠️ Technology Stack

- **Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build System:** [Vite](https://vite.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Custom Vanilla CSS (configured via `src/index.css` and `src/App.css`)
- **Linter:** [Oxlint](https://github.com/oxc-project/oxc)

---

## 📁 Project Structure

```text
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── CartDrawer.tsx      # Sidebar slide-out cart drawer
│   │   ├── CheckoutModal.tsx   # Checkout options & address selection
│   │   ├── Footer.tsx          # Responsive platform footer
│   │   ├── Header.tsx          # Dynamic top navigation header
│   │   ├── Instamart.tsx       # Grocery catalog and grid
│   │   ├── OrderTracking.tsx   # Interactive step-by-step order tracking
│   │   ├── PaymentSpinner.tsx  # Animated payment processing screen
│   │   ├── RestaurantCard.tsx  # Restaurant showcase card
│   │   └── UserProfile.tsx     # Profile, address book, and order history
│   ├── data/
│   │   └── mockData.ts        # Comprehensive mock data for restaurants, items, and addresses
│   ├── App.css                # Component-specific styles
│   ├── App.tsx                # Main entry point & central state management
│   ├── index.css              # Main design system variables & dark mode utility classes
│   └── main.tsx               # React DOM bootstrap
├── public/                    # Static assets
├── index.html                 # HTML skeleton
├── package.json               # Package dependencies & scripts
└── tsconfig.json              # TypeScript compilation configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd /home/{your-username}/Desktop/Swiggy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Compiles TypeScript and builds the application for production.
- `npm run lint`: Runs oxlint to identify lint errors.
- `npm run preview`: Previews the production build locally.
