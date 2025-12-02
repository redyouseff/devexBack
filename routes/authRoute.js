const express=require("express");
const { signUp, login } = require("../services/authServices");
const { signupValidator, loginValidator } = require("../utilts/validator/authValidator");
const router=express.Router();

router.route("/signup").post(signupValidator,signUp);
router.route("/login").post(loginValidator,login);


module.exports=router


