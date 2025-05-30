const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// DB connection
const { connectDB } = require("./config/db");

// Routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");

// Middleware
const { authenticateUser } = require("./middleware/authMiddleware");
const errorHandlerMiddleware = require("./errors/errorHandlerMiddleware");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-app-v2-gray.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/todos", authenticateUser, todoRouter);

// Error handler
app.use(errorHandlerMiddleware);

// Server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
      console.log(`⚡ Database: ${mongoose.connection.db?.databaseName}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
