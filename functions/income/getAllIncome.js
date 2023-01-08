import express from "express";
import incomeModel from "../../models/incomeModel.js";

const router = express.Router();

router.get("/incomes", async (req, res) => {
  try {
    const income = await incomeModel.find();

    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
