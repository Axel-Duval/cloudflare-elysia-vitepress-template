import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
});

export const posts = sqliteTable("posts", {
    id: text("id", { length: 24 })
        .primaryKey()
        .$defaultFn(() => createId()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),
    content: text("content").notNull(),
});

export type User = typeof users.$inferSelect;
export type Post = typeof posts.$inferSelect;
