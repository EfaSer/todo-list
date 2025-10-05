import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "close";
}

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer",
        // variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700"
        //   ? "bg-blue-600 text-white hover:bg-blue-700"
        //   : "bg-gray-200 text-gray-800 hover:bg-gray-300",

        className
      )}
    >
      {children}
    </button>
  );
};
