import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {Miniflare} from 'miniflare';
async function modules(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(async entry=>{const file=path.join(dir,entry.name);return entry.isDirectory()?modules(file):entry.name.endsWith('.js')?[{type:'ESModule',path:file,contents:await readFile(file,'utf8')}]:[]}))).flat()}
test('archive guides connect officers, weapons and stages without missing pages',async()=>{
 const root=path.resolve('dist/server');const files=await modules(root);files.sort((a,b)=>Number(b.path===path.join(root,'index.js'))-Number(a.path===path.join(root,'index.js')));
 const mf=new Miniflare({modules:files,modulesRoot:root,compatibilityDate:'2026-05-22',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],serviceBindings:{ASSETS:()=>new Response('Not found',{status:404})}});
 try{
  const db=await mf.getD1Database('DB');for(const file of (await readdir('drizzle')).filter(f=>f.endsWith('.sql')).sort()){const sql=await readFile(`drizzle/${file}`,'utf8');await db.batch(sql.split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean).map(s=>db.prepare(s)))}
  const get=async route=>{const response=await mf.dispatchFetch(`http://musou.test${route}`);assert.equal(response.status,200,route);return response.text()};
  const weaponIndex=await get('/weapons');const battleIndex=await get('/battles');
  const links=html=>[...new Set([...html.matchAll(/href="(\/(?:weapons|battles|officers)\/[^"#?]+)(?:#[^"]*)?"/g)].map(m=>m[1]))];
  const weaponLinks=links(weaponIndex).filter(x=>x.startsWith('/weapons/'));
  let guideCount=0;const profileLinks=new Set();const stageLinks=new Set(links(battleIndex).filter(x=>x.startsWith('/battles/')));
  for(const route of weaponLinks){const html=await get(route);if(html.includes('id="rare-weapon"')){guideCount++;assert.ok(html.includes('Hard, Chaos or Ultimate'));assert.match(html,/<details[^>]*id="rare-weapon"[^>]*>/);assert.doesNotMatch(html,/<details[^>]*open/);for(const link of links(html)){if(link.startsWith('/officers/'))profileLinks.add(link);if(link.startsWith('/battles/'))stageLinks.add(link)}}}
  assert.equal(guideCount,10);assert.equal(profileLinks.size,10);
  for(const route of profileLinks){const html=await get(route);assert.ok(html.includes('Historical context'),route);assert.ok(html.includes('Game portrayal'),route);assert.ok(html.includes('Gameplay scope:'),route);assert.ok(!html.includes('100% complete'),route)}
  for(const route of stageLinks)await get(route);
  const sima=await get('/officers/sima-yi');assert.ok(sima.replace(/<!--[\s\S]*?-->/g,'').includes('JIN OFFICER'));
  const wang=await get('/officers/wang-yuanji');assert.ok(!wang.includes('href="/battles/wuzhang-plains"'));
  const game=await get('/games/dw8xl');assert.equal(new Set([...game.matchAll(/href="\/officers\/([^"?#]+)"/g)].map(m=>m[1])).size,82);
  const coverage=await get('/coverage');assert.ok(coverage.includes('Visible research gaps'));assert.ok(!coverage.includes('Flagship complete'));
  assert.equal((await mf.dispatchFetch('http://musou.test/weapons/not-a-weapon')).status,404);
  assert.equal((await mf.dispatchFetch('http://musou.test/battles/not-a-battle')).status,404);
 }finally{await mf.dispose()}
});
