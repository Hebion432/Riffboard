const mongoose = require("mongoose");
const { post } = require("../routes/registerRoutes");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxLength: 200 },
    content: { type: String, trim: true, required: true },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// to create a new post
postSchema.statics.createPost = async function (title, content) {
  try {
    const post = new this({
      //this here refers to the model (Post) that will be created from this schema.
      // never use arrow functoin with this
      title,
      content,
    });

    return await post.save(); // .save() return promise that's why an async functions
    // saves the new post document into the MongoDB database. Returns a Promise that resolves to the saved post.
  } catch (error) {
    throw new Error("Error Creating Post." + error.message);
  }
};

// to get a new Post
postSchema.statics.getPostById = async function (postId) {
  try {
    const post = await this.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    throw new Error("Failed to retrieve post");
  }
};

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
