import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/auth";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const AuthHeader = req.headers.authorization;

  if (!AuthHeader) return res.status(401).json({ error: "No token provided" });

  const token = AuthHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    console.log("payload", payload);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
