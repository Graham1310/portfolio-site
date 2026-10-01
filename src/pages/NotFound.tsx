import { Link } from "react-router-dom"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function NotFound() {
  useDocumentTitle("Page not found · Graham Blair")

  return (
    <section className="section page-section">
      <div className="wrap prose">
        <h1>This address doesn&apos;t match a page.</h1>
        <p>
          <Link className="text-link" to="/">
            Back to the portfolio
          </Link>
        </p>
      </div>
    </section>
  )
}
