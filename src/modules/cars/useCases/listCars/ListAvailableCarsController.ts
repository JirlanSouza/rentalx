import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, category_id, brand } = request.query as {
      name: string;
      category_id: string;
      brand: string;
    };

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      name,
      category_id,
      brand,
    });

    return response.json(cars);
  }
}
