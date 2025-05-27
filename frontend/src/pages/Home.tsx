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
    <div
      className={cn(
        "bg-bg-card font-josefin mx-3 flex w-full flex-col rounded-lg shadow-lg",
        "md:mx-auto md:max-w-xl",
      )}
    >
      <h1 className="text-text-accent font-josefin mt-8 text-center text-xl font-bold md:text-3xl">
        Todo App
      </h1>
      {error && <ErrorMessage error={error} />}
      {isLoading && <Spinner />}
      {/* Add Form */}
      <form onSubmit={handleAddTodo} className="px-8">
        <div className="border-border border-b py-3">
          <div className="flex items-center gap-3">
            <Input
              ref={inputRef}
              name="text"
              type="text"
              placeholder="Create a new todo..."
              className="text-text-main placeholder:text-text-subheading border-none shadow-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-bg-accent h-8 w-8 cursor-pointer rounded-full p-0"
            >
              <span className="sr-only">Add todo</span>
              <Plus
                // size={16}
                className="text-text-white h-4 w-4 md:h-6 md:w-6"
              />
            </Button>
          </div>
        </div>
      </form>
      {/* List */}
      <ul className="mt-6 flex-1 overflow-y-auto">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="group border-border hover:bg-bg-hover flex items-center gap-3 border-b p-4 py-4 transition-colors"
          >
            {/* toggle */}
            <button
              onClick={() => updateStatus(todo._id, !todo.status)}
              className={cn(
                "border-border flex h-6 w-6 items-center justify-center rounded-full border-1",
                todo.status
                  ? "bg-bg-accent border-0"
                  : "border-border bg-bg-card group-hover:border-accent/90", // ← add this
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
                className="flex-grow border-none focus-visible:ring-0"
              />
            ) : (
              <span
                onClick={() => updateStatus(todo._id, !todo.status)}
                className={cn(
                  "flex-grow cursor-pointer transition-colors",
                  todo.status
                    ? "text-text-caption line-through"
                    : "text-text-main",
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
                className="text-text-subheading hover:text-text-main"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-text-subheading hover:text-text-main"
              >
                <X size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Footer */}
      {/* Footer: desktop footer with filters hidden on mobile */}
      <div
        className={cn(
          "border-border font-josefin mt-auto flex items-center justify-between border-t px-4 pt-4 pb-0 text-sm md:p-4",
          filter === "active"
            ? "bg-accent-bg-light text-text-accent"
            : "text-text-main bg-background",
        )}
      >
        {/* items-left */}
        <span className="text-text-subheading font-medium">
          {todos.length} Items left
        </span>

        {/* filters: hidden on mobile, visible desktop */}
        <div className="hidden items-center gap-4 font-medium sm:flex">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={cn(
                "hover:text-text-accent cursor-pointer",
                filter === f ? "text-text-accent" : "text-text-subheading",
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* clear button */}
        <button
          onClick={clearCompletedTodos}
          className="text-text-subheading hover:text-text-accent cursor-pointer font-medium"
        >
          Clear Completed
        </button>
      </div>
      {/* Mobile-only filter bar under the footer */}
      <div className="mb-3 flex items-center justify-center gap-4 p-3 text-sm sm:hidden">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => handleFilter(f)}
            className={cn(
              "hover:text-text-accent cursor-pointer",
              filter === f
                ? "text-text-accent"
                : "text-text-subheading font-medium",
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
