const router = require("express").Router();
const {
  getAllCanvases,
  createCanvas,
  loadCanvas,
  updateCanvas,
} = require("../controllers/canvasController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.get("/", authenticationMiddleware, getAllCanvases);
router.post("/", authenticationMiddleware, createCanvas);
router.get("/:id", authenticationMiddleware, loadCanvas);
router.put("/:id", authenticationMiddleware, updateCanvas);

module.exports = router;
