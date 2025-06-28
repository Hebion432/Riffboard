const router = require("express").Router();
const {
  getAllCanvases,
  createCanvas,
} = require("../controllers/canvasController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.get("/", authenticationMiddleware, getAllCanvases);
router.post("/", authenticationMiddleware, createCanvas);

module.exports = router;
