CREATE TABLE `citations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_type` text NOT NULL,
	`record_id` text NOT NULL,
	`label` text NOT NULL,
	`url` text NOT NULL,
	`source_kind` text NOT NULL,
	`verified_at` text
);
--> statement-breakpoint
CREATE TABLE `contributions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author_email` text NOT NULL,
	`record_type` text NOT NULL,
	`record_id` text NOT NULL,
	`summary` text NOT NULL,
	`source_url` text NOT NULL,
	`source_note` text DEFAULT '' NOT NULL,
	`spoiler_class` text DEFAULT 'safe' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`editor_note` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `favorite_officers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`officer_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_officer_unique` ON `favorite_officers` (`profile_id`,`officer_id`);--> statement-breakpoint
CREATE TABLE `game_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`game_id` text NOT NULL,
	`status` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `game_progress_unique` ON `game_progress` (`profile_id`,`game_id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`handle` text NOT NULL,
	`display_name` text NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`favorite_faction` text DEFAULT 'UNALIGNED' NOT NULL,
	`platforms_json` text DEFAULT '[]' NOT NULL,
	`gamertags_json` text DEFAULT '[]' NOT NULL,
	`gamertags_public` integer DEFAULT false NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_handle_unique` ON `profiles` (`handle`);--> statement-breakpoint
CREATE TABLE `revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_type` text NOT NULL,
	`record_id` text NOT NULL,
	`version` integer NOT NULL,
	`summary` text NOT NULL,
	`contributor` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `revision_version_unique` ON `revisions` (`record_type`,`record_id`,`version`);