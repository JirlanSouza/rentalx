import "reflect-metadata";
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUI from "swagger-ui-express";

// eslint-disable-next-line import/extensions
import swaggerFile from "./swagger.json";

import { router } from "./routes/index";
import { Logger } from "./shared/logger/index";
import { logger } from "./middlewares/logger";
import "./database";
import "./shared/container";

const app = express();
app.use(express.json());
app.use(logger);
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(8080, () => Logger.info("Server is running!"));
