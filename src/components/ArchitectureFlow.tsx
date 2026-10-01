import { architecture } from "../content"

export function ArchitectureFlow() {
  return (
    <div id="architecture" className="architecture">
      <p className="definition">
        <abbr title="Model Context Protocol">MCP</abbr> is how an assistant reaches the health
        dashboard: structured tool calls, with schemas, permissions, and a record of the call,
        instead of scraping a screen or pasting notes into chat.
      </p>
      <ol className="flow">
        {architecture.map((node) => (
          <li key={node.title} className={node.title === "MCP" ? "node node-mcp" : "node"}>
            <p className="node-index">{node.index}</p>
            <h3>{node.title}</h3>
            <p>{node.body}</p>
            {node.backends ? (
              <ul className="backend-list">
                {node.backends.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            ) : null}
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
