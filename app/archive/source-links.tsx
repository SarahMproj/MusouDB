import type {Source} from "./dw8xl";
export function SourceLinks({sources}:{sources:Source[]}){return <div className="citation-stack">{Array.from(new Map(sources.map(s=>[s.url,s])).values()).map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer"><span>{s.kind}</span>{s.label} ↗</a>)}</div>}
