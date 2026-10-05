# Aventis Yacht Charters

A production-ready luxury yacht-charter website — "Quiet Maritime Luxury." Built to the Aventis
master spec on **Option B** (Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion ·
Swiper), with a scroll-scrubbed 240-frame canvas hero.

## Run

```bash
pnpm install
pnpm dev     # http://localhost:3000 (this doc used 3001 to avoid a port clash)
pnpm build   # production build (static prerender)
```

## Signature hero — canvas frame scrubber
`src/components/hero.tsx` renders a 300vh runway with a sticky 100vh canvas:
- **240 frames** (`public/frames/frame_000.jpg`…`frame_239.jpg`) extracted locally from a
  royalty-free yacht aerial clip (Mixkit) via a bundled `ffmpeg-static` binary — 1280×720, q82.
- **Retina DPR** scaling (`min(dpr, 2)`), **cover math** (no stretch), and **0.085 lerp damping**
  in `requestAnimationFrame` for zero-jitter scrubbing.
- **Preloading**: first 30 frames + every 8th keyframe immediately, the rest streamed via
  `requestIdleCallback`.
- **No dark overlay** — the natural sunlit sea is preserved, per spec.
- **3 two-word scroll stages** (`p<0.33`, `<0.67`, `≥0.67`) at solid opacity, plus the bottom-left
  `NEWPORT` badge and bottom-right `01 02 03` + gold progress bar (15%→100%).
- **Reduced motion**: collapses to a static representative frame, no scrubbing.

## Sections
Header (scroll-aware, mobile drawer) · Hero · About (IntersectionObserver stat counters) ·
Featured Fleet (filter tabs + cards) · Split Experience · Top Destinations (Swiper with the
**unclipped drop-shadow** wrapper from §3.6) · Panoramic CTA · Testimonials (Swiper + gold bullets) ·
Press bar · Footer (newsletter, no agency credit). Plus a **custom trailing cursor**, and
**search + booking modals** (Esc-to-close, body scroll lock, focus on open).

## Design system
All tokens in `src/app/globals.css` match the spec exactly (navy `#070F17`, champagne gold
`#C59B5F`, alabaster `#FAF8F5`, shadows, radii, `cubic-bezier(0.16,1,0.3,1)`). Fonts: Cormorant
Garamond (serif) + Inter (sans) via `next/font`.

## Assets (`public/`)
- `frames/` — 240 extracted JPEGs (hero).
- `images/` — 10 themed stock photos downloaded from Unsplash + 5 bespoke inline SVGs
  (compass logo, 4 feature icons).

> Note: photography is themed stock standing in for the spec's exact art direction; swap any file
> in `public/images/` (keep the filename) to use your own shoot.

## SEO
Canonical, Open Graph + Twitter card (`cta_lounge_sunset.jpg`), and Schema.org `BoatReservation`
JSON-LD are set in `src/app/layout.tsx`.
