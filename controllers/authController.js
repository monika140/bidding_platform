const bcrypt = require("bcrypt");
const prisma = require("../DB/dbconfig");
const userValidator = require("../validations/userValidations");
const { createAccessToken } = require("../util/secretToken");

//Registration of user
const Register = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    console.log("Received user data:", req.body);

    const existingUser = await prisma.user.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      email,
      password: hashedPassword,
      username,
      createdAt,
    });
    console.log("New user created:", user);

    const token = createAccessToken(user._id);
    console.log("Generated token:", token);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log("Token cookie set.");

    res.status(201).json({
      message: "User registration is successfully done",
      success: true,
      user,
    });
    console.log("Registration response sent.");
    next();
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Login user

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, msg: "Please enter all details!!" });
    }

    // Find the user in the database by email
    const user = await prisma.user.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: "This email is not registered!!" });
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: "Password incorrect!!" });

    // Generate a JWT token for the authenticated user
    const token = createAccessToken({ id: user._id });

    // Remove the password from the user object before sending the response
    //delete user.password;
    // Send a success response with the token and user data
    res
      .status(200)
      .json({ token, user, status: true, msg: "Login successful.." });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

//user profile
const Profile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { Register, Login, Profile };
