const express =require("express");
const router=express.Router();
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog, resizeImage, uploadImages, getBlogByCanonical} =require("../services/blogsServices");
const {createBlogValidator,getOneBlogValidator,updateBlogValidator,deleteBlogValidator} = require("../utilts/validator/blogValidator");
const { protect,allowedTo } = require("../services/authServices");



router.route("/").post(protect,allowedTo("admin"),uploadImages,resizeImage,createBlog)
router.route("/").get(getBlogs),
router.route("/DigitalTrends/:canonical").get(getBlogByCanonical)
router.route("/:id").get(protect,allowedTo("admin"),getOneBlogValidator,getBlogById);
router.route("/:id").patch(protect,allowedTo("admin"),uploadImages,resizeImage,updateBlogValidator,updateBlog);
router.route("/:id").delete(protect,allowedTo("admin"),deleteBlogValidator,deleteBlog);





module.exports=router;