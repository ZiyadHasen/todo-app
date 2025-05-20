// src/pages/Home.tsx
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Pencil, Plus, X } from "lucide-react";

import { Spinner } from "@/components/ui/Spinner";
import { ErrorMessage } from "@/components/custom/ErrorMessage";

import { useTodoContext } from "@/context/TodoContext";
import { useFetchTodos, Filter } from "@/hooks/useFetchTodos";
import { useCreateTodo } from "@/hooks/useCreateTodo";

import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";

const Home = () => {
  const { todos = [], isLoading, error } = useTodoContext();
  const { fetchTodos } = useFetchTodos();
  const { addTodo } = useCreateTodo();

  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch whenever filter changes
  useEffect(() => {
    fetchTodos(filter);
  }, [fetchTodos, filter]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;
    await addTodo(text, false);
    fetchTodos(filter);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFilter = (f: Filter) => {
    setFilter(f);
  };

  // delete
  const { deleteTodo, clearCompletedTodos } = useDeleteTodo();

  // update status
  const { updateStatus, updateTitle } = useUpdateTodo();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg">
      <h1 className="text-text-primary mt-8 text-center text-2xl font-bold">
        Todo App
      </h1>

      {error && <ErrorMessage error={error} />}
      {isLoading && <Spinner />}

      {/* Add Form */}
      <form onSubmit={handleAddTodo} className="px-4">
        <div className="border-border-default border-b py-2">
          <div className="flex items-center gap-3">
            <Input
              ref={inputRef}
              name="text"
              type="text"
              placeholder="Create a new todo..."
              className="border-none text-sm text-gray-600 shadow-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 w-8 rounded-full bg-purple-500 p-0 hover:bg-purple-600"
            >
              <span className="sr-only">Add todo</span>
              <Plus size={16} className="text-white" />
            </Button>
          </div>
        </div>
      </form>

      {/* List */}
      <ul className="mt-6 flex-1 overflow-y-auto">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="group border-border-default flex items-center gap-3 border-b p-4 py-3 transition-colors hover:bg-gray-50"
          >
            {/* toggle */}
            <button
              onClick={() => updateStatus(todo._id, !todo.status)}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
                todo.status
                  ? "border-transparent bg-gradient-to-br from-purple-400 to-purple-600"
                  : "border-gray-200 hover:border-purple-400",
              )}
            >
              {todo.status && <Check size={14} className="text-white" />}
            </button>

            {/* text or edit input */}
            {editingId === todo._id ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => {
                  updateTitle(editingId!, editText.trim());
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTitle(editingId!, editText.trim());
                    setEditingId(null);
                  }
                }}
                autoFocus
                className="flex-grow border-none text-sm focus-visible:ring-0"
              />
            ) : (
              <span
                onClick={() => updateStatus(todo._id, !todo.status)}
                className={cn(
                  "flex-grow cursor-pointer text-sm font-medium transition-colors",
                  todo.status ? "text-gray-400 line-through" : "text-gray-700",
                )}
              >
                {todo.text}
              </span>
            )}

            {/* edit & delete */}
            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => {
                  setEditingId(todo._id);
                  setEditText(todo.text);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div
        className={cn(
          "border-border-default mt-auto flex flex-wrap items-center justify-between border-t p-4 text-xs",
          filter === "active"
            ? "bg-purple-50 text-purple-600"
            : "bg-white text-gray-500",
        )}
      >
        <span className="font-medium">
          {todos.filter((t) => !t.status).length} items left
        </span>
        <div className="flex items-center gap-4 font-medium">
          <button
            onClick={() => handleFilter("all")}
            className={cn(
              "cursor-pointer hover:text-purple-800",
              filter === "all" ? "text-purple-600" : "text-gray-500",
            )}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("active")}
            className={cn(
              "cursor-pointer hover:text-purple-600",
              filter === "active" ? "text-purple-600" : "text-gray-500",
            )}
          >
            Active
          </button>
          <button
            onClick={() => handleFilter("completed")}
            className={cn(
              "cursor-pointer hover:text-purple-600",
              filter === "completed" ? "text-purple-600" : "text-gray-500",
            )}
          >
            Completed
          </button>
        </div>
        <button
          onClick={clearCompletedTodos}
          className="cursor-pointer text-gray-500 hover:text-purple-600"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default Home;
