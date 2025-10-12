import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  className?: string;
}

export const Input = ({
  label,
  className = "",
  error,
  ...props
}: InputProps) => {
  return (
    <div className={"flex flex-col gap-1"}>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-100">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-gray-700 ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "focus:ring-indigo-500"
        } ${className}`}
      />
    </div>
  );
};
