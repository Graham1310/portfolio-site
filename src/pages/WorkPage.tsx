import { Link } from "react-router-dom"
import { enterprise, healthWork, howdensWork, site } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function WorkPage() {
  useDocumentTitle("Work · Graham Blair")

  return (
    <section className="section page-section" aria-labelledby="work-title">
      <div className="wrap">
        <p className="kicker">Work</p>
        <h1 id="work-title">Work</h1>
        <p className="work-intro page-intro">
          Job history is on{" "}
          <a href={site.linkedin} target="_blank" rel="me noreferrer noopener">
            LinkedIn
          </a>
          . On this page, the current role and a personal project.
        </p>
        <div className="work-list">
          <article id="howdens" className="work-article">
            <p className="kicker">{howdensWork.kicker}</p>
            <h2>{howdensWork.title}</h2>
            {howdensWork.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="wiring">
              <h3>On a team</h3>
              <p>
                If I were wiring an assistant to an internal system, I&apos;d want a published list
                of tools, typed arguments, and a confirm before a write.
              </p>
              <ul className="enterprise-grid">
                {enterprise.map((item) => (
                  <li key={item.title}>
                    <p className="guard-title">{item.title}</p>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article id="health" className="work-article">
            <p className="kicker">{healthWork.kicker}</p>
            <h2>{healthWork.title}</h2>
            {healthWork.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="work-actions">
              <Link className="button button-primary" to="/featured">
                Featured MCP
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
