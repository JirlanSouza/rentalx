import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  constructor(private repository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();
    return categories;
  }
}
