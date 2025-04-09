import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/customError";
import { verifyJWT } from "../utils/tokenUtils";
import { JwtPayload } from "jsonwebtoken";

// * What it does: Tells TypeScript
// * "Hey, Express's Request object might have a user property with this shape."
// * Does NOT: Actually create or attach the user property at runtime.
declare module "express" {
  interface Request {
    user?: {
      userId: string;
      role: string;
      name: string;
      email: string;
    };
  }
}

export const authenticateUser = (
  req: Request, // Now automatically includes user property
  res: Response,
  next: NextFunction
) => {
  // 1. Get token
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("No token provided");

  try {
    //* 2. Verify token (simple cast for small apps)
    const { userId, role, name, email } = verifyJWT(token) as JwtPayload;

    //* What it does: Actually attaches the user data to the Express request object.
    req.user = { userId, role, name, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};
