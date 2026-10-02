import { Link } from "react-router-dom"
import { dashboardStack, healthWork } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function ProjectsPage() {
  useDocumentTitle("Projects · Graham Blair")

  return (
    <section className="section page-section" aria-labelledby="projects-title">
      <div className="wrap">
        <p className="kicker">Projects</p>
        <h1 id="projects-title">{healthWork.title}</h1>
        <p className="work-intro page-intro">{healthWork.intro}</p>
        <article id="health" className="work-article">
          <p className="kicker">{healthWork.kicker}</p>
          {healthWork.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="chips" aria-label="How it's built">
            {dashboardStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{healthWork.featuredLead}</p>
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
