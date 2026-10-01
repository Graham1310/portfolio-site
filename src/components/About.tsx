import { principles, stack } from "../content"
import { SectionHeading } from "./SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <SectionHeading index="02" kicker="About" id="about-title">
            Application engineering
          </SectionHeading>
          <div className="prose">
            <p>
              I&apos;m an Application Engineering Lead in the UK. Most days I&apos;m looking at how
              applications fit together, and at what an assistant is allowed to call.
            </p>
            <p>
              The stack is .NET and Azure, with Vue and TypeScript on the front. We use Cursor.
              A draft from it still goes through review.
            </p>
            <p>
              The health dashboard on this page is one I built for my own training. I swim in open
              water when I can, usually in Yorkshire.
            </p>
            <p>
              The four examples lower down are written into the page, so opening the site is enough
              to run them.
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
