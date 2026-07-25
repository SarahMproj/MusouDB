# MusouDB

> One database to unite the Three Kingdoms.

MusouDB is an open-source home for Warriors and Musou fandom: a structured game database, spoiler-aware reference, personal fan profile, and place to find people who love the same games, characters, and battlefields.

The goal is simple: make the franchise easier to explore and the community easier to find.

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

MusouDB is in its **foundation phase**. Initial work focuses on:

- Game, character, battlefield, profile, collection, and session schemas
- A legally clean seed dataset
- A static franchise explorer
- Contribution and provenance workflows
- Privacy-safe profile and social design
- Original branding and an asset-safe repository

See [`ROADMAP.md`](ROADMAP.md) and [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md).

## Repository map

```text
MusouDB/
├── data/                         # Community-authored structured records
├── docs/                         # Product, safety, data, and asset policies
├── packages/
│   └── schema/                   # JSON Schema definitions
├── .github/
│   └── ISSUE_TEMPLATE/           # Contributor-friendly issue templates
├── CONTRIBUTING.md
├── ROADMAP.md
└── README.md
```

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
