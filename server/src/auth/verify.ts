import cookie from "@elysiajs/cookie";
import { and, eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { login_codes, users } from "../../database/schema";
import { getDB } from "../utils/vars";
import { basicAuthModel, jwtAccessSetup } from "./setup";

export const verify = new Elysia({ aot: false })
    .use(basicAuthModel)
    .use(cookie())
    .use(jwtAccessSetup)
    .post(
        "/verify",
        async function handler({
            body,
            status,
            jwtAccess,
            cookie: { access_token },
        }) {
            const db = getDB();

            // Check if the email is already in use
            const loginCodesEntries = await db
                .select()
                .from(login_codes)
                .where(
                    and(
                        eq(login_codes.email, body.email),
                        eq(login_codes.code, body.code)
                    )
                )
                .limit(1);

            if (!loginCodesEntries.length) {
                return status(401, "Invalid email or code");
            }

            const loginCode = loginCodesEntries[0];

            // Delete login code
            await db
                .delete(login_codes)
                .where(eq(login_codes.id, loginCode.id));

            // Check if the code has expired
            const now = new Date();
            if (new Date(loginCode.expiresAt) < now) {
                return status(401, "Code has expired");
            }

            // Get the user by email
            const userEntries = await db
                .select()
                .from(users)
                .where(eq(users.email, loginCode.email))
                .limit(1);

            if (!userEntries.length) {
                return status(
                    401,
                    "No user found for this code"
                );
            }

            const user = userEntries[0];

            // Verify the user if not already verified
            if (!user.verified) {
                await db
                    .update(users)
                    .set({ verified: true })
                    .where(eq(users.id, user.id));
            }

            const accessToken = await jwtAccess.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            });

            access_token.set({
                value: accessToken,
                httpOnly: true,
                maxAge: 100 * 86400, // 100 days
            });

            return { accessToken };
        },
        { body: "basicAuthModel" }
    );
