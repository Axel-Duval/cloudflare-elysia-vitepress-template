import { eq } from "drizzle-orm";
import { users } from "../../database/schema";
import { generateUsername, getDB } from "../utils";

const addUser = async (id: string) => {
    const db = getDB();

    // Check if the user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    if (existingUser.length) {
        return existingUser[0];
    }

    // Insert the new user into the database
    const userEntity = await db
        .insert(users)
        .values({ id, username: generateUsername() })
        .returning();

    return userEntity;
};

export const userService = {
    addUser,
};
