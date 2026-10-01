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
        <p>Static site. The scripted examples are on the featured page.</p>
        <p>© 2026</p>
      </div>
    </footer>
  )
}
