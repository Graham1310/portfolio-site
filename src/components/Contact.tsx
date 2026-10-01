import { site } from "../content"
import { SectionHeading } from "./SectionHeading"

export function Contact() {
  return (
    <section id="links" className="section" aria-labelledby="links-title">
      <div className="wrap">
        <SectionHeading kicker="Links" id="links-title">
          LinkedIn, and the domain
        </SectionHeading>
        <p className="work-intro">
          Message me on LinkedIn if you want to talk. I left the form off, and the page doesn&apos;t
          record visits.
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
              <span className="link-url">The domain for this site</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
