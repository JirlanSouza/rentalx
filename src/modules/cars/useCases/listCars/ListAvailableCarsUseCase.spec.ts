/* eslint-disable no-undef */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsInMemoryRepository: ICarsRepository;

describe("List cars", () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsInMemoryRepository
    );
  });

  it("Should be able list all available cars", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const car = await carsInMemoryRepository.create(carData);
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const car = await carsInMemoryRepository.create(carData);
    const cars = await listAvailableCarsUseCase.execute({ name: carData.name });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const car = await carsInMemoryRepository.create(carData);
    const cars = await listAvailableCarsUseCase.execute({
      category_id: carData.category_id,
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const carData = {
      name: "New car",
      description: "A new car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    };

    const car = await carsInMemoryRepository.create(carData);
    const cars = await listAvailableCarsUseCase.execute({
      brand: carData.brand,
    });

    expect(cars).toEqual([car]);
  });
});
