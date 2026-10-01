import { architecture } from "../content"

export function ArchitectureFlow() {
  return (
    <div id="architecture" className="architecture">
      <p className="definition">
        <abbr title="Model Context Protocol">MCP</abbr> is a structured way for an assistant to
        call tools on backends — with schemas, permissions, and a record of the call — instead of
        scraping a screen or pasting data into chat.
      </p>
      <ol className="flow">
        {architecture.map((node) => (
          <li key={node.title} className={node.title === "MCP" ? "node node-mcp" : "node"}>
            <p className="node-index">{node.index}</p>
            <h3>{node.title}</h3>
            <p>{node.body}</p>
            <p className="node-meta">{node.meta}</p>
          </li>
        ))}
      </ol>
      <p className="architecture-note">
        Credentials stay with the connector. This page cannot call a backend.
      </p>
    </div>
  )
}
