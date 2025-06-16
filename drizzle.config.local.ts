import { Config } from "drizzle-kit";

const config: Config = {
    out: "drizzle/migrations",
    schema: "server/database/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/b7151d99dbcbbcf9391a8ce69b815ac3a1cb1eaf06ec658e61a99cbf72b0da71.sqlite",
    },
};

export default config satisfies Config;
