import Elysia from "elysia";
import {
    miscController,
    postsController,
} from "./controllers";
import { swaggerPlugin } from "./plugins";
import { Logger } from "./utils";

export const app = () => {
    return new Elysia({ aot: false })
        .use(swaggerPlugin)
        .decorate("logger", Logger)
        .use(miscController)
        .use(postsController);
};

export type App = ReturnType<typeof app>;
