# MusouDB Roadmap

Updated 2026-09-08. This is an implementation roadmap, not a claim of production acceptance.

## Now — consolidate and verify

- Combine the production application and v0 schema work in one maintained repository.
- Restore executable build helpers so fresh checkouts install and build.
- Make game-detail saves visible in the device record, preserving playing/completed status and legacy favorites.
- Run application and data checks on pull requests.
- Keep implementation status and known gaps visible in `docs/PROJECT_STATUS.md`.

## Next — finish the existing discovery and contribution loops

1. Reconcile runtime catalog IDs (`dw3`, `dw8`, `dw9`, `dw8xl`) with the versioned dataset. Preserve existing URLs and stored favorites through an explicit mapping; do not silently treat DW8 and DW8XL as the same edition.
2. Finish field-level editorial publication. Approved gameplay, weapon, relationship, battle, unlock, and spoiler fields must reach the public officer record, with consistent source/status handling.
3. Verify signed-in profile, favorite, progress, claim, submission, and editorial flows against D1 in the hosted environment. Add actionable save errors and validate API payloads.
4. Add an explicit opt-in import from device records to signed-in records. Explain public visibility before publishing any local favorites or progress.
5. Improve sharing of public records and officer pages, including record-specific text metadata. Test the discover → save → profile → share journey.

## Later — expand only after the core loop works

- Grow the sourced catalog and per-game appearance/unlock coverage.
- Per-platform identity privacy, profile indexing opt-in, and moderation controls.
- Friend discovery and looking-for-group preferences.
- Battle Rallies with scheduling, capacity, and visibility controls.
- Contributor tools, translations, public data exports, and integrations.

## Release decisions still needed

- Finalize code and community-data licensing before soliciting external contributions. The repository currently states an MIT intent but contains no root license grant.
- Complete target-environment acceptance checks before describing signed-in or editorial workflows as production-verified.
