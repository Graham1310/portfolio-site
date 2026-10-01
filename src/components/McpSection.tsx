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
            An assistant that calls <em>tools</em>
          </SectionHeading>
          <ArchitectureFlow />
        </div>
        <div id="built" className="built">
          <div className="block-head">
            <h3>What I built</h3>
            <p>A personal health dashboard, and the tool surface in front of it. Not the day job.</p>
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
            <h3>Illustrative mix</h3>
            <p>
              Placeholder figures, published here only to show the mix of reads, writes, and
              connectors. They are not a live catalogue.
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
            <h3>How this maps to an organisation</h3>
            <p>The same shape shows up when an engineering team governs assistant tooling.</p>
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
