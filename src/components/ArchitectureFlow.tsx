import { architecture } from "../content"

export function ArchitectureFlow() {
  return (
    <div id="architecture" className="architecture">
      <ol className="flow">
        {architecture.map((node) => (
          <li
            key={node.title}
            className={node.title === "MCP server" ? "node node-mcp" : "node"}
          >
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
        The dashboard collates Garmin, MyFitnessPal and Withings. Credentials stay on the server,
        and tools choose stored data or a live integration as needed.
      </p>
    </div>
  )
}
