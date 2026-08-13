import {and,desc,eq} from "drizzle-orm";
import {Footer,Header,SaveButton} from "../../components";
import {battles,gameById,officerById,officerProfiles,officers} from "../../data";
import {getDb} from "../../../db";
import {archiveRecords,citations,revisions} from "../../../db/schema";

export const dynamic="force-dynamic";
export function generateStaticParams(){return officers.map(o=>({id:o.id}))}

export default async function OfficerPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const seed=officerById(id);if(!seed)return <main><Header/><section className="archive-hero"><h1>Record not found</h1></section></main>;
  const profile=officerProfiles[id];let override:null|typeof archiveRecords.$inferSelect=null;let dbCitations:typeof citations.$inferSelect[]=[];let dbRevisions:typeof revisions.$inferSelect[]=[];
  try{const db=await getDb();[override]=await db.select().from(archiveRecords).where(and(eq(archiveRecords.recordType,"officer"),eq(archiveRecords.recordId,id))).limit(1);dbCitations=await db.select().from(citations).where(and(eq(citations.recordType,"officer"),eq(citations.recordId,id))).orderBy(desc(citations.id));dbRevisions=await db.select().from(revisions).where(and(eq(revisions.recordType,"officer"),eq(revisions.recordId,id))).orderBy(desc(revisions.version))}catch{}
  const o={...seed,summary:override?.summary||seed.summary,sourceStatus:(override?.status==="reviewed"?"reviewed":seed.sourceStatus) as "reviewed"|"draft"};
  const sourceRows=[...(dbCitations.map(c=>({label:c.label,url:c.url,kind:c.sourceKind}))),...(profile?.citations||[])];
  const revisionRows=[...dbRevisions.map(r=>({version:r.version,date:r.createdAt.slice(0,10),summary:r.summary})),...(profile?.revisions||[])];
  return <main><Header active="officers"/>
    <section className={`detail-hero ${o.style}`}><div className="detail-mark">{o.mark}</div><div><p className="eyebrow"><span/>{profile?.kingdom||o.faction} OFFICER · {o.sourceStatus}</p><h1>{o.name}</h1><p className="detail-alias">{o.title} · {o.alias}</p><p>{o.summary}</p><SaveButton kind="officers" id={o.id} label={o.name}/></div></section>
    <section className="detail-body"><div className="detail-main">
      <h2>Record</h2><dl className="fact-grid"><div><dt>Kingdom</dt><dd>{profile?.kingdom||o.faction}</dd></div><div><dt>Signature weapon</dt><dd>{o.weapon}</dd></div><div><dt>Role</dt><dd>{profile?.role||o.title}</dd></div><div><dt>Editorial coverage</dt><dd>{profile?profile.completeness+"% complete":"Seed record"}</dd></div></dl>
      {profile&&<><section className="officer-narrative"><p className="eyebrow"><span/>IN THE CHRONICLE</p><h2>Biography and portrayal</h2><p>{override?.body||profile.biography}</p><h2>How they play</h2><p>{profile.gameplay}</p></section>
      <h2>Key relationships</h2><div className="relationship-grid">{profile.relationships.map(x=>{const [name,relation]=x.split(" · ");return <article key={x}><span>{name[0]}</span><strong>{name}</strong><small>{relation}</small></article>})}</div>
      <h2>Associated battles</h2><div className="link-list">{profile.battles.map(bid=>{const b=battles.find(x=>x.id===bid);return b&&<a href="/battles" key={bid}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>})}</div>
      <details className="spoiler-panel"><summary>Reveal story and hypothetical-route notes</summary><p>{profile.spoiler}</p></details></>}
      <h2>Appearances in this archive</h2><div className="link-list">{o.games.map(gid=>{const g=gameById(gid);return g&&<a href={`/games/${gid}`} key={gid}><span>{g.year}</span><strong>{g.title}</strong><small>{g.distinction} →</small></a>})}</div>
      {revisionRows.length>0&&<><h2>Revision history</h2><div className="public-revisions">{revisionRows.map((r,i)=><article key={i}><span>v{r.version}</span><div><strong>{r.summary}</strong><small>{r.date}</small></div></article>)}</div></>}
    </div><aside className="provenance"><p className="eyebrow"><span/>PROVENANCE</p><h3>{profile?"Flagship sourced record":"Community-authored seed"}</h3><p>{profile?"Facts are separated from interpretive editorial copy, with story spoilers held behind an explicit reveal.":"This initial record is open for sourced expansion by the MusouDB community."}</p><dl><div><dt>Status</dt><dd>{o.sourceStatus}</dd></div><div><dt>Spoiler class</dt><dd>{profile||o.spoiler?"Separated":"Spoiler-safe"}</dd></div><div><dt>Imagery</dt><dd>Original geometric placeholder</dd></div></dl>{sourceRows.length>0&&<div className="citation-stack">{sourceRows.map((c,i)=><a href={c.url} target="_blank" rel="noreferrer" key={i}><span>{c.kind}</span>{c.label} ↗</a>)}</div>}<a href={`/contribute?recordType=officer&recordId=${o.id}`}>Suggest a correction ↗</a></aside></section><Footer/></main>
}
