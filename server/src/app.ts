import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import todosRoutes from "./routes/todos";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

app.use(errorHandler);

export default app;
