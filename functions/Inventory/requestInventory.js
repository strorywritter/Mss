import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import requestInventoryModel from "../../models/requestInventoryModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.post("/requestInventory", async (req, res) => {
  try {
    const { inventoryName, quantity, departmentName, status, departmentId } = req.body;
    if (!inventoryName || !quantity || !departmentName) {
      return res.status(422).json({
        inventoryName: "inventoryName is required",
        quantity: "quantity required",
        department: "department required",
      });
    }

    // const getDepartment = await addDepartmentModel.findById(department);

    // if (getDepartment == null) {
    //   return res.send("Department not found for given Id");
    // }

    const inventoryData = new requestInventoryModel({
      inventoryName,
      status,
      quantity,
      departmentId,
      departmentName,
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    await inventoryData.save();
    res.send(inventoryData);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/requestInventory", async (req, res) => {
  try {
    const requestInventories = await requestInventoryModel.find();
    res.status(200).send(requestInventories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/requestInventory/:departmentId", async (req, res) => {
  const { departmentId } = req.params;
  try {
    const requestInventories = await requestInventoryModel.find({ departmentId });
    res.status(200).send(requestInventories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/requestInventory/:id", async (req, res) => {
  const { id } = req.params;
  const { departmentId, departmentName, status, quantity, inventoryName } = req.body;
  try {
    const requestInventories = await requestInventoryModel.findByIdAndUpdate(id, {
      departmentId,
      departmentName,
      status,
      quantity,
      inventoryName,
      updatedAt: dateTime,
    });
    res.status(200).send(requestInventories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/requestInventory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requestInventories = await requestInventoryModel.findByIdAndDelete(id);
    res.status(200).send(requestInventories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
