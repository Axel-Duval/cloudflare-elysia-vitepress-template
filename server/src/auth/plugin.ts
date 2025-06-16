import { Elysia } from "elysia";
import { verify } from "./verify";
import { login } from "./login";
import { register } from "./register";

export const auth = new Elysia({
    prefix: "/auth",
    aot: false,
})
    .use(register)
    .use(login)
    .use(verify);
