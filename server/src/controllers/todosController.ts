import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { prisma } from "../services/prisma";

export const getTodos = async (req: AuthRequest, res: Response) => {
  const todos = await prisma.todo.findMany({ where: { ownerId: req.userId } });
  return res.json(todos);
};

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      ownerId: req.userId!,
    },
  });
  res.json(todo);
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  if (!existing || existing.ownerId !== req.userId) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data: { completed: !existing.completed },
  });

  res.json(updated);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const todo = await prisma.todo.deleteMany({
    where: { id: Number(id), ownerId: req.userId },
  });

  if (todo.count === 0)
    return res.status(404).json({ error: "Todo not found" });

  res.json({ message: "Deleted" });
};
