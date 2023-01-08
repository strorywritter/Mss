import express from "express";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from "./controller.js";
const router = express.Router();

router.get("/getDepartments", getDepartments);
router.post("/addDepartment", addDepartment);
router.patch("/updateDepartment/:id", updateDepartment);
router.delete("/deleteDepartment/:id", deleteDepartment);
export default router;
