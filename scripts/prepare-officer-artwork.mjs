import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

// Supply generation manifests containing {id,name,path,prompt,status}.
// Preserve each painting; this only encodes responsive web delivery sizes.
const manifests=process.argv.slice(2);
if(!manifests.length)throw new Error('Supply at least one generation manifest');
const records=(await Promise.all(manifests.map(async file=>JSON.parse(await readFile(file,'utf8'))))).flat();
await mkdir('public/artwork/officers',{recursive:true});
await mkdir('app/artwork',{recursive:true});
const artwork={};const provenance=[];const seen=new Set();
for(const record of records.filter(record=>['completed','complete','generated'].includes(record.status)).sort((a,b)=>a.id.localeCompare(b.id))){
  if(!/^[a-z]+(?:-[a-z]+)*$/.test(record.id)||seen.has(record.id))throw new Error(`Invalid or repeated officer ID: ${record.id}`);
  seen.add(record.id);
  const original=await readFile(record.path);
  const sourceHash=createHash('sha256').update(original).digest('hex');
  const src=`/artwork/officers/${record.id}.webp`;
  const thumbnail=`/artwork/officers/${record.id}-card.webp`;
  const main=await sharp(original).resize({width:960,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(`public${src}`);
  await sharp(original).resize({width:480,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile(`public${thumbnail}`);
  artwork[record.id]={src,thumbnail,width:main.width,height:main.height,alt:`Original painted interpretation of ${record.name}`};
  provenance.push({id:record.id,name:record.name,kingdom:record.kingdom,weapon:record.weapon,sourceSha256:sourceHash,generator:'OpenAI image generation',created:'2026-09-23',styleReference:'sun-shangxiang',prompt:record.prompt});
}
await writeFile('app/artwork/officers.json',JSON.stringify(artwork,null,2)+'\n');
await writeFile('docs/OFFICER_ARTWORK.json',JSON.stringify(provenance,null,2)+'\n');
console.log(`Prepared ${provenance.length} original officer portraits and responsive card images.`);
