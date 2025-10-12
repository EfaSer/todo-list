import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { TextArea } from "@/components/ui/TextArea";

import { useAuthStore } from "@/store/authStore";
import { useTodosStore } from "@/store/todosStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarIcon from "../assets/calendar.svg?react";
import StarIcon from "../assets/star.svg?react";
import CategoryIcon from "../assets/category.svg?react";

export const TodoDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { todos, fetchTodos, updateTodo } = useTodosStore();
  const [todo, setTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { logout } = useAuthStore();

  useEffect(() => {
    const current = todos.find((t) => t.id === Number(id));

    if (current) {
      setTodo(current);
      setTitle(current.title);
      setDescription(current.description || "");
      setLoading(false);
    } else {
      fetchTodos().then(() => {
        const updated = useTodosStore
          .getState()
          .todos.find((t) => t.id === Number(id));
        if (updated) {
          setTodo(updated);
          setTitle(updated.title);
          setDescription(updated.description || "");
        }
        setLoading(false);
      });
    }
  }, [id, todos, fetchTodos]);

  const handleSave = async () => {
    if (!title.trim()) return;
    const updatedTodo = { ...todo, title, description };
    await updateTodo(updatedTodo.id, {
      title: updatedTodo.title,
      description: updatedTodo.description,
    });
    setTodo(updatedTodo);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center text-gray-300">
        <Loader /> Загрузка задачи...
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-300">
        <p className="mb-5 text-xl/7">Задача не найдена</p>
        <Button className="max-w-25" onClick={() => navigate("/")}>
          Назад
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen items-center p-8">
      <div className="w-full lg:flex lg:items-center lg:justify-between mb-10">
        <h1 className="pb-4 text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {todo.title}
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
      <div className="flex flex-col justify-between w-full  p-5 bg-white/10 backdrop-blur-sm rounded-xl shadow-md">
        {isEditing ? (
          <div className="flex flex-col gap-5">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок"
            />
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
            />

            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex mb-5 items-center justify-between text-sm text-gray-400">
              <div className="flex flex-col">
                <span>
                  Создано: {new Date(todo.createdAt).toLocaleString()}
                </span>
                {todo.updatedAt !== todo.createdAt && (
                  <span>
                    Изменено: {new Date(todo.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>

              <span>
                Статус:{" "}
                {todo.completed ? (
                  <span className="text-green-400">Выполнено</span>
                ) : (
                  <span className="text-yellow-400">В процессе</span>
                )}
              </span>
            </div>

            {todo.description ? (
              <div className="flex flex-col justify-between gap-5">
                <div className="">
                  <h3>Описание:</h3>
                  <p className="text-gray-300 mb-4">{todo.description}</p>
                </div>
                <div className="">
                  {(todo.deadline || todo.priority || todo.category) && (
                    <div className="flex items-center gap-3 text-sm text-gray-300 mt-1">
                      {todo.deadline && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(todo.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {todo.priority && (
                        <div className="flex items-center gap-1">
                          <StarIcon
                            className={`w-4 h-4 ${
                              todo.priority === "high"
                                ? "text-red-400"
                                : todo.priority === "medium"
                                ? "text-yellow-400"
                                : "text-green-400"
                            }`}
                          />
                          <span>{todo.priority}</span>
                        </div>
                      )}

                      {todo.category && (
                        <div className="flex items-center gap-1">
                          <CategoryIcon className="w-4 h-4 text-purple-400" />
                          <span>{todo.category}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic mb-4">Нет описания</p>
            )}

            <div className="flex justify-end mt-6 gap-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Назад
              </Button>
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
