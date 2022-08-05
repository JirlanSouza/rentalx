import { Category } from "../../model/Category";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  constructor(private repository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.repository.list();
    return categories;
  }
}
