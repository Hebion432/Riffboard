require("dotenv").config();
const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@amit.0ivxb.mongodb.net/?retryWrites=true&w=majority&appName=Amit`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

module.exports = connectToDatabase;
