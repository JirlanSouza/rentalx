import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/crateSpecification";
import { Logger } from "../shared/logger/index";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  createSpecificationController.handle(request, response);
});

export { specificationRoutes };
