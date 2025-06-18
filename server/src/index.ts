import { drizzle } from "drizzle-orm/d1";
import Elysia from "elysia";
import * as schema from "../database/schema";
import { setDB, type Env } from "./utils";
import { app } from "./app";

export default {
    async fetch(request: Request, env: Env) {
        setDB(drizzle(env.DB, { schema }));
        const resp = await new Elysia({ aot: false })
            .use(app)
            .handle(request);
        return resp;
    },
};
