/** Canned MCP vignettes. Bundled with the page. Never fetched. */

export type VignetteId = "gym" | "swim" | "brief" | "log"

type FieldRow = {
  label: string
  value: string
}

type SessionCard = {
  type: "session"
  kicker: string
  title: string
  aside: string
  meta: string
  columns: readonly string[]
  rows: readonly (readonly string[])[]
  note: string
}

type FieldCard = {
  type: "fields"
  kicker: string
  title: string
  aside: string
  rows: readonly FieldRow[]
  note: string
}

export type Vignette = {
  id: VignetteId
  tab: string
  kind: "Create" | "Read" | "Log"
  user: string
  assistant: string
  tool: string
  arguments: Readonly<Record<string, string | number | readonly string[]>>
  request: unknown
  response: unknown
  calling: string
  returned: string
  doneAnnouncement: string
  card: SessionCard | FieldCard
}

const gymRequest = {
  tool: "create_strength_workout",
  arguments: {
    focus: "upper",
    duration_min: 45,
    equipment: ["barbell", "bench", "cable"],
  },
} as const

const gymResponse = {
  ok: true,
  source: "fixture",
  live: false,
  workout: {
    title: "Upper strength, sample",
    duration_min: 45,
    focus: "Upper body",
    blocks: [
      { exercise: "Bench press", sets: 4, reps: "6–8", rest_s: 120 },
      { exercise: "Bent-over row", sets: 4, reps: "8", rest_s: 90 },
      { exercise: "Overhead press", sets: 3, reps: "8–10", rest_s: 90 },
      { exercise: "Face pull", sets: 3, reps: "12–15", rest_s: 60 },
    ],
    note: "A 45-minute upper session, written for this page.",
  },
} as const

const swimRequest = {
  tool: "create_swim_workout",
  arguments: {
    pool: "25 m",
    focus: "aerobic",
    distance_m: 900,
  },
} as const

const swimResponse = {
  ok: true,
  source: "fixture",
  live: false,
  workout: {
    title: "Aerobic swim, sample",
    distance_m: 900,
    pool: "25 m",
    sets: [
      { repeat: "1", detail: "200 easy", rest: "20 s" },
      { repeat: "4 × 50", detail: "drill", rest: "15 s" },
      { repeat: "4 × 100", detail: "aerobic", rest: "20 s" },
      { repeat: "1", detail: "100 easy", rest: "none" },
    ],
    note: "900 m, aerobic, 25 m pool. Written for this page.",
  },
} as const

const briefRequest = {
  tool: "get_morning_brief",
  arguments: {
    day: "sample",
  },
} as const

const briefResponse = {
  ok: true,
  source: "fixture",
  live: false,
  brief: {
    title: "Morning brief, sample",
    shape: "Easy day",
    planned_session: "Technique swim, 40 min",
    note: "A sample brief. It sketches one training day.",
  },
} as const

const logRequest = {
  tool: "log_water",
  arguments: {
    amount_ml: 250,
  },
} as const

const logResponse = {
  ok: true,
  source: "fixture",
  live: false,
  entry: {
    item: "Water",
    amount: "250 ml",
    status: "Appended in this fixture",
    note: "Sample log line. It stays in this page.",
  },
} as const

export const vignettes: readonly Vignette[] = [
  {
    id: "gym",
    tab: "Gym",
    kind: "Create",
    user: "Build me a gym workout",
    assistant:
      "I'll ask the dashboard for a 45-minute upper-body session. The card is sample data I stored in this page.",
    tool: gymRequest.tool,
    arguments: gymRequest.arguments,
    request: gymRequest,
    response: gymResponse,
    calling: "Calling",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: Upper strength sample, 45 minutes, four exercises.",
    card: {
      type: "session",
      kicker: "Sample fixture · create",
      title: gymResponse.workout.title,
      aside: `${gymResponse.workout.duration_min} min`,
      meta: `${gymResponse.workout.focus} · ${gymRequest.arguments.equipment.join(", ")}`,
      columns: ["Exercise", "Sets", "Reps", "Rest"],
      rows: [
        ["Bench press", "4", "6–8", "2 min"],
        ["Bent-over row", "4", "8", "1:30"],
        ["Overhead press", "3", "8–10", "1:30"],
        ["Face pull", "3", "12–15", "1 min"],
      ],
      note: gymResponse.workout.note,
    },
  },
  {
    id: "swim",
    tab: "Swim",
    kind: "Create",
    user: "Draft a short swim set",
    assistant:
      "I'll ask for a 900 m aerobic set in a 25 m pool. I wrote the set for this page.",
    tool: swimRequest.tool,
    arguments: swimRequest.arguments,
    request: swimRequest,
    response: swimResponse,
    calling: "Calling",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: aerobic swim sample, 900 metres.",
    card: {
      type: "session",
      kicker: "Sample fixture · create",
      title: swimResponse.workout.title,
      aside: "900 m",
      meta: `${swimResponse.workout.pool} pool · aerobic`,
      columns: ["Repeat", "Detail", "Rest"],
      rows: swimResponse.workout.sets.map((set) => [set.repeat, set.detail, set.rest]),
      note: swimResponse.workout.note,
    },
  },
  {
    id: "brief",
    tab: "Brief",
    kind: "Read",
    user: "How does this morning look?",
    assistant:
      "I'll read a morning brief off the dashboard. The words are a sample, for a training day.",
    tool: briefRequest.tool,
    arguments: briefRequest.arguments,
    request: briefRequest,
    response: briefResponse,
    calling: "Reading",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: morning brief sample, easy day, technique swim.",
    card: {
      type: "fields",
      kicker: "Sample fixture · read",
      title: briefResponse.brief.title,
      aside: "Read",
      rows: [
        { label: "Day shape", value: briefResponse.brief.shape },
        { label: "On the plan", value: briefResponse.brief.planned_session },
        { label: "Scope", value: "A training-day sketch" },
      ],
      note: briefResponse.brief.note,
    },
  },
  {
    id: "log",
    tab: "Log",
    kind: "Log",
    user: "Log a glass of water",
    assistant:
      "I'll add 250 ml of water to the log. The line shows on the card, and it lives in this page.",
    tool: logRequest.tool,
    arguments: logRequest.arguments,
    request: logRequest,
    response: logResponse,
    calling: "Writing",
    returned: "Logged a fixture",
    doneAnnouncement: "Fixture logged: 250 ml water, sample entry.",
    card: {
      type: "fields",
      kicker: "Sample fixture · log",
      title: "Water · sample entry",
      aside: "Write",
      rows: [
        { label: "Item", value: logResponse.entry.item },
        { label: "Amount", value: logResponse.entry.amount },
        { label: "Status", value: logResponse.entry.status },
      ],
      note: logResponse.entry.note,
    },
  },
]

export function vignetteById(id: VignetteId): Vignette {
  const match = vignettes.find((item) => item.id === id)
  if (!match) throw new Error(`Unknown vignette ${id}`)
  return match
}
