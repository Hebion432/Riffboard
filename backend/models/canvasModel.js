const mongoose = require("mongoose");
const Users = require("../models/userModel.js");

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    elements: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    shared_with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

canvasSchema.statics.getAllCanvases = async function (email) {
  // Attempt to find the user by their email
  const user = await Users.findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    // Retrieve canvases that the user owns or has been shared with them
    const canvases = await this.find({
      $or: [{ owner: user._id }, { shared_with: user._id }],
    });
    // Return the retrieved canvases
    return canvases;
  } catch (error) {
    // Throw an error if there's an issue during retrieval
    throw new Error(`Error getting canvases: ${error.message}`);
  }
};

canvasSchema.statics.createCanvas = async function (email, name) {
  const user = await Users.findOne({ email });
  try {
    // Find the user by email
    if (!user) {
      throw new Error("User not found");
    }

    // Create the new canvas
    const canvas = new this({
      owner: user._id,
      name,
      elements: [],
      shared_with: [],
    });

    // Save the new canvas
    const newCanvas = await canvas.save();
    return newCanvas;
  } catch (error) {
    throw new Error(`Error creating canvas: ${error.message}`);
  }
};

canvasSchema.statics.loadCanvas = async function (email, canvasId) {
  const user = await Users.findOne({ email });
  try {
    // Find the user by email
    if (!user) {
      throw new Error("User not found");
    }

    // Find the canvas with the id canvasID that the user owns or has access to
    const canvas = await this.findOne({
      _id: canvasId,
      $or: [{ owner: user._id }, { shared_with: user._id }],
    });

    // If the canvas was not found, throw an error
    if (!canvas) {
      throw new Error("Canvas not found");
    }

    // Return the loaded canvas
    return canvas;
  } catch (error) {
    throw new Error(`Error loading canvas: ${error.message}`);
  }
};

const canvasModel = mongoose.model("Canvas", canvasSchema);
module.exports = canvasModel;
