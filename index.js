import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import multer from "multer";
import cloudinary from "cloudinary";
// import middleware from './middleware/auth.js'

const app = express();
const PORT = 4000;

app.use(cors());

// app.use(middleware.decodeToken)

await connectDB();

cloudinary.config({
  cloud_name: "dt0jpeqrs",
  api_key: "423843764313348",
  api_secret: "wRF-zPuA2dhuZ9VpYxbnYkR6XW8",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// work functions
// import signup from './functions/user/signup.js'
import addWork from "./functions/works/addWork.js";
import deleteWork from "./functions/works/deleteWork.js";
import getWorks from "./functions/works/getAllWorks.js";
import getWorksByAssignedTo from "./functions/works/getWorksByAssignedTo.js";
import getWorksByDepartment from "./functions/works/getWorksByDepartment.js";
import updateWorkToInProgress from "./functions/works/updateWorkToInProgress.js";
import updateWorkToCompleted from "./functions/works/updateWorkToCompleted.js";

// user functions
import addUser from "./functions/register/addUser.js";
import loginUser from "./functions/register/loginUser.js";
import getUserForReleventDepartment from "./functions/register/getUserForReleventDepartment.js";

// inventory functions
import addinventory from "./functions/Inventory/updateInventory.js";
import getAllinventory from "./functions/Inventory/getAllInventory.js";
import getInventoryForDep from "./functions/Inventory/getInventoryForDepartment.js";
import reqInventory from "./functions/Inventory/requestInventory.js";
import getReqInventory from "./functions/Inventory/getAllRequests.js";
import addedInventory from "./functions/Inventory/addInventory.js";
import deleteInventory from "./functions/Inventory/deleteInventory.js";

// income functions
import updateSales from "./functions/income/updateIncome.js";
import getSales from "./functions/income/getIncome.js";
import getAllIncome from "./functions/income/getAllIncome.js";
import addIncome from "./functions/income/addIncome.js";
import deleteIncome from "./functions/income/deleteIncome.js";

// departments
import departmentsRouter from "./functions/department/router.js";
import tasksRouter from "./functions/task/router.js";

app.use(bodyParser.json());

// app.use('/user',upload.single("file"),addTodo)
app.use("/work", addWork);

app.use("/work", deleteWork);

app.use("/work", getWorks);

app.use("/work", getWorksByAssignedTo);

app.use("/work", getWorksByDepartment);

app.use("/work", updateWorkToInProgress);

app.use("/work", updateWorkToCompleted);

////////////////////////////////////////////////////////////////

app.use("/user", addUser);

app.use("/user", loginUser);

app.use("/user", getUserForReleventDepartment);

//////////////////////////////////////////////////////////////

app.use("/inventory", addinventory);

app.use("/inventory", getAllinventory);

app.use("/inventory", getInventoryForDep);

app.use("/inventory", reqInventory);

app.use("/inventory", getReqInventory);

app.use("/inventory", addedInventory);

app.use("/inventory", deleteInventory);

///////////////////////////////////////////////////////////////

app.use("/income", updateSales);

app.use("/income", getSales);

app.use("/income", getAllIncome);
app.use("/income", addIncome);
app.use("/income", deleteIncome);

///////////////////////////////////////////////////////////////
app.use("/department", departmentsRouter);

///////////////////////////////////////////////////////////////
app.use("/task", tasksRouter);

app.get("/users", (req, res) => {
  console.log("main page");
  res.send("main page");
});
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
