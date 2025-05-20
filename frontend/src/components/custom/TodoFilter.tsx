interface FiltersProps {
  filter: string; // current filter value: "all" | "active" | "completed"
  setFilter: React.Dispatch<React.SetStateAction<string>>; // sets filter state
  clearCompleted: () => void; // clears completed todos
  activeTodosCount: number; // number of active (incomplete) todos
}

export const Filters: React.FC<FiltersProps> = ({
  filter,
  setFilter,
  clearCompleted,
  activeTodosCount,
}) => (
  <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 text-xs text-gray-500">
    {/* Active todos count with proper pluralization */}
    <span>
      {activeTodosCount} item{activeTodosCount !== 1 ? "s" : ""} left
    </span>

    {/* Filter buttons */}
    <div className="flex space-x-2">
      {["all", "active", "completed"].map((type) => (
        <button
          key={type}
          className={filter === type ? "font-semibold text-purple-500" : ""}
          onClick={() => setFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>

    {/* Clear completed button */}
    <button
      onClick={clearCompleted}
      className="transition-colors hover:text-gray-700"
    >
      Clear Completed
    </button>
  </div>
);
