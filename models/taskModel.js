import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  Department: { type: String, required: true },
  Supervisor: { type: String, required: true },
  "Assign To": { type: String, required: true },
  "Task Name": { type: String, required: true, unique: false },
  Description: { type: String, required: true },
  "Current Status": { type: String, required: true },
  "Spend Time": { type: Number, required: true },
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model("tasks", todoSchema);
