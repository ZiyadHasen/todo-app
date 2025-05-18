// src/components/TodoItem.tsx
import type React from "react";
import { Check, X, Edit2, Save } from "lucide-react";
import { Todo } from "@/types/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  isEditing: boolean;
  editText: string;
  onEditChange: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
  isEditing,
  editText,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
}) => (
  <li className="group flex items-center p-4">
    <button
      onClick={() => onToggle(todo.id)}
      className="mr-3 flex-shrink-0 focus:outline-none"
      disabled={isEditing}
    >
      {todo.status === false ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <Check className="text-text-inverted h-3 w-3" />
        </div>
      ) : (
        <div className="h-5 w-5 rounded-full border border-gray-200 transition-colors hover:border-purple-500" />
      )}
    </button>
    {isEditing ? (
      <div className="flex flex-grow items-center">
        <input
          type="text"
          value={editText}
          onChange={(e) => onEditChange(e.target.value)}
          className="flex-grow border-b border-purple-300 px-1 text-sm focus:border-purple-500 focus:outline-none"
          autoFocus
        />
        <button
          onClick={onSaveEdit}
          className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
        >
          <Save className="h-4 w-4" />
        </button>
        <button
          onClick={onCancelEdit}
          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ) : (
      <span
        className={`flex-grow text-sm ${todo.status === false ? "text-gray-400 line-through" : "text-gray-700"}`}
        onClick={() => onToggle(todo.id)}
        style={{ cursor: "pointer" }}
      >
        {todo.text}
      </span>
    )}
    {!isEditing && (
      <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onStartEdit(todo)}
          className="mr-2 focus:opacity-100 focus:outline-none"
        >
          <Edit2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="focus:opacity-100 focus:outline-none"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    )}
  </li>
);

export default TodoItem;
