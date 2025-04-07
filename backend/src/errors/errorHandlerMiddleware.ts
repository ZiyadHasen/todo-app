import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: { statusCode: StatusCodes; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong try again later";

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
