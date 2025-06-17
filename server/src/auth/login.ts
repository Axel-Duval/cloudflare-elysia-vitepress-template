import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { login_codes, users } from "../../database/schema";
import { getCode } from "../utils/codeGenerator";
import { getDB } from "../utils/vars";
import { loginModel } from "./setup";

export const login = new Elysia({ aot: false })
    .use(loginModel)
    .post(
        "/login",
        async function handler({ body, status }) {
            const db = getDB();

            const userEntries = await db
                .select()
                .from(users)
                .where(eq(users.email, body.email))
                .limit(1);

            if (!userEntries.length) {
                return status(401, "No user found");
            }

            const user = userEntries[0];

            // Generate a random code
            const code = getCode();

            // Add the code to the database
            await db.insert(login_codes).values({
                email: user.email,
                code,
                expiresAt: new Date(
                    Date.now() + 10 * 60 * 1000 // Expires in 10 minutes
                ).toISOString(),
            });

            // Send code to the user's email
            console.log(code); //todo: Replace with actual email sending logic

            return status(200, "Code sent to email");
        },
        { body: "loginModel" }
    );
