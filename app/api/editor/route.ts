import {and,desc,eq} from "drizzle-orm";
import {getDb} from "../../../db";
import {archiveRecords,citations,contributions,officerClaims,profiles,revisions,structuredContributions} from "../../../db/schema";
import {battles,officerById} from "../../data";
import {getChatGPTUser,isFoundingAdmin} from "../../chatgpt-auth";

import {selectedFields,stringList,validatePublication} from "../../lib/research-publication";

async function editor(){
  const user=await getChatGPTUser();if(!user)return null;const db=await getDb();
  const [p]=await db.select().from(profiles).where(eq(profiles.email,user.email)).limit(1);if(!p)return null;
  if(isFoundingAdmin(user.email)&&p.role!=="admin"){await db.update(profiles).set({role:"admin",updatedAt:new Date().toISOString()}).where(eq(profiles.id,p.id));return {...p,role:"admin"}}
  return p.role==="editor"||p.role==="admin"?p:null;
}
const cleanId=(value:string)=>value.toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80);

export async function GET(){
  if(!await editor())return Response.json({error:"Editor access required"},{status:403});const db=await getDb();
  const [queue,records,sourceRows,revisionRows,research]=await Promise.all([
    db.select().from(contributions).orderBy(desc(contributions.createdAt)).limit(100),
    db.select().from(archiveRecords).orderBy(desc(archiveRecords.updatedAt)).limit(100),
    db.select().from(citations).orderBy(desc(citations.id)).limit(100),
    db.select().from(revisions).orderBy(desc(revisions.createdAt)).limit(100),
    db.select().from(structuredContributions).orderBy(desc(structuredContributions.createdAt)).limit(100),
  ]);
  return Response.json({contributions:queue,records,citations:sourceRows,revisions:revisionRows,research});
}

