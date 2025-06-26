const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Helper functions
userSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({ email }); // findOne is a mongoose builtin method that searches in the collection connnected to the model
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

//static functions
userSchema.statics.register = async function (name, email, password) {
  try {
    // Create the new user
    const user = new this({
      name,
      email,
      password,
    });

    // Save the new user
    // return user.save(); // since we are directly returning it -> writing await here won't matter
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    // Throw an error if something goes wrong
    throw new Error("Error registering user: " + error.message);
  }
};

userSchema.statics.getUser = async function (userId) {
  try {
    // Find the user by their ID
    const user = await this.findById(userId);
    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }
    // Return the retrieved user
    return user;
  } catch (error) {
    // Throw an error if there's an issue during retrieval
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findUserByEmail(email);

    const userMatch = password === user.password;

    if (!userMatch) {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    // Throw an error if there's an issue during the login process
    throw new Error(`Error logging in: ${error.message}`);
  }
};

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
