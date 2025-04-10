import { Request, Response } from "express";
import Todo from "../models/Todo";
import { Status } from "../constants/constants";

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const newTodo = await Todo.create({
      text,
      user: req.user?.userId,
    });
    const todoToReturn = {
      text: newTodo.text,
      status: newTodo.status,
      user: newTodo.user,
    };
    res.status(200).json(todoToReturn);
  } catch (error) {
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
      status: Status.ACTIVE,
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
      status: "1",
    });
    if (!completedTodos || completedTodos.length === 0) {
      res
        .status(404)
        .json({ msg: "There are no completed todos to show for the user" });
      return;
    }
    res
      .status(200)
      .json({ msg: "all completedTodos returned", completedTodos });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// !get single to do passing the id param
export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ msg: "Todo not found" });
      return;
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// !delete completed  todo
export const deleteCompletedTodos = async (req: Request, res: Response) => {
  try {
    const result = await Todo.deleteMany({
      user: req.user?.userId,
      status: Status.COMPLETED,
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
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { text, status } = req.body;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?.userId,
      },
      {
        text,
        status,
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

export const updateTodoStatus = async (req: Request, res: Response) => {
  try {
    const { todoId, status } = req.body;
    // console.log("todo is : " + todoId + " , status : " + status);
    // ! sends the error response but then moves on to run the rest of the function, potentially
    // ! sending a second response and throwing "Cannot set headers after they are sent" error.
    //! Always bail out with return; to prevent that.
    if (!status) {
      res.status(400).json({ message: "Valid status is required ..." });
      return;
    }

    // 2. Find and update the todo
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: todoId,
        user: req.user?.userId,
      },
      {
        status,
      },
      { new: true, runValidators: true }
    );

    // 3. Handle case where todo wasn't found
    if (!updatedTodo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission",
      });
      return;
    }

    // 4.  success response
    res.status(200).json({
      success: true,
      message: "Todo status updated successfully",
      data: {
        text: updatedTodo?.text,
        status: updatedTodo?.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
