
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { blogs } from "./blog";
import { relations } from "drizzle-orm";

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  blogId: integer("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [likes.blogId],
    references: [blogs.id],
  }),
}));
