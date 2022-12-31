import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
  department:{ type: String, required: true, unique: false },
})

export default mongoose.model("department",departmentSchema)
