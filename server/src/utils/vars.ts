import type { DrizzleD1Database } from "drizzle-orm/d1";

type AppDatabase = DrizzleD1Database<
    typeof import("../../database/schema")
>;

export interface Env {
    DB: D1Database;
    JWT_ACCESS_SECRET: string;
    FRONTEND_URL: string;
}

let singleton: AppDatabase;

export const setDB = (db: AppDatabase) => {
    singleton = db;
};

export const getDB = () => {
    if (!singleton) {
        throw new Error(
            "Database not initialized. Call setDB first."
        );
    }
    return singleton;
};
