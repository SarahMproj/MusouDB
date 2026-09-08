export type GameStatus = "owned" | "playing" | "completed";
type RecordStorage = Pick<Storage, "getItem" | "setItem">;

function read(storage: RecordStorage, key: string): unknown {
  try { return JSON.parse(storage.getItem(key) || "null"); }
  catch { return null; }
}

function ids(value: unknown): string[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((id): id is string => typeof id === "string"))]
    : [];
}

export function readOfficers(storage: RecordStorage): string[] {
  const current = read(storage, "musoudb-officers");
  return ids(current ?? read(storage, "musoudb-favorites"));
}

export function toggleOfficer(storage: RecordStorage, id: string): string[] {
  const current = readOfficers(storage);
  const next = current.includes(id) ? current.filter(value => value !== id) : [...current, id];
  storage.setItem("musoudb-officers", JSON.stringify(next));
  return next;
}

export function readGameProgress(storage: RecordStorage): Record<string, GameStatus> {
  const raw = read(storage, "musoudb-game-status");
  const progress: Record<string, GameStatus> = {};
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    for (const [id, status] of Object.entries(raw)) {
      if (["owned", "playing", "completed"].includes(status)) progress[id] = status;
    }
  }
  // Older game-detail saves used a separate key that the record never read.
  for (const id of ids(read(storage, "musoudb-games"))) {
    if (!Object.hasOwn(progress, id)) {
      Object.defineProperty(progress, id, { value: "owned", enumerable: true, writable: true, configurable: true });
    }
  }
  return progress;
}

export function setGameProgress(storage: RecordStorage, id: string, status?: GameStatus) {
  const progress = readGameProgress(storage);
  if (status) Object.defineProperty(progress, id, { value: status, enumerable: true, writable: true, configurable: true });
  else delete progress[id];
  storage.setItem("musoudb-game-status", JSON.stringify(progress));
  // Keep old readers aligned, including when a migrated game is untracked.
  storage.setItem("musoudb-games", JSON.stringify(Object.keys(progress)));
  return progress;
}
