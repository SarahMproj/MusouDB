import {campaignRoutes} from "./campaign-routes";
import {SourceLinks} from "./source-links";

export function CampaignGuides(){
 return <section id="campaign-routes" aria-labelledby="campaign-heading">
  <h2 id="campaign-heading">Five paths through DW8XL CE</h2>
  <p>Choose a campaign to reveal its hypothetical branch prerequisites. Side-stage unlocks are included where they lead to a required star. These guides cover the base campaigns and Lu Bu’s XL story.</p>
  <nav className="tags" aria-label="Campaign checklists">{campaignRoutes.map(route=><a key={route.id} href={`#${route.id}-route`}>{route.name}</a>)}</nav>
  {campaignRoutes.map(route=><section id={`${route.id}-route`} key={route.id} className="campaign-guide">
   <h3>{route.name} · {route.scope}</h3>
   <details className="spoiler-panel"><summary>Reveal the {route.name} branch checklist</summary>
    <ol>{route.steps.map(step=><li key={step.battleId}>
     <p className="edition-label">{step.kind==="side-stage"?"Required side-stage access":step.kind==="branch"?"Branch choice":"Prerequisite"}</p>
     <a href={`/battles/${step.battleId}`}>{step.title}</a>
     <p>{step.goal}</p><p>{step.reward}</p>
    </li>)}</ol>
    {route.note&&<p>{route.note}</p>}
    <p>Community sources checked {route.checked}. MusouDB has not replay-tested these conditions. Check the game’s stage-select stars before revisiting the branch point.</p>
    <SourceLinks sources={route.sources}/>
   </details>
  </section>)}
 </section>
}
