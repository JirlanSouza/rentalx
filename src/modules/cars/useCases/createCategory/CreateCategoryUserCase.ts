import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

export interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.repository.create({ name, description });
  }
}
