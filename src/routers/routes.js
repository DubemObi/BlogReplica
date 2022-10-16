const express = require("express");
const UserController = require("../controllers/userController");
const BlogController = require("../controllers/blogController");
const { auth, checkUser } = require("../middlewares/authMiddlieware");
const app = express();

app.use(express.json());
const router = express.Router();

const { updateUser, getUser, getAllUSers, delUser } = UserController;
router
  .route("/user")
  .put(auth, updateUser)
  .get(auth, checkUser("admin"), getAllUSers)
  .delete(auth, delUser);

router.get("/user/:id", getUser);

const { createBlog, updateBlog, getOneBlog, getBlogs, deleteBlog } =
  BlogController;
router
  .route("/blog")
  .get(auth, getBlogs)
  .delete(auth, checkUser("blogger", "admin"), deleteBlog);

router.post("/blog", auth, checkUser("blogger"), createBlog);
router.put("/blog/:id", auth, checkUser("blogger"), updateBlog);
router.get("/blog/:id", auth, getOneBlog);

module.exports = router;
