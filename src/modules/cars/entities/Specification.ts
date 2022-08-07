import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("specifications")
export class Specification {
  @PrimaryColumn()
  readonly id?: string;

  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @CreateDateColumn()
  readonly created_at: Date;

  constructor(name: string, description: string) {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.name = name;
    this.description = description;
  }
}
