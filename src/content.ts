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
    title: "Separate tools",
    body: "Garmin, nutrition, and a readiness check, each in its own app. I copied between them.",
  },
  {
    index: "02",
    title: "Dashboard",
    body: "I built a personal health dashboard and moved the week into it.",
  },
  {
    index: "03",
    title: "An assistant",
    body: "An assistant came next. The token stays on the server.",
  },
  {
    index: "04",
    title: "MCP server",
    body: "It publishes the calls. A name and some arguments, then the dashboard runs it.",
  },
] as const

export const built = [
  {
    title: "Dashboard",
    body: "Swim, gym, food, and a morning check, in the one app I run myself.",
  },
  {
    title: "MCP server",
    body: "An assistant can read, start a session, or append a log line.",
  },
  {
    title: "Uploads",
    body: "A workout file in the shape Garmin expects. The sample is made in the browser and stays there.",
  },
] as const

export const architecture = [
  {
    index: "01",
    title: "Assistant",
    body: "You ask in plain language. The dashboard keys stay on the server.",
    meta: "Language",
    backends: undefined,
  },
  {
    index: "02",
    title: "MCP",
    body: "It checks the name, the arguments, and whether that call is on the list.",
    meta: "Protocol",
    backends: undefined,
  },
  {
    index: "03",
    title: "Tools",
    body: "A call can read the day, build a session, or add a log line.",
    meta: "Read / write",
    backends: undefined,
  },
  {
    index: "04",
    title: "Backends",
    body: "The call lands in one of these once it's allowed.",
    meta: "Health app",
    backends: ["Health dashboard", "Training API", "Nutrition log"],
  },
] as const

export const patternSketch = [
  {
    value: "18",
    label: "Read tools",
    detail: "Look something up, or pull a summary out.",
  },
  {
    value: "9",
    label: "Write tools",
    detail: "Create and update. Deletes wait for a confirm.",
  },
  {
    value: "4",
    label: "Integrations",
    detail: "The dashboard, a training API, a nutrition log.",
  },
] as const

export const guardrails = [
  {
    title: "Auth stays on the server",
    body: "The connector holds the token. This page shows the tool name and the arguments.",
  },
  {
    title: "A short list of tools",
    body: "Publish the calls you want, each with a name and arguments.",
  },
  {
    title: "Keys stay with the server",
    body: "The prompt carries the question. Tokens and session data stay on the server.",
  },
  {
    title: "Confirm before a change",
    body: "Creates are labelled. A delete waits until someone confirms it.",
  },
] as const

export const enterprise = [
  {
    title: "Publish the list",
    body: "An internal API list, written down. The assistant calls what's on it.",
  },
  {
    title: "Review the arguments",
    body: "Arguments are typed. Changing a tool is an interface change, so it can go through the usual review.",
  },
  {
    title: "Hold the writes",
    body: "Several reads can fold into one brief. Creating or deleting waits for a confirm.",
  },
] as const

export const principles = [
  {
    title: "Plain contracts",
    body: "If two apps talk, I want the shape of that talk to be obvious in review.",
  },
  {
    title: "Short tool lists",
    body: "The assistant gets the few calls that task actually needs.",
  },
  {
    title: "Review still happens",
    body: "A draft from Cursor goes through the same review as anything else I'd ship.",
  },
] as const
