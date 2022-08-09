import "reflect-metadata";
import express from "express";
import "express-async-errors";
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUI from "swagger-ui-express";

import { Logger } from "@shared/logger";

// eslint-disable-next-line import/extensions
import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import "../typeorm";
import "@shared/container";
import { errorVerification } from "./middlewares/errorVerification";
import { logger } from "./middlewares/logger";

const app = express();
app.use(express.json());
app.use(logger);
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(errorVerification);

app.listen(8080, () => Logger.info("Server is running!"));
