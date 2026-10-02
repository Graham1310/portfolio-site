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
      { exercise: "Bench press", sets: 4, reps: "6-8", rest_s: 120 },
      { exercise: "Bent-over row", sets: 4, reps: "8", rest_s: 90 },
      { exercise: "Overhead press", sets: 3, reps: "8-10", rest_s: 90 },
      { exercise: "Face pull", sets: 3, reps: "12-15", rest_s: 60 },
    ],
    note: "A 45-minute upper session, written for this page.",
  },
} as const

const swimRequest = {
  tool: "proteus_swim_workout_builder",
  arguments: {
    distance_m: 1500,
    focus: "technique",
    warmup: "short",
  },
} as const

const swimResponse = {
  ok: true,
  source: "fixture",
  live: false,
  workout: {
    title: "Technique set, sample",
    distance_m: 1500,
    focus: "technique",
    sets: [
      { repeat: "1", detail: "200 m easy warm-up", rest: "—" },
      { repeat: "6 × 100 m", detail: "drill", rest: "20 s" },
      { repeat: "4 × 150 m", detail: "steady", rest: "20 s" },
      { repeat: "1", detail: "100 m easy cool-down", rest: "—" },
    ],
    note: "1,500 m (200 + 600 + 600 + 100). Written for this page.",
  },
} as const

const briefRequest = {
  tool: "training_snapshot",
  arguments: {
    date: "today",
  },
} as const

const briefResponse = {
  ok: true,
  source: "fixture",
  live: false,
  brief: {
    title: "Morning brief, sample",
    sleep: "7 h 20 min",
    resting_hr: 52,
    readiness: "Good to train",
    suggested_session: "Easy swim",
    note: "Sample data invented for this page. It is not a live reading.",
  },
} as const

const logRequest = {
  tool: "mfp_set_water",
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
    today_total: "1,250 ml",
    note: "Sample log line. It stays in this page.",
  },
} as const

export const vignettes: readonly Vignette[] = [
  {
    id: "gym",
    tab: "Gym",
    kind: "Create",
    user: "Build me a 45-minute upper body session. I've got a barbell, a bench and a cable machine.",
    assistant: "I'll create that for you using the `create_strength_workout` tool.",
    tool: gymRequest.tool,
    arguments: gymRequest.arguments,
    request: gymRequest,
    response: gymResponse,
    calling: "Calling",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: Upper strength sample, 45 minutes, four exercises.",
    card: {
      type: "session",
      kicker: "Sample · create",
      title: "Upper strength (sample)",
      aside: "45 min",
      meta: "Upper body · barbell, bench, cable",
      columns: ["Exercise", "Sets", "Reps", "Rest"],
      rows: [
        ["Bench press", "4", "6-8", "2 min"],
        ["Bent-over row", "4", "8", "1:30"],
        ["Overhead press", "3", "8-10", "1:30"],
        ["Face pull", "3", "12-15", "1 min"],
      ],
      note: gymResponse.workout.note,
    },
  },
  {
    id: "swim",
    tab: "Swim",
    kind: "Create",
    user: "Give me a 1,500 metre pool session focused on technique, with a short warm-up.",
    assistant: "I'll build that with the `proteus_swim_workout_builder` tool.",
    tool: swimRequest.tool,
    arguments: swimRequest.arguments,
    request: swimRequest,
    response: swimResponse,
    calling: "Calling",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: technique swim sample, 1,500 metres.",
    card: {
      type: "session",
      kicker: "Sample · create",
      title: "Technique set (sample)",
      aside: "1,500 m",
      meta: "Technique · short warm-up",
      columns: ["Repeat", "Detail", "Rest"],
      rows: swimResponse.workout.sets.map((set) => [set.repeat, set.detail, set.rest]),
      note: swimResponse.workout.note,
    },
  },
  {
    id: "brief",
    tab: "Brief",
    kind: "Read",
    user: "How am I looking this morning?",
    assistant: "I'll pull your morning brief with the `training_snapshot` tool.",
    tool: briefRequest.tool,
    arguments: briefRequest.arguments,
    request: briefRequest,
    response: briefResponse,
    calling: "Reading",
    returned: "Returned a fixture",
    doneAnnouncement: "Fixture returned: morning brief sample. Sample data only.",
    card: {
      type: "fields",
      kicker: "Sample data · read",
      title: briefResponse.brief.title,
      aside: "Sample",
      rows: [
        { label: "Sleep", value: briefResponse.brief.sleep },
        { label: "Resting heart rate", value: String(briefResponse.brief.resting_hr) },
        { label: "Readiness", value: briefResponse.brief.readiness },
        { label: "Suggested session", value: briefResponse.brief.suggested_session },
      ],
      note: briefResponse.brief.note,
    },
  },
  {
    id: "log",
    tab: "Log",
    kind: "Log",
    user: "Log 250 ml of water.",
    assistant: "Done, using the `mfp_set_water` tool.",
    tool: logRequest.tool,
    arguments: logRequest.arguments,
    request: logRequest,
    response: logResponse,
    calling: "Writing",
    returned: "Logged a fixture",
    doneAnnouncement: "Fixture logged: 250 ml water. Today's total sample 1,250 ml.",
    card: {
      type: "fields",
      kicker: "Sample · log",
      title: "Logged 250 ml",
      aside: "Write",
      rows: [
        { label: "Amount", value: logResponse.entry.amount },
        { label: "Today's total (sample)", value: logResponse.entry.today_total },
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
