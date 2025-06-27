const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticateTokens");

const {
  createUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

// toh ye sab /users/... yaha aayega
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/profile", authenticationMiddleware, getUserProfile);

module.exports = router;
