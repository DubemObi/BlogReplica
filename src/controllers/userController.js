const User = require("../Models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/errorHandler");

//Generating JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "dubem secret string", {
    expiresIn: maxAge,
  });
};

//CreateUser Account
exports.createUser = async (request, response) => {
  const reqBody = request.body;
  try {
    const user = new User(reqBody);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    await user.save();
    return response.status(201).send({
      status: true,
      message: "Account has been  created successfully",
      newUser: user,
      AccessToken: token,
    });
  } catch (error) {
    const err = ErrorHandler.handleErrors(error);
    return response.status(404).json({ err });
  }
};

exports.userLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    response.status(200).json({ user });
  } catch (err) {
    const error = handleErrors(err);
    response.status(400).json({ error });
  }
};

exports.updateUser = async (request, response) => {
  const { id } = request.query;
  const findUser = await User.findById(id);
  findUser.username = request.body.username;
  findUser.email = request.body.email;
  findUser.password = request.body.password;
  await findUser.save();
  return response.status(200).send({
    status: true,
    message: "Account has been updated successfully",
    updatedUser: findUser,
  });
};

exports.getAllUSers = async (request, response) => {
  const findAllUsers = await User.find();
  return response.status(200).send({
    status: true,
    message: "All accounts created",
    AllUsers: findAllUsers,
  });
};
exports.delUser = async (request, response) => {
  const { id } = request.query;
  const findUser = await User.findByIdAndDelete(id);
  if (findUser) {
    return response.status(200).send({
      status: true,
      message: "User deleted successfully",
      deletedUser: findUser,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "User not found",
    });
  }
};
