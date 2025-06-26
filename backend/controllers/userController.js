const Users = require("../models/userModel");

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

    // Send the new user and token as response
    res.status(201).json({ newUser });
  } catch (error) {
    handleControllerError(res, error);
  }
};

module.exports = { createUser };
