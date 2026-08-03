#!/usr/bin/env node
/**
 * MusouDB v0 data validator.
 *
 * Runs three layers of checks:
 *   1. JSON Schema validation of every record against its entity schema.
 *   2. Referential integrity across the dataset (every *_id resolves).
 *   3. Project policy rules that JSON Schema alone cannot express.
 *
 * Usage:
 *   node bin/validate.mjs                # validate ../../data
 *   node bin/validate.mjs path/to/data
 */

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA_DIR = join(HERE, "..", "schemas");
const REPO_ROOT = join(HERE, "..", "..", "..");
const DATA_DIR = process.argv[2] ? resolve(process.argv[2]) : join(REPO_ROOT, "data");

/** Directory name -> schema file. */
const COLLECTIONS = {
  series: "series.schema.json",
  games: "game.schema.json",
  factions: "faction.schema.json",
  characters: "character.schema.json",
  weapons: "weapon.schema.json",
  battlefields: "battlefield.schema.json",
};

/** data/examples/<prefix>.*.json -> schema file. User-scoped, synthetic only. */
const EXAMPLE_SCHEMAS = {
  "warrior-record.public": "warrior-record.public.schema.json",
  "warrior-record.private": "warrior-record.private.schema.json",
  "collection-entry": "collection-entry.schema.json",
  "friendship": "friendship.schema.json",
  "battle-rally": "battle-rally.schema.json",
  "circle": "circle.schema.json",
};

const ID_PREFIX_FOR_DIR = {
  series: "series",
  games: "game",
  factions: "faction",
  characters: "character",
  weapons: "weapon",
  battlefields: "battlefield",
};

const errors = [];
const warnings = [];
let checked = 0;

const fail = (file, msg) => errors.push(`${relative(REPO_ROOT, file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${relative(REPO_ROOT, file)}: ${msg}`);

// --------------------------------------------------------------- load schemas
const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
  // Conditional rules such as "a cancelled rally must state a reason" legitimately
  // require a property that is declared on the parent schema rather than inside the
  // `then` branch. Everything else in strict mode stays on.
  strictRequired: false,
});
addFormats(ajv);

const schemaFiles = readdirSync(SCHEMA_DIR).filter((f) => f.endsWith(".json"));
for (const f of schemaFiles) {
  const schema = JSON.parse(readFileSync(join(SCHEMA_DIR, f), "utf8"));
  // Register under the bare filename so intra-repo $refs resolve without network access.
  ajv.addSchema(schema, f);
}

const validators = {};
const validatorFor = (file) => (validators[file] ??= ajv.getSchema(file));

// ------------------------------------------------------------------ load data
const readJson = (p) => {
  const raw = readFileSync(p, "utf8");
  if (!raw.endsWith("\n")) warn(p, "file should end with a newline");
  try {
    return JSON.parse(raw);
  } catch (e) {
    fail(p, `invalid JSON: ${e.message}`);
    return null;
  }
};

const walk = (dir) => {
  if (!safeStat(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".json") ? [p] : [];
  });
};

function safeStat(p) {
  try {
    return statSync(p);
  } catch {
    return null;
  }
}

/** id -> { file, record, dir } for every catalog entity. */
const catalog = new Map();
const records = [];

for (const [dir, schemaFile] of Object.entries(COLLECTIONS)) {
  for (const file of walk(join(DATA_DIR, dir))) {
    const record = readJson(file);
    if (!record) continue;
    records.push({ file, record, schemaFile, dir });
  }
}

for (const file of walk(join(DATA_DIR, "examples"))) {
  const name = basename(file);
  const key = Object.keys(EXAMPLE_SCHEMAS)
    .sort((a, b) => b.length - a.length)
    .find((k) => name.startsWith(k + "."));
  if (!key) {
    fail(file, `example filename must start with one of: ${Object.keys(EXAMPLE_SCHEMAS).join(", ")}`);
    continue;
  }
  const record = readJson(file);
  if (!record) continue;
  records.push({ file, record, schemaFile: EXAMPLE_SCHEMAS[key], dir: "examples", exampleKind: key });
}

if (!records.length) {
  console.error(`No JSON records found under ${DATA_DIR}`);
  process.exit(1);
}

// ------------------------------------------------------ layer 1: JSON Schema
for (const entry of records) {
  const { file, record, schemaFile } = entry;
  const validate = validatorFor(schemaFile);
  if (!validate) {
    fail(file, `no compiled validator for ${schemaFile}`);
    continue;
  }
  checked++;
  if (!validate(record)) {
    for (const e of validate.errors) {
      fail(file, `${e.instancePath || "/"} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ""} [${schemaFile}]`);
    }
  }
  if (entry.dir !== "examples" && typeof record.id === "string") {
    if (catalog.has(record.id)) {
      fail(file, `duplicate id ${record.id}, already defined in ${relative(REPO_ROOT, catalog.get(record.id).file)}`);
    } else {
      catalog.set(record.id, entry);
    }
  }
}

// ------------------------------------------------- layer 2: referential integrity
const ID_RE = /^(series|game|character|faction|weapon|battlefield):[a-z0-9][a-z0-9-]*$/;

