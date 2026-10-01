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
          <p className="place-line">Open-water swimming · Yorkshire</p>
          <p className="lede">
            I built a health dashboard for my own training — swim, gym, nutrition, and readiness —
            and an MCP server so an assistant can use that app: plan a session, read a brief, or
            write a log. The engineering around it is the same standard I care about at work.
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
          <p className="kicker">Why this is here</p>
          <p className="hero-card-title">From the water to a tool surface</p>
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
          <p className="aside-note">Personal product. Separate from the day job.</p>
          <a className="text-link" href="#demo">
            Watch the scripted calls
          </a>
        </aside>
      </div>
    </section>
  )
}
