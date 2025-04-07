import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController";
import {
  validateUserInput,
  validateLoginInput,
} from "../middleware/validationMiddleware";

router.post("/register", ...validateUserInput, register);
router.post("/login", ...validateLoginInput, login);
router.post("/logout", logout);

export default router;
