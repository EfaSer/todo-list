import { ITodo } from "@/types/todo";
import { Button } from "./ui/Button";

interface TodoItemProps {
  todo: ITodo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => (
  <div className="flex gap-5 items-center justify-between p-3 rounded-md shadow-sm bg-white/10 h-auto relative">
    <div
      onClick={onToggle}
      className={`w-6 h-6 flex items-center justify-center border-2 rounded-full cursor-pointer transition-all duration-200 ${
        todo.completed
          ? "bg-green-500 border-green-500 text-white"
          : "border-gray-400 hover:border-green-400"
      }`}
    >
      {todo.completed && "✓"}
    </div>
    <div
      className={`text-xm mr-9.5 font-bold text-white break-words min-w-0 flex-1 cursor-pointer ${
        todo.completed ? "line-through text-gray-400" : ""
      }`}
      //   onClick={onToggle}
    >
      {todo.title}
    </div>
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 inline-flex items-center justify-center text-white/60 hover:text-white/90 transition-colors w-5 h-5 cursor-pointer"
    >
      <span className="text-lg font-light">✕</span>
    </button>
  </div>
);
