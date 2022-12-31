import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.patch("/updateWorkToInProgress", async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const updatedWork = await addTodoModel.findOneAndUpdate({_id:taskId},{status: "In progress"});
    res.send(`Task ${updatedWork.taskName} started`);
  } catch (err) {
    res.send(err);
  }
});
export default router;
