CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"content" text NOT NULL,
	"description" text,
	"source" jsonb,
	"title" varchar(500) NOT NULL,
	"url" text NOT NULL,
	"url_to_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
