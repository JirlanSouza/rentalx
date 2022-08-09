import { Category } from "@modules/cars/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesInMemoryRepository implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(userName: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category.name === userName
    );

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category(data.name, data.description);
    this.categories.push(category);
  }
}
