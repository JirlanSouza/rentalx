import { Category } from "../model/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class PostgresCategoryRepository implements ICategoryRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    return null;
  }

  create(data: ICreateCategoryDTO): void {
    console.log(data);
    return null;
  }
}
