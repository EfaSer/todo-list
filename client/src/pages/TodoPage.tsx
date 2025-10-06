import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { useAuthStore } from "@/store/authStore";
import { useTodosStore } from "@/store/todosStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TodoPage = () => {
  const { fetchTodos, todos, addTodo, toggleTodo, removeTodo, loading } =
    useTodosStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo(title);
    setTitle("");
  };

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8">
      <div className="lg:flex lg:items-center lg:justify-between mb-20">
        <h1 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Мои задачи
        </h1>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <Button
              className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
              value="secondary"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </span>
        </div>
      </div>

      <form
        onSubmit={handleAdd}
        className="flex gap-2 w-full max-w-md md-6 flex-col mb-10"
      >
        <h2 className="text-xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Создать задачу
        </h2>
        <Input
          label="Введите название задачи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Добавить</Button>
      </form>

      <div className="space-y-3 w-full max-w-1/2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => removeTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};
