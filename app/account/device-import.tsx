"use client";
import { useState } from "react";
import { games, officers } from "../data";
import { readOfficers, readGameProgress, type GameStatus } from "../local-record";

type SavedRecord = { favorites: string[]; progress: Record<string, string> };
export default function DeviceImport({ ready, record, onImported }: { ready: boolean; record: SavedRecord; onImported: (record: SavedRecord) => void }) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<{ favorites: string[]; progress: Record<string, GameStatus> }>({ favorites: [], progress: {} });
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  function review() {
    try {
      const favorites = readOfficers(localStorage).filter(id => officers.some(o => o.id === id));
      const progress = Object.fromEntries(Object.entries(readGameProgress(localStorage)).filter(([id]) => games.some(g => g.id === id)));
      setLocal({ favorites, progress });setSelected([]);setConfirmed(false);setNotice("");setOpen(true);
    } catch { setNotice("Device saves are unavailable. Check your browser storage settings."); }
  }
  function toggle(key: string) { setConfirmed(false);setSelected(values => values.includes(key) ? values.filter(v => v !== key) : [...values, key]); }
  async function importSelected() {
    if (busy || !confirmed || !selected.length) return;
    setBusy(true);setNotice("");
    try {
      const response = await fetch("/api/record/import", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirmPublic: true, favorites: local.favorites.filter(id => selected.includes(`officer:${id}`)), progress: Object.fromEntries(Object.entries(local.progress).filter(([id]) => selected.includes(`game:${id}`))) }) });
      const data = await response.json();
      if (!response.ok) { setNotice(data.error || "Could not import. Please retry.");return; }
      onImported(data);setOpen(false);setConfirmed(false);setSelected([]);setNotice("Import complete. Selected items are now on your public record. Existing account progress and device saves were kept.");
    } catch { setNotice("Could not finish the import. Your selections are still here; please retry."); }
    finally { setBusy(false); }
  }
  return <section className="device-import" aria-labelledby="device-import-title">
    <h2 id="device-import-title">Bring your device saves</h2>
    <p>Choose favorites and game progress to add to your public Warrior Record. Existing account progress takes priority. Your device saves will stay on this device.</p>
    {!ready && <p>Save your public profile first, then review your device saves.</p>}
    {!open && <button className="save-action" disabled={!ready} onClick={review}>Review device saves</button>}
    {open && <>
      <fieldset disabled={busy}><legend>Select items to publish</legend>
        {!local.favorites.length && !Object.keys(local.progress).length && <p>No recognized saves on this device yet. <a href="/record">Open your device record →</a></p>}
        {local.favorites.map(id => <label className="check-row" key={id}><input type="checkbox" disabled={record.favorites.includes(id)} checked={selected.includes(`officer:${id}`)} onChange={() => toggle(`officer:${id}`)} /><span>{officers.find(o => o.id === id)?.name}{record.favorites.includes(id) && " — already saved"}</span></label>)}
        {Object.entries(local.progress).map(([id,status]) => <label className="check-row" key={id}><input type="checkbox" disabled={!!record.progress[id]} checked={selected.includes(`game:${id}`)} onChange={() => toggle(`game:${id}`)} /><span>{games.find(g => g.id === id)?.title} · {status}{record.progress[id] && ` — keeping account progress: ${record.progress[id]}`}</span></label>)}
        <label className="check-row"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />I understand these selected favorites and progress will be visible on my public profile.</label>
      </fieldset>
      <button className="save-action" disabled={busy || !confirmed || !selected.length} onClick={importSelected}>{busy ? "Importing…" : `Import ${selected.length} selected items`}</button>{" "}
      <button className="text-action" disabled={busy} onClick={() => { setOpen(false);setSelected([]);setConfirmed(false);setNotice(""); }}>Cancel</button>
    </>}
    {notice && <p role="status">{notice}</p>}
  </section>;
}
