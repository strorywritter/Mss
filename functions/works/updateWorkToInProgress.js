import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.patch("/updateWorkToInProgress", async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const updatedWork = await addTodoModel.findOneAndUpdate(
      { _id: taskId },
      { status: "In progress" },
    );
    res.send(`Task ${updatedWork.taskName} started`);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/updateWorkToInProgress/:id", async (req, res) => {
  const { id } = req.params;
  const {
    departmentName,
    status,
    departmentId,
    description,
    taskName,
    materials,
    assignedTo,
    assignToName,
  } = req.body;
  const data = {
    taskName,
    description,
    departmentId,
    departmentName,
    status,
    materials,
    assignedToId: assignedTo,
    assignedToName: assignToName,
  };
  try {
    const updatedWork = await addTodoModel.findByIdAndUpdate(id, data);
    res.status(200).send(updatedWork);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
