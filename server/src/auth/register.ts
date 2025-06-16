import { Elysia } from "elysia";
import { registerModel } from "./setup";
import { getDB } from "../utils/typedi";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";

export const register = new Elysia()
    .use(registerModel)
    .post(
        "/register",
        async function handler({ body, status }) {
            const db = getDB();

            // Check if email already exists
            const userEntries = await db
                .select()
                .from(users)
                .where(eq(users.email, body.email));

            if (userEntries.length) {
                return status(409, "Email already exists");
            }

            // Add the user to the database
            await db.insert(users).values({
                username: body.username,
                email: body.email,
            });

            return status(200, "User registered");
        },
        { body: "registerModel" }
    );
