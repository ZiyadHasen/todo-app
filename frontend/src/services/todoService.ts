// src/services/todoService.ts
import { Todo } from "../types/types";

const API_BASE_URL = "http://localhost:5000/api/v1/todos/create-todo";

const todoService = {
  // Fetch todos based on filter (all, active, completed)
  getTodos: async (
    filter: "all" | "active" | "completed",
    token: string,
  ): Promise<Todo[]> => {
    const endpoint =
      filter === "all"
        ? "/all-todos"
        : filter === "active"
          ? "/active-todos"
          : "/completed-todos";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to fetch ${filter} todos`);
    }
    return await response.json();
  },

  // Create a new todo
  addTodo: async (text: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create todo");
    }
  },

  // Toggle todo status (true = active, false = completed)
  toggleTodo: async (
    id: string,
    currentStatus: boolean,
    token: string,
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/update-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status: !currentStatus }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update todo status");
    }
  },

  // Delete a todo by ID
  deleteTodo: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete todo");
    }
  },

  // Update todo text by ID
  updateTodoText: async (
    id: string,
    text: string,
    token: string,
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update todo text");
    }
  },

  // Clear completed todos
  clearCompleted: async (token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/completed`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to clear completed todos");
    }
  },
};

export default todoService;
