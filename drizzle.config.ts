import { Config } from "drizzle-kit";

const config: Config = {
    out: "drizzle/migrations",
    schema: "server/database/schema.ts",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_DRIZZLE_TOKEN!,
    },
};

export default config satisfies Config;
