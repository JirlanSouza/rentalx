import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsInDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return this.repository.save(car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate: licensePlate });
    return car;
  }

  findByAvailable({
    name,
    category_id,
    brand,
  }: IListAvailableCarsInDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available =:available", { available: true });

    if (name) {
      carsQuery.where("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.where("c.category_id = :category_id", { category_id });
    }

    if (brand) {
      carsQuery.where("c.brand = :brand", { brand });
    }

    return carsQuery.getMany();
  }
}
