import Elysia, { t } from "elysia";
import { getDB } from "../utils";
import { posts } from "../../database/schema";
import { eq } from "drizzle-orm";
import { authGuard } from "../guards";

export const postsController = new Elysia({
    aot: false,
    prefix: "/posts",
    tags: ["Posts"],
    detail: {
        description: "Controller for managing posts",
    },
})
    .use(authGuard)
    .get(
        "",
        async () => {
            const db = getDB();

            const postsEntities = await db
                .select()
                .from(posts);

            return postsEntities;
        },
        {
            detail: {
                description: "Get all posts",
            },
        }
    )
    .post(
        "/",
        async ({ body, sub }) => {
            const db = getDB();

            const postEntity = await db
                .insert(posts)
                .values({
                    userId: sub,
                    content: body.content,
                })
                .returning();
            return postEntity;
        },
        {
            body: t.Object({
                content: t.String({
                    description: "Content of the post",
                    minLength: 1,
                    maxLength: 500,
                }),
            }),
            detail: {
                description: "Create a new post",
            },
        }
    )
    .get(
        "/:id",
        async ({ params }) => {
            const db = getDB();

            const postsEntities = await db
                .select()
                .from(posts)
                .where(eq(posts.id, params.id))
                .limit(1);

            if (!postsEntities.length) {
                return {
                    status: 404,
                    message: "Post not found",
                };
            }

            return postsEntities[0];
        },
        {
            params: t.Object({
                id: t.String({
                    minLength: 24,
                    maxLength: 24,
                    description: "ID of the post",
                }),
            }),
            detail: {
                description: "Get a post by ID",
            },
        }
    );
