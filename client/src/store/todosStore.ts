import { create } from "zustand";
import { todosApi } from "@/api/todosApi";
import { ITodo } from "@/types/todo";

type FilterType = "all" | "completed" | "active";

interface TodoState {
  todos: ITodo[];
  loading: boolean;
  search: string;
  filter: FilterType;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  setSearch: (value: string) => void;
  setFilter: (value: FilterType) => void;
  reorderTodos: (orderedIds: number[]) => Promise<void>;
}

export const useTodosStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  search: "",
  filter: "all",
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
  setSearch: (value) => set({ search: value }),
  setFilter: (value) => set({ filter: value }),

  reorderTodos: async (orderedIds: number[]) => {
    try {
      await todosApi.reorder(orderedIds);
    } catch (error) {
      console.error("Ошибка reorder:", error);
    }
  },
}));
