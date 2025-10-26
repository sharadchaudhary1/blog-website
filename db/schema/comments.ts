

import { pgTable, serial, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { blogs } from "./blog";


export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  blogId: integer("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [comments.blogId],
    references: [blogs.id],
  }),
}));
