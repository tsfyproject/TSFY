const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogFromYtb,
  getsingleBlog,
  editBlog,
  deleteBlog,
  updateBlogView
} = require("../controllers/blogController");

router.post("/create-blog", createBlog);
router.get("/get-blog/:ytbId", getAllBlogFromYtb);
router.get("/get-single-blog/:blogId", getsingleBlog);
router.put("/edit-blog", editBlog);
router.delete("/delete-blog", deleteBlog);
router.put("/update-blog-view", updateBlogView)

module.exports = router;
