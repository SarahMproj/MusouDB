# League and Verification Model

## Purpose

MusouDB should earn trust before it claims competitive authority. Rankings must disclose the evidence behind every result and keep casual participation separate from certified records.

## Verification tiers

### Level 0 — Chronicle

A player records an accomplishment without evidence.

- Visible on the player's Warrior Record
- Eligible for personal history and informal badges
- Not eligible for certified leaderboards

### Level 1 — Witnessed

A public evidence URL is reviewed by trusted community members.

- Minimum reviewer reputation may be required
- Conflicts of interest must be disclosed
- Suitable for community boards
- Reversible when later evidence shows an error

### Level 2 — Certified

A moderator reviews a submission against a published challenge ruleset.

Minimum evidence may include:

- Full setup screen showing game version and relevant settings
- A challenge-specific code displayed or spoken before the run
- Continuous footage through the result screen
- Visible HUD unless the challenge explicitly permits otherwise
- Public evidence URL controlled by the submitting player
- Platform, patch, character, weapon, item, and mod declarations

Certified results are eligible for official MusouDB rankings.

### Level 3 — Machine-assisted

Automated systems may extract or flag:

- Timer and KO count
- Battlefield, difficulty, character, and result state
- Duplicate footage
- Abrupt discontinuities
- Metadata inconsistencies

Machine output is advisory. Automated systems must not make final cheating determinations or irreversible disqualifications.

### Level 4 — Partner-verified

Future publisher, platform, telemetry, or replay integrations may provide first-party verification.

This tier must not be represented as available until a formal integration exists.

## Ranking partitions

Competitive records must be partitioned by the variables that materially affect performance:

- Game and edition
- Platform
- Patch or version
- Battlefield and route
- Difficulty
- Character and weapon class when relevant
- Solo or multiplayer
- Standard, accessibility-adjusted, and modded rulesets
- Full run or individual battle

Modded and unmodded results must never share the same competitive board.

## Pilot format

The first league pilot should be a non-cash invitational season with three challenge types:

1. **Speed:** Complete an eligible battlefield under published conditions.
2. **Dominance:** Maximize a defined score such as KOs or objective points within a fixed period.
3. **Mastery:** Complete a constrained challenge using a specified character, weapon, or ruleset.

The pilot should test submission behavior, reviewer workload, dispute frequency, and spectator appeal—not declare a definitive world champion.

## Reviewer operations

Every review decision should include:

- Reviewer identity
- Decision timestamp
- Ruleset version
- Approved, rejected, or more-information-needed status
- Structured reason codes
- Optional notes

High-value records should require two independent reviews. Reviewers may not certify their own submissions or those of household members, teammates, or direct business partners.

## Appeals

Players receive one standard appeal per rejected submission.

- Appeals must identify a specific factual or rules interpretation error
- An uninvolved reviewer handles the appeal
- The appeal outcome and rationale are logged
- Rules cannot be changed retroactively to invalidate a previously valid result except for security, fraud, or legal reasons

## Anti-fraud principles

- Preserve an immutable audit trail
- Hash evidence URLs and key metadata for duplicate detection
- Rate-limit submissions and reviews
- Use challenge-specific codes for prestigious events
- Publish rules before a challenge opens
- Separate integrity flags from public accusations
- Never label a player a cheater based only on automated confidence

## Cash prizes

Cash prizes, paid entry, wagering, and chance-based rewards are out of scope until legal counsel reviews contest, gambling, tax, eligibility, and regional requirements. Sponsorship and non-cash recognition may be piloted earlier under written rules.
