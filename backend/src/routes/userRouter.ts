import Router from "express";
import { getUser, updateUser } from "../controllers/userController";
import { validateUpdateUserInput } from "../middleware/validationMiddleware";

const router = Router();
router.get("/get-user", getUser);
router.patch("/update-user", ...validateUpdateUserInput, updateUser);

export default router;
