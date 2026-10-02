import { Link } from "react-router-dom"
import { approach, homeLede, homeRole, pageMeta, products, site, stack, swimLine } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function HomePage() {
  useDocumentTitle(pageMeta.home.title, pageMeta.home.description)

  return (
    <>
      <section id="top" className="water-band home" aria-labelledby="hero-title">
        <div className="wrap">
          <p className="kicker">{site.location}</p>
          <h1 id="hero-title">{site.name}</h1>
          <p className="role">{homeRole}</p>
          <div className="lede home-lede">
            {homeLede.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="place-line">{swimLine}</p>
          <ul className="chips" aria-label="Focus areas">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="actions">
            <Link className="button button-primary" to="/health-mcp">
              See the health MCP
            </Link>
            <Link className="button button-secondary" to="/projects">
              Health dashboard
            </Link>
            <a
              className="button button-secondary"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  className={product.featured ? "product-card is-featured" : "product-card"}
                  to={product.href}
                >
                  <p className="kicker">{product.kicker}</p>
                  <p className="product-title">{product.title}</p>
                  <p>{product.summary}</p>
                  <span className="text-link">{product.cta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="approach" className="section" aria-labelledby="approach-title">
        <div className="wrap">
          <p className="kicker">Approach</p>
          <h2 id="approach-title">What I care about when building with AI</h2>
          <ul className="approach-grid">
            {approach.map((item) => (
              <li key={item.title}>
                <p className="guard-title">{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
