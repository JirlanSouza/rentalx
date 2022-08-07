import { Category } from "../entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(userName: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): void;
}
