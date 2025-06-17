import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { users } from "../../database/schema";
import { getDB } from "../utils/vars";
import { jwtAccessSetup } from "./setup";

export const authGuard = (app: Elysia) =>
    app
        .use(jwtAccessSetup)
        .derive(
            async ({
                jwtAccess,
                cookie: { accessToken },
                status,
            }) => {
                const jwt = accessToken.value;
                if (!jwt) {
                    return status(
                        401,
                        "Access token is required"
                    );
                }

                const payload = await jwtAccess.verify(jwt);
                if (!payload) {
                    return status(
                        401,
                        "Access token is invalid"
                    );
                }

                const db = getDB();
                const userEntries = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, payload.id))
                    .limit(1);

                if (!userEntries.length) {
                    return status(
                        401,
                        "Access token is invalid"
                    );
                }

                return { user: userEntries[0] };
            }
        );
