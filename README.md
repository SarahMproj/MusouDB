# MusouDB

> The open identity, coordination, and achievement network for Warriors players.

MusouDB is an independent, community-built project for fans of Warriors and Musou-style games. It combines an open, structured game database with player profiles, session coordination, community challenges, and a transparent path toward verified competitive play.

## Vision

Most fan resources answer one question at a time: who an officer is, how an item unlocks, or where a battle appears. MusouDB connects the entire player journey:

1. **Discover** games, characters, weapons, factions, and battlefields.
2. **Create a Warrior Record** showing favorites, platforms, gamertags, and accomplishments.
3. **Find allies** and organize live sessions through Battle Rallies.
4. **Complete challenges** and submit results with transparent verification.
5. **Build a competitive community** capable of supporting sanctioned leagues and official partnerships.

## Product pillars

### Open Musou data

Versioned, contributor-friendly records for games, characters, battlefields, weapons, routes, unlocks, and relationships.

### Warrior Records

Player profiles with favorites, game libraries, platforms, public or private gamertags, playstyles, availability, completion, badges, and looking-for-group status.

### Battle Rallies

Structured session listings for co-op, challenge runs, streams, watch parties, completion help, and community events.

### Challenges and rankings

A verification ladder that clearly distinguishes self-reported accomplishments, community-reviewed submissions, moderator-certified records, and future officially verified results.

### League infrastructure

Open rules, seasons, divisions, challenge formats, moderation processes, appeals, and auditability—built to become licensable rather than pretending to be official.

## Current status

MusouDB is in **foundation phase**. Initial work focuses on:

- Product and data architecture
- Community and privacy principles
- League and verification design
- Intellectual-property boundaries
- Contribution workflows
- A small, legally clean seed dataset

See [`ROADMAP.md`](ROADMAP.md) and the [`docs/`](docs/) directory.

## Repository map

```text
MusouDB/
├── data/                         # Community-authored structured records
├── docs/                         # Product, league, safety, and IP specifications
├── packages/
│   └── schema/                   # JSON Schema definitions
├── .github/
│   └── ISSUE_TEMPLATE/           # Contributor-friendly issue templates
├── CONTRIBUTING.md
├── ROADMAP.md
└── README.md
```

## Verification ladder

| Level | Label | Evidence | Competitive standing |
|---|---|---|---|
| 0 | Chronicle | Self-reported result | Personal record only |
| 1 | Witnessed | Public VOD reviewed by trusted members | Community boards |
| 2 | Certified | Continuous run, challenge code, moderator review | Official MusouDB boards |
| 3 | Machine-assisted | OCR and integrity checks support human review | Faster certification |
| 4 | Partner-verified | First-party telemetry or replay validation | Future sanctioned play |

MusouDB will never present self-reported and certified results as equivalent.

## Intellectual-property principles

MusouDB is unofficial and is not affiliated with or endorsed by KOEI TECMO GAMES CO., LTD. or any other publisher.

The open repository must not contain:

- Extracted game files, models, textures, music, or voice recordings
- Copied guide text or proprietary databases
- Official logos used as MusouDB branding
- Artwork without a documented license
- Rehosted gameplay footage

Game and character names may appear as factual references. Community-authored metadata, original writing, schemas, rules, moderation systems, and original artwork should remain clearly separated from publisher-owned assets.

See [`docs/IP_AND_LICENSING.md`](docs/IP_AND_LICENSING.md).

## Contributing

You do not need to be a programmer. Useful contributions include:

- Adding or correcting structured game data
- Writing original, sourced officer summaries
- Designing challenge formats
- Testing schemas
- Translating community-authored text
- Improving accessibility
- Reviewing public league rules

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

## License

Code will be released under the MIT License. Community data licensing will be finalized before a production dataset is accepted. Third-party marks and referenced game titles remain the property of their respective owners.
