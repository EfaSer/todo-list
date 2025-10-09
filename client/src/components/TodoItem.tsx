import { ITodo } from "@/types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Modal } from "./Modal";
import DeleteIcon from "../assets/delete.svg?react";

interface TodoItemProps {
  todo: ITodo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  id,
}: TodoItemProps & { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex gap-8 items-center justify-between p-3 rounded-md shadow-sm bg-white/10 h-20 relative cursor-grab active:cursor-grabbing"
      >
        <div
          onClick={onToggle}
          className={`w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer transition-all duration-200 ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-400 hover:border-green-400"
          }`}
        >
          {todo.completed && "✓"}
        </div>
        <div
          className="min-w-0 flex-1 h-full items-start"
          {...attributes}
          {...listeners}
        >
          <div
            className={`text-xl mr-9.5 font-bold text-white break-words  ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </div>
          {todo.description && (
            <div
              className={`text-base mr-9.5 font-normal text-white break-words  ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.description.length > 50
                ? `${todo.description.slice(0, 50)}...`
                : todo.description}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-2 right-2 inline-flex items-center justify-center text-white/60 hover:text-white/90 transition-colors w-5 h-5 cursor-pointer"
        >
          {/* <span className="text-lg font-light">✕</span> */}
          <span className="text-lg font-light">
            <DeleteIcon className="w-5 h-5 text-white hover:text-gray-400 transition-colors" />
          </span>
        </button>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          title={"Удалить задачу?"}
          message={"Вы уверены, что хотите удалить задачу?"}
          confirmText={"Удалить"}
          onConfirm={() => {
            setIsOpen(false);
            setTimeout(() => onDelete?.(), 200);
          }}
          cancelText="Отмена"
          onCancel={() => {
            setTimeout(() => setIsOpen(false), 200);
          }}
        />
      )}
    </>
  );
};
