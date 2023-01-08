import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import incomeModel from "../../models/incomeModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";
import requestInventoryModel from "../../models/requestInventoryModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.patch("/updateSale", async (req, res) => {
  try {
    const userRole = req.headers.role;
    // if (userRole != "ceo" ){
    //   return res.send ("user not authorized to perform this task")
    // }

    const income = await incomeModel.findById("63b12142ed49b7328b0010da");

    const sales = Number(req.query.sales) + income.sales;

    const salesData = await incomeModel.findOneAndUpdate(
      { _id: "63b12142ed49b7328b0010da" },
      {
        sales: sales,
        costForOne: 500,
        valueForOne: 720,
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      { upsert: true, new: true },
    );

    res.send(salesData);
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/updateIncome/:id", async (req, res) => {
  const { id } = req.params;
  const { costForOne, valueForOne, sales } = req.body;

  try {
    const income = await incomeModel.findByIdAndUpdate(id, { costForOne, valueForOne, sales });
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/deleteIncome/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const income = await incomeModel.findByIdAndDelete(id);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
