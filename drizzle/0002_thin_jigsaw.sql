CREATE TABLE "speed_test_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"wpm" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"testDuration" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "avgAccuracy" integer;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "bestWpm" integer;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "speed_test_results" ADD CONSTRAINT "speed_test_results_user_id_user_details_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_details"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "bestTime";