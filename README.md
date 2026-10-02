# Graham Blair portfolio

Static personal site for Graham Blair, Application Engineering Lead at Howdens.

| Route | What it is |
| --- | --- |
| `/` | Home. Role, stack, and short links into the work. |
| `/work` | Current role, and a personal health dashboard. |
| `/featured` | The MCP server in front of that dashboard. Four **scripted** tool calls play in the browser: a gym session, a swim set, a morning brief, and a water log. |

Nothing on the site calls a model, an MCP server, or any other backend. The cards are fixtures in `src/fixtures/vignettes.ts`. Routes are client-side. The static host has to serve `index.html` for unknown paths. [`deploy/app-spec.yaml`](deploy/app-spec.yaml) sets `catchall_document: index.html`. An app created in the DigitalOcean control panel does not read that file on push; the deploy section has the one setting to change.

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

`npm run build` emits HTML, CSS, and JS only. There is no server, no environment variable, and no secret.

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

### Catch-all for `/work` and `/featured`

Cold loads of those paths need the SPA shell with HTTP 200. Client-side links from `/` already work. A shared or LinkedIn Featured link does not, until the static site has a catch-all.

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
curl -I https://portfolio.grahamblair.co.uk/featured
curl -I https://portfolio.grahamblair.co.uk/work
```

Both should be `200`, and the body should be this site's `index.html`, not DigitalOcean's "Not Found" page. The same check on the default `ondigitalocean.app` hostname should match. LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) should then show the title, description, and `og.png` for `https://portfolio.grahamblair.co.uk/featured`.

## What the featured page is

A recruiter can read it in under a minute:

1. Training tools were separate, so he built a health dashboard. MCP is how an assistant uses that data, with the keys kept on the server. The home page is the portfolio. This story lives on `/featured`.
2. The path is Assistant → MCP → Tools → backends (health dashboard, training API, nutrition log).
3. The counts are **placeholders**, and the page says so.
4. Guardrails: auth on the connector, allow-list, no secrets in the client, confirm on destructive writes.
5. Four canned scripts: create, create, read, and log. `prefers-reduced-motion` shows the selected script at once.

## Public-safe on purpose

Leave out of this repo:

- real health, wellness, or body data
- internal assistant brands
- live private endpoints, tokens, or session material
- scanner findings or employer-confidential detail
- analytics that phone home

There is no contact form and no tracking script.

## Screenshots

Preview captures of the home hero, the health-dashboard card, the Howdens “On a team” notes, and the featured page are in [`docs/screenshots/`](docs/screenshots/).
