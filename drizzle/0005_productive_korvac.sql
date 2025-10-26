ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "categories" CASCADE;--> statement-breakpoint
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "category_id";