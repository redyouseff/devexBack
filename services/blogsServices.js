const { uploadMixedImges } = require("../middleware/uploadImages");
const blogModel=require("../models/blogsModel");
const asyncHandler = require('express-async-handler') 
const {v4 : uuidv4} = require("uuid");
const sharp = require("sharp");
const path = require("path");
const { cloudinaryUploadImage } = require("../utilts/cloudinary");

const fs = require("fs");




const uploadImages=uploadMixedImges([{
    name:"images",
    maxCount:4
}])
const resizeImage=asyncHandler(async(req,res,next)=>{
   

    if(req.files.images){
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
    console.log(req.body.images)
    
    const imagesPaths=req.body?.images?.map(image=> path.join(__dirname,"../uploads/blogs",image));
   
    try{
        const result =await Promise.all(imagesPaths.map(image=>cloudinaryUploadImage(image)));
        req.body.images=result.map(image=>({secure_url:image.secure_url,public_id:image.public_id}));
       
    }
    catch(err){
        return next(new appError(`${err.message} there is an error on uploading images on the cloudinary`,404))
    }

   
 

    const blog=await blogModel.create(req.body);

    
    
     
        
    res.status(200).json({
        data:blog,
    })

    imagesPaths.map((image)=>{
        fs.unlinkSync(image)
    });

}

const getBlogs=async(req,res,next)=>{
    const blogs=await blogModel.find();
    res.status(200).json({
        data:blogs,
    })
}

const getBlogById=async(req,res,next)=>{
    const blog=await blogModel.findById(req.params.id);
    if(!blog){{
        return next(new appError(`ther is no blog with this id ${req.params.id}`,404))
    }
 
}

res.status(200).json({
   data:blog,
})

}

const  updateBlog=async(req,res,next)=>{
    const id =req.params.id;
    const blog=await blogModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if(!blog){
        return next(new appError(`ther is no blog with this id ${id}`,404))
    }
    res.status(200).json({
        data:blog,
    })
}

const deleteBlog=async(req,res,next)=>{
    const id =req.params.id;
    const blog=await blogModel.findByIdAndDelete(id);
    if(!blog){
        return next(new appError(`ther is no blog with this id ${id}`,404))
    }
    res.status(200).json({
       message:`blog was deleted by this id ${req.params.id}`
    })
}






module.exports={uploadImages,resizeImage,createBlog,getBlogs,getBlogById,updateBlog,deleteBlog}
