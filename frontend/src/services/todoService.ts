import {
  CreateTodoResponse,
  DeleteTodoResponse,
  Todo,
  UpdateTodoResponse,
} from "@/types/types";
const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/todos`;

//! This is your raw API call. it is nice to have all tasks to be handled separately

export const createTodo = async (todo: {
  text: string;
  status: boolean;
}): Promise<CreateTodoResponse> => {
  try {
    const res = await fetch(`${API_URL}/create-todo`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      let msg = "Failed to create todo";
      try {
        const err = await res.json();
        msg = err.message || err.msg || msg;
      } catch (e) {
        console.log(e);
      }

      throw new Error(msg);
    }

    return await res.json();
  } catch (error) {
    const finalMsg =
      error instanceof Error
        ? error.message
        : "Unknown error while creating todo";

    throw new Error(finalMsg);
  }
};

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${API_URL}/all-todos`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to fetch todos");
    }

    const data = await res.json();
    // console.log("Fetched todos from service:", JSON.stringify(data.todos));
    return data.todos;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while fetching todos");
  }
};

// Fetch active (incomplete) todos
export const fetchActiveTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${API_URL}/active-todos`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to fetch active todos");
    }
    const data = await res.json();
    // console.log("Raw active todos response:", data.activeTodos);

    return data.activeTodos;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while fetching active todos");
  }
};

// Fetch completed todos
export const fetchCompletedTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${API_URL}/completed-todos`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to fetch completed todos");
    }
    const data = await res.json();
    // console.log("Raw active todos response:", data.completedTodos);
    return data.completedTodos;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while fetching completed todos");
  }
};

// Update todo status (completed or not)
export const updateTodoStatus = async (
  id: string,
  status: boolean,
): Promise<UpdateTodoResponse> => {
  try {
    const res = await fetch(`${API_URL}/update-status/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to update todo status");
    }
    const data = await res.json();

    return await data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while updating todo status");
  }
};

// Update todo title by ID
export const updateTodoTitle = async (
  id: string,
  title: string,
): Promise<UpdateTodoResponse> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to update todo title");
    }

    return await res.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while updating todo title");
  }
};

// Delete single todo by ID
export const deleteTodoById = async (
  id: string,
): Promise<DeleteTodoResponse> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to delete todo");
    }

    return await res.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while deleting todo");
  }
};

// Delete all completed todos in bulk
export const deleteCompletedTodos = async (): Promise<DeleteTodoResponse> => {
  try {
    const res = await fetch(`${API_URL}/completed`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Failed to delete completed todos");
    }

    return await res.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error while deleting completed todos");
  }
};
