import { useEffect, useRef, useState } from "react"
import {
  formatRest,
  gymToolRequest,
  gymToolResponse,
  vignette,
} from "../fixtures/gymWorkout"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

const COMPLETE = 5
const DELAYS = [450, 1300, 2500, 3700, 5100]

function announcementFor(step: number): string {
  switch (step) {
    case 1:
      return `User says: ${vignette.user}`
    case 2:
      return "Assistant is writing a reply."
    case 3:
      return vignette.assistant
    case 4:
      return "Tool call create_strength_workout, focus upper, 45 minutes."
    case 5:
      return "Fixture returned: Upper strength sample, 45 minutes, four exercises."
    default:
      return ""
  }
}

export function ChatDemo() {
  const reduce = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const autoplayed = useRef(false)
  const [session, setSession] = useState(0)
  const [step, setStep] = useState(0)
  const visibleStep = reduce ? COMPLETE : step

  useEffect(() => {
    if (reduce) return
    const node = panelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || autoplayed.current) return
        autoplayed.current = true
        setStep(0)
        setSession((value) => value + 1)
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  useEffect(() => {
    if (reduce || session === 0) return
    const timers = DELAYS.map((delay, index) =>
      window.setTimeout(() => setStep(index + 1), delay),
    )
    return () => {
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [reduce, session])

  const showUser = visibleStep >= 1
  const showTyping = !reduce && visibleStep === 2
  const showAssistant = visibleStep >= 3
  const showTool = visibleStep >= 4
  const showCard = visibleStep >= 5
  const playing = !reduce && session > 0 && visibleStep < COMPLETE
  const workout = gymToolResponse.workout

  function play() {
    if (reduce) return
    autoplayed.current = true
    setStep(0)
    setSession((value) => value + 1)
  }

  const state =
    visibleStep >= COMPLETE ? "complete" : session === 0 ? "idle" : "playing"

  return (
    <div id="demo" className="demo">
      <div id="demo-shot">
      <div className="demo-intro">
        <h3 id="demo-title">A gym workout, scripted</h3>
        <p>
          Four beats, hard-coded in this page. The reply, the tool call, and the workout card are
          fixtures. The browser does not contact a model or a server.
        </p>
      </div>
      <div id="chat-stage" className="demo-layout">
        <aside className="demo-legend" aria-label="How to read the demonstration">
          <p className="kicker">What you are seeing</p>
          <ol>
            <li>A person asks in ordinary language.</li>
            <li>The assistant answers in a sentence, then calls a tool by name.</li>
            <li>Arguments are structured fields, not a scraped screen.</li>
            <li>The card is the tool result. Here it is a fixture, labelled as one.</li>
          </ol>
        </aside>
        <div
          id="chat-panel"
          ref={panelRef}
          className="demo-panel"
          data-demo-state={state}
        >
          <div className="demo-topbar">
            <span>Local script</span>
            <span className="pill">Scripted · no network</span>
          </div>
          <div id="chat-thread" className="thread" aria-label="Scripted conversation">
            {session === 0 && !reduce && (
              <div className="thread-idle">
                <p>The script plays when this panel is on screen, or when you press play.</p>
              </div>
            )}
            {showUser && (
              <article className="bubble bubble-user">
                <p className="who">User</p>
                <p>{vignette.user}</p>
              </article>
            )}
            {showTyping && (
              <p className="typing" aria-hidden="true">
                <span />
                <span />
                <span />
              </p>
            )}
            {showAssistant && (
              <article className="bubble bubble-assistant">
                <p className="who">Assistant</p>
                <p>{vignette.assistant}</p>
              </article>
            )}
            {showTool && (
              <div className="tool" role="group" aria-label="Tool call create_strength_workout">
                <div className="tool-bar">
                  <p className="who">Tool call</p>
                  <p className="tool-status">{showCard ? "Returned a fixture" : "Calling"}</p>
                </div>
                <p className="tool-name">{gymToolRequest.tool}</p>
                <dl className="tool-args">
                  <div>
                    <dt>focus</dt>
                    <dd>{gymToolRequest.arguments.focus}</dd>
                  </div>
                  <div>
                    <dt>duration_min</dt>
                    <dd>{gymToolRequest.arguments.duration_min}</dd>
                  </div>
                  <div>
                    <dt>equipment</dt>
                    <dd>{gymToolRequest.arguments.equipment.join(", ")}</dd>
                  </div>
                </dl>
              </div>
            )}
            {showCard && (
              <article className="workout" aria-label="Sample workout fixture">
                <div className="workout-head">
                  <div>
                    <p className="kicker">Sample fixture</p>
                    <h4>{workout.title}</h4>
                  </div>
                  <p className="workout-time">{workout.duration_min} min</p>
                </div>
                <p className="workout-meta">
                  {workout.focus}
                  <span aria-hidden="true"> · </span>
                  {gymToolRequest.arguments.equipment.join(", ")}
                </p>
                <table>
                  <caption className="sr-only">Sample upper-body exercises</caption>
                  <thead>
                    <tr>
                      <th scope="col">Exercise</th>
                      <th scope="col">Sets</th>
                      <th scope="col">Reps</th>
                      <th scope="col">Rest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workout.blocks.map((block) => (
                      <tr key={block.exercise}>
                        <th scope="row">{block.exercise}</th>
                        <td>{block.sets}</td>
                        <td>{block.reps}</td>
                        <td>{formatRest(block.rest_s)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="workout-note">{workout.note}</p>
              </article>
            )}
          </div>
          <div className="demo-actions">
            {reduce ? (
              <p className="motion-note">
                Reduced motion is on, so the full script is shown at once.
              </p>
            ) : (
              <button
                type="button"
                className="button button-secondary"
                onClick={play}
                disabled={playing}
              >
                {session === 0 ? "Play demonstration" : playing ? "Playing" : "Replay"}
              </button>
            )}
          </div>
          {!reduce && (
            <p className="sr-only" aria-live="polite">
              {announcementFor(visibleStep)}
            </p>
          )}
        </div>
      </div>
      </div>
      <div id="sample-json" className="json-grid" aria-label="Illustrative tool payload">
        <figure>
          <figcaption>
            request.json <span>illustrative</span>
          </figcaption>
          <pre>
            <code>{JSON.stringify(gymToolRequest, null, 2)}</code>
          </pre>
        </figure>
        <figure>
          <figcaption>
            response.json <span>fixture · live: false</span>
          </figcaption>
          <pre>
            <code>{JSON.stringify(gymToolResponse, null, 2)}</code>
          </pre>
        </figure>
      </div>
    </div>
  )
}
