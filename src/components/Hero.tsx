import { site, stack, story } from "../content"

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
          <div className="lede">
            <p>
              Garmin, the nutrition log, and a readiness check each lived in their own app. Copying
              between them got old. I built a personal health dashboard so the week would sit in
              one place.
            </p>
            <p>
              Then I wanted an assistant to use that data. The keys had to stay on the server, so I
              put an MCP server in front of the dashboard. It publishes named tools. The assistant
              calls one, and the dashboard reads, builds a session, or appends a log line.
            </p>
          </div>
          <p className="place-line">
            I also swim in open water, usually in Yorkshire, so the page is this colour.
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
        <aside className="hero-card" aria-label="Why the MCP section is here">
          <p className="kicker">The order</p>
          <p className="hero-card-title">Why the MCP server exists</p>
          <ol className="story-steps">
            {story.map((step) => (
              <li key={step.index}>
                <span>{step.index}</span>
                <div>
                  <p className="guard-title">{step.title}</p>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="aside-note">The dashboard is a project I built for my own training.</p>
          <a className="text-link" href="#demo">
            See the examples
          </a>
        </aside>
      </div>
    </section>
  )
}
