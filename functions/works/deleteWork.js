import express from "express";
import Task from "../../models/addTodoModel.js";
const router = express.Router();

router.delete("/deleteWorks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await Task.findByIdAndDelete(id);
    res.status(200).send(deleteTask);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
