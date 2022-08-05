import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/crateSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) =>
  createSpecificationController.handle(request, response)
);

export { specificationRoutes };
