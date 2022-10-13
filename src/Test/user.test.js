const request = require("supertest");
const app = require("../../index");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv/config");
let id;

describe("User Routes", () => {
  it("Create User Account", async () => {
    const response = await request(app).post("/auth/signup").send({
      name: "New Name",
      email: "newnames@google.com",
      password: "newpass111$",
      phoneNo: "08140228588",
      username: "Usersname",
      profileImage: "imageURL",
    });
    id = response.body.newUser._id;
    //expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "Account has been created successfully",
        newUser: expect.any(Object),
        AccessToken: expect.any(String),
      })
    );
  }, 20000);

  it("Login User", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "newtestingstructure12@google.com",
      password: "New2x*",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          _id: "632f0a3005c83323fa74acd1",
          name: "TS New User",
          email: "newtestingstructure12@google.com",
          password:
            "$2b$10$hZkv.PC9PoOCwNM.j5kXteMOLvMHkjtC6J.MLRkfZziYg3o8rZkxS",
          phoneNo: "56738424321",
          username: "TS112 New",
          profileImage: "theprofileImage",
          __v: 0,
        },
      })
    );
  }, 30000);

  it("Update user", async () => {
    const response = await request(app)
      .put("/users/user?id=" + id)
      .send({
        username: "Updated Name",
        email: "updatenames@google.com",
        password: "updatepass111$",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "Account has been updated successfully",
        updatedUser: expect.any(Object),
      })
    );
  }, 20000);

  it("Get all users", async () => {
    const response = await request(app).get("/users/user");
    expect(response.body).toBeDefined();
    expect(response.status).toBe(200);
  }, 20000);

  it("Delete one user", async () => {
    const response = await request(app).delete("/users/user?id=" + id);
    // .expect(response.headers["Content-Type"])
    // .toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "User deleted successfully",
        deletedUser: expect.any(Object),
      })
    );
  }, 20000);
});
