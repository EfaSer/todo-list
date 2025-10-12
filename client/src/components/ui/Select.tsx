import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string;
  error?: string;
  className?: string;
  options: { name: string; value: string }[];
}

export const Select = ({
  label,
  value,
  error,
  className,
  options,
  ...props
}: SelectProps) => {
  return (
    <div className={"flex flex-col gap-1"}>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-100">
          {label}
        </label>
      )}
      <div className="relative ">
        <select
          value={value}
          {...props}
          className="w-full appearance-none bg-white/5 outline-1 -outline-offset-1 outline-white/10 rounded-lg py-2 px-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-all"
        >
          {options.map((option) => (
            <option
              className="bg-white/5"
              key={option.value}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/70 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
