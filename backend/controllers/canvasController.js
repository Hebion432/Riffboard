const Canvas = require("../models/canvasModel.js");
const Users = require("../models/userModel.js");

const getAllCanvases = async (req, res) => {
  // Even if this is a get method -> we are getting the email as we are taking out the information from the token and add it in req.user = decoded ( so when it pass from the middleware we have all the information about the user in req.user)
  const email = req.user.email;
  try {
    const canvases = await Canvas.getAllCanvases(email);
    res.status(200).json(canvases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCanvas = async (req, res) => {
  const { name } = req.body;
  const email = req.user.email; // Get the email from the token decoded in the authentication middleware
  try {
    const canvas = await Canvas.createCanvas(email, name);
    res.status(201).json(canvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCanvases, createCanvas };
