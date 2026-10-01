import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { vignetteById, vignettes, type Vignette, type VignetteId } from "../fixtures/vignettes"

const COMPLETE = 5
const DELAYS = [450, 1300, 2500, 3700, 5100]

function formatArg(value: string | number | readonly string[]): string {
  return Array.isArray(value) ? value.join(", ") : String(value)
}

function announcementFor(vignette: Vignette, step: number): string {
  switch (step) {
    case 1:
      return `User says: ${vignette.user}`
    case 2:
      return "Assistant is writing a reply."
    case 3:
      return vignette.assistant
    case 4:
      return `Tool call ${vignette.tool}.`
    case 5:
      return vignette.doneAnnouncement
    default:
      return ""
  }
}

function ResultCard({ vignette }: { vignette: Vignette }) {
  const card = vignette.card
  if (card.type === "session") {
    return (
      <article className="workout" aria-label={card.title}>
        <div className="workout-head">
          <div>
            <p className="kicker">{card.kicker}</p>
            <h4>{card.title}</h4>
          </div>
          <p className="workout-time">{card.aside}</p>
        </div>
        <p className="workout-meta">{card.meta}</p>
        <table>
          <caption className="sr-only">{card.title}</caption>
          <thead>
            <tr>
              {card.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={`${row[0]}-${index}`}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="workout-note">{card.note}</p>
      </article>
    )
  }

  return (
    <article className="workout" aria-label={card.title}>
      <div className="workout-head">
        <div>
          <p className="kicker">{card.kicker}</p>
          <h4>{card.title}</h4>
        </div>
        <p className="workout-time">{card.aside}</p>
      </div>
      <dl className="field-list">
        {card.rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="workout-note">{card.note}</p>
    </article>
  )
}

export function ChatDemo() {
  const reduce = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const autoplayed = useRef(false)
  const [activeId, setActiveId] = useState<VignetteId>("gym")
  const [session, setSession] = useState(0)
  const [step, setStep] = useState(0)
  const vignette = vignetteById(activeId)
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

  function select(id: VignetteId) {
    if (reduce) {
      setActiveId(id)
      return
    }
    autoplayed.current = true
    setStep(0)
    setActiveId(id)
    setSession((value) => value + 1)
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const ids = vignettes.map((item) => item.id)
    const index = ids.indexOf(activeId)
    if (event.key === "ArrowRight") {
      event.preventDefault()
      const next = ids[(index + 1) % ids.length]
      select(next)
      document.getElementById(`tab-${next}`)?.focus()
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      const next = ids[(index - 1 + ids.length) % ids.length]
      select(next)
      document.getElementById(`tab-${next}`)?.focus()
    }
  }

  const state = visibleStep >= COMPLETE ? "complete" : session === 0 ? "idle" : "playing"

  return (
    <div id="demo" className="demo">
      <div id="demo-shot" data-vignette={vignette.id}>
        <div className="demo-intro">
          <h3 id="demo-title">Four examples</h3>
          <p>
            Two of these build a session, gym then a pool set. The morning one fetches a brief.
            The last one appends 250 ml of water to a log. All four are stored in the page, and
            the browser keeps them there.
          </p>
        </div>
        <div
          className="vignette-tabs"
          role="tablist"
          aria-label="Scripted demonstrations"
          onKeyDown={onTabsKeyDown}
        >
          {vignettes.map((item) => {
            const selected = item.id === activeId
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="chat-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(item.id)}
              >
                <span className="tab-kind">{item.kind}</span>
                {item.tab}
              </button>
            )
          })}
        </div>
        <div id="chat-stage" className="demo-layout">
          <aside className="demo-legend" aria-label="How to read the demonstration">
            <p className="kicker">What you are seeing</p>
            <ol>
              <li>You ask in plain language.</li>
              <li>The assistant replies and names a tool.</li>
              <li>The arguments show up as named fields.</li>
              <li>The card is the fixture that came back.</li>
            </ol>
          </aside>
          <div
            id="chat-panel"
            ref={panelRef}
            className="demo-panel"
            role="tabpanel"
            aria-labelledby={`tab-${vignette.id}`}
            data-demo-state={state}
            data-vignette={vignette.id}
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
                <div className="tool" role="group" aria-label={`Tool call ${vignette.tool}`}>
                  <div className="tool-bar">
                    <p className="who">Tool call</p>
                    <p className="tool-status">{showCard ? vignette.returned : vignette.calling}</p>
                  </div>
                  <p className="tool-name">{vignette.tool}</p>
                  <dl className="tool-args">
                    {Object.entries(vignette.arguments).map(([key, value]) => (
                      <div key={key}>
                        <dt>{key}</dt>
                        <dd>{formatArg(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {showCard && <ResultCard vignette={vignette} />}
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
                  onClick={() => select(activeId)}
                  disabled={playing}
                >
                  {session === 0 ? "Play demonstration" : playing ? "Playing" : "Replay"}
                </button>
              )}
            </div>
            {!reduce && (
              <p className="sr-only" aria-live="polite">
                {announcementFor(vignette, visibleStep)}
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
            <code>{JSON.stringify(vignette.request, null, 2)}</code>
          </pre>
        </figure>
        <figure>
          <figcaption>
            response.json <span>fixture · live: false</span>
          </figcaption>
          <pre>
            <code>{JSON.stringify(vignette.response, null, 2)}</code>
          </pre>
        </figure>
      </div>
    </div>
  )
}
