const  multer = require("multer");
const apiError = require("../utilts/apiError");

const multerOptions=()=>{
    const multerStorage = multer.memoryStorage();

    const multerFilter=(req,file,cb)=>{
        if(file.mimetype.startsWith("image")){
            cb(null,true);
        }
        else{
            cb (new apiError("Only images are allowed",400));
        }
    }
    const upload=multer({storage:multerStorage,fileFilter:multerFilter});
    return upload;

}

const uploadSingleImage=(fileName)=>{
    return multerOptions().single(`${fileName}`);

}

const uploadMixedImges=(arrayOfFields)=>{
    return multerOptions().fields(arrayOfFields);
}



module.exports={uploadSingleImage,uploadMixedImges}; 

