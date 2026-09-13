# MusouDB

> One database to unite the Three Kingdoms.

MusouDB is an open-source home for Warriors and Musou fandom: a structured game database, spoiler-aware reference, personal fan profile, and place to find people who love the same games, characters, and battlefields.

The goal is simple: make the franchise easier to explore and the community easier to find.

The DW8XL CE archive now includes ten researched officer dossiers, ten rare weapon guides, connected battle pages and a Shu hypothetical-route checklist. Historical background is separate from game portrayal. See [research scope and sources](docs/ARCHIVE_RESEARCH.md) for verification limits.

## The core experience

1. **Discover** games, characters, factions, weapons, battles, routes, and unlocks.
2. **Personalize** a Warrior Record with favorites, collections, progress, platforms, and gamertags.
3. **Connect** with friends and players who share the same interests.
4. **Play together** by organizing co-op sessions, challenge runs, streams, and watch parties.
5. **Contribute** knowledge, corrections, translations, tools, and original community work.

## Product pillars

### Open Musou data

Versioned, contributor-friendly records for games, characters, factions, battlefields, weapons, routes, unlocks, relationships, and appearances across the franchise.

The data should be useful to fans and reusable by developers building bots, guides, visualizations, checklists, and other community tools.

### Franchise explorer

A fast, searchable, spoiler-aware interface for answering questions such as:

- Which games does this character appear in?
- Which battlefields recur across the series?
- What do I need to unlock next?
- Which route or faction should I play?
- How did a character, weapon, or moveset change between games?

### Warrior Records

Personal profiles where players can share:

- Favorite games, characters, factions, weapons, and battlefields
- Games owned, completed, or currently playing
- Platforms and optional gamertags
- Preferred modes, difficulty, and playstyle
- Personal collections, checklists, and accomplishments
- Looking-for-group status and typical availability

Every platform identity should have its own privacy setting.

### Friends and Battle Rallies

Players can connect with friends and organize a Battle Rally for:

- Co-op sessions
- Completion help
- Challenge runs
- Streams and watch parties
- Community events
- Revisiting classic entries together

MusouDB should coordinate play without trying to replace Discord or platform-native voice chat.

### Community contributions

MusouDB should be welcoming to developers and non-developers alike. Players can contribute structured data, original summaries, translations, accessibility improvements, corrections, historical context, and new community tools.

## Current status

MusouDB has an implemented web application and a separate versioned schema package. This repository now contains both foundations; implemented does not mean every workflow is launch-ready.

- **Explore:** officer search and filters, game pages, battles, weapons, and editorial coverage. The DW8XL Complete Edition page links an 82-officer roster; individual records retain draft/reviewed labels.
- **Device record:** save officers, save games as owned, and track playing/completed status in browser storage. Older game-detail saves are recognized without overwriting progress.
- **Signed-in record:** profile editing, favorites, game progress, and public handle pages backed by D1. Device saves remain separate until a user selects items and confirms an import to their public record. Import preserves existing account progress.
- **Contributions:** corrections, officer claims, structured research submissions, and editor queues exist. Selected research fields now publish on officer pages, with source attribution, withdrawal support, and spoiler reveals. Hosted contributor acceptance is still pending.
- **Open data foundation:** JSON Schemas, 24 sample records, provenance rules, and reference validation. These files are not yet the application's runtime data source.

See [`ROADMAP.md`](ROADMAP.md) for the current priorities and [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) for verified scope and known gaps.

## Repository map

```text
app/                  Application pages, API routes, and current seed catalog
worker/               Cloudflare Worker entry
build/                Sites build integration
db/                   Runtime D1 schema and database access
drizzle/              Runtime migrations
data/                 Versioned sample catalog and synthetic profile examples
packages/schema/      JSON Schemas and offline data validator
tests/                Worker rendering and device-record regressions
scripts/              Dependency installation and verified build helpers
docs/                 Product, provenance, status, and identifier documentation
.openai/hosting.json   Existing Sites identity and logical database binding
```

## Development and validation

Use Node 22.13 or newer on Linux. The install/build helpers require Bash, curl, flock, timeout, and sha256sum.

```bash
npm run install:ci
npm run test:local-record
npm test
npm run test:editorial
npm run test:import
npm ci --prefix packages/schema
npm test --prefix packages/schema
```

`npm test` builds the Worker, validates its fetch entrypoint and hosting manifest, and checks rendered public pages. Device-record tests exercise legacy save migration and progress preservation. Editorial tests run the built Worker with a local D1 database and cover selective publication, withdrawal, legacy copies, and transactional failure. The schema validator checks schema conformance, cross-file references, and policy rules; it does not validate the runtime catalog in `app/data.ts` or live D1 rows.

For local development, use `npm run dev`. Signed-in and editorial workflows require the Sites authentication boundary, D1 bindings/migrations, and hosted private `FOUNDING_ADMIN_EMAIL` configuration for the founding editor. Do not embed that value in source or trust caller-supplied authentication headers on an independently exposed server.

GitHub code changes do not automatically publish the Site. Preserve the existing Site identity, and use its normal version/deployment workflow when publishing is requested.

## Intellectual-property principles

MusouDB is unofficial and is not affiliated with or endorsed by KOEI TECMO GAMES CO., LTD. or any other publisher.

The public repository must not contain:

- Extracted game files, models, textures, music, or voice recordings
- Copied guide, wiki, or proprietary database text
- Official logos used as MusouDB branding
- Artwork without a documented compatible license
- Rehosted gameplay footage

Game and character names may appear as factual references. Community-authored metadata, original writing, schemas, software, and original artwork should remain clearly separated from publisher-owned assets.

See [`docs/IP_AND_ASSET_POLICY.md`](docs/IP_AND_ASSET_POLICY.md).

## Contributing

You do not need to be a programmer. Useful contributions include:

- Adding or correcting structured game data
- Writing original, sourced officer summaries
- Documenting recurring battles, routes, weapons, and unlocks
- Testing schemas and developer tooling
- Translating community-authored text
- Improving accessibility and spoiler controls
- Proposing profile, collection, and Battle Rally improvements

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

## License

Code will be released under the MIT License. Community data licensing will be finalized before a production dataset is accepted. Third-party marks and referenced game titles remain the property of their respective owners.
