# FORM / FIELD

A fictional, single-page creative studio template built with React, TypeScript, Vite, GSAP, and custom Canvas and SVG effects. All copy and project names are placeholders.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Build and preview the production site:

```sh
npm run build
npm run preview
```

The page includes a pointer-responsive elastic grid, animated contour field, interactive type and card studies, a live visual playground, a pinned horizontal scroll sequence, and an orbital particle scene. Motion respects `prefers-reduced-motion`; Canvas scenes pause offscreen and cap pixel density.

## Cloudflare Workers

`wrangler.toml` serves the static files in `dist/`. The repository includes the built `dist/` files, so the existing `npx wrangler deploy` command can deploy this revision without an additional build command. For future updates, configure Cloudflare Workers Builds with:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

No API keys or runtime secrets are required. `npm run deploy` builds and deploys from a locally authenticated Wrangler session.
