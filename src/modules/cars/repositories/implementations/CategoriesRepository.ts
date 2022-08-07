import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name: data.name,
      description: data.description,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = this.repository.find();
    return categories;
  }

  async findByName(userName: string): Promise<Category> {
    const category = this.repository.findOne({
      where: {
        name: userName,
      },
    });
    return category;
  }
}
