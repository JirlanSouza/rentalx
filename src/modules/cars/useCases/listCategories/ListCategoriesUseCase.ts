import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

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
