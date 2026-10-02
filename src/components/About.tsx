import { site, story } from "../content"
import { SectionHeading } from "./SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <SectionHeading kicker="About" id="about-title">
            The week in one place
          </SectionHeading>
          <div className="prose">
            <p>
              Swim, gym, food, and a morning check. JavaScript on the front, then Flask, gunicorn,
              and nginx.
            </p>
            <p>
              The assistant calls named tools. OAuth stays on the server. Featured shows four
              scripted calls, and they don&apos;t touch the network.
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
          <h3>The path</h3>
          <ol className="story-steps">
            {story.map((step) => (
              <li key={step.index}>
                <span>{step.index}</span>
                <div>
                  <p className="guard-title">{step.title}</p>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
