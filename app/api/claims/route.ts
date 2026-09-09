import {and,desc,eq} from "drizzle-orm";
import {getDb} from "../../../db";
import {officerClaims,profiles,structuredContributions} from "../../../db/schema";
import {getChatGPTUser} from "../../chatgpt-auth";
import {dw8xlOfficerIds,flagshipOfficerIds,officerById} from "../../data";

export async function GET(){
  const db=await getDb();const claims=await db.select().from(officerClaims).orderBy(desc(officerClaims.claimedAt));
  return Response.json({claims:claims.map(c=>({officerId:c.officerId,claimedAt:c.claimedAt})),open:dw8xlOfficerIds.filter(id=>!flagshipOfficerIds.includes(id)&&!claims.some(c=>c.officerId===id)).map(id=>officerById(id))});
}
export async function POST(request:Request){
  const user=await getChatGPTUser();if(!user)return Response.json({error:"Sign in required"},{status:401});const b=await request.json() as {officerId?:string;action?:string};if(!b.officerId||!dw8xlOfficerIds.includes(b.officerId)||flagshipOfficerIds.includes(b.officerId))return Response.json({error:"Choose an open DW8XL officer"},{status:400});
  const db=await getDb();const [profile]=await db.select().from(profiles).where(eq(profiles.email,user.email)).limit(1);if(!profile)return Response.json({error:"Create your Warrior Record before claiming a profile"},{status:409});
  const [existing]=await db.select().from(officerClaims).where(eq(officerClaims.officerId,b.officerId)).limit(1);const now=new Date().toISOString();
  if(existing){if(existing.claimantEmail!==user.email)return Response.json({error:"This officer is already claimed"},{status:409});return Response.json({claim:existing})}
  const [claim]=await db.insert(officerClaims).values({officerId:b.officerId,claimantEmail:user.email,claimedAt:now,updatedAt:now}).returning();return Response.json({claim},{status:201});
}

export async function DELETE(request:Request){
  const user=await getChatGPTUser();if(!user)return Response.json({error:"Sign in required"},{status:401});const b=await request.json() as {officerId?:string};const db=await getDb();const submitted=await db.select().from(structuredContributions).where(and(eq(structuredContributions.officerId,b.officerId||""),eq(structuredContributions.authorEmail,user.email))).limit(1);if(submitted.length)return Response.json({error:"Submitted claims remain attached to editorial review"},{status:409});await db.delete(officerClaims).where(and(eq(officerClaims.officerId,b.officerId||""),eq(officerClaims.claimantEmail,user.email)));return Response.json({ok:true});
}
