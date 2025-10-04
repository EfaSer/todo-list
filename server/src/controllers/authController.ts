import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../services/prisma";
import { validateEmail, validatePassword } from "../utils/validators";
import { generateToken } from "../services/auth";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!validateEmail(email))
    return res.status(400).json({ error: "Invalid email" });

  if (!validatePassword(password))
    return res.status(400).json({ error: "Weak password" });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  res.json({
    message: "User created",
    user: { id: user.id, email: user.email },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, email: user.email } });
};
