ALTER TABLE `posts` RENAME TO `login_codes`;--> statement-breakpoint
ALTER TABLE `login_codes` RENAME COLUMN "title" TO "email";--> statement-breakpoint
ALTER TABLE `login_codes` RENAME COLUMN "content" TO "code";--> statement-breakpoint
ALTER TABLE `login_codes` RENAME COLUMN "created_at" TO "expires_at";--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_login_codes` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`email` text(24) NOT NULL,
	`code` text(7) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_login_codes`("id", "email", "code", "expires_at") SELECT "id", "email", "code", "expires_at" FROM `login_codes`;--> statement-breakpoint
DROP TABLE `login_codes`;--> statement-breakpoint
ALTER TABLE `__new_login_codes` RENAME TO `login_codes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;