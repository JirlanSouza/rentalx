import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    await this.repository.create({ name, description });
  }
}
