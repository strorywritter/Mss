import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
})

export default mongoose.model("user", userSchema)