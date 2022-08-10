import { ICreateCarSpecificationsDTO } from "@modules/cars/dtos/ICreateCarSpecificationsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationsDTO): Promise<Car> {
    const existsCar = await this.carsRepository.findById(car_id);

    if (!existsCar) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    existsCar.specifications = specifications;
    const car = await this.carsRepository.create(existsCar);

    return car;
  }
}
