import { Router } from "express";
import { createTodoController, getAllTodosController,
  getTodoByIdController, updateTodoController, deleteTodoController } from "./controller.js";
    
const router = Router();

router.post("/", createTodoController);
router.get("/", getAllTodosController);
router.get("/:id", getTodoByIdController);
router.put("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);

export default router;