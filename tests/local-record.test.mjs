import assert from 'node:assert/strict';
import test from 'node:test';
import { readGameProgress, setGameProgress, readOfficers, toggleOfficer } from '../app/local-record.ts';

function storage(seed = {}) {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('legacy game-detail saves appear in the record without downgrading progress', () => {
  const store = storage({ 'musoudb-games': ['dw3', 'dw8', 'dw9'], 'musoudb-game-status': { dw8: 'playing', dw9: 'completed' } });
  assert.deepEqual(readGameProgress(store), { dw3: 'owned', dw8: 'playing', dw9: 'completed' });
  setGameProgress(store, 'dw3', 'completed');
  assert.equal(readGameProgress(store).dw3, 'completed');
});

test('untracking a migrated game survives rereading and preserves other games', () => {
  const store = storage({ 'musoudb-games': ['dw3', 'dw8'], 'musoudb-game-status': { dw8: 'completed' } });
  setGameProgress(store, 'dw3');
  assert.deepEqual(readGameProgress(store), { dw8: 'completed' });
});

test('detail-page game save is visible to the record reader', () => {
  const store = storage();
  setGameProgress(store, 'dw8xl', 'owned');
  assert.deepEqual(readGameProgress(store), { dw8xl: 'owned' });
});

test('legacy officer favorites survive a toggle without returning after removal', () => {
  const store = storage({ 'musoudb-favorites': ['zhuge-liang', 'cao-cao', 'cao-cao'] });
  assert.deepEqual(toggleOfficer(store, 'zhuge-liang'), ['cao-cao']);
  toggleOfficer(store, 'cao-cao');
  assert.deepEqual(readOfficers(store), []);
});

test('malformed storage is recoverable and failed writes propagate to the UI', () => {
  const store = storage({ 'musoudb-officers': { unexpected: true }, 'musoudb-game-status': { dw3: 'invalid' } });
  assert.deepEqual(readOfficers(store), []);
  assert.deepEqual(readGameProgress(store), {});
  store.setItem('musoudb-game-status', '{');
  assert.deepEqual(readGameProgress(store), {});
  const blocked = { getItem: () => null, setItem: () => { throw new Error('Quota exceeded'); } };
  assert.throws(() => setGameProgress(blocked, 'dw3', 'owned'), /Quota exceeded/);
  assert.throws(() => toggleOfficer(blocked, 'cao-cao'), /Quota exceeded/);
});
