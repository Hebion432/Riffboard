const router = require("express").Router();
const {
  getAllCanvases,
  createCanvas,
  loadCanvas,
} = require("../controllers/canvasController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.get("/", authenticationMiddleware, getAllCanvases);
router.post("/", authenticationMiddleware, createCanvas);
router.get("/:id", authenticationMiddleware, loadCanvas);

module.exports = router;
