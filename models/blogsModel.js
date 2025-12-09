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
        title:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 
    },
   
  
    sectionThree:{
        typeOfH:String,
        title:String,
        paragraph1:String,
        ol:[String],
        paragraphs:[String] 
    },
    sectionFour:{
        typeofH:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 
    },
    sectionFive:{
        typeofH:String,
        title:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 
       
    },  
    title:String,
    description:String,
    keywords:String,
    canonical:String

  

})

blogSchema.index({
    "sectionOne.title": "text",
    "sectionOne.paragraph1": "text",
    "sectionOne.paragraph2":"text",
    "sectionTwo.title": "text",
    "sectionTwo.paragraph1": "text",
    "sectionThree.title": "text",
    "sectionThree.paragraph1": "text",
})

const blogModel= new mongoose.model("Blogs",blogSchema);
module.exports=blogModel;