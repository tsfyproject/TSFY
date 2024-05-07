const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const homeRoute = require("./routes/homeRoute");
const adminRoute = require("./routes/adminRoute");
const blogRoute = require("./routes/blogRoute");

const app = express();

const corsOptions = {
  origin: "*", // ในที่นี้เรากำหนดให้อนุญาตทุกๆ origin เข้าถึง API ของเรา
  methods: "GET,POST", // กำหนดเมธอดที่อนุญาต
};

//connect cloud database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
const bodyParser = require("express").json;
app.use(bodyParser());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api", homeRoute);
app.use("/api", adminRoute);
app.use("/api", blogRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
