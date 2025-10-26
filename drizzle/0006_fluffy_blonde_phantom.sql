ALTER TABLE "comments" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "blog_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "blog_id" SET NOT NULL;