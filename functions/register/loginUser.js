import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addUserModel from "../../models/addUsersModel.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr("myTotallySecretKey");

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.post("/loginUser", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userId = req.query.userId;
    if (!userName || !password) {
      return res.status(422).json({
        userName: "userName is required",
        password: "password required",
      });
    }

    const getUser = await addUserModel.findOne({ userName });

    if (!getUser) {
      return res.status(404).json("Invalid users details");
    }

    const decryptedPassword = cryptr.decrypt(getUser.password);

    if (getUser.userName == userName && decryptedPassword == password) {
      res.status(200).send(getUser);
    } else {
      return res.status(404).json("Invalid user details");
    }
  } catch (err) {
    res.send(err);
  }
});
export default router;
