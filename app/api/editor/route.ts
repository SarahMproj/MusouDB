import {and,desc,eq} from "drizzle-orm";
import {getDb} from "../../../db";
import {archiveRecords,citations,contributions,officerClaims,profiles,revisions,structuredContributions} from "../../../db/schema";
import {officerById} from "../../data";
import {getChatGPTUser,isFoundingAdmin} from "../../chatgpt-auth";

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
  const b=await request.json() as {id?:number;status?:string;editorNote?:string;kind?:string;approvedFields?:string[]};if(!b.id||!["pending","needs-changes","approved","declined"].includes(b.status||""))return Response.json({error:"Valid id and status required"},{status:400});
  const db=await getDb();const now=new Date().toISOString();
  if(b.kind==="structured"){
    const [item]=await db.select().from(structuredContributions).where(eq(structuredContributions.id,b.id)).limit(1);if(!item)return Response.json({error:"Submission not found"},{status:404});const fields=b.approvedFields||[];
    await db.update(structuredContributions).set({status:b.status!,approvedFields:JSON.stringify(fields),editorNote:(b.editorNote||"").slice(0,500),updatedAt:now}).where(eq(structuredContributions.id,b.id));
    if(b.status==="approved"){
      const seed=officerById(item.officerId);const [existing]=await db.select().from(archiveRecords).where(and(eq(archiveRecords.recordType,"officer"),eq(archiveRecords.recordId,item.officerId))).limit(1);const values={title:seed?.name||item.officerId,summary:(fields.includes("biography")?item.biography:seed?.summary||item.biography).slice(0,500),body:fields.includes("biography")?item.biography:"",faction:seed?.faction||"",spoilerClass:item.spoilerNotes?"major":"safe",status:"reviewed",updatedAt:now};
      if(existing)await db.update(archiveRecords).set(values).where(eq(archiveRecords.id,existing.id));else await db.insert(archiveRecords).values({...values,recordType:"officer",recordId:item.officerId,createdBy:item.authorEmail,createdAt:now});
      const [latest]=await db.select().from(revisions).where(and(eq(revisions.recordType,"officer"),eq(revisions.recordId,item.officerId))).orderBy(desc(revisions.version)).limit(1);await db.insert(revisions).values({recordType:"officer",recordId:item.officerId,version:(latest?.version||0)+1,summary:`Published founding contribution: ${fields.join(", ")}`,contributor:item.authorEmail,createdAt:now});await db.insert(citations).values({recordType:"officer",recordId:item.officerId,label:item.sourceNote||"Contributor research source",url:item.sourceUrl,sourceKind:"community",verifiedAt:now});await db.update(officerClaims).set({status:"completed",updatedAt:now}).where(eq(officerClaims.officerId,item.officerId));
    }return Response.json({ok:true});
  }
  await db.update(contributions).set({status:b.status!,editorNote:(b.editorNote||"").slice(0,500),updatedAt:now}).where(eq(contributions.id,b.id));return Response.json({ok:true});
}
