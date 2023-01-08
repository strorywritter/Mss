import express from "express";
import addUserModel from "../../models/addUsersModel.js";

const router = express.Router();

router.get("/get-relevent-users/:departmentId", async (req, res) => {
  try {
    const { departmentId } = req.params;

    const getUser = await addUserModel.find({ departmentId });

    res.status(200).send(getUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/get-relevent-users-by-department/:departmentName", async (req, res) => {
  try {
    const { departmentName } = req.params;

    const getUser = await addUserModel.find({ departmentName });

    res.status(200).send(getUser);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
