# FORM / FIELD

An original, fictional motion component library and showcase template. It includes 31 live studies across text, backgrounds, cursors, cards, galleries, navigation, buttons, scroll, and experimental systems. All copy and product references are placeholders.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```sh
npm run build
npm run preview
```

## Structure

- `src/effects/` contains reusable typed React components. Each module exports several related but independently usable studies.
- `src/hooks/` contains pointer, visibility, reduced-motion, and canvas lifecycle helpers.
- `src/demos/registry.ts` defines the actual navigation, defaults, live controls, lazy imports, source links, and working usage examples.
- `src/site/` contains the showcase layout and demo pages. The showcase is separate from the effects.
- `src/styles/` contains the design system and effect presentation styles.
- `dist/` is the production build served by Cloudflare Workers.

The code panel on every demo page shows a usage example synchronized with the controls. Its Source tab loads the real TypeScript module used by the preview. The Copy Code button copies the selected tab.

## Cloudflare Workers

The deployed site is a static-assets Worker, configured in `wrangler.toml`. No Worker script, API key, or runtime secret is needed.

For Cloudflare Workers Builds, use:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

The repository also includes the latest generated `dist/` build so an existing Cloudflare integration that only runs `npx wrangler deploy` can deploy immediately. Rebuild `dist/` before committing source changes if that build setting has not been updated. For manual deployment, use `npm run deploy` after authenticating Wrangler locally.

## Motion and accessibility

Canvas effects pause outside the viewport, cap device pixel ratio, and redraw at smaller counts where applicable. The site supports reduced-motion preferences, keyboard-accessible navigation and controls, visible focus styles, and a mobile index drawer.
