CREATE TABLE "personalization" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"custom-theme" varchar(128)
);
--> statement-breakpoint
CREATE TABLE "user_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"totalTests" integer DEFAULT 0,
	"avgWpm" integer,
	"bestTime" integer,
	CONSTRAINT "user_details_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "personalization" ADD CONSTRAINT "personalization_user_id_user_details_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_details"("user_id") ON DELETE cascade ON UPDATE no action;