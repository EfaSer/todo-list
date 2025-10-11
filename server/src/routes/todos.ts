import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  reorderTodos,
  updateTodo,
  toggleTodo,
} from "../controllers/todosController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.patch("/:id", authMiddleware, toggleTodo);
router.post("/reorder", authMiddleware, reorderTodos);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
