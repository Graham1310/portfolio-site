import { site } from "../content"
import { SectionHeading } from "./SectionHeading"

const FOCUS = [
  "Application engineering leadership",
  "Architecture: boundaries and contracts between applications",
  "Governance for AI assistants, including what they are allowed to call",
] as const

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap work-grid">
        <SectionHeading index="03" kicker="Work" id="work-title">
          Current role
        </SectionHeading>
        <div>
          <p className="work-intro">
            Stated in terms that belong on a public page. A fuller history is on LinkedIn.
          </p>
          <article className="role-card">
            <p className="kicker">Current</p>
            <h3>{site.role}</h3>
            <p className="role-org">
              {site.organisation}
              <span aria-hidden="true"> · </span>
              {site.location}
            </p>
            <h4>In public terms</h4>
            <ul className="focus-list">
              {FOCUS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
