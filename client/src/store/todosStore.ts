import { create } from "zustand";
import { todosApi } from "@/api/todosApi";
import { ITodo } from "@/types/todo";

interface TodoState {
  todos: ITodo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
}

export const useTodosStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  fetchTodos: async () => {
    set({ loading: true });
    const data = await todosApi.getAll();
    set({ todos: data, loading: false });
  },

  addTodo: async (title) => {
    const newTodo = await todosApi.create({ title });
    set({ todos: [...get().todos, newTodo] });
  },

  toggleTodo: async (id) => {
    const updated = await todosApi.toggle(id);
    set({
      todos: get().todos.map((t) => (t.id === id ? updated : t)),
    });
  },

  removeTodo: async (id) => {
    await todosApi.remove(id);
    set({
      todos: get().todos.filter((t) => t.id !== id),
    });
  },
}));
