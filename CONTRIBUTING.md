# Contributing to MusouDB

MusouDB welcomes developers, researchers, players, writers, translators, designers, historians, and community organizers.

## Before contributing

Please make sure your contribution is:

- Original or properly licensed
- Free of extracted game assets
- Written in your own words
- Supported by a source or clearly labeled as community observation
- Respectful of spoilers and privacy
- Small enough to review

## Good first contributions

- Add a missing game, character, faction, weapon, battlefield, or platform record
- Correct a factual field and provide a source
- Improve JSON Schema validation
- Document a recurring battlefield or character appearance
- Add tests or accessibility improvements
- Propose a Warrior Record, collection, or Battle Rally field
- Translate community-authored interface text

## Data contribution rules

Each record should include:

- A stable, lowercase ID following [`docs/ID_CONVENTIONS.md`](docs/ID_CONVENTIONS.md)
- Human-readable display name
- Game or series relationship
- Provenance category
- Source notes where applicable
- Contributor-authored text only

Records live in [`data/`](data/README.md), one file per record, named after the record's ID slug. The schemas that define every field are in [`packages/schema/`](packages/schema/README.md).

Do not collect or bulk-import third-party databases without opening a licensing discussion issue first.

### Validate before you open a pull request

```bash
cd packages/schema
npm install
npm test
```

This checks three things: that every record matches its schema, that every cross-file reference resolves, and that project policy rules hold — spoiler-aware fields must include a spoiler-free block, battlefield IDs must be scoped to their game, filenames must match record IDs, and no record may carry the personal fields MusouDB refuses to store. The same checks run in CI on every pull request.

If the validator rejects something you believe is correct, that is worth an issue. A rule that blocks good contributions is a bug in the rule.

## Prohibited contributions

Do not submit:

- Extracted models, textures, maps, audio, video, or game files
- Official art without written permission or a compatible license
- Copied wiki or guide text
- Personal information about another player
- Harassment, impersonation, or inflammatory content
- Tools intended to circumvent access controls

## Pull requests

Keep pull requests focused on one logical change. Explain:

1. What changed
2. Why it belongs in MusouDB
3. How it was tested or verified
4. The source and license of any included data or media

By contributing, you represent that you have the right to submit the material under the project's applicable license.

## Product proposals

Open an issue before implementing major changes to:

- Authentication
- User profiles or privacy
- Friend and messaging systems
- Collections and progress tracking
- Battle Rallies and scheduling
- Moderation
- Monetization
- Publisher branding or licensed assets

These areas require coordinated product, safety, legal, and technical decisions.
