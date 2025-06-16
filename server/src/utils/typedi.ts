import type { DrizzleD1Database } from "drizzle-orm/d1";

export const Container = new Map<string, any>();

type AppDatabase = DrizzleD1Database<
    typeof import("../../database/schema")
>;

export interface Env {
    DB: D1Database;
    JWT_ACCESS_SECRET: string;
    FRONTEND_URL: string;
}

const defaultEnv: Env = {
    DB: {} as D1Database, // Placeholder, should be replaced with actual D1Database instance
    JWT_ACCESS_SECRET: "x",
    FRONTEND_URL: "http://localhost:3000",
};
export const getEnv = (): Env =>
    Container.get("env") || defaultEnv;
export const getDB = (): AppDatabase =>
    Container.get("DrizzleDB");
