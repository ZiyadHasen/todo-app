"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Check, X, Edit2, Save, Plus } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const DUMMY_MODE = true; // Toggle this flag to switch between dummy & real

const dummyTodos: Todo[] = [
  { id: "1", text: "Buy milk", completed: false },
  { id: "2", text: "Learn React", completed: true },
  { id: "3", text: "Code like a boss", completed: false },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // API base URL
  const API_BASE_URL = "http://localhost:5000/api/v1/todos";

  // Dummy fetch todos for styling test
  const fetchTodos = async () => {
    setLoading(true);
    if (DUMMY_MODE) {
      setTimeout(() => {
        // Filter dummy todos based on current filter
        let filtered = dummyTodos;
        if (filter === "active")
          filtered = dummyTodos.filter((t) => !t.completed);
        if (filter === "completed")
          filtered = dummyTodos.filter((t) => t.completed);
        setTodos(filtered);
        setLoading(false);
      }, 300); // simulate network delay
    } else {
      try {
        let endpoint = `${API_BASE_URL}/all-todos`;
        if (filter === "active") endpoint = `${API_BASE_URL}/active-todos`;
        if (filter === "completed")
          endpoint = `${API_BASE_URL}/completed-todos`;

        const response = await fetch(endpoint, { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError("Failed to load todos. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  // Dummy create todo (only updates local state)
  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    if (DUMMY_MODE) {
      const newEntry: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos((prev) => [newEntry, ...prev]);
      setNewTodo("");
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/create-todo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newTodo }),
        });
        if (!response.ok) throw new Error("Failed to create todo");
        setNewTodo("");
        fetchTodos();
      } catch (err) {
        setError("Failed to create todo. Please try again.");
        console.error(err);
      }
    }
  };

  const toggleTodo = async (id: string) => {
    if (DUMMY_MODE) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    } else {
      try {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (!todoToUpdate) return;
        const response = await fetch(`${API_BASE_URL}/update-status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, completed: !todoToUpdate.completed }),
        });
        if (!response.ok) throw new Error("Failed to update todo status");
        fetchTodos();
      } catch (err) {
        setError("Failed to update todo. Please try again.");
        console.error(err);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    if (DUMMY_MODE) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete todo");
        fetchTodos();
      } catch (err) {
        setError("Failed to delete todo. Please try again.");
        console.error(err);
      }
    }
  };

  const clearCompleted = async () => {
    if (DUMMY_MODE) {
      setTodos((prev) => prev.filter((t) => !t.completed));
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/completed`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to clear completed todos");
        fetchTodos();
      } catch (err) {
        setError("Failed to clear completed todos. Please try again.");
        console.error(err);
      }
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = async () => {
    if (!editingId || !editText.trim()) return;

    if (DUMMY_MODE) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, text: editText } : t)),
      );
      setEditingId(null);
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editText }),
        });
        if (!response.ok) throw new Error("Failed to update todo");
        setEditingId(null);
        fetchTodos();
      } catch (err) {
        setError("Failed to update todo. Please try again.");
        console.error(err);
      }
    }
  };

  const cancelEdit = () => setEditingId(null);

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="z-10 flex w-full justify-center">
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

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

        <div className="overflow-hidden rounded-md bg-white shadow-lg">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Loading todos...
            </div>
          ) : todos.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No todos found</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {todos.map((todo) => (
                <li key={todo.id} className="group flex items-center p-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mr-3 flex-shrink-0 focus:outline-none"
                    disabled={editingId === todo.id}
                  >
                    {todo.completed ? (
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
                        todo.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
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
              ))}
            </ul>
          )}

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
