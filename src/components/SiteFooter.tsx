import { site } from "../content"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          {site.name}
          <span aria-hidden="true"> · </span>
          {site.role}
        </p>
        <p>Static site. The examples are fixtures in the page.</p>
        <p>© 2026</p>
      </div>
    </footer>
  )
}
