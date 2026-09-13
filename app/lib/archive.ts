import {getDb} from "../../db";
import type {archiveRecords} from "../../db/schema";
import {officers,officerProfiles,type Officer} from "../data";
import {publishResearch,type ResearchRow} from "./research-publication";

type ManualRecord=Pick<typeof archiveRecords.$inferSelect,"recordId"|"summary"|"status"|"spoilerClass">;
export type ArchiveOfficer=Omit<Officer,"spoiler"> & {kingdom:string;publishedFields:number;searchText:string;sourceCount:number};
export function kingdomFor(o:Officer){return (officerProfiles[o.id]?.kingdom||(o.tags.includes("Jin")?"JIN":o.faction)).toUpperCase()}
export function publicOfficer(seed:Officer,manual:ManualRecord|undefined,legacyCopy:boolean,weapon?:string,biography?:string){
  const summary=biography?.trim();
  return {...seed,summary:summary?(summary.length>220?summary.slice(0,217)+"…":summary):manual?.status==="reviewed"&&manual.spoilerClass==="safe"&&!legacyCopy?manual.summary:seed.summary,weapon:weapon??seed.weapon};
}
export async function loadArchive(){
  let unavailable=false;
  let research:(ResearchRow & {officerId:string})[]=[];
  let records:ManualRecord[]=[];
  let history:{recordId:string;summary:string}[]=[];
  try{
    const db=await getDb();
    const [submissions,overrides,legacy]=await db.$client.batch([
      db.$client.prepare(`SELECT id, officer_id AS officerId, status, approved_fields_json AS approvedFields,
        updated_at AS updatedAt, biography, gameplay, weapon, battles_json AS battles,
        relationships_json AS relationships, unlock_condition AS unlockCondition,
        spoiler_notes AS spoilerNotes, source_url AS sourceUrl, source_note AS sourceNote
        FROM structured_contributions WHERE status = ?`).bind("approved"),
      db.$client.prepare(`SELECT record_id AS recordId, summary, status, spoiler_class AS spoilerClass
        FROM archive_records WHERE record_type = ?`).bind("officer"),
      db.$client.prepare(`SELECT record_id AS recordId, summary FROM revisions
        WHERE record_type = ? AND summary LIKE ?`).bind("officer","Published founding contribution:%"),
    ]);
    research=submissions.results as (ResearchRow & {officerId:string})[];
    records=overrides.results as ManualRecord[];history=legacy.results as {recordId:string;summary:string}[];
  }catch{unavailable=true;console.error("Could not load archive editorial content")}
  const rows:ArchiveOfficer[]=officers.map(seed=>{
    const publication=publishResearch(research.filter(r=>r.officerId===seed.id));
    const legacy=history.some(r=>r.recordId===seed.id&&r.summary.startsWith("Published founding contribution:"));
    const o=publicOfficer(seed,records.find(r=>r.recordId===seed.id),legacy,publication.fields.weapon,publication.fields.biography);
    const {spoiler:_spoiler,...safeOfficer}=o;
    return {...safeOfficer,kingdom:kingdomFor(o),publishedFields:publication.approvedCount,
      searchText:[o.name,o.alias,o.weapon,o.summary,...o.tags,publication.fields.gameplay??""].join(" "),
      sourceCount:new Set([...(officerProfiles[o.id]?.citations??[]),...publication.sources].map(s=>s.url)).size};
  });
  return {officers:rows,unavailable};
}
