import { useCallback } from "react";
import { createTodo, fetchTodos } from "@/services/todoService";
import { useTodoContext } from "@/context/TodoContext";
import { toast } from "react-toastify";

// useCreateTodo provides a reusable addTodo function that:
// Calls createTodo to send the todo to the backend.

// Updates the state (via useTodoState) with the new todo.
// Manages loading and error states for the UI.

// Dependencies:
// Uses useTodoState to get setIsLoading, setError, and addTodoToState.

// Imports createTodo from the service layer.

// Key Function: addTodo:
//Defined with useCallback to memoize the function, preventing unnecessary re-creations unless
// dependencies (setIsLoading, setError, addTodoToState) change.

// useCreateTodo is the middleman that:
// Receives the user’s input (via addTodo).

// Sends it to the backend (via createTodo).

// Updates the UI state (via addTodoToState).

export const useCreateTodo = () => {
  const { setIsLoading, setError, setTodos } = useTodoContext();

  const addTodo = useCallback(
    async (text: string, status: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        await createTodo({ text, status });
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
        toast.success("Todo created successfully! 🎉");
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Failed to create todo";

        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTodos],
  );

  return { addTodo };
};
