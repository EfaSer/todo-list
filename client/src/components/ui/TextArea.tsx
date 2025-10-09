import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = ({ label, ...props }: TextAreaProps) => {
  return (
    <div className={"flex flex-col gap-1"}>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-100">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-gray-700"
      />
    </div>
  );
};
