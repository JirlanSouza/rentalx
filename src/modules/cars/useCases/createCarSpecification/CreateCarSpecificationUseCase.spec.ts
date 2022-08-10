/* eslint-disable no-undef */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { SpecificationsInMemoryRepository } from "@modules/cars/repositories/in-memory/SpecificationsInMemoryRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsInMemoryRepository: ICarsRepository;
let specificationsInMemoryRepository: ISpecificationsRepository;

describe("Create car specification", () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    specificationsInMemoryRepository = new SpecificationsInMemoryRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsInMemoryRepository,
      specificationsInMemoryRepository
    );
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsInMemoryRepository.create({
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    const specification = await specificationsInMemoryRepository.create({
      name: "new specification",
      description: "A new specification",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("Should not be able to add a new specification to a non existent car", () => {
    expect(async () => {
      const car_id = "123456";
      const specifications_id = ["123", "1254"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
