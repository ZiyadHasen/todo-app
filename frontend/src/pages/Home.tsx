import React from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Count active todos
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter todos
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-purple-200">
      <div className="w-full max-w-md">
        {/* Input field */}
        <div className="mb-4 rounded-md bg-white p-4 shadow-lg">
          <input
            type="text"
            placeholder="Create a new todo..."
            className="w-full text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Todo list */}
        <div className="overflow-hidden rounded-md bg-white shadow-lg">
          <ul className="divide-y divide-gray-100">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="group flex items-center p-4">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="mr-3 flex-shrink-0 focus:outline-none"
                >
                  {todo.completed ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-gray-200 transition-colors hover:border-purple-500"></div>
                  )}
                </button>
                <span
                  className={`flex-grow text-sm ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
                  onClick={() => toggleTodo(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 text-xs text-gray-500">
            <span>
              {activeTodosCount} item{activeTodosCount !== 1 ? "s" : ""} left
            </span>

            <div className="flex space-x-2">
              <button
                className={`${filter === "all" ? "font-semibold text-purple-500" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`${filter === "active" ? "font-semibold text-purple-500" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`${filter === "completed" ? "font-semibold text-purple-500" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

            <button
              onClick={clearCompleted}
              className="transition-colors hover:text-gray-700"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
