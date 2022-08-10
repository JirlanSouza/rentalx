import { IListAvailableCarsInDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    category_id,
    brand,
  }: IListAvailableCarsInDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findByAvailable({
      name,
      category_id,
      brand,
    });

    return cars;
  }
}
