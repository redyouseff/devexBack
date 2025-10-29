const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    sectionOne:{
        typeOfH:String,
        title:String,
        paragraph1:String,
        paragraph2:String,
    },
    images:[{
        secure_url:String,
        public_id:String,
    }],
    sectionTwo:{
        typeOfH:String,
        paragraph1:String,
        ul:[String],
    },
   
  
    sectionThree:{
        typeOfH:String,
        paragraph1:String,
        ol:[String],
    },
    sectionFour:{
        typeofH:String,
        paragraph1:String,
        ul:[String],
    },
    sectionFive:{
        typeofH:String,
        paragraph1:String,
        paragraph2:String,
       
    },  

  

})

const blogModel= new mongoose.model("Blogs",blogSchema);
module.exports=blogModel;