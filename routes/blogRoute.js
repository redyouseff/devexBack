const express =require("express");
const router=express.Router();
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog, resizeImage, uploadImages} =require("../services/blogsServices");


router.route("/").post(uploadImages,resizeImage,createBlog)
router.route("/").get(getBlogs)
router.route("/:id").get(getBlogById)
router.route("/:id").patch(updateBlog)
router.route("/:id").delete(deleteBlog)


module.exports=router;