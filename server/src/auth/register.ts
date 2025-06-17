import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { users } from "../../database/schema";
import { getDB } from "../utils/vars";
import { registerModel } from "./setup";

export const register = new Elysia({ aot: false })
    .use(registerModel)
    .get("toto", async () => {
        const db = getDB();
        return await db.select().from(users);
    })
    .post(
        "/register",
        async function handler({ body, status }) {
            const db = getDB();

            // Check if email already exists
            const userEntries = await db
                .select()
                .from(users)
                .where(eq(users.email, body.email))
                .limit(1);

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
