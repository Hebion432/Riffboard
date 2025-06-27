const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper function to handle errors in controllers
const handleControllerError = (res, error) => {
  console.error(error.message);
  res.status(500).json({ message: error.message });
};

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await Users.register(name, email, password);

    // Generate a token after registration
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the new user and token as response
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    handleControllerError(res, error);
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    handleControllerError(res, error);
  }
};

// Get user profile (JWT authentication required -> cheked thoruouh the middleware)
const getUserProfile = async (req, res) => {
  try {
    const user = await Users.getUser(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser, getUserProfile };
