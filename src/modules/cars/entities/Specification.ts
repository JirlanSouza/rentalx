import { v4 as uuidv4 } from "uuid";

export class Specification {
  readonly id?: string;

  readonly name: string;

  readonly description: string;

  readonly created_at: Date;

  constructor(name: string, description: string, createdAt?: string) {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.name = name;
    this.description = description;
    this.created_at = createdAt ? new Date(createdAt) : new Date();
  }
}
