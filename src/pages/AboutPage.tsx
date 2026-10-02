import { Link } from "react-router-dom"
import { aboutCopy, onThisSite, pageMeta, site } from "../content"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export function AboutPage() {
  useDocumentTitle(pageMeta.about.title, pageMeta.about.description)

  return (
    <>
      <section id="about" className="section page-section" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div>
            <p className="kicker">About</p>
            <h1 id="about-title">About me</h1>
            <div className="prose about-prose">
              {aboutCopy.map((paragraph) =>
                paragraph.includes("is on LinkedIn.") ? (
                  <p key={paragraph}>
                    My work history, including my current role, is on{" "}
                    <a
                      className="text-link"
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    .
                  </p>
                ) : (
                  <p key={paragraph}>{paragraph}</p>
                ),
              )}
            </div>
          </div>
          <aside className="about-side" aria-label="On this site">
            <h2>On this site</h2>
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
          </aside>
        </div>
      </section>
      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="wrap contact-block">
          <h2 id="contact-title">Get in touch</h2>
          <p className="work-intro">
            The best way to reach me is LinkedIn. This site has no contact form.
          </p>
          <p className="work-actions">
            <a
              className="button button-primary"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message me on LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="contact-handle">{site.linkedinHandle}</p>
        </div>
      </section>
    </>
  )
}
