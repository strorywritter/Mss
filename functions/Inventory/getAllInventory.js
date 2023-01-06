import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addinventoryModel from "../../models/addInventoryModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.get("/getAllInventory", async (req, res) => {
  try {

    const allInventories = await addinventoryModel.find();
    res.send(allInventories);

  } catch (err) {
    res.send(err.message);
  }
});
export default router;