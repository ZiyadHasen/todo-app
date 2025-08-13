import { Request, Response } from "express";
import User from "../models/User";
import Todo from "../models/Todo";
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

// Demo user configuration
const DEMO_USER_EMAIL = "demo@todoapp.com";
const DEMO_USER_NAME = "Demo User";
const DEMO_USER_PHONE = "+1234567890";
const DEMO_USER_BIRTH_YEAR = 1990;

// Sample todos for demo user
const SAMPLE_TODOS = [
  { text: "Welcome to the Todo App! 🎉", status: true },
  { text: "Add your first todo item", status: false },
  { text: "Mark todos as complete", status: false },
  { text: "Delete completed todos", status: false },
  { text: "Explore the app features", status: false },
  { text: "Try the dark/light theme", status: true },
  { text: "Check out the responsive design", status: true },
];

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

export const demoLogin = async (req: Request, res: Response) => {
  try {
    // Check if demo user already exists
    let demoUser = await User.findOne({ email: DEMO_USER_EMAIL });

    if (!demoUser) {
      // Create demo user if it doesn't exist
      const hashedPassword = await hashPassword("demo123456");
      demoUser = await User.create({
        name: DEMO_USER_NAME,
        email: DEMO_USER_EMAIL,
        password: hashedPassword,
        phone: DEMO_USER_PHONE,
        birthYear: DEMO_USER_BIRTH_YEAR,
        role: "user",
      });
      console.log("Demo user created");

              // Create sample todos for the new demo user
        try {
          const sampleTodos = SAMPLE_TODOS.map(todo => ({
            ...todo,
            user: demoUser!._id,
          }));
          
          await Todo.insertMany(sampleTodos);
          console.log("Sample todos created for demo user");
        } catch (todoError) {
          console.error("Error creating sample todos:", todoError);
          // Don't fail the login if todo creation fails
        }
    } else {
      // Check if demo user has any todos, if not, create sample ones
      const existingTodos = await Todo.find({ user: demoUser!._id });
      if (existingTodos.length === 0) {
        try {
          const sampleTodos = SAMPLE_TODOS.map(todo => ({
            ...todo,
            user: demoUser!._id,
          }));
          
          await Todo.insertMany(sampleTodos);
          console.log("Sample todos created for existing demo user");
        } catch (todoError) {
          console.error("Error creating sample todos:", todoError);
          // Don't fail the login if todo creation fails
        }
      }
    }

    // Create JWT token for demo user
    const token = createJWT({
      userId: demoUser._id,
      role: demoUser.role,
      name: demoUser.name,
      email: demoUser.email,
    });

    const oneDay = 24 * 60 * 60 * 1000;

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + oneDay),
    });

    res.status(200).json({
      msg: "Demo user logged in",
      token,
      user: {
        id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
      },
    });
  } catch (error) {
    console.error("Demo login error:", error);
    res.status(500).json({ error: "Demo login failed" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ msg: "User logged out" });
};
