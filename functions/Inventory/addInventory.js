import addinventoryModel from "../../models/addInventoryModel.js";
import express from "express";

const router = express.Router();

router.post("/addInventory", async (req, res) => {
  try {
    const { departmentId, departmentName, inventoryName, quantity } = req.body;

    const inventory = await addinventoryModel.create({
      departmentId,
      departmentName,
      quantity,
      inventoryName,
    });
    res.status(200).send(inventory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
