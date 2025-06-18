import Elysia from "elysia";
import { app } from "../src/app";

const FILE_PATH = "openapi.json";

const request = new Request(
    "http://localhost:8787/openapi/json",
    {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
);

async function generateOpenApiJson() {
    try {
        const response = await new Elysia()
            .use(app)
            .handle(request);

        //Transform the response to a JSON object
        const json = await response.json();

        // Write the JSON object to a file
        await Bun.write(
            FILE_PATH,
            JSON.stringify(json, null, 2)
        );

        console.log("🧭 OpenAPI document saved");
    } catch (error) {
        console.error(
            "❌ Error generating OpenAPI document:",
            error
        );
    }
}

generateOpenApiJson();
