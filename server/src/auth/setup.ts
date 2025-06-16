import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { getEnv } from "../utils/typedi";

export const loginModel = new Elysia().model({
    loginModel: t.Object({
        email: t.String({ format: "email" }),
    }),
});

export const registerModel = new Elysia().model({
    registerModel: t.Object({
        email: t.String({ format: "email" }),
        username: t.String({
            minLength: 3,
            maxLength: 20,
        }),
    }),
});

export const basicAuthModel = new Elysia().model({
    basicAuthModel: t.Object({
        email: t.String({ format: "email" }),
        code: t.String({
            pattern: "^[0-9A-Z]{3}-[0-9A-Z]{3}$",
        }),
    }),
});

export const jwtAccessSetup = new Elysia({
    name: "jwtAccess",
}).use(
    jwt({
        name: "jwtAccess",
        schema: t.Object({
            id: t.String(),
            username: t.String(),
            email: t.String({ format: "email" }),
        }),
        secret: process.env.JWT_ACCESS_SECRET!,
        exp: "100d",
    })
);
