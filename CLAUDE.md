# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 3000 (auto-opens browser, config in [vite.config.js](vite.config.js))
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint across the repo (flat config in [eslint.config.js](eslint.config.js))

No test runner is configured.

## Architecture

Single-page React 19 + Vite marketing site for a restaurant ("Kurtob"). No router, no TypeScript, no CSS framework — plain CSS with a global stylesheet plus styled-jsx blocks inside components.

### Rendering shape

[src/App.jsx](src/App.jsx) is the only page. It eagerly renders `Navbar` + `Hero` + `Footer` + `ReservationModal`, and lazy-loads the below-the-fold sections (`StorySection`, `MenuSection`, `BranchesSection`, `GallerySection`, `CtaBanner`) through `React.lazy` inside a single `Suspense` boundary with a `.section-skeleton` fallback. When editing sections, preserve lazy boundaries — they are the site's primary performance lever.

The reservation modal is hoisted to `App` and opened via an `onOpenReservation` prop passed down to `Navbar` and `Hero`. Modal open/close toggles `document.body.style.overflow` directly to lock scroll.

### Data layer

Static content lives in [src/data/](src/data/) (`branches.js`, `galleryData.js`, `galleryImages.js`, `menuItems.js`) as plain JS exports. Sections import from here rather than fetching — treat these files as the CMS.

### Shared primitives

- [src/hooks/useInView.js](src/hooks/useInView.js) — IntersectionObserver-based visibility hook used to trigger scroll-in animations. Once visible it stays visible (no un-observe on exit).
- [src/hooks/useScrolled.js](src/hooks/useScrolled.js) — scroll threshold hook for navbar state.
- [src/components/FadeIn.jsx](src/components/FadeIn.jsx) — wrapper component for fade-in animations; pairs with `useInView`.
- [src/utils/animations.js](src/utils/animations.js) — shared animation helpers.

### Styling

- [src/styles/globals.css](src/styles/globals.css) holds global tokens and layout.
- Component-scoped styles live inside the component via `<style jsx>{`...`}</style>` blocks (see `ReservationModal`). The brand palette centers on gold `#d4af37` / `#d4a017` on a near-black `#0e0d08` background; fonts are `Playfair Display` (display) and `Jost` (body).

### External integration

[ReservationModal](src/components/ReservationModal.jsx) posts reservations via `axios` to `https://olx-server-omega.vercel.app/api/message/chanel` with a hardcoded `chanelId`. The payload is escaped for Telegram MarkdownV2 (`escapeMarkdownV2`). The endpoint and channel ID are literals in the component, not env vars.

## Conventions

- Components are `.jsx` with default exports.
- ESLint rule `no-unused-vars` ignores names matching `^[A-Z_]` — uppercase/constant-cased vars can be declared unused without warnings.
- `dist/` is globally ignored by ESLint.