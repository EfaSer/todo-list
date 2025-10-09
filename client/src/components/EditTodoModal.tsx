import { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "./ui/Input";
import { TextArea } from "./ui/TextArea";

export const EditTodoModal = ({ isOpen, onCancel, todo, onSave }: any) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = () => {
    if (!title.trim()) return;
    const updatedTodo = { ...todo, title, description };
    onSave(updatedTodo);
    onCancel();
  };
  return (
    <Modal
      isOpen={isOpen}
      confirmText={"Сохранить"}
      cancelText={"Отмена"}
      onConfirm={handleSubmit}
      onCancel={onCancel}
    >
      <div className="flex flex-col gap-5">
        <h2 className="">Редактирование задачи</h2>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </Modal>
  );
};
