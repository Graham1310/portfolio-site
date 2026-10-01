import { story } from "../content"
import { McpSection } from "../components/McpSection"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function FeaturedPage() {
  useDocumentTitle("Health dashboard MCP · Graham Blair")

  return (
    <>
      <section id="featured" className="water-band page-hero" aria-labelledby="featured-title">
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">Featured · personal project</p>
            <h1 id="featured-title">Health dashboard</h1>
            <p className="role">MCP is how an assistant talks to it</p>
            <div className="lede">
              <p>
                Garmin, the nutrition log, and a readiness check each lived in their own app. I was
                copying between them, so I built a personal health dashboard and put the week in
                one place.
              </p>
              <p>
                I wanted an assistant to use that data, with the keys left on the server. The MCP
                server publishes named tools. The assistant calls one, and the dashboard reads,
                builds a session, or appends a log line.
              </p>
            </div>
          </div>
          <aside className="hero-card" aria-label="Why the MCP server exists">
            <p className="kicker">On this product</p>
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
            <p className="aside-note">I built the dashboard for my own training.</p>
            <a className="text-link" href="#demo">
              See the examples
            </a>
          </aside>
        </div>
      </section>
      <McpSection />
    </>
  )
}
