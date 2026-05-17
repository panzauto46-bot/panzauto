# Panz Auto

Motorcycle velocity stack storefront built with React, TypeScript, Vite, and Tailwind CSS. The app is frontend-first, with Supabase used for shared product data and buyer order history.

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
2. Configure environment variables in `.env`:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_OWNER_EMAILS` for owner dashboard access
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if you want shared products and orders
3. Start dev server:
   `npm run dev`
4. Open:
   `http://localhost:3000`

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - TypeScript type-check (`tsc --noEmit`)
- `npm test` - run unit tests (`.test.ts` and `.test.tsx`)
- `npm run clean` - remove `dist` folder

## Notes

- The catalog works without Supabase by falling back to the default in-memory product list.
- Search form stores selected filters in URL query params and scrolls to featured listings.
- Language toggle supports Indonesian (`id`) and English (`en`).
- Owner access is determined by Google Sign-In email allowlist via `VITE_OWNER_EMAILS`.

## Current Features (As of May 2026)
- **Google Sign-In Authentication**:
  - Buyers sign in with Google.
  - Owners use the same Google flow and are promoted by email allowlist.
- **Seller Dashboard**: Secure dashboard to manage products (CRUD). Hidden from normal users.
- **Supabase Integration**: Products are persisted online and synced across all visitors.
- **WhatsApp Checkout**: Buyers can fill out shipping details (Name, Phone, Address, Courier), save the order to Supabase, and open a prefilled WhatsApp order chat.
- **Buyer Order History**: Signed-in buyers can open "Pesanan Saya" / "My Orders" to review previous orders from Supabase.

## Future PR (Pekerjaan Rumah) / Next Steps
1. **Supabase Auth + RLS**: Move buyer and owner authentication fully to Supabase Auth and lock data access with Row Level Security.
2. **Shipping Calculation**: Integrate RajaOngkir or Biteship to estimate shipping before the WhatsApp handoff.
3. **Payment Confirmation Flow**: Replace the current manual payment messaging with a clearer payment confirmation or gateway flow.
4. **Social Media & Footer Polish**: Add official social and marketplace links (Instagram, TikTok, Shopee, Tokopedia).
