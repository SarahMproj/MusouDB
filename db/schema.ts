import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  handle: text("handle").notNull().unique(),
  displayName: text("display_name").notNull(),
  bio: text("bio").notNull().default(""),
  favoriteFaction: text("favorite_faction").notNull().default("UNALIGNED"),
  platforms: text("platforms_json").notNull().default("[]"),
  gamertags: text("gamertags_json").notNull().default("[]"),
  gamertagsPublic: integer("gamertags_public", { mode: "boolean" }).notNull().default(false),
  role: text("role").notNull().default("member"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const favoriteOfficers = sqliteTable("favorite_officers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: integer("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  officerId: text("officer_id").notNull(),
  createdAt: text("created_at").notNull(),
}, table => [uniqueIndex("favorite_officer_unique").on(table.profileId, table.officerId)]);

export const gameProgress = sqliteTable("game_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: integer("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  gameId: text("game_id").notNull(),
  status: text("status").notNull(),
  updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("game_progress_unique").on(table.profileId, table.gameId)]);

export const contributions = sqliteTable("contributions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorEmail: text("author_email").notNull(),
  recordType: text("record_type").notNull(),
  recordId: text("record_id").notNull(),
  summary: text("summary").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceNote: text("source_note").notNull().default(""),
  spoilerClass: text("spoiler_class").notNull().default("safe"),
  status: text("status").notNull().default("pending"),
  editorNote: text("editor_note").notNull().default(""),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const citations = sqliteTable("citations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recordType: text("record_type").notNull(),
  recordId: text("record_id").notNull(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  sourceKind: text("source_kind").notNull(),
  verifiedAt: text("verified_at"),
});

export const revisions = sqliteTable("revisions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recordType: text("record_type").notNull(),
  recordId: text("record_id").notNull(),
  version: integer("version").notNull(),
  summary: text("summary").notNull(),
  contributor: text("contributor").notNull(),
  createdAt: text("created_at").notNull(),
}, table => [uniqueIndex("revision_version_unique").on(table.recordType, table.recordId, table.version)]);

export const archiveRecords = sqliteTable("archive_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recordType: text("record_type").notNull(),
  recordId: text("record_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  body: text("body").notNull().default(""),
  faction: text("faction").notNull().default(""),
  spoilerClass: text("spoiler_class").notNull().default("safe"),
  status: text("status").notNull().default("draft"),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("archive_record_identity_unique").on(table.recordType, table.recordId)]);

export const officerClaims = sqliteTable("officer_claims", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  officerId: text("officer_id").notNull(),
  claimantEmail: text("claimant_email").notNull(),
  status: text("status").notNull().default("active"),
  claimedAt: text("claimed_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("active_officer_claim_unique").on(table.officerId)]);

export const structuredContributions = sqliteTable("structured_contributions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  officerId: text("officer_id").notNull(),
  authorEmail: text("author_email").notNull(),
  biography: text("biography").notNull().default(""),
  gameplay: text("gameplay").notNull().default(""),
  weapon: text("weapon").notNull().default(""),
  battles: text("battles_json").notNull().default("[]"),
  relationships: text("relationships_json").notNull().default("[]"),
  unlockCondition: text("unlock_condition").notNull().default(""),
  spoilerNotes: text("spoiler_notes").notNull().default(""),
  sourceUrl: text("source_url").notNull(),
  sourceNote: text("source_note").notNull().default(""),
  approvedFields: text("approved_fields_json").notNull().default("[]"),
  status: text("status").notNull().default("pending"),
  editorNote: text("editor_note").notNull().default(""),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
