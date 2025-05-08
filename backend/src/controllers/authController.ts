import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { MongoServerError } from "mongodb";
import { createJWT } from "../utils/tokenUtils";

// 1. Define strict types for cookie options
type CookieOptions = {
  httpOnly: boolean;
  expires: Date;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

export const register = async (req: Request, res: Response) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    console.log("User Created ");

    res.status(201).json({ msg: "user created" });
  } catch (error: unknown) {
    // Type‐guard for Mongo duplicate‐key
    if (
      error instanceof MongoServerError &&
      // 11000 is duplicate‐key
      error.code === 11000
    ) {
      res.status(409).json({ error: "Email already in use" });
    }

    // Fallback for anything else
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Fetch user and include password field if necessary
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({ error: "Invalid email credential" });
    return;
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  // console.log("potPass : " + password);
  // console.log("hashedPass : " + user.password);
  // console.log("isPassword : " + isPasswordMatch);

  if (!isPasswordMatch) {
    res.status(401).json({ error: "Invalid password credential" });
    return;
  }

  const token = createJWT({
    userId: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
  });

  const oneDay = 24 * 60 * 60 * 1000;

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  //   secure: false,
  //   // secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   // sameSite: "strict",
  // });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // ✅ must be true when SameSite=None
    sameSite: "none", // ✅ allows cookies on CORS XHR
    expires: new Date(Date.now() + oneDay),
  });

  res.status(200).json({
    msg: "User logged in",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ msg: "User logged out" });
};
