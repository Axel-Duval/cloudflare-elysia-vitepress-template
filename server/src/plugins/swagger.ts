import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export const swaggerPlugin = (app: Elysia) => {
    return app.use(
        swagger({
            path: "/openapi",
            documentation: {
                info: {
                    title: "API Documentation",
                    version: "1.0.0",
                    description:
                        "API documentation for your service",
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                            description:
                                "Use a valid JWT token for authentication",
                        },
                    },
                },
            },
        })
    );
};
