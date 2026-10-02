import { Link } from "react-router-dom"
import { healthWork } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function ProjectsPage() {
  useDocumentTitle("Projects · Graham Blair")

  return (
    <section className="section page-section" aria-labelledby="projects-title">
      <div className="wrap">
        <p className="kicker">Projects</p>
        <h1 id="projects-title">{healthWork.title}</h1>
        <p className="work-intro page-intro">The MCP server has its own page.</p>
        <article id="health" className="work-article">
          <p className="kicker">{healthWork.kicker}</p>
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
    </section>
  )
}
