// src/hooks/useDeleteTodo.ts
import { useCallback } from "react";
import {
  deleteTodoById as apiDeleteTodo,
  deleteCompletedTodos as apiClearCompletedTodos,
} from "@/services/todoService";
import { useTodoContext } from "@/context/TodoContext";

export const useDeleteTodo = () => {
  const { setTodos, setIsLoading, setError } = useTodoContext();

  const deleteTodo = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await apiDeleteTodo(id);
        // remove from context
        setTodos((prev) => prev.filter((t) => t._id !== id));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to delete todo");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTodos],
  );

  const clearCompletedTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClearCompletedTodos();
      // drop all completed in context
      setTodos((prev) => prev.filter((t) => !t.status));
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to clear completed todos",
      );
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setTodos]);

  return { deleteTodo, clearCompletedTodos };
};
