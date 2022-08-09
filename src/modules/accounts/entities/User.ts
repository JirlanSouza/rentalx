import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    driver_license: string,
    avatar?: string
  ) {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.name = name;
    this.email = email;
    this.password = password;
    this.driver_license = driver_license;
    this.avatar = avatar;
  }
}
