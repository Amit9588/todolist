import type { Request, Response } from "express";
import { createTodo , getAllTodos, getTodoById, updateTodo, deleteTodo} from "./service.js";
import mongoose from "mongoose";

export async function createTodoController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
      return;
    }

    if (
      description !== undefined &&
      typeof description !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
    }

    const todo = await createTodo({
      title: title.trim(),
      description: description?.trim(),
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Failed to create todo:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


export async function getAllTodosController(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const todos = await getAllTodos();

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Failed to fetch todos:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getTodoByIdController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
      return;
    }

    const todo = await getTodoById(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Failed to fetch todo:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateTodoController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { title, description, completed } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      completed === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
      return;
    }

    if (title !== undefined &&
        (typeof title !== "string" || !title.trim())) {
      res.status(400).json({
        success: false,
        message: "Title must be a non-empty string",
      });
      return;
    }

    if (description !== undefined &&
        typeof description !== "string") {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
    }

    if (completed !== undefined &&
        typeof completed !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Completed must be true or false",
      });
      return;
    }

    const input = {
      ...(title !== undefined ? { title: title.trim() } : {}),
      ...(description !== undefined
        ? { description: description.trim() }
        : {}),
      ...(completed !== undefined ? { completed } : {}),
    };

    const todo = await updateTodo(req.params.id, input);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or invalid ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Failed to update todo:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function deleteTodoController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const todo = await deleteTodo(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found or invalid ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Failed to delete todo:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}