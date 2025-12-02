const asyncHandler = require('express-async-handler') 
const  userModel  = require('../models/userModel')
const  createToken  = require('../utilts/createToken')
const apiError = require('../utilts/apiError')
const bcrypt =require("bcrypt")
let jwt =require("jsonwebtoken")





const signUp=asyncHandler(async(req,res,next)=>{
    const  user =await  userModel.create({
        name :req.body.name,
        email:req.body.email,
        password:req.body.password

    })
    const token = createToken(user._id)
    res.status(200).json({  
        data:user,
        token:token
    })
})


const login=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findOne({email:req.body.email});
    if(!user||bcrypt.compare(req.body.password,user.password)){
        next(new apiError("email or password is not correct "))
    }
    const token =await createToken(user._id);

    res.status(200).json({
        token:token
    })
   
})




const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
  
    if(!token){
        next(new apiError("you are not logged in ",400))
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    const user=await userModel.findById(decoded.userId);
    
    if(!user){
        next(new apiError ("user no longer exist"));
    }

    req.CurrentUser=user;
    next();
})


    const allowedTo=(...roles)=>{
        return asyncHandler(async(req,res,next)=>{
            if(!roles.includes(req.CurrentUser.role)){
                next(new apiError("you are not allowed to access this route "))
            }
            next();
        })
    }


    




module.exports={signUp,login,protect}

