import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });
    return this.repository.save(carImage);
  }
}
