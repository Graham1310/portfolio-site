export const site = {
  name: "Graham Blair",
  location: "United Kingdom",
  linkedin: "https://www.linkedin.com/in/graham-a-blair/",
  linkedinHandle: "linkedin.com/in/graham-a-blair",
  // This portfolio. The apex grahamblair.co.uk is a separate site.
  domain: "portfolio.grahamblair.co.uk",
  domainUrl: "https://portfolio.grahamblair.co.uk/",
} as const

export const stack = [".NET", "Azure", "AI agents", "Governance"] as const

export const dashboardStack = ["JavaScript", "Flask", "gunicorn", "nginx"] as const

export const homeRole =
  ".NET by trade, 12+ years. Lately I've been building with models and agents, and thinking about how to govern them."

export const homeLede = [
  "I'm an Application Engineering Lead. This site is where I keep my personal projects, starting with an MCP server that lets an AI assistant work with my training data without ever holding the keys.",
] as const

export const swimLine = "Outside work, I swim in open water, cold included."

export const products = [
  {
    id: "health",
    kicker: "Project",
    title: "Health dashboard",
    summary:
      "My training data was spread across several apps, so I built one place to see the whole week.",
    href: "/projects",
    cta: "Read about it",
    featured: false,
  },
  {
    id: "mcp",
    kicker: "Featured",
    title: "MCP server for the dashboard",
    summary:
      "Lets an AI assistant like Claude use the dashboard through a short list of named tools. Credentials stay on the server, and the demo works without any access to my data.",
    href: "/featured",
    cta: "Try the demo",
    featured: true,
  },
] as const

export const approach = [
  {
    title: "Useful first.",
    body: "I start with a real problem, not a technology. The dashboard exists because I was tired of copying data between apps.",
  },
  {
    title: "Boundaries by design.",
    body: "Decide up front what an assistant can see and do. Keep credentials away from the model. Ask for confirmation before anything is changed or deleted.",
  },
  {
    title: "Honest about limits.",
    body: "Say plainly what is a demo and what is live, and what the system can and can't do.",
  },
] as const

export const healthWork = {
  kicker: "Personal project",
  title: "Health dashboard",
  intro: "What it is, why I built it, and how it's put together.",
  paragraphs: [
    "My training data lived in three places: a Garmin watch, a nutrition log, and a separate readiness check. I kept copying numbers between them to understand how my week was going.",
    "So I built a dashboard that puts the week in one place: swimming, gym sessions, food, and a morning check-in. I use it every day for my own training.",
  ],
  builtHeading: "How it's built",
  builtBody: "A JavaScript front end talking to a Flask API, served by gunicorn behind nginx.",
  featuredLead:
    "An AI assistant can also use the dashboard's data through an MCP server. Authentication stays on the server, so the assistant never holds a token.",
} as const

export const story = [
  {
    index: "01",
    title: "Separate apps.",
    body: "Garmin, nutrition and a readiness check each lived in their own app, and I copied between them.",
  },
  {
    index: "02",
    title: "A dashboard.",
    body: "I built a personal dashboard and moved the week into one place.",
  },
  {
    index: "03",
    title: "An assistant.",
    body: "I wanted an assistant to help with planning and logging. Its calls go through OAuth, and the token stays on the server.",
  },
  {
    index: "04",
    title: "An MCP server.",
    body: "It publishes the calls the assistant is allowed to make. Each has a name and some arguments, and the dashboard does the work.",
  },
] as const

export const built = [
  {
    title: "Dashboard.",
    body: "Swimming, gym, food and a morning check-in in one app that I run myself.",
  },
  {
    title: "MCP server.",
    body: "Lets an assistant read data, start a session, or add a log entry.",
  },
  {
    title: "Workout uploads.",
    body: "Creates a workout file in the format Garmin expects. The sample on this page is generated in your browser and goes nowhere.",
  },
] as const

export const architecture = [
  {
    index: "01",
    title: "Assistant",
    body: "I ask in plain language. The assistant decides which tool to call.",
    meta: "Language",
    backends: undefined,
  },
  {
    index: "02",
    title: "MCP server",
    body: "Checks the tool name, the arguments, and the allow-list. OAuth is handled here.",
    meta: "Protocol",
    backends: undefined,
  },
  {
    index: "03",
    title: "Tools",
    body: "Each tool reads data, starts a session, or adds a log entry.",
    meta: "Read / write",
    backends: undefined,
  },
  {
    index: "04",
    title: "Backends",
    body: "The call reaches one of these, once it's allowed.",
    meta: "Health app",
    backends: ["Health dashboard", "Training API", "Nutrition log"],
  },
] as const

export const patternSketch = [
  {
    value: "34",
    label: "Read tools",
    detail: "Look something up or pull a summary.",
  },
  {
    value: "28",
    label: "Write tools",
    detail: "Create or update things. Deletes wait for a confirmation.",
  },
  {
    value: "4",
    label: "Integrations",
    detail: "The dashboard, a training API, a nutrition log, and a swim builder.",
  },
] as const

export const patternNote =
  "A Garmin Connect integration sits alongside those counts and adds more tools from Connect. Each tool carries annotations and descriptions so the assistant knows which system is the source of truth, for example nutrition via the nutrition log rather than Garmin food entries."

export const guardrails = [
  {
    title: "Sign-in stays on the server.",
    body: "OAuth is handled by the MCP server. The assistant gets results, never tokens.",
  },
  {
    title: "A short list of tools.",
    body: "The assistant can only make calls I've chosen to publish, each with a name and defined arguments.",
  },
  {
    title: "Secrets stay out of prompts.",
    body: "The prompt carries the question. Tokens and session data never reach the model.",
  },
  {
    title: "Confirm before a change.",
    body: "Creates are clearly labelled. A delete waits until someone confirms it.",
  },
] as const

export const aboutCopy = [
  "I'm an Application Engineering Lead with 12+ years in software engineering, mostly .NET, C# and Azure. I enjoy the practical side of the job: getting systems built, shipped and running well.",
  "More recently my work has moved towards AI adoption, security and governance, which means helping decide how teams can use these tools safely and sensibly. The projects on this site are my hands-on version of that: small, real systems where I can test those ideas myself.",
  "Outside work I build things like the health dashboard, and I swim in open water, cold included.",
] as const

export const onThisSite = [
  {
    title: "Project",
    body: "The health dashboard, and how it's built.",
    to: "/projects",
  },
  {
    title: "MCP demo",
    body: "An assistant using the dashboard through named tools.",
    to: "/featured",
  },
] as const

export const pageMeta = {
  home: {
    title: "Graham Blair · Software engineer",
    description:
      ".NET engineer and engineering lead building with AI models and agents. Personal projects, including an MCP server for my training dashboard.",
  },
  projects: {
    title: "Health dashboard · Graham Blair",
    description:
      "A personal dashboard that brings a week of training into one place, built with JavaScript, Flask and nginx.",
  },
  featured: {
    title: "MCP server demo · Graham Blair",
    description:
      "An MCP server that lets an AI assistant use my training dashboard through a short list of named tools, with credentials kept on the server.",
  },
  about: {
    title: "About · Graham Blair",
    description:
      "Application Engineering Lead working in .NET and Azure, with a growing focus on AI adoption, security and governance.",
  },
} as const
