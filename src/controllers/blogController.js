const express = require("express");
const blogModel = require("../Models/blogModel");
const User = require("../Models/userModel");

exports.createBlog = async (request, response) => {
  const { id } = request.headers;
  const findUser = await User.findById(id);
  const { title, article, author, images } = request.body;
  if (findUser) {
    const blog = new blogModel({ title, article, author, images });
    console.log({ title, article, author, images });
    await blog.save();
    return response.status(201).send({
      status: true,
      message: "Blog has been succesfully posted",
      newBlog: blog,
    });
  } else {
    return response.status(401).send({
      status: false,
      message: "Unfortunately, You need to sign first",
    });
  }
};

exports.updateBlog = async (request, response) => {
  const { id } = request.headers;
  const findBlog = await blogModel.findById(id);
  console.log(findBlog);
  findBlog.title = request.body.title;
  findBlog.article = request.body.article;
  await findBlog.save();
  return response.status(201).send({
    status: true,
    message: "Blog has been updated successfully",
    updatedBlog: findBlog,
  });
};

exports.getBlog = async (request, response) => {
  const findAllBlogs = await blogModel.find();
  return response.status(200).send({
    status: true,
    message: "All blogs created",
    AllBlogs: findAllBlogs,
  });
};

exports.deleteBlog = async (request, response) => {
  const { id } = request.query;
  const findBlog = await blogModel.findByIdAndDelete(id);
  if (findBlog) {
    return response.status(201).send({
      status: true,
      message: "Blog deleted successfully",
    });
  } else {
    return response.status(409).send({
      status: false,
      message: "blog post not found",
    });
  }
};
