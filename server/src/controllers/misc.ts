import Elysia from "elysia";

export const miscController = new Elysia({
    aot: false,
})
    .get("/time", () => new Date().toISOString(), {
        detail: {
            description: "Get the current server time",
        },
    })
    .get("/health", () => "OK", {
        detail: {
            description: "Check if the server is healthy",
        },
    });
