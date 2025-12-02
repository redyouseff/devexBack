const { check,body } = require('express-validator');

const validator=require('../../middleware/validator');


const createBlogValidator=[

    check("images").notEmpty().withMessage("images is required").isArray({min:3}).withMessage("images must be three images"),

    check("sectionOne.typeOfH").notEmpty().withMessage("typeOfH in section one is required"),
    check("sectionOne.title").notEmpty().withMessage("title in section one is required"),
    check("sectionOne.paragraph1").notEmpty().withMessage("paragraph1 in section one is required"),
    check("sectionOne.paragraph2").notEmpty().withMessage("paragraph2 in section one is required"),

    check("sectionTwo.typeOfH").notEmpty().withMessage("typeOfH in section two is required"),
    check("sectionTwo.title").notEmpty().withMessage("title in section two is required"),
    check("sectionTwo.paragraph1").notEmpty().withMessage("paragraph1 in section two is required"),
    check("sectionTwo.ul").notEmpty().withMessage("ul in section two is required"),


    check("sectionThree.typeOfH").notEmpty().withMessage("typeOfH in section three is required"),
    check("sectionThree.title").notEmpty().withMessage("title in section three is required"),
    check("sectionThree.paragraph1").notEmpty().withMessage("paragraph1 in section three is required"),
    check("sectionThree.ol").notEmpty().withMessage("ol in section three is required"),

    check("sectionFour.typeofH").notEmpty().withMessage("typeofH in section four is required"),
    check("sectionFour.paragraph1").notEmpty().withMessage("paragraph1 in section four is required"),
    check("sectionFour.ul").notEmpty().withMessage("ul in section four is required"),

    check("sectionFive.typeofH").notEmpty().withMessage("typeofH in section five is required"),
    check("sectionFive.title").notEmpty().withMessage("title in section five is required"),
    check("sectionFive.paragraph1").notEmpty().withMessage("paragraph1 in section five is required"),
    check("sectionFive.paragraph2").notEmpty().withMessage("paragraph2 in section five is required"),




    
    
    
    
    ,validator]

    const getOneBlogValidator=[
        check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("id must be a valid mongo id"),
    ]

    const updateBlogValidator=[
        check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("id must be a valid mongo id"),
      
    ]

    const deleteBlogValidator=[
        check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("id must be a valid mongo id"),
    ]




    module.exports={createBlogValidator,getOneBlogValidator,updateBlogValidator,deleteBlogValidator};