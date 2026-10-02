export const site = {
  name: "Graham Blair",
  location: "United Kingdom",
  linkedin: "https://www.linkedin.com/in/graham-a-blair/",
  // This portfolio. The apex grahamblair.co.uk is a separate site.
  domain: "portfolio.grahamblair.co.uk",
  domainUrl: "https://portfolio.grahamblair.co.uk/",
} as const

export const stack = ["JavaScript", "Flask", "nginx", "MCP"] as const

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
    body: "An assistant came next. Those calls go through OAuth, and the token stays on the server.",
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
    body: "OAuth on the server, then the tool name, the arguments, and the allow-list.",
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
    title: "OAuth on the server",
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

export const homeLede =
  "A health dashboard I use for training, and an MCP server so an assistant can call it. The examples on the featured page are scripted."

export const swimLine = "Other days I'm in a body of water of some sort."

export const products = [
  {
    id: "health",
    kicker: "Projects",
    title: "Health dashboard",
    summary: "Swim, gym, food, and a morning check, in the one app I run myself.",
    href: "/projects",
    cta: "The project",
    featured: false,
  },
  {
    id: "mcp",
    kicker: "Featured",
    title: "MCP for that dashboard",
    summary:
      "Named tools, so an assistant can use the dashboard. The keys stay on the server. The examples are scripted.",
    href: "/featured",
    cta: "Open featured",
    featured: true,
  },
] as const

export const healthWork = {
  kicker: "Personal project",
  title: "Health dashboard",
  paragraphs: [
    "I got sick of training and health data living in different apps. I built my own dashboard so the week sits in one place.",
    "JavaScript on the front. Flask API, gunicorn, nginx.",
    "An MCP server sits in front, so an assistant can call named tools. OAuth keeps the keys on the server.",
  ],
} as const
