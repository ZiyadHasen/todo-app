import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { connectDB } from "./config/db";

const app = express();

// custom imports Router
import authRouter from "./routes/authRouter";
// middleware
// import { authenticateUser } from "./middleware/authMiddleware";
import errorHandlerMiddleware from "./errors/errorHandlerMiddleware";

// Middleware
app.use(cors());
app.use(express.json());

// const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5500",
  })
);

//* Routes
app.use("/api/v1/auth", authRouter);

//! Error middleware
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
      console.log(`⚡ Database: ${mongoose.connection.db?.databaseName}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the application
startServer();
