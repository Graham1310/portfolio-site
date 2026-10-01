import { site } from "../content"
import { SectionHeading } from "./SectionHeading"

export function Contact() {
  return (
    <section id="links" className="section" aria-labelledby="links-title">
      <div className="wrap">
        <SectionHeading index="04" kicker="Links" id="links-title">
          Where to go next
        </SectionHeading>
        <p className="work-intro">
          No contact form on this page, and no analytics. LinkedIn is the route for a
          conversation.
        </p>
        <ul className="link-list">
          <li>
            <a href={site.linkedin} target="_blank" rel="me noreferrer noopener">
              <span className="link-kicker">Profile</span>
              <span className="link-title">LinkedIn</span>
              <span className="link-url">linkedin.com/in/graham-a-blair</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.domainUrl}>
              <span className="link-kicker">Domain</span>
              <span className="link-title">{site.domain}</span>
              <span className="link-url">Intended home for this static site</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
