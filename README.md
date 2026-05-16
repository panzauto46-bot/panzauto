# Panz Auto

Minimalist monochrome motorcycle marketplace landing page built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React

## Run Locally

**Prerequisite:** Node.js 20+

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - TypeScript type-check (`tsc --noEmit`)
- `npm run clean` - remove `dist` folder

## Notes

- Current app is frontend-only (no backend/API integration yet).
- Search form stores selected filters in URL query params and scrolls to featured listings.
- Language toggle supports Indonesian (`id`) and English (`en`).

## Current Features (As of May 2026)
- **Two-Tiered Authentication**: 
  - Buyers use Google Sign-In (GSI).
  - Owner uses a hidden manual login (`panzauto46`).
- **Seller Dashboard**: Secure dashboard to manage products (CRUD). Hidden from normal users.
- **Supabase Integration**: Products are persisted online and synced across all visitors.
- **WhatsApp Checkout**: Buyers can fill out their shipping details (Name, Phone, Address, Courier) in the cart and send a formatted invoice directly to the seller's WhatsApp.

## Future PR (Pekerjaan Rumah) / Next Steps
1. **Order History for Buyers**: Create a dedicated "Pesanan Saya" (My Orders) page for logged-in buyers so they can see their past transactions (requires new `orders` table in Supabase).
2. **Social Media & Footer Polish**: Expand the footer to include links to official Panz Auto social media (Instagram, TikTok) and marketplace shops (Shopee, Tokopedia).
3. **Automated Shipping Calculation**: Integrate with a third-party API (like RajaOngkir or Biteship) to automatically calculate exact shipping costs based on the buyer's address and chosen courier.
4. **Automated Payment Gateway**: Integrate Midtrans or Stripe for automatic payment verification (Virtual Account, QRIS, e-wallet) instead of manual WhatsApp transfers.
