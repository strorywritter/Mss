import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addinventoryModel from "../../models/addInventoryModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.patch("/updateInventory", async (req, res) => {
  try {
    // const userRole = req.headers.role
    // if (userRole != "supervisor" ){
    //   return res.send ("user not authorized to perform this task")
    // }

    const { inventoryName, quantity, department } = req.body;
    if (!inventoryName || !quantity || !department ) {
      return res.status(422).json({
        inventoryName: "inventoryName is required",
        quantity: "quantity required",
        department: "department required",
      });
    }

    const getDepartment = await addDepartmentModel.findById(department);

    if (getDepartment == null){
      return res.send("Department not found for given Id")
    }

    const workData = new addTodoModel({
      inventoryName: inventoryName,
      quantity: quantity,
      departmentId: getDepartment._id,
      departmentName: getDepartment.department,
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    await workData.save();
    res.send(workData);

  } catch (err) {
    res.send(err.message);
  }
});
export default router;