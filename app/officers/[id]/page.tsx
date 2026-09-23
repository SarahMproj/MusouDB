import {dossiers,weaponGuides,edition,combatSource} from "../../archive/dw8xl";
import {and,desc,eq} from "drizzle-orm";
import {Footer,Header,SaveButton} from "../../components";
import {battles,gameById,officerById,officerProfiles,officers,weapons} from "../../data";
import {getDb} from "../../../db";
import {archiveRecords,citations,revisions,structuredContributions} from "../../../db/schema";

import {publicOfficer,kingdomFor} from "../../lib/archive";
import {publishResearch,isSourceUrl} from "../../lib/research-publication";

export const dynamic="force-dynamic";
export function generateStaticParams(){return officers.map(o=>({id:o.id}))}

export default async function OfficerPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const seed=officerById(id);if(!seed)return <main><Header/><section className="archive-hero"><h1>Record not found</h1></section></main>;
  const profile=officerProfiles[id];const dossier=dossiers[id];const weaponGuide=weaponGuides.find(w=>w.officerId===id);const weaponRecord=weapons.find(w=>w.id===dossier?.weaponId);
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
  const o=publicOfficer(seed,override,legacyCopy,publication.fields.weapon,publication.fields.biography);
  const legacyUrls=new Set(research.map(r=>r.sourceUrl));
  const sourceRows=[
    ...dbCitations.filter(c=>!(c.sourceKind==="community"&&legacyUrls.has(c.url))).map(c=>({label:c.label,url:c.url,kind:c.sourceKind,fields:[] as string[]})),
    ...publication.sources,
    ...(profile?.citations||[]).map(c=>({...c,fields:[] as string[]})),
  ].filter(c=>isSourceUrl(c.url));
  const revisionRows=[...dbRevisions.map(r=>({version:r.version,date:r.createdAt.slice(0,10),summary:r.summary})),...(profile?.revisions||[])];
  return <main><Header active="officers"/>
    <section className={`detail-hero ${o.style}`}><div className="detail-mark">{o.mark}</div><div><p className="eyebrow"><span/>{kingdomFor(o)} OFFICER · {o.sourceStatus}</p><h1>{o.name}</h1><p className="detail-alias">{o.title} · {o.alias}</p><p>{o.summary}</p><SaveButton kind="officers" id={o.id} label={o.name}/></div></section>
    <section className="detail-body"><div className="detail-main">
      {unavailable&&<p role="status">Community updates are temporarily unavailable. Showing the seed record; please try again later.</p>}{dossier&&<p className="edition-label">Gameplay scope: <a href="/games/dw8xl">{edition}</a></p>}<h2>Record</h2><dl className="fact-grid"><div><dt>Kingdom</dt><dd>{kingdomFor(o)}</dd></div><div><dt>Signature weapon</dt><dd>{weaponRecord&&o.weapon===weaponRecord.name?<a href={`/weapons/${weaponRecord.id}`}>{o.weapon} →</a>:o.weapon}</dd></div><div><dt>Role</dt><dd>{profile?.role||o.title}</dd></div><div><dt>Editorial coverage</dt><dd>{publication.approvedCount?`${publication.approvedCount} research fields published`:profile?"Research profile · full moveset verification open":"Seed record"}</dd></div></dl>
      {dossier&&<section className="officer-narrative"><h2>Historical context</h2><p>{dossier.history}</p><a href={dossier.historySource.url} target="_blank" rel="noreferrer">{dossier.historySource.label} ↗</a></section>}{(detail.biography||detail.gameplay)&&<section className="officer-narrative"><p className="eyebrow"><span/>IN THE CHRONICLE</p>{detail.biography&&<><h2>Game portrayal</h2><small>{publication.fields.biography?"Published contributor research":"MusouDB editorial reading of the game’s characterization"}</small>{manual?.spoilerClass!=="safe"&&!publication.fields.biography&&manual?.body?<details className="spoiler-panel"><summary>Reveal biography notes</summary><p>{detail.biography}</p></details>:<p>{detail.biography}</p>}</>}{detail.gameplay&&<><h2>How they play</h2><p>{detail.gameplay}</p>{!publication.fields.gameplay&&dossier?.gameplayContext&&<p>{dossier.gameplayContext}</p>}{!publication.fields.gameplay&&dossier&&<a href={combatSource.url} target="_blank" rel="noreferrer">Community playstyle analysis ↗</a>}</>}</section>}
      {detail.relationships.length>0&&<><h2>Key relationships</h2><div className="relationship-grid">{detail.relationships.map((x,i)=>{const [name,...relation]=x.split(" · ");return <article key={i}><span>{name[0]}</span><strong>{officers.find(o=>o.name===name)?<a href={`/officers/${officers.find(o=>o.name===name)!.id}`}>{name}</a>:name}</strong><small>{relation.join(" · ")}</small></article>})}</div></>}
      {detail.battles.length>0&&<><h2>Associated battles</h2><div className="link-list">{detail.battles.map(bid=>{const b=battles.find(x=>x.id===bid);return b?<a href={`/battles/${bid}`} key={bid}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>:<p key={bid}>{bid}</p>})}</div></>}
      {weaponRecord&&<div className="link-list"><a href={`/weapons/${weaponRecord.id}`}><strong>{weaponRecord.name}</strong><small>{weaponGuide?"EX notes, compatibility and rare weapon guide →":"Weapon research and EX notes →"}</small></a></div>}{detail.unlock&&<details className="spoiler-panel"><summary>Reveal unlock conditions</summary><p>{detail.unlock}</p></details>}
      {detail.spoiler&&<details className="spoiler-panel"><summary>Reveal story and hypothetical-route notes</summary><p>{detail.spoiler}</p></details>}
      <h2>Appearances in this archive</h2><div className="link-list">{o.games.map(gid=>{const g=gameById(gid);return g&&<a href={`/games/${gid}`} key={gid}><span>{g.year}</span><strong>{g.title}</strong><small>{g.distinction} →</small></a>})}</div>
      {revisionRows.length>0&&<><h2>Revision history</h2><div className="public-revisions">{revisionRows.map((r,i)=><article key={i}><span>v{r.version}</span><div><strong>{r.summary}</strong><small>{r.date}</small></div></article>)}</div></>}
    </div><aside className="provenance"><p className="eyebrow"><span/>PROVENANCE</p><h3>{profile?"DW8XL CE research profile":"Community-authored seed"}</h3><p>{profile?"Historical overviews, publisher information and community gameplay observations are identified separately. These guides have been source-checked; they have not been replay-tested by MusouDB.":"This initial record is open for sourced expansion by the MusouDB community."}</p><dl><div><dt>Status</dt><dd>{o.sourceStatus}</dd></div><div><dt>Spoiler class</dt><dd>{detail.spoiler||detail.unlock?"Separated":"Spoiler-safe"}</dd></div><div><dt>Imagery</dt><dd>Original geometric placeholder</dd></div></dl>{sourceRows.length>0&&<div className="citation-stack">{sourceRows.map((c,i)=><a href={c.url} target="_blank" rel="noreferrer" key={i}><span>{c.kind}</span>{c.label} ↗{c.fields.length>0&&<small>Supports: {c.fields.join(", ")}</small>}</a>)}</div>}<a href={`/contribute?recordType=officer&recordId=${o.id}`}>Suggest a correction ↗</a></aside></section><Footer/></main>
}
