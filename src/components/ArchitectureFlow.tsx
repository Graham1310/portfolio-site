import { architecture } from "../content"

export function ArchitectureFlow() {
  return (
    <div id="architecture" className="architecture">
      <p className="definition">
        <abbr title="Model Context Protocol">MCP</abbr> is the protocol between the assistant and
        the dashboard. Each call has a name and a set of arguments. The server checks auth and
        the allow-list, then it runs. The examples further down are that same kind of call,
        stored in this page.
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
        The connector holds the keys. The boxes are a diagram of the path.
      </p>
    </div>
  )
}
