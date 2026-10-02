# Graham Blair portfolio

Static personal site for Graham Blair. Home opens with him: .NET by trade, building with models and agents, and thinking about how to govern them. The health dashboard is the project write-up. The durable MCP demo lives at `/health-mcp`.

| Route | What it is |
| --- | --- |
| `/` | Home. Who he is, project cards, and how he approaches AI at work. |
| `/projects` | The health dashboard: what it is, how it's built, and a sample overview screenshot. |
| `/work` | Redirects to `/projects`. |
| `/health-mcp` | Health dashboard MCP demo. Build writes `dist/health-mcp/index.html` with its own canonical and Open Graph tags for LinkedIn. |
| `/featured` | Redirects to `/health-mcp` (old links). |
| `/about` | Short bio and Get in touch (LinkedIn). |

Nothing on the site calls a model, an MCP server, or any other backend. The demo cards are fixtures in `src/fixtures/vignettes.ts`. Routes are client-side. The static host serves real files when they exist (`/health-mcp/` → `health-mcp/index.html`) and falls back to `index.html` for other deep links. [`deploy/app-spec.yaml`](deploy/app-spec.yaml) sets `catchall_document: index.html`.

Point LinkedIn Featured at `https://portfolio.grahamblair.co.uk/health-mcp`, then refresh the [Post Inspector](https://www.linkedin.com/post-inspector/). That URL stays tied to this project even if you later put something else on a general Featured slot.

## Run locally

Requires Node.js `^20.19.0` or `>=22.12.0` (Vite 8).

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:47321](http://127.0.0.1:47321)

```bash
npm run build   # typecheck + static assets in dist/
npm run preview # serve dist/ at http://127.0.0.1:47322
npm run lint
```

`npm run build` emits HTML, CSS and JS only. There is no server, no environment variable, and no secret.

To regenerate the Project page screenshot from the fake overview:

```bash
python scripts/capture_overview.py
```

## DigitalOcean App Platform (static site)

Do not add a web service, worker, or job. A portfolio with only a static component can use the free static-site tier (up to three free static apps, 1 GiB outbound transfer per app per month). Auto HTTPS and a custom domain are configured in App Platform after the first deploy.

Suggested component settings:

| Setting | Value |
| --- | --- |
| Resource type | **Static Site** |
| Environment | Node.js |
| Build command | `NPM_CONFIG_PRODUCTION=false npm ci && npm run build` |
| Output directory | `dist` |
| Index document | `index.html` |
| Catch-all document | `index.html` |
| HTTP route | `/` |
| Environment variables | none |
| Run command | none — do not set one |

If the builder image is older than Node 20.19, set Node.js 22 on the component. A starting spec lives in [`deploy/app-spec.yaml`](deploy/app-spec.yaml). This repository does not deploy itself, and a control-panel app does not pick up that file when `main` changes.

The site is [https://portfolio.grahamblair.co.uk](https://portfolio.grahamblair.co.uk). Leave **grahamblair.co.uk** where it is. That apex is a different site, and it should not be pointed at this app.

### Catch-all for deep links

Cold loads of `/projects`, `/about` and `/work` need the SPA shell with HTTP 200. `/health-mcp` has its own built HTML shell. Client-side links from `/` already work.

In the control panel, after the app exists:

1. Open **Apps**, then this app, then **Settings**.
2. Open the static site component.
3. Find **Custom Pages** and click **Edit**.
4. Choose **Catchall**. Page name: `index.html` (not `/index.html`).
5. Save. App Platform redeploys.

Do not also set an error document. Catch-all and error document cannot both be set, and an error document still returns 404.

```bash
curl -I https://portfolio.grahamblair.co.uk/projects
curl -I https://portfolio.grahamblair.co.uk/health-mcp
curl -I https://portfolio.grahamblair.co.uk/featured
curl -I https://portfolio.grahamblair.co.uk/about
```

## What the health MCP page is

1. Home is him, then the projects and an approach section. The dashboard write-up lives on `/projects`. `/health-mcp` is the MCP deep-dive: how an assistant uses that data, with credentials kept on the server, and the pre-recorded demos.
2. The chat panel plays four fixtures from `src/fixtures/vignettes.ts`. Nothing is fetched.
3. The tool counts (34 read, 28 write, 4 integrations) come from the HealthDashboard MCP first-party registries. Garmin, MyFitnessPal and Withings sit behind those tools.
4. The page is still a static explanation of a real MCP pattern, not a live connector.
