import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.patch("/updateWorkToCompleted", async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const updatedWork = await addTodoModel.findOneAndUpdate({_id:taskId},{status: "Completed"});
    res.send(`Task ${updatedWork.taskName} completed`);
  } catch (err) {
    res.send(err);
  }
});
export default router;