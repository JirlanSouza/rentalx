import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();
    return categories;
  }
}
