import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoFilterBar } from "@/components/TodoFilterBar";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { useAuthStore } from "@/store/authStore";
import { useTodosStore } from "@/store/todosStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextArea } from "@/components/ui/TextArea";
import { ITodo } from "@/types/todo";

export const TodoPage = () => {
  const {
    fetchTodos,
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    reorderTodos,
    updateTodo,
    search,
    filter,
    loading,
  } = useTodosStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const filterTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.title
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "active" && !todo.completed);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => (a.order = b.order));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentTodos = [...todos].sort((a, b) => a.order - b.order);
    const oldIndex = currentTodos.findIndex((t) => t.id === active.id);
    const newIndex = currentTodos.findIndex((t) => t.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(currentTodos, oldIndex, newIndex);

    useTodosStore.setState({ todos: reordered });
    const orderedIds = reordered.map((t, i) => t.id);

    reorderTodos(orderedIds);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }
    setError("");
    await addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const handleSave = async (updatedTodo: ITodo) => {
    await updateTodo(updatedTodo.id, {
      title: updatedTodo.title,
      description: updatedTodo.description,
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-screen items-center p-8">
      <div className="w-full lg:flex lg:items-center lg:justify-between mb-10">
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
      <div className="flex justify-start w-full">
        <form
          onSubmit={handleAdd}
          className="flex justify-self-start gap-5 w-full max-w-md md-6 flex-col mb-5"
        >
          <h2 className="text-xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Создать задачу
          </h2>
          <div>
            <Input
              placeholder="Введите название задачи..."
              value={title}
              onChange={handleTitleChange}
              error={!!error}
              className="relative"
            />
            {error && (
              <p className="absolute t-0 l-0 text-red-500 text-xs">{error}</p>
            )}
          </div>

          <TextArea
            placeholder="Введите описание задачи..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            className="flex items-center gap-2 justify-center"
            type="submit"
          >
            <span className="text-2xl">+</span>
            <span className="text-lg">Добавить</span>
          </Button>
        </form>
      </div>
      <div className="flex justify-start w-full pt-5 border-t border-gray-700">
        <TodoFilterBar />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filterTodos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 w-full">
            {filterTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => removeTodo(todo.id)}
                onSave={handleSave}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
