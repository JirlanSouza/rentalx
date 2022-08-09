/* eslint-disable no-undef */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsInMemoryRepository: ICarsRepository;

describe("create car", () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    createCarUseCase = new CreateCarUseCase(carsInMemoryRepository);
  });

  it("Should be able to create a new car", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const createdCar = await createCarUseCase.execute(carData);

    expect(createdCar).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      const carData = {
        name: "New car",
        description: "A new car",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Car brand",
        category_id: "category",
      };

      const carTwoData = {
        name: "New two car",
        description: "A new two car",
        daily_rate: 120,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Two Car brand",
        category_id: "category",
      };

      await createCarUseCase.execute(carData);

      await createCarUseCase.execute(carTwoData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with available true by default", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const createdCar = await createCarUseCase.execute(carData);

    expect(createdCar.available).toBe(true);
  });
});
