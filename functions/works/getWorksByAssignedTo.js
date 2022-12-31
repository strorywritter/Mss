import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.get("/getWorksByAssignedTo", async (req, res) => {
  try {
    const assignedTo = req.query.assignedTo;
    const allWorks = await addTodoModel.find({assignedToId:assignedTo});
    res.send(allWorks);
  } catch (err) {
    res.send(err);
  }
});
export default router;