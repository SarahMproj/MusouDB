# MusouDB project status

## 2026-09-23 — original officer artwork

- Added original AI-generated paintings for all 82 DW8XL CE officers in the approved Sun Shangxiang style, with individual briefs and faction colors.
- Integrated full portraits on officer pages and responsive, lazy-loaded artwork on archive and home cards. Provenance labels distinguish these interpretations from official art and historical likenesses.
- Preserved the published campaign branch research while reconciling it with the complete officer roster. No database migration or contributor-data change is required.
- Artwork prompts, source hashes and preparation instructions are recorded in `OFFICER_ARTWORK.json` and `OFFICER_ARTWORK.md`.

## 2026-09-23 — complete DW8XL CE core roster

- Added the remaining 62 authored officer dossiers: Wei 19/19, Wu 19/19, Shu 22/22, Jin 12/12 and Other 10/10.
- All 82 now have historical or literary context, editorial portrayal, relationships, source references and a reciprocal signature-weapon page.
- Preserved the distinction between core coverage and advanced research: 20 combat summaries, ten rare guides, and 62 explicitly open combat records. No new exact unlock or stage conditions are claimed.
- Corrected Sun Quan to Sword for DW8XL CE and preserved the previous weapon URL as a redirect. Dian Wei retains the battle-axe record ID with the edition name Axe.
- Runtime content only; no production database migration or contributor-data write is required. Website deployment remains a separate release step.


## 2026-09-23 — officer content expansion

- Expanded ten existing DW8XL CE roster seeds into sourced dossiers, bringing the total to 20 of 82. Coverage is now Wei 3/19, Wu 4/19, Shu 6/22, Jin 4/12 and Other 3/10.
- Added historical context, editorial game portrayals, relationship links, aliases and concise community combat notes. Corrected Zhang Fei's weapon to Double Pike.
- Added nine weapon records and upgraded the existing Crescent Blade association, for ten additional weapon research pages. Existing rare acquisition guides remain ten; missing conditions are explicitly open.
- Preserved previous research dates and the 82-officer roster. No inferred cross-edition appearances or generic place-name matches were added. The runtime catalog remains separate from the JSON sample dataset and D1 editorial overrides.
- Campaign PR #7 remains independent. No schema migration or production database write is required for these content changes.

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

- Device and signed-in records remain independent. Selected items can now be explicitly imported after confirming public visibility; there is no automatic ongoing synchronization.
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

No Site deployment or production data changes were made in this follow-up. The initial publication pass covered officer detail pages. The archive expansion below extends that projection to browsing.


## DW8XL CE archive expansion (2026-09-09)

- Ten existing featured profiles now have separately attributed historical context, edition-specific playstyle notes and linked rare weapon guides. Broad homepage/DLC citations have been replaced with sources that identify what they support.
- Ten weapon guides cover EX notes, shared compatibility rules and a particular fifth- or sixth-weapon objective with officer, stage variant, side, difficulty and timer/event conditions.
- Weapon and battle records have detail routes. Fourteen additional stage records distinguish similarly named scenarios; the Shu campaign has a six-step hypothetical prerequisite checklist.
- Home, officer directory, game roster and coverage use approved editorial content. Cards summarize approved spoiler-safe biographies, use approved weapons and search approved gameplay; hidden fields and contributor email addresses are not serialized to browsing clients. Withdrawals restore earlier approved content or the seed.
- Jin filters and roster counts use a normalized kingdom. Coverage counts profiles, source URLs and published fields instead of declaring the seed biographies 100% complete.
- Guides are source-checked, not replay-tested. Full EX input tables, compatibility stars by level, all weapon ranks, detailed route walkthroughs and broader appearance catalogs remain explicit research gaps. Existing non-DW8XL entries are partial catalogs.
- No schema migration, production data update or deployment is part of this change. Device-import PR #5 remains separate.



## 2026-09-09 — device record import

PR #4 merged after both GitHub checks passed. This follow-up adds account-side review of recognized device saves, with no default selections and an unchecked public-visibility confirmation. Users must save a profile before importing. Existing account items are shown as already saved; account game progress wins conflicts. Imported selections update the account controls immediately, while local storage is untouched.

The authenticated import endpoint validates catalog IDs and statuses, requires explicit confirmation, and derives ownership only from the signed-in profile. A single add-only D1 batch preserves existing entries, rolls back failed imports, and makes retries safe. No schema changes or migrations are needed.

Local Worker/D1 coverage includes sign-in and profile requirements, missing consent, malformed selections, conflict preservation, duplicate retries, account isolation, rollback, and public-profile rendering. Browser interaction and hosted sign-in acceptance remain pending. No Site deployment is included.

## Campaign route follow-up

- Added Wei, Wu, Jin and Lu Bu branch checklists alongside Shu, with 20 additional scenario records and spoiler-collapsed links from battle details.
- Distinguished side-stage access from prerequisite stars and the final camp conversation. Sources checked 2026-09-13; fresh-save replay remains outstanding.
