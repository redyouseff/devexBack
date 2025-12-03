const { uploadMixedImges } = require("../middleware/uploadImages");
const blogModel=require("../models/blogsModel");
const asyncHandler = require('express-async-handler') 
const {v4 : uuidv4} = require("uuid");
const sharp = require("sharp");
const path = require("path");
const { cloudinaryUploadImage } = require("../utilts/cloudinary");

const fs = require("fs");
const apiError = require("../utilts/apiError");
const factory = require("./handlersFactory");




const uploadImages=uploadMixedImges([{
    name:"images",
    maxCount:4
}])
const resizeImage=asyncHandler(async(req,res,next)=>{
   

    if(req.files?.images){
        req.body.images=[];
        await Promise.all(
            req.files.images.map(async(image,index)=>{
                const fileName=`blog-${uuidv4()}-${Date.now()}-${index+1}.jpeg`;
                await sharp(image.buffer)
                .resize(800,600)
                .toFormat("jpeg")
                .jpeg({quality:80})
                .toFile(`uploads/blogs/${fileName}`)

                req.body.images.push(fileName);
           
            })
        )

    }
    next();
  
})

const createBlog=async(req,res,next)=>{
    
    
    const imagesPaths=req.body?.images?.map(image=> path.join(__dirname,"../uploads/blogs",image));


    if(req.body.images.length>0){
           
    try{
        const result =await Promise.all(imagesPaths.map(image=>cloudinaryUploadImage(image)));
        req.body.images=result.map(image=>({secure_url:image.secure_url,public_id:image.public_id}));
       
    }
    catch(err){
        return next(new apiError(`${err.message} there is an error on uploading images on the cloudinary`,404))
    }

    }
   
 

    const blog=await blogModel.create(req.body);

    
    imagesPaths.map((image)=>{
        fs.unlinkSync(image)
    });

        
    res.status(200).json({
        data:blog,
    })


}

const getBlogs=factory.getAll(blogModel)

const getBlogById=factory.getOne(blogModel)

const  updateBlog=async(req,res,next)=>{
    const id =req.params.id;
    const blog=await blogModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if(!blog){
        return next(new apiError(`ther is no blog with this id ${id}`,404))
    }
    res.status(200).json({
        data:blog,
    })
}

const deleteBlog=factory.deleteOne(blogModel)






module.exports={uploadImages,resizeImage,createBlog,getBlogs,getBlogById,updateBlog,deleteBlog}
