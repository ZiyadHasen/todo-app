import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

// DB connection
import { connectDB } from "./config/db";

// Routers
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import todoRouter from "./routes/todoRouter";

// Middleware
import { authenticateUser } from "./middleware/authMiddleware";
import errorHandlerMiddleware from "./errors/errorHandlerMiddleware";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

// Serve static (only if you have a bundled frontend in `public`)
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-app-v2-gray.vercel.app",
  "https://todo-app-nine-xi-11.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/todos", authenticateUser, todoRouter);

// Global error handler
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
      console.log(`⚡ DB: ${mongoose.connection.db?.databaseName}`);
      // console.log(`🌐 ENV: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
