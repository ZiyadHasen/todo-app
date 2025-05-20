// src/hooks/useUpdateTodo.ts
import { useCallback } from "react";
import { updateTodoStatus, updateTodoTitle } from "@/services/todoService";
import { useTodoContext } from "@/context/TodoContext";

export const useUpdateTodo = () => {
  const { setTodos, setIsLoading, setError } = useTodoContext();

  const updateStatus = useCallback(
    async (id: string, newStatus: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        await updateTodoStatus(id, newStatus);
        // optimistically update context
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, status: newStatus } : todo,
          ),
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to update status",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTodos],
  );

  const updateTitle = useCallback(
    async (id: string, newTitle: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await updateTodoTitle(id, newTitle);
        // optimistically update context
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, text: newTitle } : todo,
          ),
        );
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to update title");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTodos],
  );

  return { updateStatus, updateTitle };
};
