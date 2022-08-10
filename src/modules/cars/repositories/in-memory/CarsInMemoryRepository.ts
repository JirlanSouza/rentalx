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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    if (id) {
      const existsCar = this.cars.find((car) => car.id === id);

      if (existsCar) {
        Object.assign(existsCar, {
          name,
          description,
          daily_rate,
          license_plate,
          fine_amount,
          brand,
          category_id,
          specifications,
          id,
        });

        return existsCar;
      }
    }

    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
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

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }
}
