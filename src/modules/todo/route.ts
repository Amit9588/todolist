import { Router } from "express";
import { createTodoController } from "./controller.js";

const router = Router();

router.post("/", createTodoController);

export default router;