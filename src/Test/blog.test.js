const request = require("supertest");
const express = require("express");
const app = require("../../index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv/config");
let id;

describe("Blog routes", () => {
  it("Create a blog", async () => {
    const response = await request(app)
      .post("/users/blog/632f0a3005c83323fa74acd1")
      .send({
        title: "Blog Title",
        article: "The rich dad, poor dad explanation",
        author: "Robert Kyosaki",
        images: "ImageURL",
      });
    id = response.body.newBlog._id;
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "Blog has been succesfully posted",
        newBlog: expect.any(Object),
      })
    );
  }, 20000);

  it("update a blog", async () => {
    const response = await request(app)
      .put("/users/blog/" + id)
      .send({
        title: "Updated Title",
        article: "The New dispensation",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "Blog has been updated successfully",
        updatedBlog: expect.any(Object),
      })
    );
  }, 20000);

  it("get all blog", async () => {
    const res = await request(app).get("/users/blog");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    // expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  it("Delete a blog", async () => {
    const response = await request(app).delete("/users/blog?id=" + id);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: true,
        message: "Blog deleted successfully",
      })
    );
  }, 20000);
});
