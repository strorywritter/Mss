import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import incomeModel from "../../models/incomeModel.js";
import requestInventoryModel from "../../models/requestInventoryModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.get("/getIncome", async (req, res) => {
  try {
    const userRole = req.headers.role
    // if (userRole != "ceo" ){
    //   return res.send ("user not authorized to perform this task")
    // }

    const income = await incomeModel.findById("63b12142ed49b7328b0010da");

    const totalCost = income.costForOne * income.sales
    const totalIncome = income.sales * income.valueForOne
    const totlaProfit = totalIncome - totalCost

    const returnData = {
      sales : income.sales,
      totalCost : totalCost,
      totalIncome : totalIncome,
      totlaProfit : totlaProfit
    }

    res.send(returnData);

  } catch (err) {
    res.send(err.message);
  }
});
export default router;