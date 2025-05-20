import { Router } from "express";
import {
  createTodo,
  deleteCompletedTodos,
  deleteTodo,
  getActiveTodos,
  getCompletedTodos,
  getTodos,
  updateTodoStatus,
  updateTodoTitle,
} from "../controllers/todoController";

import {
  validateTodoInput,
  validateUpdateTodoInput,
} from "../middleware/validationMiddleware";
import { validateTodoIdParam } from "../middleware/validationMiddleware";

const router = Router();

router.post("/create-todo", ...validateTodoInput, createTodo);
router.get("/all-todos", getTodos);
router.get("/active-todos", getActiveTodos);
router.get("/completed-todos", getCompletedTodos);
router.delete("/completed", deleteCompletedTodos);

router.patch("/update-status/:id", updateTodoStatus);

router
  .route("/:id")
  .patch(...validateTodoIdParam, ...validateUpdateTodoInput, updateTodoTitle)
  .delete(...validateTodoIdParam, deleteTodo);

export default router;
