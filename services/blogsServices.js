const { uploadMixedImges } = require("../middleware/uploadImages");
const blogModel=require("../models/blogsModel");
const asyncHandler = require('express-async-handler') 
const {v4 : uuidv4} = require("uuid");
const sharp = require("sharp");
const path = require("path");
const { cloudinaryUploadImage ,cloudinaryRemoveImage} = require("../utilts/cloudinary");

const fs = require("fs");
const apiError = require("../utilts/apiError");
const factory = require("./handlersFactory");
const { body } = require("express-validator");   




const uploadImages=uploadMixedImges([{
    name:"images",
    maxCount:4
}])



const resizeImage=asyncHandler(async(req,res,next)=>{

  
   


    if(req.files?.images){

          const slots=Array.isArray(req.body.slots)? req.body.slots:[req.body.slots];

        req.body.images=[];
        req.processedImages = [];
        await Promise.all(
            req.files.images.map(async(image,index)=>{
                const slot =Number(slots[index]);
                
                if(slot==undefined||slot==null){   
                    next ( new apiError("slot for each image is required ",400))
                }



                const fileName=`blog-${uuidv4()}-${Date.now()}-${index+1}.jpeg`;
                await sharp(image.buffer)
                .resize(800,600)
                .toFormat("jpeg")
                .jpeg({quality:80})
                .toFile(`uploads/blogs/${fileName}`)
                req.processedImages.push({fileName,slot})

                
           
            })
        )

    }
    next();
  
})



const createBlog=async(req,res,next)=>{

   
    
    const imagesPaths=req?.processedImages?.map(image=> path.join(__dirname,"../uploads/blogs",image.fileName)) || [];
   


    if(req?.processedImages?.length>0){
           
    try{
        const result =await Promise.all(imagesPaths.map(image=>cloudinaryUploadImage(image)));
        req.processedImages=result.map((image,index)=>({secure_url:image.secure_url,public_id:image.public_id,slot:req.processedImages[index].slot}));
       
    }
    catch(err){
        return next(new apiError(`${err.message} there is an error on uploading images on the cloudinary`,404))
    }

    }
   

    const blog=await blogModel.create({
        ...req.body,
        images:req.processedImages
    });
   

    
   if (imagesPaths?.length > 0) {
    imagesPaths.forEach(image => {
        if (fs.existsSync(image)) fs.unlinkSync(image);
    });
}     
    res.status(200).json({
        status:"success",
        data:blog,
    })


}


const  updateBlog=asyncHandler(async(req,res,next)=>{

     const blog=await blogModel.findById(req.params.id)
    
     
   if (!blog) {
      return next(new apiError("Blog not found", 404));
   }

   
         let imagesPaths=[]
        
          
    if(req?.processedImages?.length>0){

        const oldImagesToRemove = [];
     
         for(const image of req.processedImages){
            imagesPaths.push(path.join(__dirname,"../uploads/blogs",image.fileName))
          
             const oldImage=blog.images.find(i => i.slot==image.slot);
             if(oldImage){

                // await cloudinaryRemoveImage(oldImage.public_id);
                oldImagesToRemove.push(oldImage);
                blog.images = blog.images.filter(i => i.slot !== image.slot);

             }

         }
        await Promise.all(
            oldImagesToRemove.map(image=>{
                cloudinaryRemoveImage(image.public_id)
            })
         )
       

        try{

            const result=await Promise.all(imagesPaths.map(image=>cloudinaryUploadImage(image)));
            req.processedImages=result.map((image,index)=>({secure_url:image.secure_url,public_id:image.public_id,slot:req.processedImages[index].slot}));
            
            
             
        }
      
           catch(err){

                return next(new apiError(`${err.message} there is an error on uploading images on the cloudinary`,404))
            
            }


    }

    const {images,...rest}=req.body
   
     
   
   Object.assign(blog,rest);
   if(req?.processedImages?.length>0){
    blog.images.push(...req.processedImages);
   }

    await blog.save();

  

    if(imagesPaths?.length>0){
        imagesPaths.forEach((image)=>{
            if(fs.existsSync(image))  fs.unlinkSync(image)

        })

    }

    res.status(200).json({
        status:"success",
        data:blog
    })
})



const getBlogs=factory.getAll(blogModel)

const getBlogById=factory.getOne(blogModel)



const deleteBlog=factory.deleteOne(blogModel)






module.exports={uploadImages,resizeImage,createBlog,getBlogs,getBlogById,updateBlog,deleteBlog}   
