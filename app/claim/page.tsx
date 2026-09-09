import {Footer,Header} from "../components";
import {getDb} from "../../db";
import {officerClaims} from "../../db/schema";
import {dw8xlOfficerIds,flagshipOfficerIds,officerById} from "../data";
import ClaimGrid from "./claim-grid";
export const dynamic="force-dynamic";
export default async function ClaimPage(){let claimed:string[]=[];try{const db=await getDb();claimed=(await db.select().from(officerClaims)).map(x=>x.officerId)}catch{}const available=dw8xlOfficerIds.filter(id=>!flagshipOfficerIds.includes(id)).map(id=>officerById(id)!).filter(Boolean);return <main><Header active="community"/><section className="archive-hero claim-hero"><p className="eyebrow"><span/>FOUNDING CONTRIBUTOR COHORT</p><h1>Choose a warrior. Complete the chronicle.</h1><p>Claim one of 72 open DW8XL profiles, research it with reliable sources, and earn permanent founding credit when your work is published.</p><div className="cohort-progress"><strong>10</strong><span>complete</span><i/><strong>{claimed.length}</strong><span>claimed or submitted</span><i/><strong>{72-claimed.length}</strong><span>open</span></div></section><section className="archive-body"><ClaimGrid officers={available} claimed={claimed}/></section><Footer/></main>}