const collectIds = (node, path, out) => {
  if (Array.isArray(node)) {
    node.forEach((v, i) => collectIds(v, `${path}/${i}`, out));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) collectIds(v, `${path}/${k}`, out);
  } else if (typeof node === "string" && ID_RE.test(node) && /(_id|_ids\/\d+|entity_id|recurrence_of|deprecated_by|is_expansion_of|successor_of)$/.test(path)) {
    out.push({ id: node, path });
  }
  return out;
};

for (const { file, record } of records) {
  for (const { id, path } of collectIds(record, "", [])) {
    if (!catalog.has(id)) fail(file, `${path} references unknown entity ${id}`);
  }
}

// ------------------------------------------------------- layer 3: policy rules
for (const entry of records) {
  const { file, record, dir, exampleKind } = entry;

  // Filename must match the record id slug, and the id prefix must match its directory.
  if (dir !== "examples") {
    const prefix = ID_PREFIX_FOR_DIR[dir];
    if (record.id && !record.id.startsWith(prefix + ":")) {
      fail(file, `id ${record.id} must use the "${prefix}:" prefix inside data/${dir}/`);
    }
    const expected = String(record.id ?? "").split(":")[1] + ".json";
    if (record.id && basename(file) !== expected) {
      fail(file, `filename should be ${expected} to match id ${record.id}`);
    }
  }

  // Spoiler-aware text must always offer a spoiler-free entry point.
  for (const [field, value] of Object.entries(record)) {
    if (value && typeof value === "object" && Array.isArray(value.blocks)) {
      if (!value.blocks.some((b) => b.spoiler_level === "none")) {
        fail(file, `${field} needs at least one spoiler_level "none" block`);
      }
      for (const b of value.blocks) {
        if (b.spoiler_level === "none" && b.scope_game_ids?.length) {
          warn(file, `${field}: a spoiler-free block does not need scope_game_ids`);
        }
      }
    }
  }

  // Battlefields belong to the game they name.
  if (dir === "battlefields" && record.game_id && record.id) {
    const gameSlug = record.game_id.split(":")[1];
    if (!record.id.startsWith(`battlefield:${gameSlug}-`)) {
      fail(file, `battlefield id should start with "battlefield:${gameSlug}-" to stay unique across games`);
    }
  }

  // Structural links must not point at the record itself.
  if (record.id) {
    const selfLinks = ["successor_of", "is_expansion_of", "recurrence_of",
                       "deprecated_by", "parent_faction_id", "primary_faction_id"];
    for (const field of selfLinks) {
      if (record[field] === record.id) fail(file, `${field} points at its own id ${record.id}`);
    }
    if (record.meta?.deprecated_by === record.id) fail(file, "meta.deprecated_by points at its own id");
    for (const rel of record.relationships ?? []) {
      if (rel.character_id === record.id) fail(file, `relationships lists ${record.id} as related to itself`);
    }
  }

  // Appearances must not duplicate the same game.
  if (Array.isArray(record.appearances)) {
    const seen = new Set();
    for (const a of record.appearances) {
      if (seen.has(a.game_id)) fail(file, `appearances lists ${a.game_id} more than once`);
      seen.add(a.game_id);
    }
  }

  // Friendship must be between two different people.
  if (exampleKind === "friendship" && record.requester_handle === record.recipient_handle) {
    fail(file, "requester_handle and recipient_handle must differ");
  }

  // A public projection must never leak a friends-only identity.
  if (exampleKind === "warrior-record.private") {
    for (const pi of record.platform_identities ?? []) {
      if (!pi.visibility) fail(file, `platform identity ${pi.platform} is missing an explicit visibility`);
    }
  }

  // Rally timing must be coherent.
  if (exampleKind === "battle-rally") {
    if (record.expected_end_at && new Date(record.expected_end_at) <= new Date(record.starts_at)) {
      fail(file, "expected_end_at must be after starts_at");
    }
    const going = (record.attendees ?? []).filter((a) => a.rsvp === "going").length;
    if (record.capacity && going > record.capacity) {
      fail(file, `${going} attendees marked going exceeds capacity ${record.capacity}`);
    }
  }

  // Collection progress must be internally consistent.
  if (exampleKind === "collection-entry" && record.progress) {
    const { completed_units: c, total_units: t } = record.progress;
    if (typeof c === "number" && typeof t === "number" && c > t) {
      fail(file, `progress.completed_units (${c}) exceeds total_units (${t})`);
    }
  }

  // Every catalog record needs a traceable provenance.
  if (dir !== "examples") {
    const cat = record.provenance?.category;
    if (cat === "community_observation" && !record.provenance.contributor) {
      warn(file, "community_observation should name a contributor");
    }
  }
}

// -------------------------------------------------------------------- report
const plural = (n, one, many = one + "s") => `${n} ${n === 1 ? one : many}`;

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const e of errors) console.error(`  x ${e}`);
  console.error(`\nFAILED — validated ${plural(checked, "record")}, ${plural(errors.length, "error")}.`);
  process.exit(1);
}

console.log(
  `\nOK — validated ${plural(checked, "record")} against ${plural(schemaFiles.length, "schema")}, ` +
    `${plural(catalog.size, "catalog entity", "catalog entities")} cross-referenced, ${plural(warnings.length, "warning")}.`
);
