import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  try {
    createCategoryService.execute({ name, description });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

  return response.status(201).end();
});

categoriesRoutes.get("/", (request, response) => {
  const allCategories = categoriesRepository.list();

  return response.json(allCategories);
});

export { categoriesRoutes };
