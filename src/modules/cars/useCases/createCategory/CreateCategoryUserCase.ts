import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.repository.create({ name, description });
  }
}
