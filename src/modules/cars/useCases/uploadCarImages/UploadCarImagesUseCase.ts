import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface ICreateCarInDTO {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: ICreateCarInDTO): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create({ car_id, image_name });
    });
  }
}
