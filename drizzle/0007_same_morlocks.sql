ALTER TABLE "comments" ALTER COLUMN "blog_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "blog_id" DROP NOT NULL;