import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory/index";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/index";
import { Logger } from "../shared/logger/index";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  importCategoryController.handle(request, response);
});

export { categoriesRoutes };
