import { Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorVerification = (
  err: Error,
  request: Request,
  response: Response
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ status: "error", message: `Internal server error ${err.message}` });
};
