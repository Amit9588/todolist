
import mongoose, { Schema, type Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
