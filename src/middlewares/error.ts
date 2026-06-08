import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

import { HttpException } from "../utils/exceptions";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    console.error(`Unexpected Error at ${req.path}:`, err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}
