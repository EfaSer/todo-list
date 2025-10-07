import { useTodosStore } from "@/store/todosStore";
import { Input } from "./ui/Input";

export const TodoFilterBar = () => {
  const { search, filter, setSearch, setFilter } = useTodosStore();

  return (
    <div className="flex flex-col sm:flex-row gap-5 mb-5 items-center">
      <Input
        type="text"
        placeholder="Поиск задач..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2">
        {[
          { label: "Все", value: "all" },
          { label: "Выполненные", value: "completed" },
          { label: "Активные", value: "active" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value as any)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              filter === btn.value
                ? "bg-indigo-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
