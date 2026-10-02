import { Link } from "react-router-dom"
import { homeLede, products, site, stack, swimLine } from "../content"
import { About } from "../components/About"
import { Contact } from "../components/Contact"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function HomePage() {
  useDocumentTitle("Graham Blair")

  return (
    <>
      <section id="top" className="water-band home" aria-labelledby="hero-title">
        <div className="wrap">
          <p className="kicker">{site.location}</p>
          <h1 id="hero-title">{site.name}</h1>
          <p className="role">For my own training</p>
          <p className="lede home-lede">{homeLede}</p>
          <p className="place-line">{swimLine}</p>
          <ul className="chips" aria-label="Stack">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="actions">
            <Link className="button button-primary" to="/projects">
              Projects
            </Link>
            <Link className="button button-secondary" to="/featured">
              Featured MCP
            </Link>
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
      <About />
      <Contact />
    </>
  )
}
