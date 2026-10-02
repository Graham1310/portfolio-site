import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { SiteFooter } from "./components/SiteFooter"
import { SiteHeader } from "./components/SiteHeader"
import { AboutPage } from "./pages/AboutPage"
import { FeaturedPage } from "./pages/FeaturedPage"
import { HomePage } from "./pages/HomePage"
import { NotFound } from "./pages/NotFound"
import { ProjectsPage } from "./pages/ProjectsPage"

function RouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const node = document.getElementById(hash.slice(1))
      if (node) {
        node.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function WorkRedirect() {
  const { hash } = useLocation()
  const to = hash === "#health" ? "/projects#health" : "/projects"
  return <Navigate to={to} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScroll />
      <a className="skip" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/work" element={<WorkRedirect />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}
