# Graham Blair portfolio

Static personal site for Graham Blair, Application Engineering Lead at Howdens.

| Route | What it is |
| --- | --- |
| `/` | Home. Role, stack, and short links into the work. |
| `/work` | Current role, and a personal health dashboard. |
| `/featured` | The MCP server in front of that dashboard. Four **scripted** tool calls play in the browser: a gym session, a swim set, a morning brief, and a water log. |

Nothing on the site calls a model, an MCP server, or any other backend. The cards are fixtures in `src/fixtures/vignettes.ts`. Routes are client-side. The static host needs a catch-all document of `index.html`, which the App Platform spec already sets.

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
| Build command | `npm ci && npm run build` |
| Output directory | `dist` |
| Index document | `index.html` |
| Catch-all document | `index.html` |
| HTTP route | `/` |
| Environment variables | none |
| Run command | none — do not set one |

If the builder image is older than Node 20.19, set Node.js 22 on the component. A starting spec lives in [`deploy/app-spec.yaml`](deploy/app-spec.yaml). Fill in the GitHub repo there, or attach the repo in the DigitalOcean UI. This repository does not deploy itself.

Point **grahamblair.co.uk** at the static app when you are ready. Until then the domain link in the footer is the intended canonical URL.

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

Preview captures of the home hero, the health-dashboard work card, and the featured page (OAuth in the intro) are in [`docs/screenshots/`](docs/screenshots/).
