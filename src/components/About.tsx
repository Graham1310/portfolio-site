import { Link } from "react-router-dom"
import { site } from "../content"
import { SectionHeading } from "./SectionHeading"

const onThisSite = [
  {
    title: "Projects",
    body: "The health dashboard. What it is, and the stack it runs on.",
    to: "/projects",
  },
  {
    title: "Featured",
    body: "The MCP server. The page I'd start with.",
    to: "/featured",
  },
] as const

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <SectionHeading kicker="About" id="about-title">
            Personal projects
          </SectionHeading>
          <div className="prose">
            <p>
              The health dashboard is one of them. A week of training in one place, instead of
              copying between apps.
            </p>
            <p>
              The featured page is the MCP server in front of that dashboard. That&apos;s the one
              I&apos;d point someone at. The examples are scripted.
            </p>
            <p>
              I work at Howdens. The job is on{" "}
              <a
                className="text-link"
                href={site.linkedin}
                target="_blank"
                rel="me noreferrer noopener"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </div>
        <div className="about-side">
          <h3>On this site</h3>
          <ul className="principle-list">
            {onThisSite.map((item) => (
              <li key={item.title}>
                <p className="guard-title">
                  <Link className="text-link" to={item.to}>
                    {item.title}
                  </Link>
                </p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
