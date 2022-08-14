/* eslint-disable no-undef */
import { RentalsInMemoryRepository } from "@modules/rentals/repositories/inMemory/RentalsInMemoryRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementation/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsInMemoryRepository: IRentalsRepository;
let dateProvider: IDateProvider;
let dateNowAfter24Hours: Date;

describe("Create rental", () => {
  beforeEach(() => {
    rentalsInMemoryRepository = new RentalsInMemoryRepository();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsInMemoryRepository,
      dateProvider
    );

    dateNowAfter24Hours = dateProvider.addHour(24);
  });

  it("Should be able to create a new rental", async () => {
    const rentalData = {
      user_id: "123456",
      car_id: "123456",
      expected_return_date: dateNowAfter24Hours,
    };

    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      const rentalData = {
        user_id: "123456",
        car_id: "123456",
        expected_return_date: dateNowAfter24Hours,
      };

      await rentalsInMemoryRepository.create(rentalData);

      const rentalDataTwo = {
        user_id: "123456",
        car_id: "234567",
        expected_return_date: dateNowAfter24Hours,
      };

      await createRentalUseCase.execute(rentalDataTwo);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      const rentalData = {
        user_id: "123456",
        car_id: "123456",
        expected_return_date: dateNowAfter24Hours,
      };

      await rentalsInMemoryRepository.create(rentalData);

      const rentalDataTwo = {
        user_id: "234567",
        car_id: "123456",
        expected_return_date: dateNowAfter24Hours,
      };

      await createRentalUseCase.execute(rentalDataTwo);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const dateNowAfter9Hours = dateProvider.addHour(9);

      const rentalData = {
        user_id: "123456",
        car_id: "123456",
        expected_return_date: dateNowAfter9Hours,
      };

      await createRentalUseCase.execute(rentalData);
    }).rejects.toBeInstanceOf(AppError);
  });
});
