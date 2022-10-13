const mongoose = require("mongoose");
const app = require("../../index");
const express = require("express");
const dotenv = require("dotenv");
require("dotenv/config");

describe("Database Connection", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.mongoDB);
  });

  test("should return true", async () => {
    mongoose.connection.once("open", () => {
      expect(mongoose.connection.readyState).toEqual(1);
    });
  }, 2000);
});

// describe("Database", () => {
// beforeAll(async () => {
//   await mongoose.connect( );
// });
// it("Connect to DB", async () => {
//   expect(mongoose.connect(process.env.mongoDB)).toBe(true);

// const users = db.collection("users");

// const mockUser = { _id: "some-user-id", name: "John" };
// await users.insertOne(mockUser);

// const insertedUser = await users.findOne({ _id: "some-user-id" });
// expect(insertedUser).toEqual(mockUser);
// expect(response).toBeDefined();
// }, 200\0);
// test("Save a Blog", () => {});
// });
