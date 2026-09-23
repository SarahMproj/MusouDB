import {Footer,Header} from "../components";
import {dw8xlOfficerIds} from "../data";
import {dossiers,weaponGuides} from "../archive/dw8xl";
import {loadArchive} from "../lib/archive";
export const dynamic="force-dynamic";
export default async function Coverage(){
 const {officers,unavailable}=await loadArchive();const rows=officers.filter(o=>dw8xlOfficerIds.includes(o.id));
 const researched=rows.filter(o=>dossiers[o.id]).length;const published=rows.filter(o=>o.publishedFields>0).length;
 return <main><Header active="officers"/><section className="archive-hero coverage-hero"><p className="eyebrow">EDITORIAL COVERAGE · DW8XL CE</p><h1>{rows.length} officers. Visible research gaps.</h1><p>A research profile includes historical context, game portrayal and sourced weapon or playstyle notes. Rare weapon guides are counted separately. A profile does not imply that every move, unlock or appearance has been verified.</p><div className="coverage-stats"><div><strong>{researched}</strong><span>Research profiles</span></div><div><strong>{weaponGuides.length}</strong><span>Rare weapon guides</span></div><div><strong>{published}</strong><span>Officers with published research</span></div><div><strong>{rows.length-researched}</strong><span>Seed profiles to expand</span></div></div></section>
 <section className="coverage-body">{unavailable&&<p role="status">Community updates are temporarily unavailable. Published research counts may be incomplete.</p>}<div className="coverage-factions">{["WEI","WU","SHU","JIN","OTHER"].map(name=>{const members=rows.filter(o=>o.kingdom===name);const count=members.filter(o=>dossiers[o.id]).length;return <article key={name}><header><strong>{name}</strong><span>{count}/{members.length} researched</span></header><div><i style={{width:`${members.length?count/members.length*100:0}%`}}/></div><small>{members.length-count} seed profiles</small></article>})}</div>
 <p>Publisher documentation supports the general systems. Rare conditions and playstyles are attributed to community guides and await MusouDB replay verification. Full moveset tables and the other kingdom route checklists remain open.</p>
 <div className="coverage-table"><header><span>Officer</span><span>Kingdom</span><span>Profile</span><span>Sources</span><span>Published fields</span></header>{rows.map(o=><a href={`/officers/${o.id}`} key={o.id}><strong>{o.name}</strong><span>{o.kingdom}</span><span>{dossiers[o.id]?"Research profile":"Seed"}</span><span>{o.sourceCount}</span><span>{o.publishedFields}/7</span></a>)}</div></section><Footer/></main>
}
