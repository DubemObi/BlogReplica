const app = require("./index");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const PORT = 2022;
// app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
