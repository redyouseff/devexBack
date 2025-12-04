
const cloudinary= require("cloudinary");


cloudinary.config({
    cloud_name: "daop3bufa",
    api_key: "772878341824746",
    api_secret: "UTwgZjOFQGJ1ui6XNSbMKBebz4o",
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