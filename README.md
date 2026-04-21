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
