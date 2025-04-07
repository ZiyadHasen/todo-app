import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { BadRequestError } from "../errors/customError";
import User from "../models/User";

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
