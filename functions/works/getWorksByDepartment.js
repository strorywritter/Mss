import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.get("/getWorksByDepartment", async (req, res) => {
  try {
    const department = req.query.department;
    const allWorks = await addTodoModel.find({departmentId:department});
    res.send(allWorks);
  } catch (err) {
    res.send(err);
  }
});
export default router;
