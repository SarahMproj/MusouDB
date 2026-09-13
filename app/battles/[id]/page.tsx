import {notFound} from "next/navigation";
import {Footer,Header} from "../../components";
import {battles,officerById} from "../../data";
import {stageGuides,weaponGuides,dossiers,shuRoute,routeSource,manual,edition} from "../../archive/dw8xl";
import {SourceLinks} from "../../archive/source-links";
export default async function BattlePage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const battle=battles.find(b=>b.id===id);if(!battle)notFound();
 const stage=stageGuides.find(b=>b.id===id);const rewards=weaponGuides.filter(w=>w.rare.stageId===id);
 const officerIds=[...new Set([...(stage?.officerIds??[]),...Object.entries(dossiers).filter(([,p])=>p.battles.includes(id)).map(([id])=>id)])];
 const route=shuRoute.find(s=>s.battleId===id);
 return <main><Header active="battles"/><section className="archive-hero"><p className="eyebrow">BATTLE RECORD</p><h1>{battle.name}</h1><p>{battle.summary}</p></section><section className="detail-body"><div className="detail-main"><a href="/battles">← All battles</a><p className="edition-label">Guide scope: <a href="/games/dw8xl">{edition}</a>{stage&&` · ${stage.side}`}</p>
 {id==="hulao-gate"&&<p>The famous confrontation at Hulao Gate is a literary and game scenario. Its roster and duels should not be treated as a list of historically documented participants. <a href={dossiers["lu-bu"].historySource.url}>Historical and literary background ↗</a></p>}
 <h2>Connected officers</h2><p>Game portrayal and guide associations; this is not a complete playable roster or a historical order of battle.</p><div className="link-list">{officerIds.map(id=><a key={id} href={`/officers/${id}`}>{officerById(id)?.name} →</a>)}</div>
 {rewards.length>0&&<><h2>Weapon objectives</h2>{rewards.map(w=><details className="spoiler-panel" key={w.id}><summary>Reveal {officerById(w.officerId)?.name}’s {w.rare.rank}-star objective</summary><p><strong>{w.rare.side}</strong> · Hard or higher</p><p>{w.rare.condition}</p><a href={`/weapons/${w.id}#rare-weapon`}>{w.rare.name}: full guide →</a><SourceLinks sources={[w.rare.source]}/></details>)}</>}
 {route&&<details className="spoiler-panel"><summary>Reveal Shu route requirement</summary><p>{route.goal}</p><p>{route.reward}</p><a href="/battles#shu-route">See the full prerequisite checklist →</a><SourceLinks sources={[routeSource]}/></details>}
 <h2>Stage access</h2><p>Progress through Story Mode to open stages for Free Mode. A rare weapon objective and a hypothetical-route star are different conditions; completing one does not necessarily satisfy the other.</p><p>Use the exact battle title and side shown in the guide. The base campaign is included in Complete Edition; Empires and Dynasty Warriors 9 have different progression systems.</p>
 {!route&&!rewards.length&&<p>Detailed objectives for this battle are still open for research.</p>}
 </div><aside className="provenance"><h2>Source trail</h2><SourceLinks sources={[manual,...rewards.map(w=>w.rare.source),...(route?[routeSource]:[])]}/><a href={`/contribute?recordType=battle&recordId=${id}`}>Suggest a correction →</a></aside></section><Footer/></main>
}
