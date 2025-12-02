const express =require("express");
const router=express.Router();
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog, resizeImage, uploadImages} =require("../services/blogsServices");
const {createBlogValidator,getOneBlogValidator,updateBlogValidator,deleteBlogValidator} = require("../utilts/validator/blogValidator");
const { protect } = require("../services/authServices");



router.route("/").post(protect,uploadImages,resizeImage,createBlogValidator,createBlog)
router.route("/").get(protect,getBlogs)
router.route("/:id").get(protect,getOneBlogValidator,getBlogById);
router.route("/:id").patch(protect,updateBlogValidator,updateBlog);
router.route("/:id").delete(protect,deleteBlogValidator,deleteBlog);


module.exports=router;