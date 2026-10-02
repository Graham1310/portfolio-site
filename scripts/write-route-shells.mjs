/**
 * After Vite build, write per-route HTML shells that share the SPA assets
 * but carry their own canonical / Open Graph tags.
 *
 * LinkedIn (and similar crawlers) do not run the client router. Without a
 * real /featured/index.html they only see the home meta in the catch-all
 * shell and "correct" /featured back to /.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const DIST = "dist"
const SITE = "https://portfolio.grahamblair.co.uk"

const routes = [
  {
    dir: "featured",
    path: "/featured",
    title: "Health dashboard MCP · Graham Blair",
    description:
      "An MCP server for my health dashboard that lets an AI assistant use my training data through named tools, with credentials kept on the server.",
    imageAlt: "Health dashboard MCP demo by Graham Blair.",
  },
]

function replaceAttr(html, attrName, attrValue, newContent) {
  const pattern = new RegExp(
    `(<meta[^>]*${attrName}="${attrValue}"[^>]*content=")([^"]*)(")`,
    "i",
  )
  if (!pattern.test(html)) {
    throw new Error(`Could not find meta ${attrName}="${attrValue}"`)
  }
  return html.replace(pattern, `$1${newContent}$3`)
}

function replaceLinkCanonical(html, url) {
  const pattern = /(<link\s+rel="canonical"\s+href=")([^"]*)(")/i
  if (!pattern.test(html)) {
    throw new Error("Could not find canonical link")
  }
  return html.replace(pattern, `$1${url}$3`)
}

function replaceTitle(html, title) {
  const pattern = /<title>[^<]*<\/title>/i
  if (!pattern.test(html)) {
    throw new Error("Could not find <title>")
  }
  return html.replace(pattern, `<title>${title}</title>`)
}

function applyRouteMeta(html, route) {
  const url = `${SITE}${route.path}`
  let out = html
  out = replaceTitle(out, route.title)
  out = replaceAttr(out, "name", "description", route.description)
  out = replaceLinkCanonical(out, url)
  out = replaceAttr(out, "property", "og:title", route.title)
  out = replaceAttr(out, "property", "og:description", route.description)
  out = replaceAttr(out, "property", "og:url", url)
  out = replaceAttr(out, "property", "og:image:alt", route.imageAlt)
  out = replaceAttr(out, "name", "twitter:title", route.title)
  out = replaceAttr(out, "name", "twitter:description", route.description)
  out = replaceAttr(out, "name", "twitter:image:alt", route.imageAlt)
  return out
}

const source = readFileSync(join(DIST, "index.html"), "utf8")

for (const route of routes) {
  const dir = join(DIST, route.dir)
  mkdirSync(dir, { recursive: true })
  const outPath = join(dir, "index.html")
  writeFileSync(outPath, applyRouteMeta(source, route), "utf8")
  console.log(`wrote ${outPath}`)
}
