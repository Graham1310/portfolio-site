export const site = {
  name: "Graham Blair",
  role: "Application Engineering Lead",
  signal: "AI platform, architecture & governance",
  location: "United Kingdom",
  organisation: "Howdens",
  linkedin: "https://www.linkedin.com/in/graham-a-blair/",
  domain: "grahamblair.co.uk",
  domainUrl: "https://grahamblair.co.uk/",
} as const

export const stack = [
  ".NET",
  "Azure",
  "Vue/TypeScript",
  "Cursor / AI tooling governance",
] as const

export const story = [
  {
    index: "01",
    title: "Training stack",
    body: "Swim, gym, nutrition, and readiness. Open water in Yorkshire is the swim side of that.",
  },
  {
    index: "02",
    title: "Health dashboard",
    body: "A product I built. Plans, checks, and logs in one place.",
  },
  {
    index: "03",
    title: "MCP server",
    body: "Assistants call that app: build a session, read a brief, write a log.",
  },
] as const

export const built = [
  {
    title: "Dashboard UI",
    body: "The training week: what is planned, what was checked, what was logged.",
  },
  {
    title: "MCP tool surface",
    body: "Named reads and writes so an assistant can run those workflows.",
  },
  {
    title: "Upload patterns",
    body: "The shape of a device workout upload, including a Garmin-style file. A pattern here, not a live connection.",
  },
] as const

export const architecture = [
  {
    index: "01",
    title: "Assistant",
    body: "Asks in ordinary language. Holds no backend credentials.",
    meta: "Language",
    backends: undefined,
  },
  {
    index: "02",
    title: "MCP",
    body: "The gate. Schemas, an allow-list, and authentication.",
    meta: "Protocol",
    backends: undefined,
  },
  {
    index: "03",
    title: "Tools",
    body: "Named operations. Each one is a read, a create, or a log.",
    meta: "Read / write",
    backends: undefined,
  },
  {
    index: "04",
    title: "Backends",
    body: "The health dashboard, and the connectors behind it.",
    meta: "Health app",
    backends: ["Health dashboard", "Training API", "Nutrition log"],
  },
] as const

export const patternSketch = [
  {
    value: "18",
    label: "Read tools",
    detail: "Query, summarise, export.",
  },
  {
    value: "9",
    label: "Write tools",
    detail: "Create and update, with a confirm flag on destructive calls.",
  },
  {
    value: "4",
    label: "Integrations",
    detail: "Health dashboard, a training API, a nutrition log.",
  },
] as const

export const guardrails = [
  {
    title: "Authentication on the connector",
    body: "The assistant reaches backends through an authenticated gate. Tokens stay off the page.",
  },
  {
    title: "An allow-list",
    body: "The assistant can call the tools that were published to it.",
  },
  {
    title: "No secrets in the client",
    body: "Credentials and session material stay on the server side of the protocol.",
  },
  {
    title: "Confirm on side effects",
    body: "Writes are marked. Destructive calls wait for an explicit confirm flag.",
  },
] as const

export const enterprise = [
  {
    title: "A catalogue, like a platform API",
    body: "The dashboard publishes the operations an assistant may call. That list is the contract, in the same spirit as an internal API catalogue.",
  },
  {
    title: "Review the schema",
    body: "Arguments are typed. A change to a tool is an interface change, so it can go through the review you already run.",
  },
  {
    title: "Gate the writes",
    body: "Reads compose into a briefing. Creates, updates, and deletes carry a confirm flag before anything mutates.",
  },
] as const

export const principles = [
  {
    title: "Typed contracts",
    body: "Boundaries between applications should be explicit enough to review.",
  },
  {
    title: "Least privilege",
    body: "An assistant should see the tool surface it needs, published on purpose.",
  },
  {
    title: "Reviewable change",
    body: "Work that starts in an assistant still has to land as something a team can read.",
  },
] as const
