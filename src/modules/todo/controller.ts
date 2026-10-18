import type { Request, Response } from "express";
import { createTodo } from "./service.js";

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