ALTER TABLE "personalization" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "personalization" ALTER COLUMN "custom-theme" SET DEFAULT 'default';--> statement-breakpoint
ALTER TABLE "personalization" ADD CONSTRAINT "personalization_user_id_unique" UNIQUE("user_id");