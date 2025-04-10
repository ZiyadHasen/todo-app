import { Router } from "express";
import {
  createTodo,
  deleteCompletedTodos,
  deleteTodo,
  getActiveTodos,
  getCompletedTodos,
  getTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
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

router.patch("/update-status", updateTodoStatus);

router.delete("/completed", deleteCompletedTodos);
router
  .route("/:id")
  .get(...validateTodoIdParam, getTodo)
  .patch(...validateTodoIdParam, ...validateUpdateTodoInput, updateTodo)
  .delete(...validateTodoIdParam, deleteTodo);
export default router;
