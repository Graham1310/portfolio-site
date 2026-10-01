/** Canned gym vignette. Bundled with the page. Never fetched. */

export const vignette = {
  user: "Build me a gym workout",
  assistant:
    "I'll call the workout builder for a 45-minute upper-body session. The card that comes back is a fixture bundled with this page.",
} as const

export const gymToolRequest = {
  tool: "create_strength_workout",
  arguments: {
    focus: "upper",
    duration_min: 45,
    equipment: ["barbell", "bench", "cable"],
  },
} as const

export const gymToolResponse = {
  ok: true,
  source: "fixture",
  live: false,
  workout: {
    title: "Upper strength — sample",
    duration_min: 45,
    focus: "Upper body",
    blocks: [
      { exercise: "Bench press", sets: 4, reps: "6–8", rest_s: 120 },
      { exercise: "Bent-over row", sets: 4, reps: "8", rest_s: 90 },
      { exercise: "Overhead press", sets: 3, reps: "8–10", rest_s: 90 },
      { exercise: "Face pull", sets: 3, reps: "12–15", rest_s: 60 },
    ],
    note: "Canned sample for this page. Not a personal programme.",
  },
} as const

export function formatRest(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  if (remainder === 0) return `${minutes} min`
  return `${minutes}:${String(remainder).padStart(2, "0")}`
}
