import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUserCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      this.createCategoryUseCase.execute({ name, description });

      return response.status(201).end();
    } catch (err) {
      return response.status(409).json({ error: err.message });
    }
  }
}
