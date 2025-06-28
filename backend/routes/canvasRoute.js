const router = require("express").Router();
const getAllCanvases = require("../controllers/canvasController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.get("/", authenticationMiddleware, getAllCanvases);

module.exports = router;
