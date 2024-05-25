const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getNotifications,
  markRead,
} = require("../controllers/notificationController");


router.get("/", authMiddleware, getNotifications);
router.post("/mark-read", authMiddleware, markRead);

module.exports = router;
