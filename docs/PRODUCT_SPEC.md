# Product Specification

## Product thesis

MusouDB begins as the open data and identity layer for Warriors fandom, then adds coordination and achievement systems. The hosted application may later support a licensed league, but the open repository must remain useful without publisher-owned assets or private user data.

## Core entities

### Game

- Stable internal ID
- Display title
- Series
- Release year
- Platforms
- Supported player modes
- Publisher and developer references
- Data provenance

### Character

- Stable internal ID
- Community-authored display name and aliases
- Faction and affiliations
- Game appearances
- Weapons and playstyle tags
- Spoiler-aware summaries
- Sources and contributor history

### Battlefield

- Stable internal ID
- Game
- Display name
- Mode and route
- Playable sides
- Objectives and tags
- Challenge eligibility

### Warrior Record

- Username and display name
- Bio and time zone
- Favorite games, characters, factions, weapons, and battlefields
- Owned or currently played games
- Platform identities and gamertags
- Privacy level for every platform identity
- Playstyle, difficulty, availability, and LFG status
- Completion and verified accomplishment summaries

No precise location, legal name, or date of birth should be required.

### Friendship

- Requester and recipient
- Pending, accepted, blocked, or removed state
- Created and updated timestamps

Friendship must be mutual. Following may be considered later as a separate one-way relationship.

### Battle Rally

- Organizer
- Game and platform
- Session type
- Battlefield or objective
- Start and expected end time
- Time-zone normalization
- Capacity and attendees
- Difficulty and rules
- Voice-chat link or instructions
- Public, friends-only, or invite-only visibility
- Status and recap

### Challenge

- Season
- Eligible game, version, platform, and patch
- Battlefield and objective
- Permitted characters, weapons, items, and settings
- Scoring formula
- Evidence requirements
- Mod policy
- Opening and closing timestamps
- Tie-breaking rules

### Submission

- Player
- Challenge
- Claimed score and run metadata
- External evidence URL
- Verification tier
- Reviewer decisions
- Integrity flags
- Appeal status
- Immutable audit history

## Privacy defaults

- Gamertags default to friends-only
- Discord and streaming links are optional
- Session visibility defaults to friends-only
- Search-engine indexing of profiles requires opt-in
- Local rankings use user-selected region labels, not GPS
- Direct messaging is out of scope for the initial release

## MVP

The first hosted MVP should include:

1. Authentication
2. Warrior Record creation
3. Favorites and game library
4. Platform identities with privacy controls
5. Friend requests
6. Battle Rally creation and joining
7. Public game and character explorer
8. Shareable profile cards

Ranked video submissions are intentionally excluded from the MVP. A lightweight challenge beta may follow after moderation and legal procedures are operational.

## Success metrics

### Identity activation

- Profile completion rate
- Favorites selected per activated profile
- Platform identity connection rate
- Share-card generation rate

### Social activation

- Friend request acceptance rate
- Percentage of users with at least one friend
- Battle Rallies created per active user
- Join and attendance rates

### Retention

- Four-week returning profile rate
- Repeat Rally participation
- Favorite and status updates

### League readiness

- Weekly challenge participation
- Evidence submission completion
- Review turnaround
- Dispute and rejection rates
- Percentage of submissions that can be consistently categorized
