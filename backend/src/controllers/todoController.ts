import { NextFunction, Request, Response } from "express";
import Todo from "../models/Todo";

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text, status = true } = req.body;

    const newTodo = await Todo.create({
      text,
      status,
      user: req.user?.userId,
    });

    const todoToReturn = {
      text: newTodo.text,
      status: newTodo.status,
      user: newTodo.user,
    };

    res.status(200).json(todoToReturn);
  } catch (error: any) {
    // MongoDB duplicate key error code
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Todo with this text already exists for the user",
      });
      return;
    }

    res.status(500).json({
      message: "Failed to create todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get all todos for the user
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user?.userId })
      .sort({ createdAt: -1 }) // Newest first
      .lean();
    if (!todos || todos.length === 0) {
      res.status(404).json({ msg: "There are no todos to show for the user" });
      return;
    }
    res.status(200).json({ msg: "all todos returned", todos });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//  Get all active todos
export const getActiveTodos = async (req: Request, res: Response) => {
  try {
    const activeTodos = await Todo.find({
      user: req.user?.userId,
      status: false,
    });
    if (!activeTodos || activeTodos.length === 0) {
      res
        .status(404)
        .json({ msg: "There are no active todos to show for the user" });
      return;
    }
    res.status(200).json({ msg: "all activeTodos returned", activeTodos });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// !get all completed todos
export const getCompletedTodos = async (req: Request, res: Response) => {
  try {
    const completedTodos = await Todo.find({
      user: req.user?.userId,
      status: true,
    });

    res.status(200).json({
      msg: "Completed todos fetched",
      completedTodos, // may be []
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// !delete completed  todo
export const deleteCompletedTodos = async (req: Request, res: Response) => {
  try {
    const result = await Todo.deleteMany({
      user: req.user?.userId,
      status: true,
    });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: "No completed todos found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} todos deleted`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete completed todos error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete completed todos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a single todo by ID
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.userId,
    });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or not owned by user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      deletedTodo: {
        text: todo?.text,
      },
    });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// !update single todo
export const updateTodoTitle = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?.userId,
      },
      {
        text,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or not owned by user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo: todo,
    });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update only the status of a todo

export const updateTodoStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // 1. Validate input
    if (typeof status !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Valid boolean status is required",
      });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.user?.userId,
      },
      { status },
      {
        new: true,
        runValidators: true,
        projection: { text: 1, status: 1 },
      }
    );

    if (!updatedTodo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission",
      });
    }

    // 3. Handle not found case
    if (!updatedTodo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Todo status updated successfully",
      data: {
        id: updatedTodo._id,
        text: updatedTodo.text,
        status: updatedTodo.status,
      },
    });
  } catch (error) {
    // Pass error to Express error handler middleware
    next(error);
  }
};
