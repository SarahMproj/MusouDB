# Stable Identifier Conventions

> Identifiers are the one part of MusouDB that is expensive to change. Everything else can be edited; an ID that has been published is a promise.

## Format

```text
<type>:<slug>
```

- `type` is one of `series`, `game`, `character`, `faction`, `weapon`, `battlefield`, plus the user-scoped types `collection`, `friendship`, `rally`, `circle`.
- `slug` is lowercase ASCII, digits, and hyphens only: `^[a-z0-9][a-z0-9-]*$`.
- The full identifier must match `^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*$`.

Examples:

```text
series:dynasty-warriors
game:dynasty-warriors-8
faction:shu
character:zhuge-liang
weapon:feather-fan
battlefield:dynasty-warriors-8-chi-bi
```

The type prefix is part of the identifier, not decoration. It lets a single `entity_id` field in a collection entry or circle topic point at anything without a second lookup, and it makes a dangling reference obvious on sight.

## Rules

1. **Identifiers are permanent.** Once a record is merged, its ID never changes. If a name was wrong, change `display_name` and add the old form to `aliases`.
2. **Never reuse an identifier.** If a record was created in error, mark `meta.status` as `deprecated` and set `meta.deprecated_by` where a replacement exists. Do not delete and rebind.
3. **One file per record.** The filename must be `<slug>.json` in the directory for its type. `character:zhuge-liang` lives at `data/characters/zhuge-liang.json`. The validator enforces this.
4. **No spoilers in identifiers.** An ID appears in URLs and error messages, where spoiler preferences cannot be applied. Never encode a plot twist, death, or ending into a slug.
5. **No publisher branding in identifiers.** Slugs are factual references, not logos or trade dress.

## Choosing a slug

### Games

Use the English release title, lowercased and hyphenated, keeping the numeral: `game:dynasty-warriors-8`.

Expansions get their own record and link back with `is_expansion_of` rather than being folded into the base game, because they usually change the roster and the stage list.

Regional titles belong in `regional_titles`, not in the slug.

### Characters

Use the pinyin romanization without diacritics or apostrophes, family name first, hyphen-separated: `character:zhuge-liang`, `character:sun-shang-xiang`.

Record which system you used in `romanization_system`, and put Wade-Giles, Japanese readings, and common fan shorthand in `aliases`. Search should match on aliases; identifiers should not multiply.

When two figures share a romanized name, disambiguate with the narrowest stable qualifier available, in this order: faction, then courtesy name, then first game of appearance.

```text
character:ma-teng
character:ma-teng-wu        # avoid — faction affiliation can be argued about
character:ma-teng-shoucheng # prefer — courtesy name is fixed
```

### Battlefields

Battlefields are **per game**, because objectives, routes, and layouts differ between entries. Prefix the slug with the game slug:

```text
battlefield:dynasty-warriors-3-chi-bi
battlefield:dynasty-warriors-8-chi-bi
```

Link recurrences with two fields:

- `canonical_battle_slug` — the series-agnostic battle, e.g. `chi-bi`. This is what powers "which games restage this battle?"
- `recurrence_of` — the earlier battlefield record this one re-stages, when there is a clear ancestor.

The validator enforces the game-slug prefix. Without it, the fifteenth Battle of Chi Bi silently overwrites the first.

### Weapons

Weapons are recorded at the **moveset type** level, not per upgrade tier or per named drop: `weapon:feather-fan`, not `weapon:feather-fan-lvl-3`.

Named or unique weapons are acquisition details. Put them in `acquisition[].requirements` and the character record, not in a new weapon ID.

### Factions

Use the short common English form: `faction:wei`, `faction:shu`, `faction:wu`. Sub-armies and splinter groups use `parent_faction_id`.

## User-scoped identifiers

Catalog IDs are human-authored and reviewed. User-scoped IDs are machine-generated and must not be guessable or enumerable:

```text
collection:<opaque>
friendship:<opaque>
rally:<opaque>
circle:<slug>          # circles are named by their owner, so a slug is acceptable
```

Use a ULID or UUID for the opaque part so that `collection:1` cannot be incremented into someone else's private checklist. Handles are the only user identifier that appears in a URL, and a handle is an alias the user chose, never a legal name.

## Cross-file references

Every field ending in `_id` or `_ids` must resolve to a record that exists in `data/`. The validator walks the whole dataset and fails on a dangling reference, so a pull request that renames a record without updating its referrers cannot merge.

Forward references are allowed within a single pull request. Add the referenced record in the same change.

## Changing this document

Adding a type, changing the slug format, or relaxing the uniqueness rules affects every published URL and every downstream tool. Open an issue first, as described in `CONTRIBUTING.md`.
