# Product Specification

## Product thesis

MusouDB is the open data, identity, and connection layer for Warriors fandom. It should help fans explore the franchise, express what they love, track their experience, and find people to play with.

The open repository must remain useful on its own, without publisher-owned assets or private user data.

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
- Recurring appearances

### Weapon

- Stable internal ID
- Display name
- Weapon type
- Character associations
- Game appearances
- Unlock or acquisition notes
- Playstyle tags

### Warrior Record

- Username and display name
- Bio and time zone
- Favorite games, characters, factions, weapons, and battlefields
- Owned, completed, wishlisted, or currently played games
- Platform identities and gamertags
- Privacy level for every platform identity
- Playstyle, difficulty, availability, and looking-for-group status
- Collection, checklist, and accomplishment summaries

No precise location, legal name, or date of birth should be required.

### Collection Entry

- Player
- Entity type and stable entity ID
- Status such as favorite, owned, completed, mastered, or wishlist
- Optional progress value
- Optional personal note
- Visibility
- Created and updated timestamps

### Friendship

- Requester and recipient
- Pending, accepted, blocked, or removed state
- Created and updated timestamps

Friendship must be mutual. Following may be considered later as a separate one-way relationship.

### Circle

- Name and description
- Related game, character, faction, platform, or theme
- Owner and moderators
- Public, private, or invite-only visibility
- Membership and community guidelines

Circles are a later-stage feature and should not be required for the initial social experience.

### Battle Rally

- Organizer
- Game and platform
- Session type
- Battlefield or objective
- Start and expected end time
- Time-zone normalization
- Capacity and attendees
- Difficulty and preferences
- External voice-chat link or instructions
- Public, friends-only, or invite-only visibility
- Status and recap

## Privacy defaults

- Gamertags default to friends-only
- Discord and streaming links are optional
- Session visibility defaults to friends-only
- Search-engine indexing of profiles requires opt-in
- Location discovery uses user-selected broad region labels, not GPS
- Direct messaging is out of scope for the initial release
- Every user should be able to export or delete their profile data

## MVP

The first hosted MVP should include:

1. Public game, character, weapon, and battlefield explorer
2. Authentication
3. Warrior Record creation
4. Favorites and game library
5. Collection and checklist tracking
6. Platform identities with privacy controls
7. Friend requests
8. Battle Rally creation and joining
9. Shareable profile cards

## Explicitly out of scope for MVP

- Direct messaging
- Native voice or video chat
- Gameplay-video hosting
- Competitive adjudication
- Cash prizes or paid tournaments
- Publisher-owned art or media without permission

## Success metrics

### Discovery

- Search-to-detail-view rate
- Records viewed per visit
- Checklist or favorite actions after discovery
- Returning usage of reference pages

### Identity activation

- Profile completion rate
- Favorites selected per activated profile
- Game library additions
- Platform identity connection rate
- Share-card generation rate

### Social activation

- Friend request acceptance rate
- Percentage of users with at least one friend
- Battle Rallies created per active user
- Join and attendance rates
- Connections formed through shared interests

### Retention

- Four-week returning profile rate
- Repeat Rally participation
- Collection and status updates
- Return visits to track progress or explore another game

## Product principle

MusouDB should feel like a fan-built home, not an esports operator, publisher impersonation, or generic social network with Warriors branding added on top.
