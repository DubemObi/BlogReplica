const express = require("express");
const Blog = require("../src/Models/blogModel");

//Handling errors
exports.handleErrors = (err) => {
  // console.log(err.message, err.code);
  console.log(err);
  let errors = {
    title: "",
    article: "",
    author: "",
    image: "",
  };

  if (err.code === 11000) {
    errors.title = "The title of Blog already exists";
    return errors;
  }

  //validate errors
  if (err.message.includes("user validation failed"))
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

  return errors;
};
