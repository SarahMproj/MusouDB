import {Footer,Header,SaveButton} from "../../components";
import {gameById,games,officers,battles} from "../../data";

export function generateStaticParams(){return games.map(g=>({id:g.id}))}

const rosterGroups=["WEI","WU","SHU","JIN","OTHER"] as const;

export default async function GamePage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const g=gameById(id);
  if(!g)return <main><Header/><section className="archive-hero"><h1>Game not found</h1></section></main>;
  const roster=officers.filter(o=>g.officers.includes(o.id));const isGolden=g.id==="dw8xl";
  const isJin=(officerId:string,tags:string[])=>officerId==="sima-yi"||tags.includes("Jin");
  const group=(label:typeof rosterGroups[number])=>roster.filter(o=>label==="JIN"?isJin(o.id,o.tags):label==="OTHER"?o.faction==="OTHER"&&!isJin(o.id,o.tags):o.faction===label&&!isJin(o.id,o.tags));
  const modeCopy=["Kingdom campaigns split between historical outcomes and unlockable hypothetical routes, plus Xtreme Legends’ Lu Bu chronicle.","Replay unlocked stages with a wider character selection and pursue objectives outside campaign sequencing.","Build the Tongquetai, recruit allies, gather materials, and expand a persistent base across successive battles.","Five score-driven rule sets test speed, survival, combat efficiency, and mastery of the weapon system."];
  return <main><Header active="games"/>
    <section className={`game-detail-hero ${isGolden?"golden-game":""}`}><p className="eyebrow"><span/>{g.year} · {g.status}</p><h1>{g.title}</h1><p>{g.summary}</p><SaveButton kind="games" id={g.id} label={g.short}/>
      {isGolden&&<div className="edition-stats"><div><strong>82</strong><span>Playable officers</span></div><div><strong>5</strong><span>Story factions</span></div><div><strong>4</strong><span>Core modes</span></div><div><strong>1:1</strong><span>Unique EX weapons</span></div></div>}
    </section>
    <section className="detail-body"><div className="detail-main">
      <dl className="fact-grid"><div><dt>Era</dt><dd>{g.era}</dd></div><div><dt>Defining idea</dt><dd>{g.distinction}</dd></div><div><dt>Platforms</dt><dd>{g.platforms.join(" · ")}</dd></div><div><dt>Edition</dt><dd>{g.edition||g.status}</dd></div></dl>
      {isGolden?<>
        <div className="chronicle-heading"><div><p className="eyebrow"><span/>CANONICAL ROSTER</p><h2>All 82 playable officers</h2></div><p>Stable MusouDB IDs connect every officer to this edition. Draft profiles are clearly marked until their facts receive source review.</p></div>
        <div className="roster-directory">{rosterGroups.map(label=><section key={label} className={`roster-faction ${label.toLowerCase()}`}><header><h3>{label}</h3><span>{group(label).length} officers</span></header><div>{group(label).map(o=><a href={`/officers/${o.id}`} key={o.id}><span>{o.mark}</span><strong>{o.name}</strong><small>{o.sourceStatus}</small></a>)}</div></section>)}</div>
        <h2>Modes and systems</h2><div className="mode-grid">{g.modes?.map((mode,i)=><article key={mode}><span>0{i+1}</span><h3>{mode}</h3><p>{modeCopy[i]}</p></article>)}</div>
        <h2>Campaign landmarks</h2><div className="link-list">{battles.filter(b=>b.games.includes("dw8")).map(b=><a href="/battles" key={b.id}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>)}</div>
      </>:<><h2>Featured officers</h2><div className="mini-grid">{roster.slice(0,8).map(o=><a href={`/officers/${o.id}`} key={o.id}><span>{o.mark}</span><div><strong>{o.name}</strong><small>{o.faction} · {o.weapon}</small></div></a>)}</div><h2>Recurring battles</h2><div className="link-list">{battles.map(b=><a href="/battles" key={b.id}><span>{b.year}</span><strong>{b.name}</strong><small>{b.factions.join(" vs ")} →</small></a>)}</div></>}
    </div><aside className="provenance"><p className="eyebrow"><span/>PROVENANCE</p><h3>{isGolden?"Golden dataset":"A comparison-first archive"}</h3><p>{isGolden?"This edition is MusouDB’s first fully indexed vertical slice. The roster, modes, and edition facts are anchored to publisher materials; community detail remains visibly reviewable.":"MusouDB is documenting representative games deeply before expanding across every Warriors release."}</p><dl><div><dt>Record type</dt><dd>Game and edition</dd></div><div><dt>Roster</dt><dd>{roster.length} linked records</dd></div><div><dt>Imagery</dt><dd>Publisher art not used</dd></div></dl>{g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Official game source ↗</a>}<a href="/contribute">Suggest a correction ↗</a></aside></section><Footer/></main>
}
