import {loadArchive} from "../../lib/archive";
import {manual,weaponGuides,dossiers} from "../../archive/dw8xl";
export const dynamic="force-dynamic";
import {Footer,Header,SaveButton} from "../../components";
import {gameById,games,battles} from "../../data";

export function generateStaticParams(){return games.map(g=>({id:g.id}))}

const rosterGroups=["WEI","WU","SHU","JIN","OTHER"] as const;

export default async function GamePage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const g=gameById(id);
  if(!g)return <main><Header/><section className="archive-hero"><h1>Game not found</h1></section></main>;
  const {officers,unavailable}=await loadArchive();
  const roster=officers.filter(o=>g.officers.includes(o.id));const isGolden=g.id==="dw8xl";
  const researchedCount=roster.filter(o=>dossiers[o.id]).length;
  const group=(label:typeof rosterGroups[number])=>roster.filter(o=>o.kingdom===label);
  const modeCopy=["Kingdom campaigns split between historical outcomes and unlockable hypothetical routes, plus Xtreme Legends’ Lu Bu chronicle.","Replay unlocked stages with a wider character selection and pursue objectives outside campaign sequencing.","Build the Tongquetai, recruit allies, gather materials, and expand a persistent base across successive battles.","Five score-driven rule sets test speed, survival, combat efficiency, and mastery of the weapon system."];
  return <main><Header active="games"/>
    <section className={`game-detail-hero ${isGolden?"golden-game":""}`}><p className="eyebrow"><span/>{g.year} · {g.status}</p><h1>{g.title}</h1><p>{g.summary}</p><SaveButton kind="games" id={g.id} label={g.short}/>
      {isGolden&&<div className="edition-stats"><div><strong>82</strong><span>Playable officers</span></div><div><strong>5</strong><span>Story factions</span></div><div><strong>4</strong><span>Core modes</span></div><div><strong>1:1</strong><span>Unique EX weapons</span></div></div>}
    </section>
    <section className="detail-body"><div className="detail-main">
      {unavailable&&<p role="status">Community updates are temporarily unavailable. Showing archive seed records.</p>}<dl className="fact-grid"><div><dt>Era</dt><dd>{g.era}</dd></div><div><dt>Defining idea</dt><dd>{g.distinction}</dd></div><div><dt>Platforms</dt><dd>{g.platforms.join(" · ")}</dd></div><div><dt>Edition</dt><dd>{g.edition||g.status}</dd></div></dl>
      {isGolden?<>
        <div className="chronicle-heading"><div><p className="eyebrow"><span/>CANONICAL ROSTER</p><h2>All 82 playable officers</h2></div><p>Browse the full roster. {researchedCount} research profiles connect historical context with edition-specific weapon and playstyle notes.</p></div>
        <div className="roster-directory">{rosterGroups.map(label=><section key={label} className={`roster-faction ${label.toLowerCase()}`}><header><h3>{label}</h3><span>{group(label).length} officers</span></header><div>{group(label).map(o=><a href={`/officers/${o.id}`} key={o.id}><span>{o.mark}</span><strong>{o.name}</strong><small>{o.weapon}{o.publishedFields>0?` · ${o.publishedFields} published fields`:""}</small></a>)}</div></section>)}</div>
        <h2>Modes and systems</h2><div className="mode-grid">{g.modes?.map((mode,i)=><article key={mode}><span>0{i+1}</span><h3>{mode}</h3><p>{modeCopy[i]}</p></article>)}</div>
        <h2 id="availability">Characters and stage access</h2><p>Story Mode assigns a cast to each scenario. Free Mode reuses stages opened through Story Mode, while Ambition Mode has its own allied-officer recruitment. A rare weapon condition is separate from character availability.</p><a href={manual.url} target="_blank" rel="noreferrer">Publisher manual: mode rules ↗</a><h2>Weapon and route guides</h2><p><a href="/battles#shu-route">Shu hypothetical route checklist →</a></p><div className="link-list">{weaponGuides.map(w=><a href={`/weapons/${w.id}`} key={w.id}><strong>{w.name}</strong><small>{w.rare.rank}-star acquisition guide →</small></a>)}</div><h2>Campaign landmarks</h2><div className="link-list">{battles.filter(b=>b.games.includes("dw8xl")).map(b=><a href={`/battles/${b.id}`} key={b.id}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>)}</div>
      </>:<><h2>Featured officers</h2><div className="mini-grid">{roster.slice(0,8).map(o=><a href={`/officers/${o.id}`} key={o.id}><span>{o.mark}</span><div><strong>{o.name}</strong><small>{o.faction} · {o.weapon}</small></div></a>)}</div><h2>Recurring battles</h2><div className="link-list">{battles.filter(b=>b.games.includes(g.id)).map(b=><a href={`/battles/${b.id}`} key={b.id}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>)}</div></>}
    </div><aside className="provenance"><p className="eyebrow"><span/>PROVENANCE</p><h3>{isGolden?"DW8XL CE reference edition":"A comparison-first archive"}</h3><p>{isGolden?`The roster is indexed; detailed research currently covers ${researchedCount} officers. Base-game and Xtreme Legends stages are labeled separately where the distinction affects a guide.`:"MusouDB is documenting representative games deeply before expanding across every Warriors release."}</p><dl><div><dt>Record type</dt><dd>Game and edition</dd></div><div><dt>Roster</dt><dd>{roster.length} linked records</dd></div><div><dt>Imagery</dt><dd>Publisher art not used</dd></div></dl>{g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Official game source ↗</a>}<a href="/contribute">Suggest a correction ↗</a></aside></section><Footer/></main>
}
