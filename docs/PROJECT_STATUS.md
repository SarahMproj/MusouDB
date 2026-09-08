# MusouDB project status

## 2026-09-08 consolidation

The application sync (PR #3) and schema package (PR #2) were developed separately. Their combined checkout retains both histories and resolves the `.gitignore` conflict without losing runtime or nested dependency exclusions. Build helper executable permissions are restored.

The README previously described a future static explorer even though the application had officer/game pages, accounts, public profiles, and editorial workflows. It now distinguishes implemented features from acceptance-tested behavior.

## Data boundaries

| Layer | Location | Current role |
|---|---|---|
| Runtime catalog | `app/data.ts` | Seed officers, games, battles, weapons, detailed biographies |
| Runtime edits and user state | `db/schema.ts`, D1 | Profiles, cloud records, claims, submissions, overrides, citations, revisions |
| Versioned data | `data/`, `packages/schema/` | Separate sample dataset and portable schema contracts |
| Private device record | Browser storage | Local favorites and game progress; no automatic cloud import |

The runtime does not consume the versioned catalog. In particular, short game IDs in the app differ from long IDs in the sample dataset. Schema checks passing does not prove runtime data consistency or profile privacy conformance with those schemas.

## Fixed in this pass

- Fresh-checkout helper execution permissions.
- Game saves formerly written only to `musoudb-games` are now read by the device record as owned, preserving existing playing/completed states.
- Detail saves and record progress use shared storage functions; removing a migrated game does not resurrect it on reload.
- Malformed stored JSON is handled and failed writes report an error instead of claiming success.
- Existing public profiles are linked from the device record; obsolete “public profiles come later” copy is removed.

## Known gaps for the next pass

- Device and signed-in records remain independent. Import must be explicit because signed-in favorites and progress appear publicly.
- Structured publication now projects approved fields over the seed at read time. Generic legacy biography copies are ignored when their publication revisions are present, preventing stale research from surviving withdrawal. Hosted acceptance remains pending.
- Some signed-in save actions lack error feedback; record API input validation and concurrent updates need attention.
- Public contributor pages now list approved work only; other review decisions stay in editorial views.
- Gamertag visibility is one profile-level switch, not the per-identity model described in the schema design.
- No root LICENSE has been granted yet; code licensing intent and community-data terms remain to be finalized.

## Verification boundary

Passed: fresh dependency installation; Worker build/artifact validation; one production-metadata rendering test; five device-storage regressions; and 24 sample records validated against 13 schemas (zero warnings). A separate TypeScript check still reports existing missing Cloudflare Worker type declarations and two unawaited database calls in the bundled D1 example. Those are not build failures, but typecheck is not yet a clean gate. They do not establish hosted login, D1 writes, editor publication, or browser interaction acceptance. No production database changes or Site publication are part of this consolidation.


## Editorial publication follow-up

- All seven fields publish independently, including research for officers without a detailed seed profile.
- The newest approved contribution wins per field; deselecting or withdrawing a submission restores an older approved value or the seed. Approval does not automatically mark every part of an officer record reviewed.
- Citations identify the fields currently supported by each approved source. Unapproved research and unsafe URL schemes do not become public content or active links.
- Unlock and spoiler notes render within closed reveal controls. Biographies remain in the contributor form's explicitly spoiler-safe field.
- The editor restores saved field selections, reports failures without discarding them, and detects stale decisions. Decisions, claim state, and revision history are saved in one conditional D1 batch.
- Requesting changes reopens the author's claim so corrected research can be submitted. Existing publication schemas and migrations are unchanged.
- Local integration tests run the built Worker with an ephemeral D1 database, exercising API authorization, field selection, officer HTML, repeated approvals, stale updates, unsafe sources, legacy biography withdrawal, and rollback when the final database write fails.

No Site deployment or production data changes were made in this follow-up. Public directory cards still use the seed catalog; this pass completes the detailed officer publication workflow.
