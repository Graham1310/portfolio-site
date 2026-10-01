import { principles, stack } from "../content"
import { SectionHeading } from "./SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <SectionHeading kicker="About" id="about-title">
            Application engineering
          </SectionHeading>
          <div className="prose">
            <p>
              I&apos;m an Application Engineering Lead in the UK. The day job is how applications
              fit together, and what an assistant is allowed to call.
            </p>
            <p>
              The stack is .NET and Azure, with Vue and TypeScript on the front. We use Cursor. A
              draft from it still goes through review.
            </p>
            <p>
              The health dashboard is a personal project, for my own training. The write-up is
              under Work, and the MCP server has its own page.
            </p>
          </div>
        </div>
        <div className="about-side">
          <h3>Working principles</h3>
          <ul className="principle-list">
            {principles.map((item) => (
              <li key={item.title}>
                <p className="guard-title">{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <h3>Stack signal</h3>
          <ul className="chips" aria-label="Stack">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
