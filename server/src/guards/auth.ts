import Elysia from "elysia";
import { jwtChecker } from "../utils/jwt";
import { tryCatch } from "../utils/catchError";
import bearer from "@elysiajs/bearer";
import { userService } from "../services";
import { JWTPayload } from "jose";

type JWTPayloadWithPermissions = JWTPayload & {
    sub: string;
    permissions: string[];
};

export const authGuard = (app: Elysia) =>
    app
        .guard({
            detail: {
                description: "Require user to be logged in",
            },
        })
        .use(bearer())
        .derive(async ({ bearer, status }) => {
            if (!bearer) {
                return status(
                    401,
                    "Bearer token is required"
                );
            }

            const [error, token] = await tryCatch(
                jwtChecker<JWTPayloadWithPermissions>(
                    bearer
                )
            );

            if (error) {
                return status(
                    401,
                    "Bearer token is invalid"
                );
            }

            const { sub, permissions } = token.payload;

            // Register user if not exists
            await userService.addUser(sub);

            return { sub, permissions };
        });
