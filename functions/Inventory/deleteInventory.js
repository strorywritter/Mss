import addinventoryModel from "../../models/addInventoryModel.js";
import express from "express";

const router = express.Router();

router.delete("/deleteInventory/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await addinventoryModel.findByIdAndDelete(id);
    res.status(200).send(inventory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
