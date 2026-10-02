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
  "12+ years in Software Engineering, primarily in .NET. Lately I've been building with models and agents, and thinking about how to govern them."

export const homeLede = [
  "Application Engineering Lead. This space is a place to show my personal projects, starting with a Health Dashboard and MCP server that lets an AI assistant work with my training data",
] as const

export const swimLine = "Outside work, I'm usually found in open water, swimming long distances or in the cold."

export const products = [
  {
    id: "health",
    kicker: "Projects",
    title: "Health dashboard",
    summary:
      "My training data was spread across several apps, so I built one place to see the whole picture.",
    href: "/projects",
    cta: "Read about it",
    featured: false,
  },
  {
    id: "mcp",
    kicker: "Featured",
    title: "Health dashboard MCP",
    summary:
      "Lets an AI assistant like Claude use the dashboard through a list of named tools.",
    href: "/featured",
    cta: "Try the demo",
    featured: true,
  },
] as const

export const approach = [
  {
    title: "Useful first.",
    body: "I start with a real problem, not a technology. My personal dashboard exists because I was tired of copying data between apps.",
  },
  {
    title: "Boundaries by design.",
    body: "Decide up front what an assistant can see and do. Keep credentials away from the model. Ask for confirmation before anything is changed or deleted.",
  },
  {
    title: "Model Selection & Tool Design",
    body: "What does my model need to do? What tools do I need to build to support it?",
  },
] as const

export const healthWork = {
  kicker: "Personal project",
  title: "Health dashboard",
  intro: "What it is, why I built it, and how it's put together.",
  paragraphs: [
    "My training data lived in three places: a Garmin watch, a nutrition log, and a seperate body measurements app. I kept copying numbers between them to understand how my week was going.",
    "So I built a dashboard that puts everything in one place: swimming, gym sessions, food, body measurements, and a morning check-in. I use it every day for my own training.",
  ],
  builtHeading: "How it's built",
  builtBody: "A JavaScript front end talking to a Flask API, served by gunicorn behind nginx.",
  featuredLead:
    "An AI assistant can also use the dashboard's data through an MCP server. Secured and limited to the tools I've defined.",
} as const

export const story = [
  {
    index: "01",
    title: "Separate apps.",
    body: "Garmin, nutrition and a body measurements each lived in their own app, and I copied between them.",
  },
  {
    index: "02",
    title: "A dashboard.",
    body: "I built a personal dashboard and moved everything into one place.",
  },
  {
    index: "03",
    title: "An assistant.",
    body: "I wanted an assistant to help with planning and logging. It's calls go through OAuth, and the token stays on the server.",
  },
  {
    index: "04",
    title: "An MCP server.",
    body: "It publishes the tools the assistant is allowed to make. Each has a name and arguments, and the dashboard does the work.",
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
    body: "Once allowed, the call hits the dashboard store or one of the live integrations.",
    meta: "Health app",
    backends: ["Health dashboard", "Garmin", "MyFitnessPal", "Withings"],
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
    detail: "Garmin for training, MyFitnessPal for nutrition, Withings for body measurements, and the dashboard that collates them.",
  },
] as const

export const patternNote =
  "The health dashboard stores a collated view. Tools can read that store, or go direct to Garmin, MyFitnessPal or Withings when fresher data is needed. Each tool carries annotations and descriptions so the assistant knows which system is the source of truth, for example nutrition via MyFitnessPal rather than Garmin food entries."

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
  "I'm an Application Engineering Lead with 12+ years in software engineering, mostly .NET, C# and Azure. I enjoy the practical side of the job: getting systems built, shipped and stable.",
  "More recently my work has moved towards AI adoption, security and governance, which means helping decide how teams can use these tools safely and sensibly. My personal projects I'm working on are my hands-on version of those ideas. Theory put into practice.",
  "Outside work I tinker on my own projects like the health dashboard, and I'm an avoid open water swimmer, sometimes in the freezing cold.",
] as const

export const onThisSite = [
  {
    title: "Projects",
    body: "The health dashboard, and how it's built.",
    to: "/projects",
  },
  {
    title: "Health MCP",
    body: "An assistant using the dashboard through named tools.",
    to: "/featured",
  },
] as const

export const pageMeta = {
  home: {
    title: "Graham Blair · Software engineer",
    description:
      ".NET engineer and engineering lead building with AI models and agents. Personal projects, including a health dashboard MCP.",
  },
  projects: {
    title: "Health dashboard · Graham Blair",
    description:
      "A personal dashboard that brings a week of training into one place, built with JavaScript, Flask and nginx.",
  },
  featured: {
    title: "Health dashboard MCP · Graham Blair",
    description:
      "An MCP server for my health dashboard that lets an AI assistant use my training data through named tools, with credentials kept on the server.",
  },
  about: {
    title: "About · Graham Blair",
    description:
      "Application Engineering Lead working in .NET and Azure, with a growing focus on AI adoption, security and governance.",
  },
} as const
