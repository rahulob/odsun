# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 project using React 19, TypeScript, and Tailwind CSS 4. The project follows the App Router architecture introduced in Next.js 13+.

## Architecture

### Next.js App Router
- Uses the `app/` directory for routing (not the legacy `pages/` directory)
- Routes are defined by folder structure within `app/`
- Each route can have `page.tsx` (UI), `layout.tsx` (shared layouts), and `loading.tsx` (loading states)
- Server Components are the default; use `'use client'` directive for Client Components

### Path Aliases
- `@/*` maps to the project root (configured in `tsconfig.json`)
- Example: `import Component from '@/app/components/Component'`

### Styling
- Uses Tailwind CSS 4 via PostCSS plugin (`@tailwindcss/postcss`)
- Global styles in `app/globals.css`
- Tailwind classes applied directly in components
- Dark mode support via `dark:` prefix classes

### Fonts
- Uses `next/font` with Geist Sans and Geist Mono fonts
- Fonts are optimized and loaded in `app/layout.tsx`
- Applied via CSS variables: `--font-geist-sans` and `--font-geist-mono`

## Development Commands

### Running the development server
```bash
npm run dev
```
Opens at http://localhost:3000 with hot reload enabled.

### Building for production
```bash
npm run build
```
Creates an optimized production build in `.next/`

### Running production build locally
```bash
npm run start
```
Must run `npm run build` first.

### Linting
```bash
npm run lint
```
Runs ESLint with Next.js configuration. ESLint config is in `eslint.config.mjs` using the flat config format.

### Type checking
```bash
npx tsc --noEmit
```
TypeScript is configured with strict mode enabled.

## Key Configuration

- **TypeScript**: Strict mode, ES2017 target, path aliases enabled
- **ESLint**: Uses Next.js flat config with Web Vitals and TypeScript rules
- **Next.js**: Minimal default configuration in `next.config.ts`

## Working with Pages

When creating new pages:
1. Create a folder in `app/` for the route (e.g., `app/about/`)
2. Add `page.tsx` for the route UI
3. Optionally add `layout.tsx` for nested layouts
4. Use Server Components by default for better performance
5. Add `'use client'` directive only when using hooks, event handlers, or browser APIs

## Notes

- The project uses React 19 which may have different behavior from React 18
- Tailwind CSS 4 uses a new PostCSS plugin architecture
- ESLint uses the new flat config format (v9+)
