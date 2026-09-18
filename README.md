# Drovakia

A static website that displays **TEST** on the homepage. The deployable files are in `public/`; there are no dependencies or build step.

## Run locally

From the repository root, run `python -m http.server 8000 --directory public`, then visit <http://localhost:8000/>.

## Deploy with Cloudflare Workers

In Cloudflare **Workers & Pages**, connect this GitHub repository to a Worker. Use `main` as the production branch, leave the build command empty, and use `npx wrangler deploy` as the deploy command.

The `wrangler.toml` file deploys the static files in `public/` without a Worker script. No environment variables or secrets are required.
