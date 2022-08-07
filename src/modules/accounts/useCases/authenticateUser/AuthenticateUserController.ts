import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const authenticationData = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(authenticationData);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
