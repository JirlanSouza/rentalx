import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer") {
    throw new AppError("Invalid token!", 401);
  }

  try {
    const { sub: userId } = verify(token, process.env.SECRET);

    const repository = new UsersRepository();

    const user = await repository.findById(userId as string);

    if (!user) {
      throw new AppError("This user is not exists!", 401);
    }

    request.user = {
      id: user.id,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}
