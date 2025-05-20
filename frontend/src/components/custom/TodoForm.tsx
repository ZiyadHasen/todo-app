import { Plus } from "lucide-react";

interface TodoFormProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  createTodo: (e: React.FormEvent) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  newTodo,
  setNewTodo,
  createTodo,
}) => (
  <form
    onSubmit={createTodo}
    className="mb-4 rounded-md bg-white p-4 shadow-lg"
  >
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Create a new todo..."
        className="flex-grow text-base text-gray-700 outline-none"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        disabled={!newTodo.trim()}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  </form>
);
