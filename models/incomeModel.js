import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  sales:{ type: Number, required: true },
  costForOne:{ type: Number, required: true },
  valueForOne: { type: Number, required: true },
  createdAt:Date,
  updatedAt:Date,
})

export default mongoose.model("income",incomeSchema)
