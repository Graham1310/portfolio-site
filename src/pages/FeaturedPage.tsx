import { story } from "../content"
import { McpSection } from "../components/McpSection"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function FeaturedPage() {
  useDocumentTitle("Featured MCP · Graham Blair")

  return (
    <>
      <section id="featured" className="water-band page-hero" aria-labelledby="featured-title">
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">Featured</p>
            <h1 id="featured-title">MCP</h1>
            <p className="role">In front of a health dashboard I use myself</p>
            <div className="lede">
              <p>
                The dashboard keeps a training week in one place. This page is how an assistant
                uses it.
              </p>
              <p>
                Calls go through an MCP server, with OAuth, against a short list of named tools.
                The assistant calls one. The dashboard reads the day, builds a session, or appends
                a log line. The keys stay on the server.
              </p>
              <p>The examples below are scripted. Nothing on this page calls a model, or the network.</p>
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
