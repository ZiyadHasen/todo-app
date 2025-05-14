import { Request, Response, NextFunction } from "express";
import {
  body,
  validationResult,
  ValidationChain,
  param,
} from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError";
import User from "../models/User";
import mongoose from "mongoose";
import Todo from "../models/Todo";

// Generic function to validate and handle errors
const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(
          errors
            .array()
            .map((error) => error.msg)
            .join(", ")
        );
      }
      next();
    },
  ];
};

export const validateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop further checks if empty
    .isEmail()
    .withMessage("That is not a valid email")
    .normalizeEmail() // Sanitizes email input
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Invalid phone number format"),

  body("birthYear")
    .notEmpty()
    .withMessage("Birth year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      `Birth year must be between 1900 and ${new Date().getFullYear()}`
    ),
]);
export const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(), // No duplicate check needed for login

  body("password").trim().notEmpty().withMessage("Password is required"),
  // Removed length requirement for login flexibility
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop further checks if empty
    .isEmail()
    .withMessage("That is not a valid email")
    .normalizeEmail(), // Sanitizes email input
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Invalid phone number format"),

  body("birthYear")
    .notEmpty()
    .withMessage("Birth year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      `Birth year must be between 1900 and ${new Date().getFullYear()}`
    ),
  // allow password to be undefined, null, OR empty string without validating length
  body("password")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const validateTodoInput = withValidationErrors([
  body("text").trim().notEmpty().withMessage("Title is required"),
]);
export const validateUpdateTodoInput = withValidationErrors([
  body("text").optional().isString().trim().notEmpty(),
  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be a boolean value."),
]);

export const validateTodoIdParam = withValidationErrors([
  param("id")
    .isString()
    .withMessage("ID must be a string")
    .bail()
    .custom(async (value, { req }) => {
      // 1. Validate MongoDB ID format
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new BadRequestError("Invalid Todo ID format");
      }

      // 2. Check if todo exists
      const todo = await Todo.findById(value).select("user status");
      if (!todo) {
        throw new NotFoundError(`Todo with ID ${value} not found`);
      }

      // 3. Verify ownership (or admin rights if you have roles)
      const isAdmin = req.user?.role === "admin"; // Optional role check
      const isOwner = req.user?.userId.toString() === todo.user!.toString();

      if (!isAdmin && !isOwner) {
        throw new UnauthorizedError("You can only modify your own todos");
      }

      // 4. Attach todo to request for later use
      req.todo = todo;
      return true;
    }),
]);

// 🔥 **Exactly! You got it.**
// By using `withValidationErrors`, we **decouple** the **validation logic** from the **error handling**, making the code:
// ✅ **Reusable** – Any validation chain can plug into it.
// ✅ **Cleaner** – No need to repeat the same error-handling logic everywhere.
// ✅ **Scalable** – If you add more validation rules in the future, you only focus on defining them, not handling responses.

// ### **Breakdown of Express Validator Before & After**
// 🛑 **Before (`express-validator` default usage)**
// Each time you validate input, you must:
// 1️⃣ Define the validation rules (`ValidationChain`).
// 2️⃣ Handle the errors manually (`validationResult(req)`).

// ✅ **After (`withValidationErrors` abstraction)**
// 1️⃣ Define **only** the validation rules.
// 2️⃣ `withValidationErrors` **automatically handles errors** for all validations.

// Now, your validation middleware only needs to **focus on validation**, while `withValidationErrors` **handles all error responses in one place**.

// This is **DRY (Don't Repeat Yourself) coding** at its best! 🚀
