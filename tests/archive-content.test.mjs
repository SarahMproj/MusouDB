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
  const addedProfiles={
   'guan-yu':['crescent-blade','Crescent Blade'],
   'zhang-fei':['double-pike','Double Pike'],
   'xiahou-dun':['podao','Podao'],
   'zhang-liao':['twin-axes','Twin Axes'],
   'zhou-yu':['staff','Staff'],
   'lu-xun':['swallow-swords','Swallow Swords'],
   'sima-shi':['lightning-sword','Lightning Sword'],
   'sima-zhao':['striking-sword','Striking Sword'],
   'chen-gong':['art-of-war-scroll','Art of War Scroll'],
   'fa-zheng':['woven-cloth','Woven Cloth'],
  };
  for(const [id,[weaponId,weaponName]] of Object.entries(addedProfiles)){
   const route=`/officers/${id}`;const html=await get(route);profileLinks.add(route);
   assert.ok(html.includes('2026-09-23'),route);
   assert.ok(html.includes('Key relationships'),route);
   assert.ok(html.includes(`href="/weapons/${weaponId}"`),route);
   assert.ok(html.includes('Ultimate difficulty'),route);
   assert.doesNotMatch(html,/<details[^>]*open/,route);
   for(const link of links(html))await get(link);
   const weapon=await get(`/weapons/${weaponId}`);
   assert.ok(weapon.includes(weaponName),weaponId);
   assert.ok(weapon.includes('EX attacks'),weaponId);
   assert.ok(weapon.includes(`href="/officers/${id}"`),weaponId);
   assert.ok(!weapon.includes('id="rare-weapon"'),weaponId);
   assert.ok(weapon.includes('not yet been added'),weaponId);
  }
  assert.equal(weaponLinks.length,21);
  const zhangFei=await get('/officers/zhang-fei');assert.ok(!zhangFei.includes('Double Voulge'));
  const chenGong=await get('/officers/chen-gong');assert.ok(chenGong.includes('window/chinkyu.html'));
  const simaShi=await get('/officers/sima-shi');assert.ok(simaShi.replace(/<!--[\s\S]*?-->/g,'').includes('JIN OFFICER'));
  for(const route of profileLinks){const html=await get(route);assert.ok(html.includes('Historical context'),route);assert.ok(html.includes('Game portrayal'),route);assert.ok(html.includes('Gameplay scope:'),route);assert.ok(!html.includes('100% complete'),route)}
  for(const route of stageLinks)await get(route);
  const sima=await get('/officers/sima-yi');assert.ok(sima.replace(/<!--[\s\S]*?-->/g,'').includes('JIN OFFICER'));
  const wang=await get('/officers/wang-yuanji');assert.ok(!wang.includes('href="/battles/wuzhang-plains"'));
  const game=await get('/games/dw8xl');assert.equal(new Set([...game.matchAll(/href="\/officers\/([^"?#]+)"/g)].map(m=>m[1])).size,82);
  assert.ok(game.replace(/<!--[\s\S]*?-->/g,'').includes('20 research profiles'));
  const coverage=await get('/coverage');assert.ok(coverage.includes('Visible research gaps'));assert.ok(!coverage.includes('Flagship complete'));
  assert.match(coverage,/<strong>20<\/strong><span>Research profiles<\/span>/);
  assert.match(coverage,/<strong>62<\/strong><span>Seed profiles to expand<\/span>/);
  assert.match(coverage,/<strong>10<\/strong><span>Rare weapon guides<\/span>/);
  const original=await get('/officers/cao-cao');assert.ok(!original.includes('2026-09-23'));
  assert.equal((await mf.dispatchFetch('http://musou.test/weapons/not-a-weapon')).status,404);
  assert.equal((await mf.dispatchFetch('http://musou.test/battles/not-a-battle')).status,404);
 }finally{await mf.dispose()}
});
