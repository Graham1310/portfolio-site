import { principles, stack } from "../content"
import { SectionHeading } from "./SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <SectionHeading index="02" kicker="About" id="about-title">
            Platform shape, kept reviewable
          </SectionHeading>
          <div className="prose">
            <p>
              I&apos;m an Application Engineering Lead based in the United Kingdom. The
              through-line is platform work: boundaries between applications, the contracts they
              expose, and the governance that has to travel with new tools.
            </p>
            <p>
              The stack I work in is .NET and Azure, with Vue and TypeScript on the product
              surface, plus the practical question of how tools such as Cursor are adopted under
              existing engineering standards.
            </p>
            <p>
              Away from that, I swim in open water in Yorkshire, cold water included. The health
              dashboard in the featured section is a personal product for that kind of training.
              The scripted calls stay in the browser.
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
