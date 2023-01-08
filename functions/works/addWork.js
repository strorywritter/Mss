import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addTodoModel from "../../models/addTodoModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";
import addUserModel from "../../models/addUsersModel.js";

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.post("/addWork", async (req, res) => {
  try {
    const userRole = req.headers.role;
    // if (userRole != "supervisor" ){
    //   return res.send ("user not authorized to perform this task")
    // }

    const { taskName, description, department, materials, assignedTo } = req.body;
    if (!taskName || !description || !department || !materials || !assignedTo) {
      return res.status(422).json({
        taskName: "taskName is required",
        description: "description required",
        department: "department required",
        materials: "materials required",
        assignedTo: "assignedTo required",
      });
    }

    const checkAlreadyUsed = await addTodoModel.find({
      taskName: taskName,
      department: department,
    });
    if (checkAlreadyUsed.length != 0) {
      return res.send("task name already used");
    }

    const getDepartment = await addDepartmentModel.findById(department);

    if (getDepartment == null) {
      return res.send("Department not found for given Id");
    }

    const getAssignedUser = await addUserModel.findById(assignedTo);

    if (getAssignedUser == null) {
      return res.send("User not found for given Id");
    }

    const workData = new addTodoModel({
      taskName: taskName,
      description: description,
      departmentId: getDepartment._id,
      departmentName: getDepartment.department,
      status: "Assigned",
      materials: materials,
      assignedToId: assignedTo,
      assignedToName: getAssignedUser.userName,
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
