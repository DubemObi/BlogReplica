const express = require("express");
const UserController = require("../controllers/userController");
const app = express();

app.use(express.json());
const router = express.Router();

const { createUser, userLogin } = UserController;
router.post("/signup", createUser);

router.post("/login", userLogin);

module.exports = router;
