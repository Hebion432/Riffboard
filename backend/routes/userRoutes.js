const router = require("express").Router();

const { createUser, loginUser } = require("../controllers/userController");

// toh ye sab /users/... yaha aayega
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
