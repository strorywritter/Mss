import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addinventoryModel from "../../models/addInventoryModel.js";
import requestInventoryModel from "../../models/requestInventoryModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.get("/getAllRequests", async (req, res) => {
  try {

    const allRequests = await requestInventoryModel.find();
    res.send(allRequests);

  } catch (err) {
    res.send(err.message);
  }
});
export default router;