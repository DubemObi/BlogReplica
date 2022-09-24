const express = require("express");
const mongoose = require("mongoose");
const UserBlog = require("./src/routers/routes");
const UserAuth = require("./src/routers/auth");
require("dotenv/config");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 2021;
app.use(express.json());

app.use("/", UserBlog);
app.use("/", UserAuth);

app.use(cookieParser());

mongoose.connect(process.env.mongoDB).then(() => {
  console.log("Connected to DB");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
