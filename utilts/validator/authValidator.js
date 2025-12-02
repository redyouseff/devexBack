const { check,body } = require('express-validator');
const validator=require('../../middleware/validator');
const userModel = require('../../models/userModel');
const apiError = require('../apiError');
const slugify = require('slugify');


const signupValidator=[

    check("name")
    .notEmpty().withMessage("name is required ")
    .custom((val,{req})=>{
       req.body.slug = slugify(val, { lower: true });
        return true
    }),

    check("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("must be an email ")
    .custom(async(val,{req})=>{
        const user =await userModel.findOne({email:val})
        if(user){
            throw new apiError("email is already exist ")
        }

        return true
    

    }),
    check("passwordConfirm")
    .notEmpty().withMessage("passwordConfirm is requred")
    ,

    check("password")
    .notEmpty().withMessage("password is requird")
    .isLength({min:6}).withMessage("passowrd is too short ")
    .custom((val,{req})=>{
        if(val!==req.body.passwordConfirm){
            throw new apiError("passwordConfirm is not match ")
        }
        return true;

    })


    ,
    validator
]

const loginValidator=[
    check("email")
    .notEmpty().withMessage("emial is required")
    .isEmail().withMessage("must be an email "),
     
    check("password")
    .notEmpty().withMessage("password is required")
    .isLength({min:6}).withMessage("too short password ")

    ,
    validator
]




module.exports={signupValidator,loginValidator}