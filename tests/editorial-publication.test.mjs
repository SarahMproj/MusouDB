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

test('editor decisions publish only selected fields and withdrawals restore the seed', async () => {
  const root = path.resolve('dist/server');
  const files = await modules(root);
  files.sort((a,b) => Number(b.path === path.join(root,'index.js')) - Number(a.path === path.join(root,'index.js')));
  const mf = new Miniflare({ modules: files, modulesRoot: root, compatibilityDate: '2026-05-22', compatibilityFlags: ['nodejs_compat'], d1Databases: ['DB'], serviceBindings: { ASSETS: () => new Response('Not found', {status:404}) } });
  try {
    const db = await mf.getD1Database('DB');
    for (const file of (await readdir('drizzle')).filter(f=>f.endsWith('.sql')).sort()) {
      const sql = await readFile(`drizzle/${file}`, 'utf8');
      await db.batch(sql.split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean).map(s=>db.prepare(s)));
    }
    await db.prepare("INSERT INTO profiles(email,handle,display_name,role,created_at,updated_at) VALUES (?,?,?,?,?,?)").bind('editor@example.test','editor','Test Editor','editor','2026-09-08','2026-09-08').run();
    await db.prepare("INSERT INTO officer_claims(officer_id,claimant_email,status,claimed_at,updated_at) VALUES (?,?,?,?,?)").bind('fa-zheng','researcher@example.test','submitted','2026-09-08','2026-09-08').run();
    await db.prepare(`INSERT INTO structured_contributions(officer_id,author_email,biography,gameplay,weapon,battles_json,relationships_json,unlock_condition,spoiler_notes,source_url,source_note,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind('fa-zheng','researcher@example.test','Approved biography marker','Approved gameplay marker','Approved weapon marker','["chibi"]','["Liu Bei · Test relationship marker"]','Unlock marker','Secret route marker','https://example.test/source','Source marker','2026-09-08','2026-09-08').run();
    const item = await db.prepare('SELECT id FROM structured_contributions').first();
    async function review(fields, status='approved', extra={}) {
      return mf.dispatchFetch('http://musou.test/api/editor',{method:'PATCH',headers:{'content-type':'application/json','oai-authenticated-user-email':'editor@example.test'},body:JSON.stringify({id:item.id,kind:'structured',status,approvedFields:fields,...extra})});
    }
    async function page() { const r=await mf.dispatchFetch('http://musou.test/officers/fa-zheng'); assert.equal(r.status,200); return r.text(); }
    const anonymous = await mf.dispatchFetch('http://musou.test/api/editor',{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({id:item.id,status:'approved'})});
    assert.equal(anonymous.status,403);
    assert.equal((await review([])).status,400);
    assert.equal((await review(['invented'])).status,400);
    assert.equal((await review(['battles'])).status,200);
    let response=await review(['biography','gameplay','weapon','relationships','unlockCondition','spoilerNotes','battles']);
    assert.equal(response.status,200,await response.text());
    let html=await page();
    for(const marker of ['Approved biography marker','Approved gameplay marker','Approved weapon marker','Test relationship marker','Unlock marker','Secret route marker','Source marker']) assert.ok(html.includes(marker),marker);
    assert.match(html,/<details[^>]*class="spoiler-panel"[^>]*><summary>Reveal story and hypothetical-route notes<\/summary><p>Secret route marker<\/p><\/details>/);
    // Directory cards, search payload and filter options use approved values,
    // without serializing private submission fields or hidden route notes.
    for (const route of ['/', '/officers', '/games/dw8xl', '/coverage']) {
      const response=await mf.dispatchFetch(`http://musou.test${route}`);
      assert.equal(response.status,200);
      const directory=await response.text();
      assert.ok(directory.includes('Approved weapon marker') || route==='/coverage',route);
      if (route==='/' || route==='/officers') {
        assert.ok(directory.includes('Approved biography marker'),route);
        assert.ok(directory.includes('Approved gameplay marker'),route);
        assert.ok(!directory.includes('researcher@example.test'),route);
        assert.ok(!directory.includes('Secret route marker'),route);
        assert.ok(!directory.includes('Unlock marker'),route);
      }
    }
    const before=await db.prepare('SELECT COUNT(*) AS count FROM revisions').first();
    assert.equal((await review(['biography','gameplay','weapon','relationships','unlockCondition','spoilerNotes','battles'])).status,200);
    assert.deepEqual(await db.prepare('SELECT COUNT(*) AS count FROM revisions').first(),before);
    assert.equal((await review(['weapon'], 'approved', {expectedUpdatedAt:'stale'})).status,409);
    assert.equal((await review(['weapon'])).status,200);
    html=await page();
    assert.ok(html.includes('Approved weapon marker'));
    for(const marker of ['Approved biography marker','Approved gameplay marker','Test relationship marker','Unlock marker','Secret route marker']) assert.ok(!html.includes(marker),`unapproved: ${marker}`);
    // Simulate the biography copy left by the old publisher. It must not leak
    // after a later decision withdraws that submission.
    await db.prepare(`INSERT INTO archive_records(record_type,record_id,title,summary,body,status,created_by,created_at,updated_at) VALUES ('officer','fa-zheng','Fa Zheng','Legacy secret summary','Legacy secret biography','reviewed','researcher@example.test','2026-09-08','2026-09-08')`).run();
    await db.prepare(`INSERT INTO revisions(record_type,record_id,version,summary,contributor,created_at) VALUES ('officer','fa-zheng',99,'Published founding contribution: biography','researcher@example.test','2026-09-08')`).run();
    // Force the last statement to fail: history and claim writes must roll back.
    await db.prepare(`CREATE TRIGGER fail_decision BEFORE UPDATE ON structured_contributions BEGIN SELECT RAISE(ABORT,'test failure'); END`).run();
    const historyBeforeFailure=await db.prepare('SELECT COUNT(*) AS count FROM revisions').first();
    assert.equal((await review([], 'needs-changes')).status,503);
    assert.equal((await db.prepare('SELECT status FROM structured_contributions').first()).status,'approved');
    assert.equal((await db.prepare('SELECT status FROM officer_claims').first()).status,'completed');
    assert.deepEqual(await db.prepare('SELECT COUNT(*) AS count FROM revisions').first(),historyBeforeFailure);
    await db.prepare('DROP TRIGGER fail_decision').run();
    assert.equal((await review([], 'needs-changes')).status,200);
    html=await page();assert.ok(!html.includes('Approved weapon marker'));assert.ok(!html.includes('Source marker'));assert.ok(!html.includes('Legacy secret'));
    for (const route of ['/', '/officers', '/games/dw8xl', '/coverage']) {
      const directory=await (await mf.dispatchFetch(`http://musou.test${route}`)).text();
      for (const marker of ['Approved weapon marker','Approved biography marker','Approved gameplay marker','Legacy secret']) assert.ok(!directory.includes(marker),`${route}: ${marker}`);
    }
    await db.prepare("UPDATE structured_contributions SET source_url='javascript:alert(1)'").run();
    assert.equal((await review(['weapon'])).status,400);
    assert.equal((await db.prepare('SELECT status FROM officer_claims').first()).status,'active');
  } finally { await mf.dispose(); }
});
