import { Category } from "../model/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create(data: ICreateCategoryDTO): void {
    const category = new Category(data.name, data.description);
    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
