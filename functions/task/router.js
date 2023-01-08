import express from "express";
import { getTasks, addTasks, updateTasks, deleteTasks } from "./controller.js";
const router = express.Router();

router.get("/getTasks", getTasks);
router.post("/addTask", addTasks);
router.patch("/updateTask/:id", updateTasks);
router.delete("/deleteTask/:id", deleteTasks);
export default router;
