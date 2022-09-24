const express = require("express");
const UserController = require("../controllers/userController");
const app = express();

app.use(express.json());
const router = express.Router();

const { createUser } = UserController;
router.route("/user").post(createUser);

const { userLogin } = UserController;
router.route("/login").post(userLogin);

module.exports = router;
