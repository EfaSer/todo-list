import { ITodo } from "@/types/todo";
import { axiosInstance } from "./axiosInstance";

export const todosApi = {
  async getAll() {
    const res = await axiosInstance.get<ITodo[]>("/todos");
    return res.data;
  },

  async create(todo: Partial<ITodo>) {
    const res = await axiosInstance.post<ITodo>("/todos", todo);
    return res.data;
  },

  async toggle(id: number) {
    const res = await axiosInstance.patch<ITodo>(`/todos/${id}`);
    return res.data;
  },

  async remove(id: number) {
    const res = await axiosInstance.delete(`/todos/${id}`);
  },
};
