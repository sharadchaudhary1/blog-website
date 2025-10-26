

import { pgTable, serial, text, timestamp, varchar, jsonb, integer, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  content: text("content").notNull(),
  url: text("url"),
  urlToImage: text("url_to_image"),
  source: jsonb("source").$type<{ id: string | null; name: string }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  author: one(users, {
    fields: [blogs.authorId],
    references: [users.id],
  }),
}));
