const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter the title of your article"],
    unique: true,
  },
  article: {
    type: String,
    required: [true, "Write your article"],
    max: 600,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Enter a valid id"],
  },
  images: {
    type: String,
    required: [true, "Enter your image URL"],
  },
});

module.exports = mongoose.model("blog", blogSchema);
