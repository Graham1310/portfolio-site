import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { site } from "../content"

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects", end: true },
  { to: "/featured", label: "Health MCP", end: true },
  { to: "/about", label: "About", end: true },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="wrap header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            GB
          </span>
          <span className="brand-name">{site.name}</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "nav-links is-open" : "nav-links"} aria-label="Page">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <a
            className="nav-linkedin"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
