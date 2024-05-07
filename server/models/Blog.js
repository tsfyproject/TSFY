const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    ytbId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Youtubers",
    },
    blogTitle: {
      type: String,
      require: true,
    },
    blogDesc: {
      type: String,
      require: true,
    },
    blogUrl: {
      type: String,
      require: true,
    },
    blogThumbnail: {
      type: String,
      require: true,
    },
    blogAddress: {
      type: String,
      require: true,
    },
    blogLocation: {
      type: String,
      require: true,
    },
    blogType:{
      type: String,
      require: true,
    },
    blogView: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);