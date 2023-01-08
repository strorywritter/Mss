import express from "express";
import incomeModel from "../../models/incomeModel.js";

const router = express.Router();

router.post("/addIncome", async (req, res) => {
  const { costForOne, valueForOne, sales } = req.body;
  try {
    const income = await incomeModel.create({ costForOne, valueForOne, sales });

    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
