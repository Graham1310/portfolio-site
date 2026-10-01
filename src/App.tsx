import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { SiteFooter } from "./components/SiteFooter"
import { SiteHeader } from "./components/SiteHeader"
import { FeaturedPage } from "./pages/FeaturedPage"
import { HomePage } from "./pages/HomePage"
import { NotFound } from "./pages/NotFound"
import { WorkPage } from "./pages/WorkPage"

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
          <Route path="/work" element={<WorkPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}
