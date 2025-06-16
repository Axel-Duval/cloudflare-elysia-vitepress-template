import {
    integer,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const users = sqliteTable("users", {
    id: text("id", { length: 24 })
        .primaryKey()
        .$defaultFn(() => createId()),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    verified: integer({ mode: "boolean" })
        .default(false)
        .notNull(),
    createdAt: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: text("updated_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export const login_codes = sqliteTable("login_codes", {
    id: text("id", { length: 24 })
        .primaryKey()
        .$defaultFn(() => createId()),
    email: text("email", { length: 24 })
        .notNull()
        .references(() => users.email, {
            onDelete: "cascade",
        }),
    code: text("code", { length: 7 }).notNull(),
    expiresAt: text("expires_at").notNull(),
});

export type User = typeof users.$inferSelect;
export type LoginCode = typeof login_codes.$inferSelect;
