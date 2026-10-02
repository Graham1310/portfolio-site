import { built, guardrails, patternNote, patternSketch } from "../content"
import { ArchitectureFlow } from "./ArchitectureFlow"
import { ChatDemo } from "./ChatDemo"
import { SectionHeading } from "./SectionHeading"

export function McpSection() {
  return (
    <section id="mcp" className="section" aria-labelledby="mcp-title">
      <div className="wrap">
        <div id="architecture-story">
          <SectionHeading kicker="Architecture" id="mcp-title">
            How a request flows
          </SectionHeading>
          <p className="architecture-lede">
            When I ask the assistant for something, it picks a tool by name and fills in its
            arguments. The MCP server checks the call is on the allow-list, then runs it against
            the dashboard. The assistant never sees my credentials.
          </p>
          <ArchitectureFlow />
        </div>
        <div id="built" className="built">
          <div className="block-head">
            <h2>What I built</h2>
            <p>Three pieces, all built for my own training.</p>
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
            <h2>The tools at a glance</h2>
            <p>A rough split of what the assistant can do.</p>
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
          <p className="pattern-note">{patternNote}</p>
        </div>
        <div id="guardrails" className="guardrails">
          <h2>Guardrails</h2>
          <p className="guardrails-intro">
            These are the rules that make it safe to let an assistant act on my data.
          </p>
          <ul>
            {guardrails.map((item) => (
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
