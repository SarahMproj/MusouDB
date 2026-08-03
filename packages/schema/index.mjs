/**
 * Programmatic access to the MusouDB v0 schemas.
 *
 * The schemas are plain JSON Schema 2020-12 documents and are the source of
 * truth. This module is a convenience loader, not an abstraction over them.
 *
 *   import { schemas, createValidator } from "@musoudb/schema";
 *
 *   const validate = createValidator("character.schema.json");
 *   if (!validate(record)) console.error(validate.errors);
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SCHEMA_DIR = join(dirname(fileURLToPath(import.meta.url)), "schemas");

export const schemaNames = readdirSync(SCHEMA_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

/** Bare filename -> parsed schema document. */
export const schemas = Object.fromEntries(
  schemaNames.map((f) => [f, JSON.parse(readFileSync(join(SCHEMA_DIR, f), "utf8"))])
);

/** Entity name -> schema filename, for callers that prefer a friendlier key. */
export const ENTITIES = {
  series: "series.schema.json",
  game: "game.schema.json",
  faction: "faction.schema.json",
  character: "character.schema.json",
  weapon: "weapon.schema.json",
  battlefield: "battlefield.schema.json",
  warriorRecordPublic: "warrior-record.public.schema.json",
  warriorRecordPrivate: "warrior-record.private.schema.json",
  collectionEntry: "collection-entry.schema.json",
  friendship: "friendship.schema.json",
  battleRally: "battle-rally.schema.json",
  circle: "circle.schema.json",
};

/**
 * Build an Ajv instance with every MusouDB schema registered under its bare
 * filename, so intra-repo $refs resolve without network access.
 */
export async function createAjv(options = {}) {
  const { default: Ajv2020 } = await import("ajv/dist/2020.js");
  const { default: addFormats } = await import("ajv-formats");
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    allowUnionTypes: true,
    strictRequired: false,
    ...options,
  });
  addFormats(ajv);
  for (const [name, schema] of Object.entries(schemas)) ajv.addSchema(schema, name);
  return ajv;
}

/** Compile a validator for one schema, by filename or ENTITIES key. */
export async function createValidator(nameOrKey, options = {}) {
  const file = ENTITIES[nameOrKey] ?? nameOrKey;
  if (!schemas[file]) throw new Error(`Unknown MusouDB schema: ${nameOrKey}`);
  const ajv = await createAjv(options);
  return ajv.getSchema(file);
}
