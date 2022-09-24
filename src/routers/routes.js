const express = require("express");
const UserController = require("../controllers/userController");
const BlogController = require("../controllers/blogController");
const app = express();

app.use(express.json());
const router = express.Router();

const { updateUser, getAllUSers, delUser } = UserController;
router.route("/user").put(updateUser).get(getAllUSers).delete(delUser);

const { createBlog, updateBlog, getBlog, deleteBlog } = BlogController;
router
  .route("/blog")
  .post(createBlog)
  .put(updateBlog)
  .get(getBlog)
  .delete(deleteBlog);

module.exports = router;
