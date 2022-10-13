const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserBlog = require("./src/routers/routes");
const UserAuth = require("./src/routers/authRoute");
require("dotenv/config");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", UserBlog);
app.use("/auth", UserAuth);

const database = async () => {
  await mongoose.connect(process.env.mongoDB);
};
database();
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

// mongoose.connect(process.env.mongoDB).then(() => {
//   console.log("Connected to DB");
// });

module.exports = app;
