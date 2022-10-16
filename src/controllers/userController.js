const User = require("../Models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../../utils/errorHandler");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/authMiddlieware");

//Generating JWT
const maxAge = 3 * 24 * 60 * 60;

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
      message: "Account has been created successfully",
      newUser: user,
      AccessToken: token,
    });
  } catch (error) {
    const err = handleErrors(error);
    return response.status(400).json({ err });
  }
};

exports.userLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      response.status(400).json({ message: "Invalid details" });
    } else {
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (!checkPassword) {
        response.status(400).json({ message: "Invalid details" });
      } else {
        const token = createToken(findUser._id);
        response.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        response.status(200).json({ Id: findUser._id, email: findUser.email });
      }
    }
  } catch (err) {
    const error = handleErrors(err);
    response.status(400).json({ error });
  }
};

exports.updateUser = async (request, response) => {
  try {
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
  } catch (err) {
    const error = handleErrors(err);
    response.status(400).json({ error });
  }
};

exports.getUser = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneUser = await User.findById(id);

    if (!findOneUser) {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "User found",
        User: { username: findOneUser.username, email: findOneUser.email },
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
