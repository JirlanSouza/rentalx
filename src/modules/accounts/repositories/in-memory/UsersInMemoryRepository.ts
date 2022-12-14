import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersInMemoryRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User(
      data.name,
      data.email,
      data.password,
      data.driver_license,
      data.avatar
    );

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
