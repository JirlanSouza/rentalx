import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsInDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsInMemoryRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findByAvailable({
    name,
    category_id,
    brand,
  }: IListAvailableCarsInDTO): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available &&
        ((name ? car.name === name : true) ||
          (category_id ? car.category_id === category_id : true) ||
          (brand ? car.brand === brand : true))
    );
  }
}
