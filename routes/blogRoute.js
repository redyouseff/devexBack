const express =require("express");
const router=express.Router();
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog, resizeImage, uploadImages} =require("../services/blogsServices");
const {createBlogValidator,getOneBlogValidator,updateBlogValidator,deleteBlogValidator} = require("../utilts/validator/blogValidator");



router.route("/").post(uploadImages,resizeImage,createBlogValidator,createBlog)
router.route("/").get(getBlogs)
router.route("/:id").get(getOneBlogValidator,getBlogById);
router.route("/:id").patch(updateBlogValidator,updateBlog);
router.route("/:id").delete(deleteBlogValidator,deleteBlog);


module.exports=router; 