CREATE TABLE "physician_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
