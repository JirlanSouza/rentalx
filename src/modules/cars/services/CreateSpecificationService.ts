import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private repository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specification = this.repository.findByName(name);

    if (specification) {
      throw new Error("Specification already exists!");
    }

    this.repository.create({ name, description });
  }
}
