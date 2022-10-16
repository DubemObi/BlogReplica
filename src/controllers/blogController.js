const express = require("express");
const blogModel = require("../Models/blogModel");
const User = require("../Models/userModel");
const { handleErrors } = require("../../utils/blogErrorHandler");

exports.createBlog = async (request, response) => {
  try {
    const findUser = await User.findById(request.body.author);
    const { title, article, author, images } = request.body;
    if (findUser) {
      const blog = new blogModel({ title, article, author, images });
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
  } catch (err) {
    const error = handleErrors(err);
    return response.status(400).json({ error });
  }
};

exports.updateBlog = async (request, response) => {
  const { id } = request.params;
  const findBlog = await blogModel.findById(id);
  console.log(findBlog);
  findBlog.title = request.body.title;
  findBlog.article = request.body.article;
  await findBlog.save();
  return response.status(200).send({
    status: true,
    message: "Blog has been updated successfully",
    updatedBlog: findBlog,
  });
};

exports.getOneBlog = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneBlog = await blogModel.findById(id);

    if (!findOneBlog) {
      return response.status(404).send({
        status: false,
        message: "Blog not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "Blog found",
        Blog: findOneBlog,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};

exports.getBlogs = async (request, response) => {
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
    return response.status(200).send({
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
