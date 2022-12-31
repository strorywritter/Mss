import cloudinary from "cloudinary";
import date from "date-and-time";
import "dotenv/config";
import express from "express";
import addUserModel from "../../models/addUsersModel.js";
import Cryptr from 'cryptr'
const cryptr = new Cryptr('myTotallySecretKey');

const router = express.Router();

const now = new Date();
const dateTime = date.format(now, "ddd, MMM DD YYYY");

router.post("/loginUser", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userId = req.query.userId;
    if (!userName || !password || !userId) {
      return res.status(422).json({
        userId: "userId is required",
        userName: "userName is required",
        password: "password required",
      });
    }

    const getUser = await addUserModel.findById(userId);

    const decryptedPassword = cryptr.decrypt(getUser.password);

    if(getUser.userName == userName && decryptedPassword == password){
      res.send(true);
    }
    else{
      res.send(false);
    }

  } catch (err) {
    res.send(err);
  }
});
export default router;
