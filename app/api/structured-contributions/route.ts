import {and,desc,eq} from "drizzle-orm";
import {getDb} from "../../../db";
import {officerClaims,structuredContributions} from "../../../db/schema";
import {getChatGPTUser} from "../../chatgpt-auth";

import {isSourceUrl} from "../../lib/research-publication";

export async function GET(){const user=await getChatGPTUser();if(!user)return Response.json({error:"Sign in required"},{status:401});const db=await getDb();return Response.json({submissions:await db.select().from(structuredContributions).where(eq(structuredContributions.authorEmail,user.email)).orderBy(desc(structuredContributions.createdAt))})}
export async function POST(request:Request){
  const user=await getChatGPTUser();if(!user)return Response.json({error:"Sign in required"},{status:401});const b=await request.json() as Record<string,string|string[]>;const officerId=String(b.officerId||"");const sourceUrl=String(b.sourceUrl||"");if(!isSourceUrl(sourceUrl))return Response.json({error:"An HTTP or HTTPS source URL is required"},{status:400});
  const db=await getDb();const [claim]=await db.select().from(officerClaims).where(and(eq(officerClaims.officerId,officerId),eq(officerClaims.claimantEmail,user.email),eq(officerClaims.status,"active"))).limit(1);if(!claim)return Response.json({error:"Claim this officer before submitting research"},{status:403});
  const biography=String(b.biography||"").trim(),gameplay=String(b.gameplay||"").trim();if(biography.length<80||gameplay.length<50)return Response.json({error:"Biography and gameplay notes need enough detail for editorial review"},{status:400});
  const now=new Date().toISOString();const [row]=await db.insert(structuredContributions).values({officerId,authorEmail:user.email,biography:biography.slice(0,4000),gameplay:gameplay.slice(0,3000),weapon:String(b.weapon||"").slice(0,200),battles:JSON.stringify(b.battles||[]),relationships:JSON.stringify(b.relationships||[]),unlockCondition:String(b.unlockCondition||"").slice(0,1000),spoilerNotes:String(b.spoilerNotes||"").slice(0,3000),sourceUrl,sourceNote:String(b.sourceNote||"").slice(0,1000),createdAt:now,updatedAt:now}).returning();await db.update(officerClaims).set({status:"submitted",updatedAt:now}).where(eq(officerClaims.id,claim.id));return Response.json({submission:row},{status:201});
}
