import { built, enterprise, guardrails, patternSketch } from "../content"
import { ArchitectureFlow } from "./ArchitectureFlow"
import { ChatDemo } from "./ChatDemo"
import { SectionHeading } from "./SectionHeading"

export function McpSection() {
  return (
    <section id="mcp" className="section" aria-labelledby="mcp-title">
      <div className="wrap">
        <div id="architecture-story">
          <SectionHeading index="01" kicker="Featured" id="mcp-title">
            The assistant calls tools
          </SectionHeading>
          <ArchitectureFlow />
        </div>
        <div id="built" className="built">
          <div className="block-head">
            <h3>What I built</h3>
            <p>
              Three pieces, for my own training. The dashboard, the server in front of it, and a
              path that writes a workout file.
            </p>
          </div>
          <ul className="built-grid">
            {built.map((item) => (
              <li key={item.title}>
                <p className="guard-title">{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="patterns" className="patterns">
          <div className="block-head">
            <h3>Rough split</h3>
            <p>
              Round numbers, so the mix is easy to see. Mostly reads, some writes, a few
              connectors. I made the counts up for this page.
            </p>
          </div>
          <ul className="count-grid">
            {patternSketch.map((item) => (
              <li key={item.label}>
                <p className="count-value">{item.value}</p>
                <p className="count-label">{item.label}</p>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="guardrails" className="guardrails">
          <h3>Guardrails</h3>
          <ul>
            {guardrails.map((item) => (
              <li key={item.title}>
                <p className="guard-title">{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="enterprise">
          <div className="block-head">
            <h3>On a team</h3>
            <p>
              If I were wiring an assistant to an internal system, I&apos;d want a published list
              of tools, typed arguments, and a confirm before a write.
            </p>
          </div>
          <ul className="enterprise-grid">
            {enterprise.map((item) => (
              <li key={item.title}>
                <p className="guard-title">{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <ChatDemo />
      </div>
    </section>
  )
}
