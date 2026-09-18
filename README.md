# Drovakia

A static website that displays **TEST** on the homepage. The deployable files are in `public/`; there are no dependencies or build step.

## Run locally

From the repository root, run `python -m http.server 8000 --directory public`, then visit <http://localhost:8000/>.

## Deploy with Cloudflare Pages

In Cloudflare **Workers & Pages**, create a Pages project by importing this GitHub repository. Use these settings:

- Production branch: `main`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `public`

The `wrangler.toml` file also points Cloudflare Pages to `public/`. No environment variables or secrets are required.
