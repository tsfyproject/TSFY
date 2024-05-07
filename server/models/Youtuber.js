const mongoose = require("mongoose");

const youtuberSchema = mongoose.Schema(
  {
    ytbImg:{
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    ytbName: {
      type: String,
      require: true,
    },
    ytbDesc: {
      type: String,
    },
    ytbView: {
      type: Number,
      default: 0,
    },
    ytbContact: {
      type: [
        {
          type: { type: String},
          value: { type: String},
        },
      ],
      default: [
        {
          type: "tel",
          value: "",
        },
        {
          type: "line",
          value: "",
        },
        {
          type: "facebook",
          value: "",
        },
        {
          type: "instagram",
          value: "",
        },
      ]
    },
    videoCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Youtubers", youtuberSchema);
