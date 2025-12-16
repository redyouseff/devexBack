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
        slot:Number,
     
    }],
    altImageOne:String,
    altImagTwo:String,
    altImageThree:String,
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

    sectionSix:{
         typeofH:String,
        title:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 

    },
    sectionSeven:{
         typeofH:String,
        title:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 
    },
    sectionEight:{
         typeofH:String,
        title:String,
        paragraph1:String,
        ul:[String],
        paragraphs:[String] 

    },
    data:Date,


    title:String,
    description:String,
    keywords:String,
    canonical:String

  

},{timestamps:true})




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