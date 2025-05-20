// src/hooks/useFetchTodos.ts
import { useCallback } from "react";
import { useTodoContext } from "@/context/TodoContext";
import {
  fetchTodos as apiFetchTodos,
  fetchActiveTodos as apiFetchActive,
  fetchCompletedTodos as apiFetchCompleted,
} from "@/services/todoService";
import { Todo } from "@/types/types";

export type Filter = "all" | "active" | "completed";

export const useFetchTodos = () => {
  const { setIsLoading, setError, setTodos } = useTodoContext();

  const fetchTodos = useCallback(
    async (filter: Filter = "all") => {
      setIsLoading(true);
      setError(null);

      try {
        let list: Todo[];
        // console.log("Fetching todos with filter:", filter);
        if (filter === "active") {
          list = await apiFetchActive();
        } else if (filter === "completed") {
          list = await apiFetchCompleted();
        } else {
          list = await apiFetchTodos();
        }

        setTodos(list);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTodos],
  );

  return { fetchTodos };
};
