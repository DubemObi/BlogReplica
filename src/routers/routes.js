const express = require("express");
const UserController = require("../controllers/userController");
const BlogController = require("../controllers/blogController");
const {auth, checkUser } = require('../middlewares/authMiddlieware')
const app = express();

app.use(express.json());
const router = express.Router();

const { updateUser, getAllUSers, delUser } = UserController;
router.route("/user").put(auth, updateUser).get(auth, checkUser("admin"), getAllUSers).delete( auth, delUser);

const { createBlog, updateBlog, getBlog, deleteBlog } = BlogController;
router.route("/blog").get(auth, checkUser("admin", "user"), getBlog).delete(auth, checkUser("blogger", "admin"), deleteBlog);

router.post("/blog/:id", auth, checkUser("blogger"), createBlog);
router.put("/blog/:id", auth, checkUser("blogger"), updateBlog);

module.exports = router;
