import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();
const specificationsRepository = new SpecificationRepository();

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateSpecificationService(
    specificationsRepository
  );

  try {
    createCategoryService.execute({ name, description });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

  return response.status(201).end();
});

// specificationRoutes.get("/", (request, response) => {
//   const allCategories = specificationsRepository.list();

//   return response.json(allCategories);
// });

export { specificationRoutes };
