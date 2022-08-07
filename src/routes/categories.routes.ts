import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory/index";
import listCategoriesController from "../modules/cars/useCases/listCategories/index";
import { Logger } from "../shared/logger/index";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", async (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  await createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", async (request, response) => {
  Logger.info(`${request.method} => ${request.originalUrl}`);
  await listCategoriesController().handle(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  async (request, response) => {
    Logger.info(`${request.method} => ${request.originalUrl}`);
    await importCategoryController().handle(request, response);
  }
);

export { categoriesRoutes };
