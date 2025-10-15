import { useEffect, useRef, useState } from "react";
import ArrowDown from "../../assets/arrow-down.svg?react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export const Select = ({
  label,
  value,
  className,
  onChange,
  options,
  placeholder = "Выберите значение",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="flex flex-col gap-1 text-white relative" ref={ref}>
      {label && <label className="text-gray-100 text-sm">{label}</label>}

      <div
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "flex items-center justify-between bg-white/5 border border-gray-700 rounded-lg px-3 py-2 text-base text-gray-100 cursor-pointer transition-all",
          {
            "ring-2 ring-indigo-500": open,
            "hover:border-white/40": !open,
          }
        )}
      >
        <span
          className={clsx("text-sm/6", {
            "text-gray-500": !selectedLabel || selectedLabel === "Приоритет",
            "": selectedLabel,
          })}
        >
          {selectedLabel || placeholder}
        </span>
        <ArrowDown
          className={clsx("w-4 h-4 text-gray-500 transition-transform", {
            "rotate-180": open,
            "": !open,
          })}
        />
      </div>

      {open && (
        <div className="absolute top-full mt-1 w-full bg-[#30302c] border-white/10 rounded-lg shadow-lg z-10 overflow-hidden animate-fade-in">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={clsx(
                "px-3 py-2  cursor-pointer text-sm transition-colors",
                {
                  "bg-indigo-500 text-white": option.value === value,
                  "hover:bg-white/10": option.value !== value,
                }
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
