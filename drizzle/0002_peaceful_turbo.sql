CREATE TABLE `officer_claims` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`officer_id` text NOT NULL,
	`claimant_email` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`claimed_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `active_officer_claim_unique` ON `officer_claims` (`officer_id`);--> statement-breakpoint
CREATE TABLE `structured_contributions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`officer_id` text NOT NULL,
	`author_email` text NOT NULL,
	`biography` text DEFAULT '' NOT NULL,
	`gameplay` text DEFAULT '' NOT NULL,
	`weapon` text DEFAULT '' NOT NULL,
	`battles_json` text DEFAULT '[]' NOT NULL,
	`relationships_json` text DEFAULT '[]' NOT NULL,
	`unlock_condition` text DEFAULT '' NOT NULL,
	`spoiler_notes` text DEFAULT '' NOT NULL,
	`source_url` text NOT NULL,
	`source_note` text DEFAULT '' NOT NULL,
	`approved_fields_json` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`editor_note` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
