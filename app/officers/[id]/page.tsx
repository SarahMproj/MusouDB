import {and,desc,eq} from "drizzle-orm";
import {Footer,Header,SaveButton} from "../../components";
import {battles,gameById,officerById,officerProfiles,officers} from "../../data";
import {getDb} from "../../../db";
import {archiveRecords,citations,revisions,structuredContributions} from "../../../db/schema";

import {publishResearch,isSourceUrl} from "../../lib/research-publication";

export const dynamic="force-dynamic";
export function generateStaticParams(){return officers.map(o=>({id:o.id}))}

export default async function OfficerPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const seed=officerById(id);if(!seed)return <main><Header/><section className="archive-hero"><h1>Record not found</h1></section></main>;
  const profile=officerProfiles[id];
  let override:typeof archiveRecords.$inferSelect|undefined;
  let dbCitations:typeof citations.$inferSelect[]=[];
  let dbRevisions:typeof revisions.$inferSelect[]=[];
  let research:typeof structuredContributions.$inferSelect[]=[];
  let unavailable=false;
  try{
    const db=await getDb();
    const [overrides,sources,history,submissions]=await Promise.all([
      db.select().from(archiveRecords).where(and(eq(archiveRecords.recordType,"officer"),eq(archiveRecords.recordId,id))).limit(1),
      db.select().from(citations).where(and(eq(citations.recordType,"officer"),eq(citations.recordId,id))).orderBy(desc(citations.id)),
      db.select().from(revisions).where(and(eq(revisions.recordType,"officer"),eq(revisions.recordId,id))).orderBy(desc(revisions.version)),
      db.select().from(structuredContributions).where(eq(structuredContributions.officerId,id)),
    ]);
    [override]=overrides;dbCitations=sources;dbRevisions=history;research=submissions;
  }catch{unavailable=true;console.error("Could not load officer editorial content",id)}
  const publication=publishResearch(research);
  // The old publisher copied biographies into this generic table. Ignore those
  // copies so withdrawing approval cannot leave stale research public.
  const legacyCopy=dbRevisions.some(r=>r.summary.startsWith("Published founding contribution:"));
  const manual=override?.status==="reviewed"&&!legacyCopy?override:undefined;
  const detail={
    biography:publication.fields.biography??manual?.body??profile?.biography,
    gameplay:publication.fields.gameplay??profile?.gameplay,
    battles:publication.fields.battles??profile?.battles??[],
    relationships:publication.fields.relationships??profile?.relationships??[],
    unlock:publication.fields.unlockCondition??profile?.unlock,
    spoiler:publication.fields.spoilerNotes??profile?.spoiler??seed.spoiler,
  };
  const o={...seed,summary:manual?.spoilerClass==="safe"?manual.summary:seed.summary,weapon:publication.fields.weapon??seed.weapon};
  const legacyUrls=new Set(research.map(r=>r.sourceUrl));
  const sourceRows=[
    ...dbCitations.filter(c=>!(c.sourceKind==="community"&&legacyUrls.has(c.url))).map(c=>({label:c.label,url:c.url,kind:c.sourceKind,fields:[] as string[]})),
    ...publication.sources,
    ...(profile?.citations||[]).map(c=>({...c,fields:[] as string[]})),
  ].filter(c=>isSourceUrl(c.url));
  const revisionRows=[...dbRevisions.map(r=>({version:r.version,date:r.createdAt.slice(0,10),summary:r.summary})),...(profile?.revisions||[])];
  return <main><Header active="officers"/>
    <section className={`detail-hero ${o.style}`}><div className="detail-mark">{o.mark}</div><div><p className="eyebrow"><span/>{profile?.kingdom||o.faction} OFFICER · {o.sourceStatus}</p><h1>{o.name}</h1><p className="detail-alias">{o.title} · {o.alias}</p><p>{o.summary}</p><SaveButton kind="officers" id={o.id} label={o.name}/></div></section>
    <section className="detail-body"><div className="detail-main">
      {unavailable&&<p role="status">Community updates are temporarily unavailable. Showing the seed record; please try again later.</p>}<h2>Record</h2><dl className="fact-grid"><div><dt>Kingdom</dt><dd>{profile?.kingdom||o.faction}</dd></div><div><dt>Signature weapon</dt><dd>{o.weapon}</dd></div><div><dt>Role</dt><dd>{profile?.role||o.title}</dd></div><div><dt>Editorial coverage</dt><dd>{publication.approvedCount?`${publication.approvedCount} research fields published`:profile?profile.completeness+"% complete":"Seed record"}</dd></div></dl>
      {(detail.biography||detail.gameplay)&&<section className="officer-narrative"><p className="eyebrow"><span/>IN THE CHRONICLE</p>{detail.biography&&<><h2>Biography and portrayal</h2>{manual?.spoilerClass!=="safe"&&!publication.fields.biography&&manual?.body?<details className="spoiler-panel"><summary>Reveal biography notes</summary><p>{detail.biography}</p></details>:<p>{detail.biography}</p>}</>}{detail.gameplay&&<><h2>How they play</h2><p>{detail.gameplay}</p></>}</section>}
      {detail.relationships.length>0&&<><h2>Key relationships</h2><div className="relationship-grid">{detail.relationships.map((x,i)=>{const [name,...relation]=x.split(" · ");return <article key={i}><span>{name[0]}</span><strong>{name}</strong><small>{relation.join(" · ")}</small></article>})}</div></>}
      {detail.battles.length>0&&<><h2>Associated battles</h2><div className="link-list">{detail.battles.map(bid=>{const b=battles.find(x=>x.id===bid);return b?<a href="/battles" key={bid}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>:<p key={bid}>{bid}</p>})}</div></>}
      {detail.unlock&&<details className="spoiler-panel"><summary>Reveal unlock conditions</summary><p>{detail.unlock}</p></details>}
      {detail.spoiler&&<details className="spoiler-panel"><summary>Reveal story and hypothetical-route notes</summary><p>{detail.spoiler}</p></details>}
      <h2>Appearances in this archive</h2><div className="link-list">{o.games.map(gid=>{const g=gameById(gid);return g&&<a href={`/games/${gid}`} key={gid}><span>{g.year}</span><strong>{g.title}</strong><small>{g.distinction} →</small></a>})}</div>
      {revisionRows.length>0&&<><h2>Revision history</h2><div className="public-revisions">{revisionRows.map((r,i)=><article key={i}><span>v{r.version}</span><div><strong>{r.summary}</strong><small>{r.date}</small></div></article>)}</div></>}
    </div><aside className="provenance"><p className="eyebrow"><span/>PROVENANCE</p><h3>{profile?"Flagship sourced record":"Community-authored seed"}</h3><p>{profile?"Facts are separated from interpretive editorial copy, with story spoilers held behind an explicit reveal.":"This initial record is open for sourced expansion by the MusouDB community."}</p><dl><div><dt>Status</dt><dd>{o.sourceStatus}</dd></div><div><dt>Spoiler class</dt><dd>{detail.spoiler||detail.unlock?"Separated":"Spoiler-safe"}</dd></div><div><dt>Imagery</dt><dd>Original geometric placeholder</dd></div></dl>{sourceRows.length>0&&<div className="citation-stack">{sourceRows.map((c,i)=><a href={c.url} target="_blank" rel="noreferrer" key={i}><span>{c.kind}</span>{c.label} ↗{c.fields.length>0&&<small>Supports: {c.fields.join(", ")}</small>}</a>)}</div>}<a href={`/contribute?recordType=officer&recordId=${o.id}`}>Suggest a correction ↗</a></aside></section><Footer/></main>
}
