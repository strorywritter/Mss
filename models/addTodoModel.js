import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  taskName:{ type: String, required: true, unique: false },
  description:{ type: String, required: true },
  status:{ type: String, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  materials: { type: [], required: true },
  assignedToId : { type: String, required: true },
  assignedToName : { type: String, required: true },
  createdAt:Date,
  updatedAt:Date,
  // file: String
})

export default mongoose.model("workMonitoring",todoSchema)
