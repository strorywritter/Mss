import mongoose from 'mongoose'

const requestInventorySchema = new mongoose.Schema({
  inventoryName:{ type: String, required: true },
  status:{ type: String, required: true },
  quantity: { type: Number, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  createdAt:Date,
  updatedAt:Date,
})

export default mongoose.model("requsetinventory",requestInventorySchema)
