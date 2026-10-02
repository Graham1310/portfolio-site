import { Link } from "react-router-dom"
import { dashboardStack, healthWork, pageMeta } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function ProjectsPage() {
  useDocumentTitle(pageMeta.projects.title, pageMeta.projects.description)

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
          <h2 className="work-subhead">{healthWork.builtHeading}</h2>
          <p>{healthWork.builtBody}</p>
          <ul className="chips" aria-label="How it's built">
            {dashboardStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <figure className="project-shot">
            <img
              src="/dashboard-overview.webp"
              alt="Sample health dashboard overview showing a training day with swim, gym, food and readiness in one place."
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Sample overview with invented training data.</figcaption>
          </figure>
          <p>{healthWork.featuredLead}</p>
          <p className="work-actions">
            <Link className="button button-primary" to="/featured">
              See the health MCP
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}
