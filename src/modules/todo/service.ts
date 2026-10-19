import { Todo } from "./model.js";
import mongoose from "mongoose";

interface CreateTodoInput {
  title: string;
  description?: string;
}

export async function createTodo(input: CreateTodoInput) {
  const todo = await Todo.create(input);

  return todo;
}

export async function getAllTodos() {
    return await Todo.find().sort({ createdAt : -1})

}

export async function getTodoById(id: string) {
    return await Todo.findById(id)
}

export async function updateTodo(
    id : string,
    input :{
        title ?: string;
        description ?: string;
        completed ?: boolean;
    }
) {
    if(!mongoose.isValidObjectId(id)){
        throw new Error("Invalid todo ID");
}

const todo = await Todo.findByIdAndUpdate (
    id, 
    input,
    {
        new: true,
        runValidators: true,
    }
) 
return todo;
}

export async function deleteTodo(id: string ){
  if (!mongoose.isValidObjectId(id)){
    return null
  }
  const todo = await Todo.findByIdAndDelete(id);
  return todo 
}