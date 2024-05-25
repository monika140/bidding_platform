const express = require("express");
const { Register, Login, Profile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/profile", authMiddleware, Profile);

module.exports = router;
