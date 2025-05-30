import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

export default function errorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
}
