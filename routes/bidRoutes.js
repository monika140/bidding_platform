const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { getBidsByItem, placeBid } = require("../controllers/bidController");
router.get("/:itemId/bids", getBidsByItem);
router.post("/:itemId/bids", authMiddleware, placeBid);

module.exports = router;
