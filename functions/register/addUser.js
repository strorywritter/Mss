import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addUserModel from "../../models/addUsersModel.js";
import addDepartmentModel from "../../models/addDepartmentModel.js";
import Cryptr from 'cryptr'
const cryptr = new Cryptr('myTotallySecretKey');

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.post("/addUser", async (req, res) => {
  try {
    const { userName, password, department, role } = req.body;
    if (!userName || !password || !department || !role ) {
      return res.status(422).json({
        userName: "userName is required",
        password: "password required",
        department: "department required",
        role: "role required",
      });
    }
    let getDepartment
    try{
      getDepartment = await addDepartmentModel.findById(department);
    }
    catch(err){
      throw err.message
    }

    if (getDepartment == null){
      throw ("Deprtment not found for given Id")
    }
    
    const encryptedPassword = cryptr.encrypt(password);
    
    const userData = new addUserModel({
      userName: userName,
      password: encryptedPassword,
      departmentId: getDepartment._id,
      departmentName: getDepartment.department,
      role: role,
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    await userData.save();
    res.send(userData);

  } catch (err) {
    res.send(err);
  }
});
export default router;
