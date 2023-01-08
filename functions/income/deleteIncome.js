import express from "express";
import incomeModel from "../../models/incomeModel.js";

const router = express.Router();

router.delete("/deleteIncome", async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Departments.findByIdAndDelete(id);

    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
