import { site, stack } from "../content"

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">
            {site.location}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {site.organisation}
          </p>
          <h1 id="hero-title">{site.name}</h1>
          <p className="role">{site.role}</p>
          <p className="signal">{site.signal}</p>
          <p className="lede">
            I work on platforms that stay reviewable: clear boundaries, typed contracts, and
            governance that still holds when an assistant can call tools.
          </p>
          <ul className="chips" aria-label="Stack">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="actions">
            <a className="button button-primary" href="#mcp">
              See the MCP section
            </a>
            <a
              className="button button-secondary"
              href={site.linkedin}
              target="_blank"
              rel="me noreferrer noopener"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Featured on this page">
          <p className="kicker">Featured</p>
          <p className="hero-card-title">MCP, in one minute</p>
          <p>
            Assistant, protocol, tools, backends — and a scripted gym call that never leaves the
            browser.
          </p>
          <ol className="hero-path" aria-label="Architecture path">
            <li>Assistant</li>
            <li>MCP</li>
            <li>Tools</li>
            <li>Backends</li>
          </ol>
          <a className="text-link" href="#demo">
            Watch the scripted call
          </a>
        </aside>
      </div>
    </section>
  )
}
