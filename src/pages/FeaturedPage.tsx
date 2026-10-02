import { pageMeta, site, story } from "../content"
import { McpSection } from "../components/McpSection"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function FeaturedPage() {
  useDocumentTitle(pageMeta.featured.title, pageMeta.featured.description)

  return (
    <>
      <section id="featured" className="water-band page-hero" aria-labelledby="featured-title">
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">Featured</p>
            <h1 id="featured-title">MCP server</h1>
            <p className="role">How an AI assistant can use my health dashboard safely</p>
            <div className="lede">
              <p>
                MCP (Model Context Protocol) is a standard way for an AI assistant to use outside
                tools. I built an MCP server in front of my training dashboard, so I can ask an
                assistant things like &quot;build me a 45-minute upper body session&quot; and it
                does the work through the dashboard.
              </p>
              <p>
                The assistant only gets a short list of named tools. Sign-in and credentials stay
                on the server, and anything that changes or deletes data needs confirmation.
              </p>
              <p className="lede-muted">
                The demo further down uses pre-recorded responses, so it runs without calling a
                model or touching my real data.
              </p>
            </div>
            <p className="work-actions">
              <a className="button button-primary" href="#demo">
                See the demo
              </a>
            </p>
          </div>
          <aside className="hero-card" aria-label="Why the MCP server exists">
            <p className="kicker">Why I built it</p>
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
              See the demo
            </a>
          </aside>
        </div>
      </section>
      <McpSection />
      <section id="talk" className="section" aria-labelledby="talk-title">
        <div className="wrap closing-block">
          <h2 id="talk-title">Interested in how this was built?</h2>
          <p>
            I&apos;m happy to talk through the design choices, including why the assistant gets
            named tools rather than raw access, and where the security boundary sits. The quickest
            way to reach me is LinkedIn.
          </p>
          <p className="work-actions">
            <a
              className="button button-primary"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message me on LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
