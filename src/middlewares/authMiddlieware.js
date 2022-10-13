const jwt = require("jsonwebtoken");
// const { request } = require("../..");
const User = require("../Models/userModel");
require("dotenv/config");
const { JWT_SECRET_KEY } = process.env;

const maxAge = 3 * 24 * 60 * 60;
exports.createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

exports.auth = (request, response, next) => {
  const token = request.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        response.status(401).json({ error: err.message });
      } else {
        const user = await User.findById(decodedToken.id);
        response.status(200).json({ email: user.email, id: user._id });
        next();
      }

      request.user = user;
    });
  } else {
    response.status(401).json({ message: "Sign In" });
    res.redirect("./login");
  }
};

exports.checkUser = (...roles) => {
  return async (request, response) => {
    if (!request.user.roles) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
  };
};
