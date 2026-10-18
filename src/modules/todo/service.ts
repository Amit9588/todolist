import { Todo } from "./model.js";

interface CreateTodoInput {
  title: string;
  description?: string;
}

export async function createTodo(input: CreateTodoInput) {
  const todo = await Todo.create(input);

  return todo;
}