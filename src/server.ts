import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUI from "swagger-ui-express";

// eslint-disable-next-line import/extensions
import swaggerFile from "./swagger.json";

import { router } from "./routes/index";

const app = express();
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(8080, () => console.info("Server is running!"));