export async function POST(request:Request){
  const admin=await editor();if(!admin)return Response.json({error:"Editor access required"},{status:403});
  const b=await request.json() as Record<string,string>;const db=await getDb();const now=new Date().toISOString();
  try{
    if(b.action==="record"){
      const recordId=cleanId(b.recordId||b.title||"");if(recordId.length<2||!b.title?.trim()||!b.summary?.trim())return Response.json({error:"Title, ID, and summary are required"},{status:400});
      await db.insert(archiveRecords).values({recordType:b.recordType||"officer",recordId,title:b.title.trim().slice(0,120),summary:b.summary.trim().slice(0,500),body:(b.body||"").trim().slice(0,5000),faction:(b.faction||"").slice(0,30),spoilerClass:b.spoilerClass||"safe",status:b.status||"draft",createdBy:admin.email,createdAt:now,updatedAt:now});
      await db.insert(revisions).values({recordType:b.recordType||"officer",recordId,version:1,summary:"Record created",contributor:admin.email,createdAt:now});return Response.json({ok:true});
    }
    if(b.action==="citation"){
      if(!b.recordId||!b.label||!/^https?:\/\//.test(b.url||""))return Response.json({error:"Record, label, and a valid source URL are required"},{status:400});
      await db.insert(citations).values({recordType:b.recordType||"officer",recordId:cleanId(b.recordId),label:b.label.trim().slice(0,160),url:b.url.slice(0,1000),sourceKind:b.sourceKind||"official",verifiedAt:now});return Response.json({ok:true});
    }
    if(b.action==="revision"){
      const recordId=cleanId(b.recordId||"");if(!recordId||!b.summary?.trim())return Response.json({error:"Record and revision summary are required"},{status:400});
      const [latest]=await db.select().from(revisions).where(and(eq(revisions.recordType,b.recordType||"officer"),eq(revisions.recordId,recordId))).orderBy(desc(revisions.version)).limit(1);
      await db.insert(revisions).values({recordType:b.recordType||"officer",recordId,version:(latest?.version||0)+1,summary:b.summary.trim().slice(0,500),contributor:admin.email,createdAt:now});return Response.json({ok:true});
    }
    return Response.json({error:"Unknown editorial action"},{status:400});
  }catch{return Response.json({error:"This record already exists or could not be saved"},{status:409})}
}

export async function PATCH(request:Request){
  const admin=await editor();if(!admin)return Response.json({error:"Editor access required"},{status:403});
  let b: {id?:number;status?:string;editorNote?:string;kind?:string;approvedFields?:unknown;expectedUpdatedAt?:string};
  try { b=await request.json(); } catch { return Response.json({error:"Invalid JSON"},{status:400}); }
  if(!b || !Number.isSafeInteger(b.id) || !b.id || !["pending","needs-changes","approved","declined"].includes(b.status||"") || (b.editorNote!==undefined && typeof b.editorNote!=="string")) return Response.json({error:"Valid id, status, and editorial note required"},{status:400});
  const db=await getDb();const now=new Date().toISOString();
  if(b.kind==="structured"){
    const [item]=await db.select().from(structuredContributions).where(eq(structuredContributions.id,b.id)).limit(1);
    if(!item)return Response.json({error:"Submission not found"},{status:404});
    if(b.expectedUpdatedAt && b.expectedUpdatedAt!==item.updatedAt)return Response.json({error:"Another editor changed this submission. Reload before reviewing."},{status:409});
    const fields=b.status==="approved"?selectedFields(b.approvedFields):[];
    if(!fields)return Response.json({error:"Unknown research field"},{status:400});
    if(b.status==="approved"){
      if(!officerById(item.officerId))return Response.json({error:"Officer not found"},{status:400});
      const error=validatePublication(item,fields,battles.map(b=>b.id));
      if(error)return Response.json({error},{status:400});
    }
    const note=(b.editorNote||"").slice(0,500);
    if(item.status===b.status && JSON.stringify(selectedFields(stringList(item.approvedFields)))===JSON.stringify(fields) && item.editorNote===note)return Response.json({ok:true});
    const changedAt=new Date(Math.max(Date.now(),Date.parse(item.updatedAt)+1)).toISOString();
    const summary=b.status==="approved"?`Published research fields: ${fields.join(", ")}`:`Research decision: ${b.status}`;
    const claimStatus=b.status==="approved"?"completed":b.status==="pending"?"submitted":"active";
    // All writes compare the same prior revision and run atomically in D1.
    // The update is last, so a stale decision inserts neither history nor claim changes.
    const client=db.$client;
    try{
      const result=await client.batch([
        client.prepare(`INSERT INTO revisions (record_type, record_id, version, summary, contributor, created_at)
          SELECT 'officer', ?, COALESCE((SELECT MAX(version) FROM revisions WHERE record_type='officer' AND record_id=?),0)+1, ?, ?, ?
          WHERE EXISTS (SELECT 1 FROM structured_contributions WHERE id=? AND updated_at=?)`)
          .bind(item.officerId,item.officerId,summary,admin.email,changedAt,item.id,item.updatedAt),
        client.prepare(`UPDATE officer_claims SET status=?, updated_at=? WHERE officer_id=? AND claimant_email=?
          AND EXISTS (SELECT 1 FROM structured_contributions WHERE id=? AND updated_at=?)`)
          .bind(claimStatus,changedAt,item.officerId,item.authorEmail,item.id,item.updatedAt),
        client.prepare(`UPDATE structured_contributions SET status=?, approved_fields_json=?, editor_note=?, updated_at=? WHERE id=? AND updated_at=?`)
          .bind(b.status,JSON.stringify(fields),note,changedAt,item.id,item.updatedAt),
      ]);
      if(!result[2].meta.changes)return Response.json({error:"Another editor changed this submission. Reload before reviewing."},{status:409});
      return Response.json({ok:true});
    }catch{ return Response.json({error:"Could not save the decision. Your selections have been preserved; please retry."},{status:503}); }
  }
  await db.update(contributions).set({status:b.status!,editorNote:(b.editorNote||"").slice(0,500),updatedAt:now}).where(eq(contributions.id,b.id));return Response.json({ok:true});
}
