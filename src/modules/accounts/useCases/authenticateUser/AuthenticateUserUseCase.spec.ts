/* eslint-disable no-undef */
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersInMemoryRepository } from "@modules/accounts/repositories/in-memory/UsersInMemoryRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

let usersInMemoryRepository: UsersInMemoryRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersInMemoryRepository
    );
    createUserUseCase = new CreateUserUseCase(usersInMemoryRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const userData: ICreateUserDTO = {
      name: "New user",
      email: "newuser@rentalx.com",
      password: "newUser",
      driver_license: "123456",
    };

    await createUserUseCase.execute(userData);
    process.env.SECRET = "secret";

    const authenticationData = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(authenticationData).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "newUsser@rentalx.com",
        password: "newUser",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const userData: ICreateUserDTO = {
        name: "New user",
        email: "newuser@rentalx.com",
        password: "newUser",
        driver_license: "123456",
      };

      await createUserUseCase.execute(userData);
      process.env.SECRET = "secret";

      await authenticateUserUseCase.execute({
        email: userData.email,
        password: "incorrect password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
