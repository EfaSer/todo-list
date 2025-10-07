import { useEffect, useState } from "react";

interface ModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

export const Modal = ({
  title,
  message,
  confirmText,
  cancelText = "Отмена",
  onConfirm,
  onCancel,
  isOpen,
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 200);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 
      ${isOpen ? "animate-fade-in" : "animate-fade-out"}`}
    >
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center animate-fade-in">
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
        {message && <p className="text-white mb-5">{message}</p>}

        <div className="flex justify-center gap-5 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            {confirmText}
          </button>
          {cancelText && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
