/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

export const errorVerification = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ status: "error", message: `Internal server error ${err.message}` });
};
