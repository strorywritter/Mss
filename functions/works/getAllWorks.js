import express from "express";
import "dotenv/config";
const router = express.Router();
import addTodoModel from "../../models/addTodoModel.js";

router.get("/getAllWorks", async (req, res) => {
  try {
    const allWorks = await addTodoModel.find();
    res.send(allWorks);
  } catch (err) {
    res.send(err);
  }
});
export default router;
