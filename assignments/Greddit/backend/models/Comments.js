const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
  postedby: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  postid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comments", Comments);
