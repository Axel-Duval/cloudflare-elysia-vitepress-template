import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { getEnv } from "../utils/typedi";
import { auth } from "../auth/plugin";

export function app() {
    return new Elysia({ aot: false })
        .use(
            cors({
                aot: false,
                origin: [
                    getEnv().FRONTEND_URL,
                    "localhost:3333",
                ],
                methods: "*",
                maxAge: 600,
                preflight: true,
                credentials: true,
            })
        )
        .onRequest(({ set }) => {
            // https://github.com/elysiajs/elysia-cors/issues/41#issuecomment-2282638086
            set.headers[
                "access-control-allow-credentials"
            ] = "true";
        })
        .get("/ping", () => "pong")
        .use(auth)
        .get("/private", () => "hello from private route");
}

export type App = ReturnType<typeof app>;
