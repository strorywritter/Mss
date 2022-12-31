import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
  inventoryName:{ type: String, required: true, unique: false },
  // status:{ type: String, required: true },
  quantity: { type: String, required: true, unique: false },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  createdAt:Date,
  updatedAt:Date,
})

export default mongoose.model("inventoryManagement",inventorySchema)
