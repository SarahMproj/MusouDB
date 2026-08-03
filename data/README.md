# MusouDB data

Community-authored records. Text only, one record per file, every claim traceable.

## Layout

```text
data/
├── series/        series:<slug>.json
├── games/         game:<slug>.json
├── factions/      faction:<slug>.json
├── characters/    character:<slug>.json
├── weapons/       weapon:<slug>.json
├── battlefields/  battlefield:<game-slug>-<battle-slug>.json
└── examples/      synthetic user-scoped records, for schema testing only
```

Filenames match the record's ID slug. Identifier rules are in [`../docs/ID_CONVENTIONS.md`](../docs/ID_CONVENTIONS.md).

## What is in here now

A deliberately small seed set — one series, three games, three factions, four characters, three weapons, three battlefields — chosen to exercise every interesting shape in the schema rather than to be comprehensive:

- a battle that recurs across two games, linked with `canonical_battle_slug` and `recurrence_of`
- a character with a documented moveset change between entries
- spoiler-layered summaries with `scope_game_ids`
- all four provenance categories
- a character whose historical record and literary portrayal diverge

Growing the dataset is the next step, not a prerequisite for it.

## `examples/`

Everything in `examples/` is **synthetic**. No real account, email address, gamertag, or session belongs in this repository under any circumstances.

These files exist so `npm test` exercises the user-scoped schemas — Warrior Records, collection entries, friendships, rallies, circles — and so the public/private split is demonstrated rather than merely described. `warrior-record.public.sleepingdragon.json` and `warrior-record.private.sleepingdragon.json` are the same fictional player: read them side by side to see which fields cross the boundary and which do not.

## Before you open a pull request

```bash
cd packages/schema
npm install
npm test
```

The validator checks schema conformance, cross-file references, and project policy. Read [`../CONTRIBUTING.md`](../CONTRIBUTING.md) and [`../docs/IP_AND_ASSET_POLICY.md`](../docs/IP_AND_ASSET_POLICY.md) first.

Do not commit extracted game files, official artwork, audio, video, or copied wiki text. CI rejects any non-text file added under `data/`.
