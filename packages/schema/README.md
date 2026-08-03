# @musoudb/schema

JSON Schema definitions for MusouDB v0, plus the validator that guards `data/`.

Everything here is deliberately dependency-light and framework-free. The schemas are plain JSON Schema 2020-12 files, so they can be consumed from Node, Python, Go, a form generator, or a database migration without importing MusouDB code.

## Install and run

```bash
cd packages/schema
npm install
npm test          # validate every record in ../../data
```

Validate a different directory:

```bash
node bin/validate.mjs path/to/data
```

The validator exits non-zero on the first failed run and prints every problem it found, not just the first.

## Schemas

| File | Purpose |
| --- | --- |
| `common.schema.json` | Shared `$defs`: identifiers, provenance, spoiler-aware text, visibility, asset references, the privacy guard |
| `series.schema.json` | A sub-series within the Musou family |
| `game.schema.json` | A released title |
| `faction.schema.json` | A kingdom, clan, or army |
| `character.schema.json` | A playable or non-playable officer |
| `weapon.schema.json` | A weapon or moveset type |
| `battlefield.schema.json` | A stage or battle instance, scoped to one game |
| `warrior-record.public.schema.json` | The only fields servable to an unauthenticated visitor |
| `warrior-record.private.schema.json` | Server-side account record |
| `collection-entry.schema.json` | One player's relationship to one entity |
| `friendship.schema.json` | Mutual relationship between two records |
| `battle-rally.schema.json` | A scheduled session |
| `circle.schema.json` | A community group, reserved for a later phase |

Schemas resolve each other by bare filename (`common.schema.json#/$defs/Provenance`), so validation works offline and in CI with no network access. The `$id` values point at `https://schema.musoudb.org/v0/` for future publication, but nothing depends on that host being reachable.

## Four design decisions worth knowing

### Provenance is required, not optional

Every catalog record carries a `provenance` object with a category drawn from `docs/IP_AND_ASSET_POLICY.md`. When the category claims an external basis — `official_public_source` or `public_domain_history` — the schema requires at least one `sources` entry. A record cannot assert that a publisher said something without saying where.

### Spoiler safety is structural

Long-form text is a `SpoileredText` object: an array of blocks, each with its own `spoiler_level` and optional `scope_game_ids`. **At least one block must be `spoiler_level: "none"`.** A client that knows nothing about spoiler handling can render only the `none` blocks and still show something useful, which means the safe path is also the easy path.

`scope_game_ids` lets a client hide a block based on which games a player has finished, rather than applying one global setting to the entire franchise.

### Public and private profile data are separate schemas

`warrior-record.public` is not a filtered view of the private record produced at request time. It is its own schema with `additionalProperties: false` and an explicit deny-list of private field names. Adding a field to the public projection requires editing a file whose entire purpose is the privacy boundary, which is exactly the kind of change that should be hard to make by accident.

The private record holds every platform identity with its own `visibility`, defaulting to `friends_only`. The public projection carries only `public_platform_identities`, and only identities the user set to `public` belong in it.

Both schemas apply `ForbiddenPersonalFields`, which makes `date_of_birth`, `legal_name`, `latitude`, `street_address`, `phone_number`, and similar fields a validation failure anywhere in the system.

### Assets must name a license

`AssetReference` requires `url`, `credit`, and a `license` drawn from a closed enumeration of licenses the project can actually accept. There is no free-text license field, so unlicensed or publisher-owned artwork cannot be described in a way that validates.

## What the validator checks

Three layers, because a schema alone is not enough:

1. **Schema** — every record against its entity schema, with Ajv strict mode on.
2. **Referential integrity** — every `*_id` reference resolves to a record that exists, and no identifier is defined twice.
3. **Project policy** — rules JSON Schema cannot express on its own:
   - filename matches the record ID, and the ID prefix matches its directory
   - battlefield IDs are prefixed with their game slug
   - spoiler-aware fields include a spoiler-free block
   - structural links do not point at their own record
   - `appearances` does not list the same game twice
   - a friendship is between two different handles
   - every platform identity states a visibility
   - a rally ends after it starts and does not exceed capacity
   - collection progress does not exceed its total

The negative-test expectations for these rules live in the pull request that introduced them; if you add a rule, add a record that breaks it and confirm the validator says so before you rely on it.

## Adding a field

1. Decide whether the field is public, private, or catalog data. If it is user data, decide the default visibility before the field name.
2. Add it to the schema with `additionalProperties: false` still intact, a length or range bound, and a description written for a contributor rather than a compiler.
3. Add or update an example in `data/` so the field is exercised by `npm test`.
4. If the field carries prose that could spoil a story, use `SpoileredText`.
5. If the field touches profiles, privacy, friends, collections, rallies, or moderation, open an issue first — `CONTRIBUTING.md` requires it.

## Versioning

Every record carries `meta.schema_version`, currently the string `"0"`. While the version is `0`, breaking changes are allowed but must update every example in the same pull request. The first hosted deployment freezes `"0"` and further changes go to `"1"` with a migration note.
