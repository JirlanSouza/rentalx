import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private repository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specification = await this.repository.findByName(name);

    if (specification) {
      throw new AppError("Specification already exists!");
    }

    await this.repository.create({ name, description });
  }
}
