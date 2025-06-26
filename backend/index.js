const express = require("express");
const connectToDatabase = require("./routes/db");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");
const app = express();

const PORT = 3339;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDatabase();

//Routes
app.use("/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
