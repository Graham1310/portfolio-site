import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Hero } from "./components/Hero"
import { McpSection } from "./components/McpSection"
import { SiteFooter } from "./components/SiteFooter"
import { SiteHeader } from "./components/SiteHeader"
import { Work } from "./components/Work"

export default function App() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Hero />
        <McpSection />
        <About />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
