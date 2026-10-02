import { site } from "../content"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          {site.name}
          <span aria-hidden="true"> · </span>
          {site.location}
        </p>
        <p>This site is static and doesn&apos;t track visitors.</p>
        <p>© 2026</p>
      </div>
    </footer>
  )
}
