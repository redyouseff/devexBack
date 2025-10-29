
const cloudinary= require("cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const cloudinaryUploadImage= async(fileToUpload)=>{
    
    try{
        const data=await cloudinary.uploader.upload(fileToUpload,{
             folder:"backend",
            resource_type:"auto",
           
        })
        return data

    }
    catch(err){ 
        return err;
    }
}

const cloudinaryRemoveImage=async(imagePublicId)=>{
    try{
        const result =await cloudinary.uploader.destroy(imagePublicId);
        return result;
    }

    catch(err){
        return err
    }
}


module.exports={cloudinaryUploadImage,cloudinaryRemoveImage};