import { Todo } from "@/types/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[]; // Array of todo items
  loading: boolean; // Loading state
  editingId: string | null; // ID of the todo currently being edited
  editText: string; // Current input value for editing
  setEditText: React.Dispatch<React.SetStateAction<string>>; // Function to update edit text
  toggleTodo: (id: string) => void; // Toggles completion
  startEditing: (todo: Todo) => void; // Starts editing
  saveEdit: () => void; // Saves current edit
  cancelEdit: () => void; // Cancels current edit
  deleteTodo: (id: string) => void; // Deletes a todo
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  editingId,
  editText,
  setEditText,
  toggleTodo,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteTodo,
}) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading todos...</div>
    );
  }

  if (todos.length === 0) {
    return <div className="p-4 text-center text-gray-500">No todos found</div>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          toggleTodo={toggleTodo}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
