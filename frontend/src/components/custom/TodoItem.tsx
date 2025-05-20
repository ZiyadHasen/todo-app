import { Todo } from "@/types/types";
import { Check, Edit2, Save, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  editingId: string | null;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  toggleTodo: (id: string) => void;
  startEditing: (todo: Todo) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteTodo: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editingId,
  editText,
  setEditText,
  toggleTodo,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteTodo,
}) => (
  <li key={todo.id} className="group flex items-center p-4">
    <button
      onClick={() => toggleTodo(todo.id)}
      className="mr-3 flex-shrink-0 focus:outline-none"
      disabled={editingId === todo.id}
    >
      {todo.status ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : (
        <div className="h-5 w-5 rounded-full border border-gray-200 transition-colors hover:border-purple-500"></div>
      )}
    </button>

    {editingId === todo.id ? (
      <div className="flex flex-grow items-center">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow border-b border-purple-300 px-1 text-sm focus:border-purple-500 focus:outline-none"
          autoFocus
        />
        <button
          onClick={saveEdit}
          className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
        >
          <Save className="h-4 w-4" />
        </button>
        <button
          onClick={cancelEdit}
          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ) : (
      <span
        className={`flex-grow text-sm ${
          todo.status ? "text-gray-400 line-through" : "text-gray-700"
        }`}
        onClick={() => toggleTodo(todo.id)}
        style={{ cursor: "pointer" }}
      >
        {todo.text}
      </span>
    )}

    {editingId !== todo.id && (
      <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => startEditing(todo)}
          className="mr-2 focus:opacity-100 focus:outline-none"
        >
          <Edit2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="focus:opacity-100 focus:outline-none"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    )}
  </li>
);
