import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addinventoryModel from "../../models/addInventoryModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";
import requestInventoryModel from "../../models/requestInventoryModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.patch("/updateInventory", async (req, res) => {
  try {
    const userRole = req.headers.role;
    if (userRole != "supervisor") {
      return res.send("user not authorized to perform this task");
    }

    const { inventoryName, quantity, department, reqId } = req.body;
    if (!inventoryName || !quantity || !department || !reqId) {
      return res.status(422).json({
        inventoryName: "inventoryName is required",
        quantity: "quantity required",
        department: "department required",
        reqId: "reqId required",
      });
    }

    const getDepartment = await addDepartmentModel.findById(department);

    if (getDepartment == null) {
      return res.send("Department not found for given Id");
    }

    const inventoryData = await addinventoryModel.findOneAndUpdate(
      { _id: reqId },
      {
        inventoryName: inventoryName,
        quantity: quantity,
        departmentId: getDepartment._id,
        departmentName: getDepartment.department,
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      { upsert: true, new: true },
    );

    const updateRequest = await requestInventoryModel.findOneAndUpdate(
      { _id: reqId },
      {
        status: "Completed",
      },
    );

    res.send(inventoryData);
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/updateInventory/:id", async (req, res) => {
  const { id } = req.params;
  const { inventoryName, quantity, departmentId, departmentName } = req.body;

  try {
    const income = await addinventoryModel.findByIdAndUpdate(id, {
      inventoryName,
      quantity,
      departmentId,
      departmentName,
    });
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
