/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import createConnection from "../typeorm";
import "@shared/container";
import { errorVerification } from "./middlewares/errorVerification";
import { logger } from "./middlewares/logger";

if (process.env.NODE_ENV !== "test") {
  createConnection();
}

const app = express();
app.use(express.json());
app.use(logger);
app.use(router);

if (process.env.NODE_ENV !== "test") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
}

app.use(errorVerification);

export { app };
