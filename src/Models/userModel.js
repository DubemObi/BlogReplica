const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name "],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password "],
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Minimum password length is 6 characters and maximum is 16 characters and should contain Upper and lowercase and Special characters ",
    ],
  },
  phoneNo: {
    type: String,
    required: [true, "Please enter phone number "],
    minlength: [11, "Minimum phoneNo length is 11 characters"],
    maxlength: [15, "Maximum phoneNo length is 15 characters"],
  },
  username: {
    type: String,
    required: [true, "Please enter a username "],
    unique: true,
  },
  profileImage: {
    type: String,
    required: [true, "Please enter image URL "],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "blogger", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method login user
// userSchema.statics.login = async function (email, password) {
//   const findUser = await this.findOne({ email });
//   if (findUser) {
//     const auth = await bcrypt.compare(password, findUser.password);
//     if (auth) {
//       return findUser;
//     }
//     throw Error("Incorrect password");
//   }
//   throw Error("Incorrect email");
// };

module.exports = mongoose.model("user", userSchema);
