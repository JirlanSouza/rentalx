import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE;

  private constructor() {
    this.specifications = [];
  }

  static getStance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  create(data: ICreateSpecificationDTO): void {
    const specification = new Specification(data.name, data.description);

    this.specifications.push(specification);
  }
}
