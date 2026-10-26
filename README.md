# FOKUS — Landing Page (React)

A production-ready React refactor of the FOKUS preorder landing page. Same
brand, same copy, same Arabic RTL experience — rebuilt as a component-based
Vite + Tailwind + Framer Motion app.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 3** — brand palette and type scale live in `tailwind.config.js`
- **Framer Motion** — scroll reveals, stagger sequences, the hero cube flip
- **React Hook Form** — preorder form state + validation
- **React Icons** — inline icons (checkmarks, close, arrow-up)

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## ⚠️ Before you go live: connect the Google Sheet

The preorder form posts leads to a Google Apps Script Web App, exactly like
the original page. You need to point it at your own deployment:

1. Open `src/utils/submitLead.js`.
2. Replace:
   ```js
   const SHEET_URL = 'YOUR_GOOGLE_SCRIPT_URL';
   ```
   with your deployed Apps Script `/exec` URL.
3. That's it — no other code changes needed. The request still uses
   `Content-Type: text/plain` to avoid an Apps Script CORS preflight,
   matching the original integration exactly.

> **Fixed from the original:** the old inline script called
> `Utilities.formatDate(...)`, which only exists inside Google Apps
> Script's *server-side* runtime — calling it from browser JS would throw
> a `ReferenceError` and silently break every submission. It's now
> replaced with a browser-safe `Intl.DateTimeFormat` call that produces
> the same `yyyy-MM-dd HH:mm:ss` timestamp in the `Africa/Cairo` timezone.

## Project structure

```
src/
  components/     Presentational, single-responsibility components
  hooks/          useCountdown, useCountUp, useLockBodyScroll
  utils/          validation, lead submission, scroll helper
  constants/      content.js — all Arabic copy in one place
  App.jsx         Composes every section
  main.jsx        React root
  index.css       Tailwind entrypoint + global base styles
```

Each landing-page section (`Hero`, `ProblemSection`, `Features`, `FAQ`,
etc.) is its own component in `src/components/`, and every string of
marketing copy lives in `src/constants/content.js` — update the page by
editing data, not JSX.

## Notable implementation details

- **`FocusCube`** (in `Hero`) is a real 3D CSS cube (`transform-style:
  preserve-3d`, `backface-visibility: hidden`) — click it to flip between
  the device's four preset durations, echoing the physical product.
- **`CTAButton`** is the single shared button used everywhere (nav, hero,
  buy card, final CTA): it handles the ripple effect, a subtle magnetic
  hover pull, disabled/loading states, and the pulse-glow variant, so no
  button styling is duplicated across sections.
- **Scroll reveals** use Framer Motion's `whileInView`, replacing the
  original's manual `IntersectionObserver` + CSS class toggling.
- **Countdown** recalculates its target once via `useRef` (not on every
  render) and animates each digit in/out with `AnimatePresence`.
- **Accessibility**: form fields have associated `<label>`s and
  `aria-invalid`, the FAQ accordion uses `aria-expanded`, the modal uses
  `role="dialog"` + `aria-modal`, and `prefers-reduced-motion` is
  respected globally via `index.css`.
- **Images**: the gallery section (`Gallery.jsx`) currently renders emoji
  placeholders in the exact same grid the original used. Swap each tile
  for a real `<img loading="lazy" ... />` once product photography is
  ready — the layout and reveal animations don't need to change.

## Deployment

`npm run build` outputs a static `dist/` folder — deploy it to Vercel,
Netlify, Cloudflare Pages, or any static host.
