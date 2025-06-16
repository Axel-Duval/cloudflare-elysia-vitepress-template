import { Elysia } from "elysia";
import { loginModel } from "./setup";
import { getDB, getEnv } from "../utils/typedi";
import { login_codes, users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { getCode } from "../utils/codeGenerator";

export const login = new Elysia().use(loginModel).post(
    "/login",
    async function handler({ body, status }) {
        const db = getDB();

        // Get the user by email
        try {
            const userEntries = await db
                .select()
                .from(users)
                .where(eq(users.email, body.email));
        } catch (error) {
            console.error("Database error:", error);
            return status(500, "Internal server error");
        }

        const userEntries = await db
            .select()
            .from(users)
            .where(eq(users.email, body.email));

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
