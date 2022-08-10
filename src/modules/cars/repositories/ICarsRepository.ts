import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAvailableCarsInDTO } from "../dtos/IListAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findByAvailable(filter: IListAvailableCarsInDTO): Promise<Car[]>;
}
