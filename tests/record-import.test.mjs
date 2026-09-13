import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { Miniflare } from 'miniflare';

async function modules(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? modules(file) : entry.name.endsWith('.js') ? [{ type: 'ESModule', path: file, contents: await readFile(file, 'utf8') }] : [];
  }))).flat();
}

test('device import requires consent, preserves account progress, and is atomic and user-scoped', async () => {
  const root=path.resolve('dist/server');const files=await modules(root);
  files.sort((a,b)=>Number(b.path===path.join(root,'index.js'))-Number(a.path===path.join(root,'index.js')));
  const mf=new Miniflare({modules:files,modulesRoot:root,compatibilityDate:'2026-05-22',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],serviceBindings:{ASSETS:()=>new Response('Not found',{status:404})}});
  try {
    const db=await mf.getD1Database('DB');
    for(const file of (await readdir('drizzle')).filter(f=>f.endsWith('.sql')).sort()){
      await db.batch((await readFile(`drizzle/${file}`,'utf8')).split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean).map(s=>db.prepare(s)));
    }
    for(const [email,handle] of [['a@example.test','player-a'],['b@example.test','player-b']])await db.prepare("INSERT INTO profiles(email,handle,display_name,created_at,updated_at) VALUES (?,?,?,?,?)").bind(email,handle,handle,'2026-09-09','2026-09-09').run();
    const a=await db.prepare("SELECT id FROM profiles WHERE handle='player-a'").first();
    await db.prepare("INSERT INTO game_progress(profile_id,game_id,status,updated_at) VALUES (?,'dw8','completed','2026-09-09')").bind(a.id).run();
    const payload={confirmPublic:true,favorites:['cao-cao'],progress:{dw8:'owned',dw3:'playing'}};
    const send=(body,email='a@example.test')=>mf.dispatchFetch('http://musou.test/api/record/import',{method:'POST',headers:{'content-type':'application/json',...(email?{'oai-authenticated-user-email':email}:{})},body:JSON.stringify(body)});
    assert.equal((await send(payload,null)).status,401);
    assert.equal((await send(payload,'new@example.test')).status,409);
    assert.equal((await send({...payload,confirmPublic:false})).status,400);
    assert.equal((await send({...payload,favorites:['not-an-officer']})).status,400);
    assert.equal((await send({...payload,progress:{dw8:'invented'}})).status,400);
    assert.equal((await db.prepare('SELECT COUNT(*) AS count FROM favorite_officers').first()).count,0);
    let r=await send(payload);assert.equal(r.status,200);let saved=await r.json();
    assert.deepEqual(saved.favorites,['cao-cao']);assert.equal(saved.progress.dw8,'completed');assert.equal(saved.progress.dw3,'playing');
    r=await send(payload);assert.equal(r.status,200);assert.deepEqual(await r.json(),saved);
    assert.equal((await db.prepare('SELECT COUNT(*) AS count FROM favorite_officers').first()).count,1);
    r=await send({confirmPublic:true,favorites:['liu-bei'],progress:{},profileId:a.id},'b@example.test');assert.equal(r.status,200);assert.deepEqual((await r.json()).favorites,['liu-bei']);
    assert.deepEqual((await (await send(payload)).json()).favorites,['cao-cao']);
    await db.prepare("CREATE TRIGGER block_import BEFORE INSERT ON game_progress WHEN NEW.game_id='dw9' BEGIN SELECT RAISE(ABORT,'test failure'); END").run();
    r=await send({confirmPublic:true,favorites:['zhuge-liang'],progress:{dw9:'owned'}});assert.equal(r.status,503);
    assert.equal((await db.prepare("SELECT COUNT(*) AS count FROM favorite_officers WHERE officer_id='zhuge-liang'").first()).count,0);
    const publicPage=await mf.dispatchFetch('http://musou.test/warriors/player-a');assert.equal(publicPage.status,200);const html=await publicPage.text();assert.ok(html.includes('Cao Cao'));assert.ok(html.includes('completed'));assert.ok(html.includes('playing'));
  }finally{await mf.dispose()}
});
