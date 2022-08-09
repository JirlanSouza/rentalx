/* eslint-disable no-undef */
import { AppError } from "@shared/errors/AppError";
import { CategoriesInMemoryRepository } from "@modules/cars/repositories/in-memory/CategoriesInMemoryRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUserCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesInMemoryRepository: CategoriesInMemoryRepository;

describe("Create category", () => {
  beforeEach(() => {
    categoriesInMemoryRepository = new CategoriesInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesInMemoryRepository
    );
  });

  it("Should be able to create a new category", async () => {
    const categoryData = {
      name: "New category",
      description: "A new category",
    };

    await createCategoryUseCase.execute(categoryData);

    const categoryCreated = await categoriesInMemoryRepository.findByName(
      categoryData.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able create a new category with name exists", async () => {
    expect(async () => {
      const categoryData = {
        name: "New category",
        description: "A new category",
      };

      await createCategoryUseCase.execute(categoryData);
      await createCategoryUseCase.execute(categoryData);
    }).rejects.toBeInstanceOf(AppError);
  });
});
