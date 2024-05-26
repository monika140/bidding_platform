const express = require("express");
const { Register, Login, Profile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRegistration, validateLogin } = require("../validations/authValidation");
const router = express.Router();

router.post("/register", validateRegistration, Register);
router.post("/login",validateLogin, Login);
router.get("/profile", authMiddleware, Profile);

module.exports = router;
