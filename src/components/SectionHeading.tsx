import type { ReactNode } from "react"

type SectionHeadingProps = {
  index?: string
  kicker: string
  id: string
  children: ReactNode
}

export function SectionHeading({ index, kicker, id, children }: SectionHeadingProps) {
  return (
    <div className="section-head">
      {index ? <span className="index-num">{index}</span> : null}
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id}>{children}</h2>
      </div>
    </div>
  )
}
