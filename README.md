# Graham Blair portfolio

Static personal site for Graham Blair. Home opens with him: .NET by trade, building with models and agents, and thinking about how to govern them. The health dashboard is the project write-up. Featured is the MCP server demo in front of it.

| Route | What it is |
| --- | --- |
| `/` | Home. Who he is, project cards, and how he approaches AI at work. |
| `/projects` | The health dashboard: what it is, how it's built, and a sample overview screenshot. |
| `/work` | Redirects to `/projects`. |
| `/featured` | MCP server demo: architecture, guardrails, tool counts, and four pre-recorded examples. |
| `/about` | Short bio and Get in touch (LinkedIn). |

Nothing on the site calls a model, an MCP server, or any other backend. The demo cards are fixtures in `src/fixtures/vignettes.ts`. Routes are client-side. The static host has to serve `index.html` for unknown paths. [`deploy/app-spec.yaml`](deploy/app-spec.yaml) sets `catchall_document: index.html`. An app created in the DigitalOcean control panel does not read that file on push; the deploy section has the one setting to change. `/projects`, `/featured`, `/about`, and the `/work` redirect all depend on that.

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

Cold loads of `/projects`, `/featured`, `/about` and `/work` need the SPA shell with HTTP 200. Client-side links from `/` already work. A shared or LinkedIn Featured link does not, until the static site has a catch-all.

In the control panel, after the app exists:

1. Open **Apps**, then this app, then **Settings**.
2. Open the static site component.
3. Find **Custom Pages** and click **Edit**.
4. Choose **Catchall**. Page name: `index.html` (not `/index.html`).
5. Save. App Platform redeploys.

Do not also set an error document. Catch-all and error document cannot both be set, and an error document still returns 404.

`index.html` is already in the repo, and the build writes it to `dist/`. The output directory on the component should stay `dist`.

If you would rather edit the spec than use Custom Pages, add `catchall_document: index.html` to the existing static site and remove `error_document` if it is present. Keep the component name, the GitHub source, and the `portfolio.grahamblair.co.uk` domain. Do not replace the live spec with `deploy/app-spec.yaml` wholesale: that file has no custom domain, and a full replace can drop one.

Check once the deployment has finished. The edge may keep a previous 404 for a while (`s-maxage=86400` on the platform 404). A `cf-cache-status: HIT` together with `x-do-orig-status: 404` is that cache, not proof the setting was ignored.

```bash
curl -I https://portfolio.grahamblair.co.uk/projects
curl -I https://portfolio.grahamblair.co.uk/work
curl -I https://portfolio.grahamblair.co.uk/featured
curl -I https://portfolio.grahamblair.co.uk/about
```

## What the featured page is

1. Home is him, then the projects and an approach section. The dashboard write-up lives on `/projects`. `/featured` is the MCP deep-dive: how an assistant uses that data, with credentials kept on the server, and the pre-recorded demos.
2. The chat panel on `/featured` plays four fixtures from `src/fixtures/vignettes.ts`. Nothing is fetched.
3. The tool counts (34 read, 28 write, 4 integrations) come from the HealthDashboard MCP first-party registries. A Garmin Connect integration sits alongside those counts.
4. The page is still a static explanation of a real MCP pattern, not a live connector.
