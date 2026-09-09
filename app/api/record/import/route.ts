import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { profiles, favoriteOfficers, gameProgress } from "../../../../db/schema";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { officers, games } from "../../../data";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in before importing." }, { status: 401 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid import data." }, { status: 400 }); }
  if (!body || body.confirmPublic !== true) return Response.json({ error: "Confirm that these items will be public before importing." }, { status: 400 });
  const ids: unknown = body.favorites;
  const progress: unknown = body.progress;
  if (!Array.isArray(ids) || ids.length > officers.length || ids.some(id => typeof id !== "string" || !officers.some(o => o.id === id)) || !progress || typeof progress !== "object" || Array.isArray(progress)) {
    return Response.json({ error: "Choose valid officers and game progress." }, { status: 400 });
  }
  const entries = Object.entries(progress);
  if (entries.length > games.length || entries.some(([id, status]) => !games.some(g => g.id === id) || !["owned", "playing", "completed"].includes(status))) {
    return Response.json({ error: "Choose valid games and progress statuses." }, { status: 400 });
  }
  const uniqueIds = [...new Set(ids as string[])];
  if (!uniqueIds.length && !entries.length) return Response.json({ error: "Select at least one item to import." }, { status: 400 });
  try {
    const db = await getDb();
    const [profile] = await db.select().from(profiles).where(eq(profiles.email, user.email)).limit(1);
    if (!profile) return Response.json({ error: "Save your public profile before importing." }, { status: 409 });
    const client = db.$client;
    const now = new Date().toISOString();
    // Add-only and atomic: retries never toggle favorites or overwrite progress.
    const statements = [
      ...uniqueIds.map(id => client.prepare("INSERT INTO favorite_officers (profile_id, officer_id, created_at) VALUES (?, ?, ?) ON CONFLICT(profile_id, officer_id) DO NOTHING").bind(profile.id, id, now)),
      ...entries.map(([id, status]) => client.prepare("INSERT INTO game_progress (profile_id, game_id, status, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(profile_id, game_id) DO NOTHING").bind(profile.id, id, status, now)),
    ];
    await client.batch(statements);
    const [favorites, progressRows] = await Promise.all([
      db.select().from(favoriteOfficers).where(eq(favoriteOfficers.profileId, profile.id)),
      db.select().from(gameProgress).where(eq(gameProgress.profileId, profile.id)),
    ]);
    return Response.json({ favorites: favorites.map(row => row.officerId), progress: Object.fromEntries(progressRows.map(row => [row.gameId, row.status])) });
  } catch {
    return Response.json({ error: "Could not finish the import. Your device saves are safe; retrying will not create duplicates." }, { status: 503 });
  }
}
