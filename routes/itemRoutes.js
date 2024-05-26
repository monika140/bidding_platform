const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { validateCreateItem } = require("../validations/itemValidation");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");


router.get("/all", getAllItems);
router.get("/:id", getItemById);
router.post("/create", authMiddleware, validateCreateItem, createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;
