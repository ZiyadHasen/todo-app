// src/components/TodoMain.tsx
import type React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/types";

interface TodoMainProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  editingId: string | null;
  editText: string;
  onEditChange: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TodoMain: React.FC<TodoMainProps> = ({
  todos,
  loading,
  onToggle,
  onDelete,
  onStartEdit,
  editingId,
  editText,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
}) => (
  <div className="overflow-hidden rounded-md bg-white shadow-lg">
    {loading ? (
      <div className="p-4 text-center text-gray-500">Loading todos...</div>
    ) : todos.length === 0 ? (
      <div className="p-4 text-center text-gray-500">No todos found</div>
    ) : (
      <ul className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onStartEdit={onStartEdit}
            isEditing={editingId === todo.id}
            editText={editText}
            onEditChange={onEditChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </ul>
    )}
  </div>
);

export default TodoMain;
